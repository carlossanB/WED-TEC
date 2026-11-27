import {
  UscisOAuthResponse,
  UscisCaseRawResponse,
  NormalizedCaseResponse,
} from "./uscis.types.js";

export class UscisService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private oauthUrl: string;

  // Caché en memoria para el token OAuth
  private cachedToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor() {
    this.clientId = process.env.USCIS_CLIENT_ID || "";
    this.clientSecret = process.env.USCIS_CLIENT_SECRET || "";

    // Si el entorno es producción usa api.uscis.gov, de lo contrario usa api-int.uscis.gov (sandbox)
    const isProduction = process.env.USCIS_ENV === "production";
    this.baseUrl = isProduction
      ? "https://api.uscis.gov"
      : "https://api-int.uscis.gov";

    this.oauthUrl = `${this.baseUrl}/oauth/accesstoken`;

    if (!this.clientId || !this.clientSecret) {
      console.warn(
        "⚠️ [UscisService] Advertencia: USCIS_CLIENT_ID o USCIS_CLIENT_SECRET no están definidos en las variables de entorno."
      );
    }
  }

  /**
   * Obtiene o renueva el token Bearer usando el flujo OAuth 2.0 Client Credentials
   */
  async getAccessToken(): Promise<string> {
    const now = Date.now();

    // Si tenemos un token válido en caché con más de 60 segundos de margen, lo reutilizamos
    if (this.cachedToken && now < this.tokenExpiresAt - 60_000) {
      return this.cachedToken;
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", this.clientId);
    params.append("client_secret", this.clientSecret);

    const response = await fetch(this.oauthUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error al autenticar con USCIS (${response.status}): ${errorText}`
      );
    }

    const data = (await response.json()) as UscisOAuthResponse;
    this.cachedToken = data.access_token;
    // data.expires_in viene en segundos (ej. 3600)
    this.tokenExpiresAt = now + data.expires_in * 1000;

    return this.cachedToken;
  }

  /**
   * Consulta el estado oficial de un número de recibo ante USCIS
   */
  async getCaseStatus(receiptNumber: string): Promise<NormalizedCaseResponse> {
    const token = await this.getAccessToken();
    const url = `${this.baseUrl}/case-status/${receiptNumber}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (response.status === 404) {
      throw new Error("NOT_FOUND");
    }

    if (response.status === 422) {
      const errorJson = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      throw new Error(
        `INVALID_RECEIPT: ${errorJson.message || "Número de recibo no válido o prefijo desconocido."}`
      );
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Error en la respuesta de USCIS (${response.status}): ${errorBody}`
      );
    }

    const rawData = (await response.json()) as UscisCaseRawResponse;
    return this.normalizeResponse(receiptNumber, rawData);
  }

  /**
   * Transforma y limpia los datos recibidos de la API de USCIS
   */
  private normalizeResponse(
    receiptNumber: string,
    raw: UscisCaseRawResponse
  ): NormalizedCaseResponse {
    // USCIS devuelve los detalles dentro de `case_status`
    const details = (
      raw.case_status && typeof raw.case_status === "object"
        ? raw.case_status
        : raw
    ) as Record<string, any>;

    const statusTitle =
      details.current_case_status_text_es ||
      details.current_case_status_text_en ||
      details.case_status_es ||
      (typeof details.case_status === "string" ? details.case_status : null) ||
      "Estado no especificado";

    const statusDetails =
      details.current_case_status_desc_es ||
      details.current_case_status_desc_en ||
      details.current_case_status_text_es ||
      details.current_case_status_text_en ||
      "Sin descripción disponible.";

    const history = Array.isArray(details.hist_case_status)
      ? details.hist_case_status
          .filter((item: any) => item && (item.date || item.completed_text_es || item.completed_text_en || item.status))
          .map((item: any) => ({
            date: item.date || "",
            description:
              item.completed_text_es ||
              item.completed_text_en ||
              item.status ||
              "",
          }))
      : [];

    return {
      receiptNumber: details.receiptNumber || receiptNumber,
      formType: details.formType || details.form_type || "No especificado",
      status: details.current_case_status_text_en || "UNKNOWN",
      statusTitle,
      statusDetails,
      lastUpdated: details.modifiedDate || details.submittedDate || null,
      history,
    };
  }
}
