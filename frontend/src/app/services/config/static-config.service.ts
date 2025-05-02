import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { StaticConfig } from '../../models/config.model';

const defaultStaticConfig: StaticConfig = {
    environment: 'dev',
    backendURL: 'http://localhost:8080',
    apiPrefix: '/book-reviews/api',
};

@Injectable({
    providedIn: 'root',
})
export class StaticConfigService {
    private readonly configURL: string = 'assets/app-config.json';
    private readonly client: HttpClient;
    config: StaticConfig = { ...defaultStaticConfig };

    constructor(handler: HttpBackend) {
        this.client = new HttpClient(handler);
    }

    async load(): Promise<StaticConfig> {
        try {
            this.config = {
                ...defaultStaticConfig,
                ...(await lastValueFrom<StaticConfig>(
                    this.client.get<StaticConfig>(this.configURL),
                )),
            };
        } catch {
            this.config = { ...defaultStaticConfig };
        }

        return this.config;
    }
}

export function initialiseStaticConfig(
    staticConfigService: StaticConfigService,
): () => Promise<StaticConfig> {
    return async () => staticConfigService.load();
}
