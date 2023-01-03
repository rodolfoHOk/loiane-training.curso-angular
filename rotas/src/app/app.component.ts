import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showFiller = false;

  @Output() idCursoChangeEvent = new EventEmitter();

  onIdCursoChange(event: Event) {
    this.idCursoChangeEvent.emit(event);
  }
}
