import type { Service } from '../types/content'
import { servicesData } from './servicesData'

export { servicesData, serviceCategories, getAllServices, getServiceBySlug, getServicesByCategory } from './servicesData'

// Retain compatibility with existing Service interface, enriched with slug
export const services: (Service & { slug: string; badge?: string })[] = servicesData.map(item => ({
  id: item.slug,
  slug: item.slug,
  title: item.title,
  description: item.summary,
  category: item.category,
  icon: item.icon,
  badge: item.badge,
}))

export const additionalServices = [
  { title: 'Cancelación de remoción', slug: 'cancelacion-de-remocion' },
  { title: 'Fianza', slug: 'fianza' },
  { title: 'Apelación', slug: 'apelacion' },
  { title: 'Perdón migratorio', slug: 'waiver-perdon-migratorio' },
  { title: 'Naturalización', slug: 'naturalizacion' },
  { title: 'Visa VAWA', slug: 'visa-vawa' },
]

export const needs = [
  {
    title: 'Necesito protección o asilo',
    subtitle: 'Asilo afirmativo y defensivo · I-589',
    icon: 'shield',
    target: 'asilo',
    slug: 'asilo',
  },
  {
    title: 'Quiero solicitar permiso de trabajo',
    subtitle: 'Autorización de empleo (EAD) · I-765',
    icon: 'briefcase',
    target: 'permiso-de-trabajo',
    slug: 'permiso-de-trabajo',
  },
  {
    title: 'Quiero reunirme con mi familia',
    subtitle: 'Peticiones familiares · I-130',
    icon: 'people',
    target: 'peticion-familiar',
    slug: 'peticion-familiar',
  },
  {
    title: 'Tengo un proceso en la corte',
    subtitle: 'Defensa y representación · EOIR',
    icon: 'scale',
    target: 'representante-en-corte',
    slug: 'representante-en-corte',
  },
  {
    title: 'Quiero obtener la residencia',
    subtitle: 'Ajuste de estatus (Green Card) · I-485',
    icon: 'card',
    target: 'ajuste-de-estatus',
    slug: 'ajuste-de-estatus',
  },
  {
    title: 'Quiero solicitar la ciudadanía',
    subtitle: 'Naturalización estadounidense · N-400',
    icon: 'globe',
    target: 'naturalizacion',
    slug: 'naturalizacion',
  },
]
