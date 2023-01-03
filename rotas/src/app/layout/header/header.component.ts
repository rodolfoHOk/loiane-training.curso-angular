import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() idCurso: string = '';

  @Output() sidenavToggle = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {}

  isXSmallScreen = this.breakpointObserver.isMatched(Breakpoints.XSmall);

  onMenuClick() {
    this.sidenavToggle.emit();
  }
}
