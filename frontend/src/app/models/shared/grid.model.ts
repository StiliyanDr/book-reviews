export interface GridColumn<Row> {
    displayName: string;
    rowProperty: keyof Row;
}
