import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[appFundoAmarelo]',
})
export class FundoAmareloDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // console.log(this.elementRef);
    // this.elementRef.nativeElement.style.backgroundColor = 'yellow'; // forma insegura
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'yellow'
    ); // forma segura
  }
}
