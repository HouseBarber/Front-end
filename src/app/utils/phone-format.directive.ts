import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneFormat]'
})
export class PhoneFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const rawValue = event.target.value.replace(/\D/g, '');
    const formattedValue = `(${rawValue.substring(0, 2)}) ${rawValue.substring(2, 6)}-${rawValue.substring(6, 11)}`;
    event.target.value = formattedValue;
  }

}
