import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { FieldErrorMsgComponent } from './field-error-msg/field-error-msg.component';

@NgModule({
  declarations: [AlertModalComponent, FieldErrorMsgComponent],
  imports: [CommonModule],
  exports: [AlertModalComponent, FieldErrorMsgComponent],
})
export class SharedModule {}
