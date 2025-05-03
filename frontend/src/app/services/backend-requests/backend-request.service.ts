import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { StaticConfig } from '../../models/config.model';
import { StaticConfigService } from '../config/static-config.service';

type Atom = string | number | boolean;

export type HTTPParams = HttpParams | {
    [key: string]: Atom | readonly Atom[];
};

@Injectable({
    providedIn: 'root',
})
export class BackendRequestService {
    private readonly staticConfig: StaticConfig;

    constructor(
        private readonly httpClient: HttpClient,
        staticConfigService: StaticConfigService,
    ) {
        this.staticConfig = staticConfigService.config;
    }

    get<T>(endpoint: string, queryParams: HTTPParams = {}): Observable<T> {
        return this.httpClient.get<T>(
            this.buildURL(endpoint),
            {
                params: queryParams,
            },
        );
    }

    private buildURL(endpoint: string): string {
        return `${this.staticConfig.backendURL}${this.staticConfig.apiPrefix}/${endpoint}`;
    }

    post<T>(endpoint: string, body: unknown | null): Observable<T> {
        return this.httpClient.post<T>(
            this.buildURL(endpoint),
            body,
        );
    }

    put<T>(endpoint: string, body: unknown | null, params: HTTPParams = {}): Observable<T> {
        return this.httpClient.put<T>(
            this.buildURL(endpoint),
            body,
            { params },
        );
    }

    patch<T>(endpoint: string, body: unknown | null, params: HTTPParams = {}): Observable<T> {
        return this.httpClient.patch<T>(
            this.buildURL(endpoint),
            body,
            {
                params,
            },
        );
    }
}
