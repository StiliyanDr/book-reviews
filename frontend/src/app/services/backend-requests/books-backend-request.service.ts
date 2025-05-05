import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BackendRequestService } from './backend-request.service';
import { BookBackendRecord } from '../../models/book.model';

@Injectable({
    providedIn: 'root',
})
export class BooksBackendRequestService {
    constructor(
        private readonly backendRequestService: BackendRequestService,
    ) {
    }

    getAllBooks(): Observable<BookBackendRecord[]> {
        return this.backendRequestService.get<BookBackendRecord[]>(
            'book',
        );
    }
}
