const PROXY_CONFIG = {
    '/book-reviews/api': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            '/book-reviews/api': '',
        },
    },
};

module.exports = PROXY_CONFIG;
