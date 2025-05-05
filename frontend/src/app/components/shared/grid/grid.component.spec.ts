import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AgGridAngular } from 'ag-grid-angular';
import { RowSelectedEvent } from 'ag-grid-community';
import { MockComponent } from 'ng-mocks';

import { GridComponent } from './grid.component';
import { GridColumn } from '../../../models/shared/grid.model';

interface TestRow {
    stringAttribute: string;
    numberAttribute: number;
}

@Component({
    selector: 'app-test-grid',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './grid.component.html',
})
class TestGridComponent extends GridComponent<TestRow> {
    override columns: GridColumn<TestRow>[] = [
        { displayName: 'String Attribute', rowProperty: 'stringAttribute' },
        { displayName: 'Number Attribute', rowProperty: 'numberAttribute' },
    ];
}

describe('GridComponent', () => {
    let component: TestGridComponent;
    let fixture: ComponentFixture<TestGridComponent>;
    let actualGrid: AgGridAngular | undefined;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestGridComponent]
        }).overrideComponent(TestGridComponent, {
            remove: {
                imports: [AgGridAngular],
            },
            add: {
                imports: [MockComponent(AgGridAngular)],
            },
        }).compileComponents();

        fixture = TestBed.createComponent(TestGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        actualGrid = fixture.debugElement.query(By.directive(AgGridAngular)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('it displays the grid without data', () => {
        expect(actualGrid).toBeTruthy();
        expect(actualGrid?.rowData).toEqual([]);
    });

    it('it has the correct column definitions', () => {
        expect(component.columnDefinitions).toEqual([
            { field: 'stringAttribute', headerName: 'String Attribute' },
            { field: 'numberAttribute', headerName: 'Number Attribute' },
        ]);
    });

    describe('when rows are updated', () => {
        const rows: TestRow[] = [
            { stringAttribute: 'one', numberAttribute: 1 },
            { stringAttribute: 'two', numberAttribute: 2 },
        ];

        beforeEach(() => {
            component.rows = rows;
            fixture.detectChanges();
        });

        it('it displays the grid with data', () => {
            expect(actualGrid?.rowData).toEqual(rows);
        });

        describe('when a row is selected', () => {
            let emitSpy: jasmine.Spy;
            const selectedRow = rows[0];

            beforeEach(() => {
                emitSpy = spyOn(component.rowSelected, 'emit');
                component.onRowSelected({ data: selectedRow } as RowSelectedEvent<TestRow>);
            });

            it('it emits the row', () => {
                expect(emitSpy).toHaveBeenCalledOnceWith(selectedRow);
            });
        });
    });
});
