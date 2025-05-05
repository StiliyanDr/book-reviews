export interface BookBackendRecord {
    id: string;
    title: string;
    description: string | null;
    authors: string[];
    image_url: string | null;
    publisher: string | null;
    published_date: string | null;
    categories: string[];
    ratings_count: number | null;
}

export interface Book {
    id: string;
    title: string;
    description: string | null;
    authors: string[];
    imageURL: string | null;
    publisher: string | null;
    publishedDate: string | null;
    categories: string[];
    ratingsCount: number | null;
}
