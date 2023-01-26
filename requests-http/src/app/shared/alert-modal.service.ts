import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(
    title: string,
    message: string,
    cancelTxt?: string,
    confirmTxt?: string
  ): Subject<boolean> {
    let bsModalRef: BsModalRef<ConfirmModalComponent> = this.modalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content!.title = title;
    bsModalRef.content!.message = message;
    bsModalRef.content!.cancelTxt = cancelTxt ? cancelTxt : 'Cancelar';
    bsModalRef.content!.confirmTxt = confirmTxt ? confirmTxt : 'Confirmar';

    return (<ConfirmModalComponent>bsModalRef.content!).confirmResult;
  }

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    let bsModalRef: BsModalRef<AlertModalComponent> =
      this.modalService.show(AlertModalComponent);
    bsModalRef.content!.type = type;
    bsModalRef.content!.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }
}
