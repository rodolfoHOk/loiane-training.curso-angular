import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiretivaNgifComponent } from './diretiva-ngif/diretiva-ngif.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { TestExternalLibsComponent } from './test-external-libs/test-external-libs.component';

@NgModule({
  declarations: [
    AppComponent,
    DiretivaNgifComponent,
    TestExternalLibsComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatExpansionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
