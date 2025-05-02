import { HttpBackend, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { StaticConfigService } from './static-config.service';
import { StaticConfig } from '../../models/config.model';
import { defaultStaticConfig } from '../../utils/testing/object-creation';

function httpResponseFor(config: StaticConfig): HttpResponse<StaticConfig> {
    return new HttpResponse<StaticConfig>({
        status: 200,
        statusText: 'OK',
        body: config
    });
}

describe('StaticConfigService', () => {
    let service: StaticConfigService;
    let httpBackendSpy: jasmine.SpyObj<HttpBackend>;

    const stubConfig: StaticConfig = defaultStaticConfig();

    beforeEach(async () => {
        const spy: jasmine.SpyObj<HttpBackend> = jasmine.createSpyObj<HttpBackend>(['handle']);

        TestBed.configureTestingModule({
            providers: [
                { provide: HttpBackend, useValue: spy }
            ]
        });

        httpBackendSpy = TestBed.inject(HttpBackend) as jasmine.SpyObj<HttpBackend>;
        service = TestBed.inject(StaticConfigService);
    });

    it('it should create', () => {
        expect(service).toBeTruthy();
    });

    it('it should have a default static config', () => {
        expect(service.config).toEqual({
            environment: 'dev',
            backendURL: 'http://localhost:8080',
            apiPrefix: '/book-reviews/api'
        });
    });

    describe('when load is called', () => {
        let result: StaticConfig | undefined;

        beforeEach(async () => {
            result = undefined;
        });

        describe('and data is loaded', () => {
            beforeEach(async () => {
                httpBackendSpy.handle.and.returnValue(
                    of(httpResponseFor(stubConfig))
                );
                result = await service.load();
            });

            it('it should load configuration', () => {
                expect(result).toEqual(stubConfig);
                expect(httpBackendSpy.handle).toHaveBeenCalled();
            });
        });

        describe('and an error occurs', () => {
            beforeEach(async () => {
                httpBackendSpy.handle.and.throwError('Network error');
                result = await service.load();
            });

            it('it should use default config', () => {
                expect(result).toEqual({
                    environment: 'dev',
                    backendURL: 'http://localhost:8080',
                    apiPrefix: '/book-reviews/api'
                });
            });
        });
    });
});
