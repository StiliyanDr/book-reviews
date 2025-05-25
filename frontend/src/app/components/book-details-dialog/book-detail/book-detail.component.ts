import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-book-detail',
    standalone: true,
    imports: [],
    templateUrl: './book-detail.component.html',
    styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: true }) text!: string;
}
