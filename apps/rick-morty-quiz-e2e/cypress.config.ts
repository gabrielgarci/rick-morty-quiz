import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run rick-morty-quiz:serve',
        production: 'nx run rick-morty-quiz:preview',
      },
      ciWebServerCommand: 'nx run rick-morty-quiz:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
