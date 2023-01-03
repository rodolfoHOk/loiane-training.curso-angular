import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent implements OnInit, OnDestroy {
  @Input() isHorizontal?: boolean = false;

  @Input() idCursoChangeEvent?: EventEmitter<any>;

  idCursoSubscription?: Subscription;

  idCurso: string = '';

  ngOnInit(): void {
    this.idCursoSubscription = this.idCursoChangeEvent?.subscribe((event) => {
      this.idCurso = event.target.value;
    });
  }

  ngOnDestroy(): void {
    this.idCursoSubscription?.unsubscribe();
  }
}
