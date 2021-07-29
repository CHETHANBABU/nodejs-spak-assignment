let PORT = (process.env.environment === 'dev') ? 3001 : 80;
if (process.env.environment == 'prd') {
    PORT = 80
}
console.log(`INFO: using fallback port ${PORT}`);

// load modules
import App from "./configs/express";

App.listen(+PORT, function () {
    console.log('App ready!');
});

process.on('SIGTERM', () => endServer);

process.on('SIGINT', () => endServer);

function endServer() {
    console.info('SIGTERM signal received.');
    console.log('Closing server.');
    App.close();
}

// re-export app instance for testing purpose
module.exports = App;