import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input('appHighlight') highlightColor = 'yellow'; // mesmo nome da diretiva

  @Input() defaultTextColor = 'white';
  @Input() highlightTextColor = 'black';

  @HostBinding('style.backgroundColor')
  backgroundColor!: string;

  @HostBinding('style.color')
  color!: string;

  @HostListener('mouseenter')
  onMouseOver() {
    this.backgroundColor = this.highlightColor;
    this.color = this.highlightTextColor;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = this.defaultColor;
    this.color = this.defaultTextColor;
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    this.color = this.defaultTextColor;
  }
}
