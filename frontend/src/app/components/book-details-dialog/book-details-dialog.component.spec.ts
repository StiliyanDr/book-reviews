import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BookDetailsDialogComponent } from './book-details-dialog.component';
import { defaultBooks } from '../../utils/testing/object-creation';

describe('BookDetailsDialogComponent', () => {
    let component: BookDetailsDialogComponent;
    let fixture: ComponentFixture<BookDetailsDialogComponent>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<BookDetailsDialogComponent>>;

    const book = defaultBooks()[0];

    beforeEach(async () => {
        dialogRef = jasmine.createSpyObj<MatDialogRef<BookDetailsDialogComponent>>(['close']);

        await TestBed.configureTestingModule({
            imports: [BookDetailsDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: book,
                },
                {
                    provide: MatDialogRef,
                    useValue: dialogRef,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BookDetailsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onClose', () => {
        beforeEach(() => {
            component.onClose();
        });

        it('it closes the dialog', () => {
            expect(dialogRef.close).toHaveBeenCalled();
        });
    });
});
