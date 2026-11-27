import { CreateLeadInput } from "./leads.schema.js";
import { BitrixLeadAddResponse, LeadResponseSuccess } from "./leads.types.js";

export class LeadsService {
  private webhookUrl?: string;
  private isEnabled: boolean;

  constructor() {
    this.webhookUrl = process.env.BITRIX24_WEBHOOK_URL?.trim();
    const enabledEnv = process.env.BITRIX24_ENABLED?.trim().toLowerCase();
    this.isEnabled = enabledEnv !== "false" && Boolean(this.webhookUrl);
  }

  /**
   * Resuelve el endpoint final de Bitrix24 para crm.lead.add.json
   */
  private resolveEndpoint(): string | null {
    if (!this.webhookUrl) return null;
    const cleanUrl = this.webhookUrl.replace(/\/+$/, "");
    if (cleanUrl.endsWith("/crm.lead.add.json") || cleanUrl.endsWith("/crm.lead.add")) {
      return cleanUrl;
    }
    return `${cleanUrl}/crm.lead.add.json`;
  }

  /**
   * Determina si el texto de contacto corresponde a un correo o teléfono
   */
  private parseContact(contact: string): { phone?: string; email?: string } {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact) || contact.includes("@");
    if (isEmail) {
      return { email: contact };
    }
    return { phone: contact };
  }

  /**
   * Registra el lead en Bitrix24 (o simula/registra en log si no está configurado)
   */
  async createLead(
    data: CreateLeadInput,
    logger?: { info: (msg: string, ...args: any[]) => void; error: (msg: string, ...args: any[]) => void }
  ): Promise<LeadResponseSuccess> {
    const endpoint = this.resolveEndpoint();

    // Caso 1: Modo local / desarrollo (Bitrix24 no configurado o deshabilitado)
    if (!this.isEnabled || !endpoint) {
      logger?.info(
        `[LeadsService] Lead recibido en modo local (Bitrix24 no configurado): ${data.fullName} | Contacto: ${data.contact} | Trámite: ${data.service || "General"}`
      );
      return {
        success: true,
        message: "Hemos recibido tus datos correctamente.",
        bitrixLeadId: null,
      };
    }

    // Caso 2: Bitrix24 Webhook configurado
    const contactInfo = this.parseContact(data.contact);

    const fields: Record<string, any> = {
      TITLE: `Lead Web: ${data.fullName} [${data.service || "General"}]`,
      NAME: data.fullName,
      SOURCE_ID: "WEB",
      STATUS_ID: "NEW",
      OPENED: "Y",
      COMMENTS: `Urgencia: ${data.urgency.toUpperCase()}\nUbicación: ${data.location || "No especificada"}\nDetalle de consulta: ${data.description || "Ninguno"}`,
    };

    if (contactInfo.phone) {
      fields.PHONE = [{ VALUE: contactInfo.phone, VALUE_TYPE: "WORK" }];
    }
    if (contactInfo.email) {
      fields.EMAIL = [{ VALUE: contactInfo.email, VALUE_TYPE: "WORK" }];
    }

    const payload = {
      fields,
      params: {
        REGISTER_SONET_EVENT: "Y",
      },
    };

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (netError: any) {
      logger?.error(`[LeadsService] Error de conexión hacia Bitrix24: ${netError?.message || netError}`);
      throw new Error("No se pudo conectar con el servicio CRM de Bitrix24.");
    }

    const result = (await response.json().catch(() => null)) as BitrixLeadAddResponse | null;

    if (!response.ok || !result || result.error) {
      const bitrixErrorMsg = result?.error_description || result?.error || `HTTP ${response.status}`;
      logger?.error(`[LeadsService] Error en respuesta de Bitrix24: ${bitrixErrorMsg}`);
      throw new Error(`Bitrix24 CRM reportó un error: ${bitrixErrorMsg}`);
    }

    const leadId = result.result ?? null;
    logger?.info(`[LeadsService] Lead registrado exitosamente en Bitrix24. ID: ${leadId}`);

    return {
      success: true,
      message: "Hemos recibido tus datos correctamente.",
      bitrixLeadId: leadId,
    };
  }
}
