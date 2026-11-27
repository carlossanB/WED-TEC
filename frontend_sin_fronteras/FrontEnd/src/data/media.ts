import type { SiteImage } from '../types/media'
import heroDesktop from '../assets/images/optimized/hero-family-reunion-1600.jpg'
import heroMobile from '../assets/images/optimized/hero-family-reunion-900.jpg'
import visaDesktop from '../assets/images/optimized/visa-application-960.jpg'
import visaMobile from '../assets/images/optimized/visa-application-720.jpg'
import documentDesktop from '../assets/images/optimized/document-signing-1200.jpg'
import documentMobile from '../assets/images/optimized/document-signing-720.jpg'
import trustDesktop from '../assets/images/optimized/trust-couple-1000.jpg'
import trustMobile from '../assets/images/optimized/trust-couple-720.jpg'
import statueOfLibertyHero from '../assets/images/optimized/Estatua de la Libertad al atardecer.webp'
import statusFamily from '../assets/images/familia con bandera de estados unidos.webp'

export const siteImages = {
  heroStatue: {
    desktop: {
      src: statueOfLibertyHero,
      width: 1840,
      height: 818,
    },
    mobile: {
      src: statueOfLibertyHero,
      width: 1840,
      height: 818,
    },
    alt: 'La Estatua de la Libertad al atardecer frente al horizonte de Nueva York',
    objectPosition: 'center',
  },
    heroFamily: {
    desktop: { 
      src: heroDesktop,
      width: 1600, 
      height: 1067 
    },
    mobile: { 
      src: heroMobile,
      width: 900, 
      height: 600 
    },
    alt: 'Una familia se abraza al reencontrarse frente a su hogar',
    objectPosition: '66% center',
    },

  visaApplication: {
    desktop: { 
      src: visaDesktop,
      width: 960, 
      height: 640 
    },
    mobile: { 
      src: visaMobile,
      width: 720, 
      height: 480 
    },
    alt: 'Formulario de solicitud de visa junto a un pasaporte y una bandera de Estados Unidos',
    objectPosition: '54% center',
  },

  documentSigning: {
    desktop: { 
      src: documentDesktop,
      width: 1200, 
      height: 400 
    },
    mobile: { 
      src: documentMobile,
      width: 720, 
      height: 240 
    },
    alt: 'Una persona completa un formulario migratorio',
    objectPosition: 'center',
  },

  trustCouple: {
    desktop: { 
      src: trustDesktop,
      width: 1000, 
      height: 667 
    },
    mobile: { 
      src: trustMobile,
      width: 720, 
      height: 480 
    },
    alt: 'Una pareja celebra mientras sostiene una bandera de Estados Unidos',
    objectPosition: '50% 42%',
  },

  statusFamily: {
    desktop: { src: statusFamily, width: 3810, height: 2540 },
    mobile: { src: statusFamily, width: 3810, height: 2540 },
    alt: 'Familia caminando junta con una bandera de Estados Unidos',
    objectPosition: 'center 48%',
  },

} satisfies Record<string, SiteImage>
