import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

const secretCode = 'admin';

@Directive({
  selector: '[ncAdmin]'
})
export class AdminDirective {
  @Output()
  private ncAdmin = new EventEmitter<void>();

  private sequence: string[] = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key) {
      this.sequence.push(event.key);

      if (this.sequence.length > secretCode.length) {
        this.sequence.shift();
      }

      if (this.sequence.join('') === secretCode) {
        this.ncAdmin.emit();
      }
    }
  }
}
