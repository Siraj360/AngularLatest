import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    // Router provider with hash location
    provideRouter(routes, withHashLocation()), 
    
    // HTTP client provider
    provideHttpClient(),
    
    // Optional performance tweak
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
}).catch(err => console.error(err));

