import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { PipesComponent } from './pipes/pipes.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { SettingsService } from './settings.service';
import { FiltroArrayPipe } from './pipes/filtro-array.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroArrayImpuroPipe } from './pipes/filtro-array-impuro.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, PipesComponent, CamelCasePipe, FiltroArrayPipe, FiltroArrayImpuroPipe],
  imports: [BrowserModule, FormsModule],
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
