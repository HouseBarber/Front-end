import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCNPJFormat]'
})
export class CnpjFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const rawValue = event.target.value.replace(/\D/g, '');
    const cnpjFormatted = `${rawValue.substring(0, 2)}.${rawValue.substring(2, 5)}.${rawValue.substring(5, 8)}/${rawValue.substring(8, 12)}-${rawValue.substring(12)}`;
    event.target.value = cnpjFormatted;
  }

}
