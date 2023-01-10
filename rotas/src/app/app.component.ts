import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showFiller = false;

  mostrarMenu: boolean = false;

  @Output() idCursoChangeEvent = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      (mostrar) => (this.mostrarMenu = mostrar)
    );
  }

  onIdCursoChange(event: Event) {
    this.idCursoChangeEvent.emit(event);
  }
}
