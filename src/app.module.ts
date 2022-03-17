import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { StagesModule } from './stages/stages.module';
import * as dotenv from 'dotenv'

dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: true

  }), ProjectsModule, ClientsModule, StagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
