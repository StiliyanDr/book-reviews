import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { BooksBackendRequestService } from './backend-requests/books-backend-request.service';
import { Book, BookBackendRecord } from '../models/book.model';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private static parseBook(record: BookBackendRecord): Book {
        return {
            id: record.id,
            title: record.title,
            description: record.description,
            authors: record.authors,
            imageURL: record.image_url,
            publisher: record.publisher,
            publishedDate: record.published_date,
            categories: record.categories,
            ratingsCount: record.ratings_count,
        };
    }

    constructor(
        private readonly booksBackendRequestService: BooksBackendRequestService,
    ) {
    }

    getAllBooks(): Observable<Book[]> {
        return this.booksBackendRequestService.getAllBooks().pipe(
            map(books => books.map(BooksService.parseBook)),
        );
    }
}
