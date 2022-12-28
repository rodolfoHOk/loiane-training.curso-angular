import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {}

  isXSmallScreen = this.breakpointObserver.isMatched(Breakpoints.XSmall);

  onMenuClick() {
    this.sidenavToggle.emit();
  }
}
