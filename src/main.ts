import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- 1. Import this

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    // Your existing router fix for GitHub Pages
    provideRouter(routes, withHashLocation()), 
    
    // <-- 2. Add the HttpClient provider here
    provideHttpClient(),
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(routes),
  ]
}).catch(err => console.error(err));
