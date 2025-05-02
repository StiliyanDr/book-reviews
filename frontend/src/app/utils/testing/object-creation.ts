import { StaticConfig } from '../../models/config.model';

export function defaultStaticConfig(): StaticConfig {
    return {
        environment: 'qa',
        backendURL: 'http://localhost:8000',
        apiPrefix: '/test/api',
    };
}
