import type { LeadFormData } from '../types'

export type FormValidationErrors = Partial<Record<keyof LeadFormData | 'general', string>>

const OBVIOUS_PLACEHOLDERS = new Set([
  'test',
  'prueba',
  'asdf',
  'qwerty',
  'admin',
  'fake',
  'none',
  'nombre',
  'apellido',
  'contacto',
  'email@email.com',
  'test@test.com',
  '123456',
  '1234567890',
])

function isRepeatedCharOnly(str: string): boolean {
  const clean = str.replace(/[\s'-]/g, '').toLowerCase()
  if (clean.length < 3) return false
  return new Set(clean).size <= 1
}

function containsUrl(str: string): boolean {
  return /(https?:\/\/|www\.)[^\s]+/i.test(str)
}

export function validateLeadForm(data: LeadFormData): {
  isValid: boolean
  errors: FormValidationErrors
} {
  const errors: FormValidationErrors = {}

  // 1. Nombre completo
  const name = data.fullName.trim()
  if (!name) {
    errors.fullName = 'Por favor ingresa tu nombre completo.'
  } else if (name.length < 3) {
    errors.fullName = 'El nombre debe tener al menos 3 caracteres.'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(name)) {
    errors.fullName = 'El nombre solo puede contener letras, espacios, acentos o guiones.'
  } else if (isRepeatedCharOnly(name)) {
    errors.fullName = 'Por favor ingresa un nombre real y válido.'
  } else if (containsUrl(name) || name.includes('@')) {
    errors.fullName = 'El nombre no puede contener correos electrónicos ni enlaces.'
  } else if (OBVIOUS_PLACEHOLDERS.has(name.toLowerCase())) {
    errors.fullName = 'Por favor ingresa tu nombre real.'
  }

  // 2. Contacto (Teléfono O Correo electrónico)
  const contact = data.contact.trim()
  if (!contact) {
    errors.contact = 'Por favor ingresa un teléfono o correo electrónico.'
  } else {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)
    const phoneDigits = contact.replace(/\D/g, '')
    const isPhone = phoneDigits.length >= 10 && !isRepeatedCharOnly(phoneDigits)

    if (!isEmail && !isPhone) {
      errors.contact = 'Ingresa un teléfono válido (al menos 10 dígitos) o un correo electrónico válido.'
    } else if (OBVIOUS_PLACEHOLDERS.has(contact.toLowerCase())) {
      errors.contact = 'Por favor ingresa un contacto real para poder comunicarnos contigo.'
    }
  }

  // 3. Consentimiento de privacidad
  if (!data.consent) {
    errors.consent = 'Debes aceptar la política de privacidad para recibir la orientación.'
  }

  // 4. Ubicación (opcional)
  if (data.location && data.location.trim().length > 0) {
    const loc = data.location.trim()
    if (loc.length > 80) {
      errors.location = 'La ubicación no puede superar los 80 caracteres.'
    } else if (containsUrl(loc)) {
      errors.location = 'La ubicación no puede contener enlaces web.'
    }
  }

  // 5. Descripción general del caso (opcional)
  if (data.description && data.description.trim().length > 0) {
    const desc = data.description.trim()
    if (desc.length > 1000) {
      errors.description = 'La descripción no debe exceder los 1000 caracteres.'
    } else if (isRepeatedCharOnly(desc)) {
      errors.description = 'Por favor escribe una descripción comprensible de tu caso.'
    } else {
      const nonUrlLength = desc.replace(/(https?:\/\/[^\s]+)/gi, '').trim().length
      if (containsUrl(desc) && nonUrlLength < 10) {
        errors.description = 'La descripción no debe consistir únicamente en enlaces web.'
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
