import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Stage } from './entities/stage.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository : Repository<Stage>
  ) {}
  
  async create(createStageDto: CreateStageDto) : Promise<Stage>{
    const {name} = createStageDto;

    const stage = this.stageRepository.create({
      name
    })

    await this.stageRepository.save(stage);
    return stage;
  }

  async getAll() : Promise<Stage[]>{
    const found = await this.stageRepository.find();
    if(!found){
      throw new NotFoundException(`Not stages found`);
    }
    return found;
  }

  async getStageById(id: string) : Promise<Stage> {
    const found = await this.stageRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Not found stage with ID "${id}"`);
    }
    return found;
  }

  async update(id: string, updateStageDto: UpdateStageDto) : Promise<Stage> {
    const stage = await this.getStageById(id);
    this.stageRepository.merge(stage, updateStageDto)
    await this.stageRepository.save(stage);
    return stage;
  }

  async deleteStage(id: string): Promise<void> { 
    const result = await this.stageRepository.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`Stage with ID #${id} not found`)
    }
  }
}
