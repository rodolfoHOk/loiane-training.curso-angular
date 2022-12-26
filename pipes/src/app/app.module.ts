import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { PipesComponent } from './pipes/pipes.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { SettingsService } from './settings.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, PipesComponent, CamelCasePipe],
  imports: [BrowserModule],
  providers: [
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'pt-BR',
    // },
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: SettingsService) =>
        settingsService.getLocale(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
