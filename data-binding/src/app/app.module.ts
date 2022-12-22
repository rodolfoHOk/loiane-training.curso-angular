import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MeuFormModule } from './meu-form/meu-form.module';

@NgModule({
  declarations: [AppComponent, DataBindingComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, MeuFormModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
