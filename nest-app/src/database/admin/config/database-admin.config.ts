import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from 'src/core/user/entities/user.entity';

function typeormModuleOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_ADMIN_HOST,
    port: parseInt(process.env.POSTGRES_ADMIN_PORT, 10),
    username: process.env.POSTGRES_ADMIN_USERNAME,
    password: process.env.POSTGRES_ADMIN_PASSWORD,
    database: process.env.POSTGRES_ADMIN_DB,
    // entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
    entities:[User],
    autoLoadEntities:true,

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
}

export default registerAs('database-admin', () => ({
  config: typeormModuleOptions()
}));