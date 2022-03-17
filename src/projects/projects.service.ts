import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '.././clients/entities/client.entity';
import { Stage } from '.././stages/entities/stage.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository : Repository<Project>,
    @InjectRepository(Client)
    private readonly clientRepository : Repository<Client>,
    @InjectRepository(Stage)
    private readonly stagesRepository : Repository<Stage>,
  ) {}

  async create(createProjectDto: CreateProjectDto) : Promise<Project> {
    const client = await this.clientRepository.findOne(createProjectDto.clientId);
    if(!client){
      throw new NotFoundException(`Not found client`);
    }

    const stagesIds = createProjectDto.stagesIds;

    const stages = await this.stagesRepository.findByIds(stagesIds);
    
    const {name, shortName, hours, complete} = createProjectDto;
    const project = this.projectRepository.create({
      name,
      shortName,
      hours,
      complete,
      client,
      stages
    });
    await this.projectRepository.save(project)
    return project;
  }

  async getAll() : Promise<Project[]>{
    const found = await this.projectRepository.find();
    if(!found){
      throw new NotFoundException(`Not projects found`);
    }
    return found;
  }

  async getProjectById(id: string) : Promise<Project> {
    const found = await this.projectRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Not found project with ID "${id}"`);
    }
    return found;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) : Promise<Project> {
    const project = await this.getProjectById(id);
    this.projectRepository.merge(project, updateProjectDto)
    await this.projectRepository.save(project);
    return project;
  }

  async deleteProject(id: string): Promise<void> { 
    const result = await this.projectRepository.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`Project with ID #${id} not found`)
    }
  }
}
