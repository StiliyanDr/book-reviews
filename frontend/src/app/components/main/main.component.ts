import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {
    readonly title: string = 'Book reviews';
    areFiltersOpened: boolean = false;

    onToggleFilters(): void {
        this.areFiltersOpened = !this.areFiltersOpened;
    }

    onApplyFilters(): void {
        this.areFiltersOpened = false;
    }
}
