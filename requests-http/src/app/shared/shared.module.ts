import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { FieldErrorMsgComponent } from './field-error-msg/field-error-msg.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    FieldErrorMsgComponent,
    ConfirmModalComponent,
  ],
  imports: [CommonModule],
  exports: [AlertModalComponent, FieldErrorMsgComponent, ConfirmModalComponent],
})
export class SharedModule {}
