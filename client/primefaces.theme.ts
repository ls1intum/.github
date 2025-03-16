import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

export default {
    theme: {
      preset: definePreset(Aura, {
        semantic: {
          primary: {
            50: '{gray.50}',
            100: '{gray.100}',
            200: '{gray.200}',
            300: '{gray.300}',
            400: '{gray.400}',
            500: '{gray.500}',
            600: '{gray.600}',
            700: '{gray.700}',
            800: '{gray.800}',
            900: '{gray.900}',
            950: '{gray.950}',
          },
        },
        components: {
          toggleswitch: {
            colorScheme: {
              checkedBackground: '{emerald.500}',
              checkedHoverBackground: '{emerald.500}',
            },
          },
        },
      }),
      options: {
        darkModeSelector: '.dark-selector',
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    }
};