import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGridComponent } from './books-grid.component';
import { GridComponent } from '../shared/grid/grid.component';

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
            { headerName: 'Title', field: 'title', valueFormatter: GridComponent.defaultFormatter },
            { headerName: 'Authors', field: 'authors', valueFormatter: GridComponent.defaultFormatter },
            { headerName: 'Published Date', field: 'publishedDate', valueFormatter: GridComponent.defaultFormatter },
            { headerName: 'Categories', field: 'categories', valueFormatter: GridComponent.defaultFormatter },
            { headerName: 'Description', field: 'description', valueFormatter: GridComponent.defaultFormatter },
        ]);
    });
});
