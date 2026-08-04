import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen = <boolean>false;

  @Input() title: string = '';

  @Input() maxWidth: string = '500px';

  @Input() minWidth: string = '300px';

  @Input() disabled: boolean = false;

  @Input() buttonText: string = '';

  @Output() close = new EventEmitter<void>();

  @Output() done = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onDone(): void {
    this.done.emit();
  }
}
