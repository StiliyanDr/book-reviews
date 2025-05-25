import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
    static toCommaSeparatedListIfArray<T>(params: { value: T }): string {
        return Array.isArray(params.value) ?
            params.value.join(', ') : String(params.value);
    }

    static defaultFormatter<T>(params: { value: T }): string {
        const result = params.value ?? '';
        return GridComponent.toCommaSeparatedListIfArray({ value: result });
    }

    @Input() rows: Row[] = [];
    @Input() columns: GridColumn<Row>[] = [];
    @Input() isLoading: boolean = false;
    @Output() rowSelected = new EventEmitter<Row>();

    @ViewChild('grid') grid?: AgGridAngular;

    columnDefinitions: ColDef[] = [];

    ngOnInit(): void {
        this.columnDefinitions = this.columns.map(column => ({
            field: column.rowProperty.toString(),
            headerName: column.displayName,
            valueFormatter: column.formatter ?? GridComponent.defaultFormatter,
        }));
    }

    onRowSelected(event: RowSelectedEvent<Row>): void {
        this.rowSelected.emit(event.data);
    }
}
