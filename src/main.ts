import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { provideLocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideLocationStrategy(HashLocationStrategy)
  ]
})
.catch((err) => console.error(err));
