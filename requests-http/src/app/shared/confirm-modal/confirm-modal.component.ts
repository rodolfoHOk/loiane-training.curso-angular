import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() cancelTxt: string = 'Cancelar';
  @Input() confirmTxt: string = 'Confirmar';

  confirmResult: Subject<boolean> = new Subject();

  constructor(public bsModalRef: BsModalRef) {}

  onClose() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult?.next(value);
    this.bsModalRef.hide();
  }
}
