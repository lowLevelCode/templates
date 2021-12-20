import { join } from "path";
import { User } from "src/core/user/entities/user.entity";
import { ConnectionOptions } from "typeorm"

const connectionOptionsAdminDB: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_ADMIN_HOST,
    port: parseInt(process.env.POSTGRES_ADMIN_PORT, 10),
    username: process.env.POSTGRES_ADMIN_USERNAME,
    password: process.env.POSTGRES_ADMIN_PASSWORD,
    database: process.env.POSTGRES_ADMIN_DB,
    // entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    entities:[User],

    migrationsRun: true,
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations_typeorm',
    cli: {
        migrationsDir: join(__dirname, '../migrations')
    },

    synchronize: false,
    logging: true,
    logger: 'file',
};

export = connectionOptionsAdminDB;