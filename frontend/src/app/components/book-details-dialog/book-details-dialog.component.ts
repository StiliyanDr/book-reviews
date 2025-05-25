import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { Book } from '../../models/book.model';

@Component({
    selector: 'app-book-details-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        BookDetailComponent
    ],
    templateUrl: './book-details-dialog.component.html',
    styleUrl: './book-details-dialog.component.scss'
})
export class BookDetailsDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly book: Book,
        private readonly dialogRef: MatDialogRef<BookDetailsDialogComponent>,
    ) {
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
