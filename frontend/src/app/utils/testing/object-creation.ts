import { Book, BookBackendRecord } from '../../models/book.model';
import { StaticConfig } from '../../models/config.model';

export function defaultStaticConfig(): StaticConfig {
    return {
        environment: 'qa',
        backendURL: 'http://localhost:8000',
        apiPrefix: '/test/api',
    };
}

export function defaultBookBackendRecords(): BookBackendRecord[] {
    return [
        {
            id: '1',
            title: 'The Catcher in the Rye',
            description: 'A book about a boy',
            authors: ['J.D. Salinger'],
            image_url: 'https://...',
            publisher: 'Penguin',
            published_date: '1951',
            categories: ['Fiction'],
            ratings_count: 1000,
        },
        {
            id: '2',
            title: 'The Great Gatsby',
            description: 'A book about a man',
            authors: ['F. Scott Fitzgerald'],
            image_url: 'https://...',
            publisher: 'Penguin',
            published_date: '1925',
            categories: ['Fiction'],
            ratings_count: 2000,
        },
    ];
}

export function defaultBooks(): Book[] {
    return [
        {
            id: '1',
            title: 'The Catcher in the Rye',
            description: 'A book about a boy',
            authors: ['J.D. Salinger'],
            imageURL: 'https://...',
            publisher: 'Penguin',
            publishedDate: '1951',
            categories: ['Fiction'],
            ratingsCount: 1000,
        },
        {
            id: '2',
            title: 'The Great Gatsby',
            description: 'A book about a man',
            authors: ['F. Scott Fitzgerald'],
            imageURL: 'https://...',
            publisher: 'Penguin',
            publishedDate: '1925',
            categories: ['Fiction'],
            ratingsCount: 2000,
        },
    ];
}
