import { TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { BooksBackendRequestService } from './backend-requests/books-backend-request.service';
import { BooksService } from './books.service';
import { Book, BookBackendRecord } from '../models/book.model';
import { defaultBookBackendRecords, defaultBooks } from '../utils/testing/object-creation';

describe('BooksService', () => {
    let service: BooksService;
    let backendService: jasmine.SpyObj<BooksBackendRequestService>;
    let booksSubject: Subject<BookBackendRecord[]>;

    beforeEach(async () => {
        booksSubject = new Subject<BookBackendRecord[]>();
        backendService = jasmine.createSpyObj<BooksBackendRequestService>({
            getAllBooks: booksSubject.asObservable(),
        });

        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: BooksBackendRequestService,
                    useValue: backendService,
                },
            ],
        });

        service = TestBed.inject(BooksService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('when getAllBooks is called', () => {
        let result: Book[] | undefined;
        const rawBooks = defaultBookBackendRecords();
        const expected = defaultBooks();

        beforeEach(() => {
            service.getAllBooks().subscribe(
                (res) => result = res,
            );
            booksSubject.next(rawBooks);
            booksSubject.complete();
        });

        it('it should call get all books on backend service', () => {
            expect(backendService.getAllBooks).toHaveBeenCalled();
        });

        it('it should return books', () => {
            expect(result).toEqual(expected);
        });
    });
});
