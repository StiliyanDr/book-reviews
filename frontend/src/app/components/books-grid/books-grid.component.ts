import { Component } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';

import { Book } from '../../models/book.model';
import { GridColumn } from '../../models/shared/grid.model';
import { GridComponent } from '../shared/grid/grid.component';

const BOOK_COLUMNS: GridColumn<Book>[] = [
    { displayName: 'Title', rowProperty: 'title' },
    { displayName: 'Authors', rowProperty: 'authors' },
    { displayName: 'Published Date', rowProperty: 'publishedDate' },
    { displayName: 'Categories', rowProperty: 'categories' },
    { displayName: 'Description', rowProperty: 'description' },
];

@Component({
    selector: 'app-books-grid',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: '../shared/grid/grid.component.html',
    styleUrl: './books-grid.component.scss'
})
export class BooksGridComponent extends GridComponent<Book> {
    override columns = BOOK_COLUMNS;
}
