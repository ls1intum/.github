import { applicationConfig, Preview } from '@storybook/angular';
import primengConfig from './primeng.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG(primengConfig),
      ],
    }),
  ]
};

export default preview;
