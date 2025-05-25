import { Output, Component, EventEmitter } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

import { IntegerInputComponent } from '../shared/integer-input/integer-input.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [
        MatLabel,
        MatSelect,
        MatOption,
        IntegerInputComponent,
    ],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss'
})
export class FiltersComponent {
    readonly allCategories: readonly string[] = [
        'Fiction',
        'Mystery',
        'Thriller',
        'Romance',
        'Horror',
        'Sci-fi',
        'Fantasy',
        'Biography',
        'Sports',
        'Self-help',
    ];

    @Output() titleChange = new EventEmitter<string>();
    @Output() categoriesChange = new EventEmitter<string[]>();
    @Output() authorNameChange = new EventEmitter<string>();
    @Output() publishedYearChange = new EventEmitter<number | null>();

    title: string = '';
    categories: string[] = [];
    authorName: string = '';
    publishedYear: number | null = null;

    onTitleChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.title = target.value;
        this.titleChange.emit(this.title);
    }

    onCategoryChange(categories: string[]): void {
        this.categories = categories;
        this.categoriesChange.emit(categories);
    }

    onAuthorChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.authorName = target.value;
        this.authorNameChange.emit(this.authorName);
    }

    onPublishedYearChange(year: number | null): void {
        this.publishedYear = year;
        this.publishedYearChange.emit(this.publishedYear);
    }
}
