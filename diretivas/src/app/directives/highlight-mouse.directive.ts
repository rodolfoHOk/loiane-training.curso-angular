/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Directive,
  HostListener,
  // ElementRef,
  // Renderer2,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]',
})
export class HighlightMouseDirective {
  // sem HostBinding
  // constructor(
  //   private elementRef: ElementRef,
  //   private renderer: Renderer2
  // ) {}

  // @HostBinding('style.backgroundColor')
  // backgroundColor!: string;

  private backgroundColor!: string; // necessário junto com a forma de código abaixo

  @HostBinding('style.backgroundColor')
  get setColor() {
    // código extra // quando precisar usar está forma
    return this.backgroundColor;
  }

  @HostBinding('style.color')
  color!: string;

  @HostListener('mouseenter')
  onMouseOver() {
    // sem HostBinding
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'backgroundColor',
    //   'yellow'
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    this.backgroundColor = 'yellow';
    this.color = 'black';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // sem HostBinding
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'backgroundColor',
    //   'transparent'
    // );
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    this.backgroundColor = 'transparent';
    this.color = 'white';
  }
}
