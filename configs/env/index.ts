class EnvConfig {
    dbConfig: { dialect: string; connectionString: string; logging: boolean };
    app_config: any;
    constructor() {
        this.app_config = JSON.parse("{\"db_user\":\"root\",\"db_password\":\"Qwerty@123\",\"db_connection_string\":\"127.0.0.1\",\"db_name\":\"spak_task_assignment\"}");
        this.initDbConfig();
        console.log('DbConfig: ', this.dbConfig);
    }

    public initDbConfig() {
        let connectionString = `mysql://${this.app_config.db_user}:${this.app_config.db_password}@${this.app_config.db_connection_string}/${this.app_config.db_name}`;
        console.log('Connection string:', connectionString);
        this.dbConfig = {
            dialect: 'mysql',
            connectionString: connectionString,
            logging: false,
        };
    }
}

const Config = new EnvConfig();
module.exports = Config;