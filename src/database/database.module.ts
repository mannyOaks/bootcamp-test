import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../shared/enums';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(Config.DB_HOST),
        port: config.get<number>(Config.DB_PORT),
        username: config.get<string>(Config.DB_USER),
        password: config.get<string>(Config.DB_PASSWORD),
        database: config.get<string>(Config.DB_SCHEMA),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + './migrations/*{.ts,.js}'],
        keepConnectionAlive: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
