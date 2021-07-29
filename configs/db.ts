import MainDb from './sql';

class DBSetup {
    static INIT_STATUS = false;

    public init(fn: any) {
        if (DBSetup.INIT_STATUS === true) return;
        MainDb.authenticate()
            .then(() => {
                console.log('Db connection established.');
            }).catch(err => {
                console.error('Unable to connect to the database: ', err);
            });
    }
}
const db = new DBSetup();
export default db;
