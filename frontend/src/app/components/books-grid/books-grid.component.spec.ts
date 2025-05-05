import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGridComponent } from './books-grid.component';

describe('BooksGridComponent', () => {
    let component: BooksGridComponent;
    let fixture: ComponentFixture<BooksGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BooksGridComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BooksGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('it should have the correct column definitions', () => {
        expect(component.columnDefinitions).toEqual([
            { headerName: 'Title', field: 'title' },
            { headerName: 'Authors', field: 'authors' },
            { headerName: 'Published Date', field: 'publishedDate' },
            { headerName: 'Categories', field: 'categories' },
            { headerName: 'Description', field: 'description' },
        ]);
    });
});
