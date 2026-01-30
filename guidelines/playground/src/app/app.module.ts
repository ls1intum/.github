import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import primeNGConfig from '../../.storybook/primeng.config';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    providePrimeNG(primeNGConfig)],
  bootstrap: []
})
export class AppModule { }
