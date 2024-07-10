const app = require('./src/app');
const config = require('./src/configs/config');

const PORT = config.app.port;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server is stopped');
        process.exit(0);
    });
})