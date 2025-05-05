export interface GridColumn<Row> {
    displayName: string;
    rowProperty: keyof Row;
    formatter?: <T>(params: { value: T }) => string;
}
