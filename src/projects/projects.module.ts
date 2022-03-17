import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Client } from '../clients/entities/client.entity';
import { Stage } from '../stages/entities/stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Client, Stage])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
