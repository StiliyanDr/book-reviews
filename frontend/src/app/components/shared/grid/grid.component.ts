import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry, ColDef, RowSelectedEvent } from 'ag-grid-community';

import { GridColumn } from '../../../models/shared/grid.model';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [
        AgGridAngular,
    ],
    templateUrl: './grid.component.html',
    styleUrl: './grid.component.scss'
})
export class GridComponent<Row> implements OnInit {
    @Input() rows: Row[] = [];
    @Input() columns: GridColumn<Row>[] = [];
    @Output() rowClicked = new EventEmitter<Row>();

    columnDefinitions: ColDef[] = [];

    ngOnInit(): void {
        this.columnDefinitions = this.columns.map(column => ({
            field: column.rowProperty.toString(),
            headerName: column.displayName,
        }));
    }

    onRowSelected(event: RowSelectedEvent<Row>): void {
        this.rowClicked.emit(event.data);
    }
}
