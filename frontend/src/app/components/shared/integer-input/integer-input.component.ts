import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-integer-input',
    standalone: true,
    imports: [
        MatLabel,
        MatInputModule,
        CommonModule,
    ],
    templateUrl: './integer-input.component.html',
    styleUrl: './integer-input.component.scss'
})
export class IntegerInputComponent {
    private static readonly INTEGER_PATTERN = /^[0-9]+$/;

    @Input({ required: true }) label!: string;
    @Input() value: number | null = null;
    @Input() placeholder: string = '';
    @Output() valueChange = new EventEmitter<number | null>();

    isValid: boolean = true;

    onValueChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        this.isValid = true;

        if (inputValue === '' || inputValue === null) {
            this.value = null;
        } else if (IntegerInputComponent.INTEGER_PATTERN.test(inputValue)) {
            this.value = parseInt(inputValue);
        } else {
            this.value = null;
            this.isValid = false;
        }

        this.valueChange.emit(this.value);
    }
}
