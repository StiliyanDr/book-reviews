import { DestroyRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { MainComponent } from './main.component';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { defaultBooks } from '../../utils/testing/object-creation';


describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let booksSubject: Subject<Book[]>;
    let booksService: jasmine.SpyObj<BooksService>;
    let destroyRef: jasmine.SpyObj<DestroyRef>;
    let matDialog: jasmine.SpyObj<MatDialog>;

    const books = defaultBooks();

    beforeEach(async () => {
        booksSubject = new Subject<Book[]>();
        booksService = jasmine.createSpyObj<BooksService>({
            getAllBooks: booksSubject.asObservable(),
        });
        matDialog = jasmine.createSpyObj<MatDialog>(['open']);
        destroyRef = jasmine.createSpyObj<DestroyRef>(['onDestroy']);

        await TestBed.configureTestingModule({
            imports: [MainComponent],
            providers: [
                {
                    provide: BooksService,
                    useValue: booksService,
                },
                {
                    provide: DestroyRef,
                    useValue: destroyRef,
                },
                {
                    provide: MatDialog,
                    useValue: matDialog,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('it should create', () => {
        expect(component).toBeTruthy();
    });

    it('it should have the correct title', () => {
        expect(component.title).toEqual('Book reviews');
    });

    it('it should have the filters closed by default', () => {
        expect(component.areFiltersOpened).toBeFalse();
    });

    it('it should have no books by default', () => {
        expect(component.books).toEqual([]);
    });

    describe('when created', () => {
        it('it starts loading books', () => {
            expect(component.isLoadingBooks).toBeTrue();
            expect(booksService.getAllBooks).toHaveBeenCalled();
        });

        describe('and the books arrive', () => {
            beforeEach(() => {
                booksSubject.next(books);
                booksSubject.complete();
            });

            it('it stops loading books', () => {
                expect(component.isLoadingBooks).toBeFalse();
            });

            it('it sets the books property', () => {
                expect(component.books).toEqual(books);
            });

            describe('and apply filters is then clicked', () => {
                beforeEach(() => {
                    component.onApplyFilters();
                    fixture.detectChanges();
                });

                it('it reloads the books', () => {
                    expect(booksService.getAllBooks).toHaveBeenCalledTimes(2);
                });
            });
        });
    });

    describe('selecting a book', () => {
        beforeEach(() => {
            booksSubject.next(books);
            booksSubject.complete();
            fixture.detectChanges();
        });

        it('it has no selection by default', () => {
            expect(component.selectedBook).toBeNull();
        });

        describe('when a book is selected', () => {
            const book = books[0];

            beforeEach(() => {
                component.onBookSelected(book);
            });

            it('it sets the selected book', () => {
                expect(component.selectedBook).toEqual(book);
            });
        });
    });

    describe('opening the book details dialog', () => {
        beforeEach(() => {
            booksSubject.next(books);
            booksSubject.complete();
            fixture.detectChanges();
        });

        describe('when no book is selected', () => {
            beforeEach(() => {
                component.selectedBook = null;
                component.openBookDetailsDialog();
            });

            it('it does nothing', () => {
                expect(matDialog.open).not.toHaveBeenCalled();
            });
        });

        describe('when a book is selected', () => {
            beforeEach(() => {
                component.selectedBook = books[0];
                component.openBookDetailsDialog();
            });

            it('it opens the dialog', () => {
                expect(matDialog.open).toHaveBeenCalled();
            });
        });
    });
});
