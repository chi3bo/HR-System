import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEnterKeyFocus]'
})
export class EnterKeyFocusDirective {

  constructor(private myElement: ElementRef) { }
  @HostListener('keydown', ['$event']) onkeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const allInputs = Array.from(this.myElement.nativeElement.form.elements)
      const currentInput: number = allInputs.indexOf(this.myElement.nativeElement)
      let nextInput: HTMLElement = allInputs[currentInput + 1] as HTMLElement
      if (!nextInput.hasAttribute('disabled')) {
        nextInput.focus()
      }
      else {
        let nextInput: HTMLElement = allInputs[currentInput + 2] as HTMLElement
        nextInput.focus()
      }
    }

  }
}
