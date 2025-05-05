import { TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { BackendRequestService } from './backend-request.service';
import { BooksBackendRequestService } from './books-backend-request.service';
import { BookBackendRecord } from '../../models/book.model';
import { defaultBookBackendRecords } from '../../utils/testing/object-creation';

describe('BooksBackendRequestService', () => {
    let service: BooksBackendRequestService;
    let backendRequestService: jasmine.SpyObj<BackendRequestService>;
    let booksSubject: Subject<BookBackendRecord[]>;

    beforeEach(async () => {
        booksSubject = new Subject<BookBackendRecord[]>();
        backendRequestService = jasmine.createSpyObj<BackendRequestService>(['get']);

        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: BackendRequestService,
                    useValue: backendRequestService,
                },
            ],
        }).compileComponents();

        service = TestBed.inject(BooksBackendRequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('when getAllBooks is called', () => {
        let result: BookBackendRecord[] | undefined;
        const expected = defaultBookBackendRecords();

        beforeEach(() => {
            backendRequestService.get.and.returnValue(booksSubject.asObservable());
            service.getAllBooks().subscribe(
                (res) => result = res,
            );
            booksSubject.next(expected);
        });

        it('it should call get on backend request service', () => {
            expect(backendRequestService.get).toHaveBeenCalledWith('book');
        });

        it('it should return books', () => {
            expect(result).toEqual(expected);
        });
    });
});
