import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { finalize } from 'rxjs';

import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { BooksGridComponent } from '../books-grid/books-grid.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        BooksGridComponent,
        FiltersComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
    readonly title: string = 'Book reviews';
    areFiltersOpened: boolean = false;
    books: Book[] = [];
    isLoadingBooks: boolean = false;
    selectedBook: Book | null = null;

    constructor(
        private readonly booksService: BooksService,
        private readonly destroyRef: DestroyRef,
        private readonly dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.loadBooks();
    }

    private loadBooks(): void {
        this.isLoadingBooks = true;
        const sub = this.booksService.getAllBooks().pipe(
            finalize(() => this.isLoadingBooks = false),
        ).subscribe(
            books => this.books = books,
        );
        this.destroyRef.onDestroy(() => sub.unsubscribe());
    }

    onToggleFilters(): void {
        this.areFiltersOpened = !this.areFiltersOpened;
    }

    onApplyFilters(): void {
        this.loadBooks();
    }

    onBookSelected(book: Book): void {
        this.selectedBook = book;
    }

    openBookDetailsDialog(): void {
        if (this.selectedBook !== null) {
            this.dialog.open(BookDetailsDialogComponent, {
                data: this.selectedBook,
            });
        }
    }
}
