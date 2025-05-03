import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { BackendRequestService, HTTPParams } from './backend-request.service';
import { defaultStaticConfig } from '../../utils/testing/object-creation';
import { StaticConfigService } from '../config/static-config.service';

describe('BackendRequestService', () => {
    let service: BackendRequestService;
    let staticConfigService: jasmine.SpyObj<StaticConfigService>;
    let httpClient: jasmine.SpyObj<HttpClient>;
    let getSubject: Subject<string>;
    let postSubject: Subject<string>;
    let putSubject: Subject<string>;
    let patchSubject: Subject<string>;

    const endpoint: string = 'some/endpoint';

    beforeEach(() => {
        getSubject = new Subject();
        postSubject = new Subject();
        putSubject = new Subject();
        patchSubject = new Subject();
        staticConfigService = jasmine.createSpyObj<StaticConfigService>(['config']);
        staticConfigService.config = defaultStaticConfig();
        httpClient = jasmine.createSpyObj<HttpClient>({
            get: getSubject.asObservable(),
            post: postSubject.asObservable(),
            put: putSubject.asObservable(),
            patch: patchSubject.asObservable(),
        });

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: StaticConfigService,
                    useValue: staticConfigService,
                },
                {
                    provide: HttpClient,
                    useValue: httpClient,
                },
            ],
        });

        service = TestBed.inject(BackendRequestService);
    });

    it('it should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('when get is called', () => {
        let result: string | undefined;
        const expected: string = 'test';
        const params: HTTPParams = { myPram: 'p' };

        beforeEach(() => {
            service.get<string>(endpoint, params).subscribe(
                (res) => result = res,
            );
            getSubject.next(expected);
        });

        it('it should call get on http client', () => {
            expect(httpClient.get).toHaveBeenCalledWith(
                `http://localhost:8000/test/api/${endpoint}`,
                {
                    params
                },
            );
        });

        it('it should return the result', () => {
            expect(result).toEqual(expected);
        });
    });

    describe('when post is called', () => {
        let result: string | undefined;
        const expected: string = 'test';
        const body = { value: 'v' };

        beforeEach(() => {
            service.post<string>(endpoint, body).subscribe(
                (res) => result = res,
            );
            postSubject.next(expected);
        });

        it('it should call post on http client', () => {
            expect(httpClient.post).toHaveBeenCalledWith(
                `http://localhost:8000/test/api/${endpoint}`,
                body,
            );
        });

        it('it should return the result', () => {
            expect(result).toEqual(expected);
        });
    });

    describe('when put is called', () => {
        let result: string | undefined;
        const expected: string = 'test';
        const body = { value: 'v' };
        const params: HTTPParams = { myPram: 'p' };

        beforeEach(() => {
            service.put<string>(endpoint, body, params).subscribe(
                (res) => result = res,
            );
            putSubject.next(expected);
        });

        it('it should call put on http client', () => {
            expect(httpClient.put).toHaveBeenCalledWith(
                `http://localhost:8000/test/api/${endpoint}`,
                body,
                { params },
            );
        });

        it('it should return the result', () => {
            expect(result).toEqual(expected);
        });
    });

    describe('when patch is called', () => {
        let result: string | undefined;
        const expected: string = 'test';
        const body = { value: 'v' };
        const params: HTTPParams = { myPram: 'p' };

        beforeEach(() => {
            service.patch<string>(endpoint, body, params).subscribe(
                (res) => result = res,
            );
            patchSubject.next(expected);
        });

        it('it should call patch on http client', () => {
            expect(httpClient.patch).toHaveBeenCalledWith(
                `http://localhost:8000/test/api/${endpoint}`,
                body,
                { params },
            );
        });

        it('it should return the result', () => {
            expect(result).toEqual(expected);
        });
    });
});
