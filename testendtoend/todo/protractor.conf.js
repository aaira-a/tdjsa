exports.config = {
    directConnect: true,

    baseUrl: 'http://localhost:' + (process.env.PORT || 3030),

    framework: 'mocha',

    mochaOpts: {
        reporter: 'dot',
        timeout: 10000,
    },

    specs: ['test/integration/*.js'],
};
