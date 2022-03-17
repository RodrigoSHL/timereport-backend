import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Stage } from './entities/stage.entity';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  findAll() : Promise<Stage[]> {
    return this.stagesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Stage>  {
    return this.stagesService.getStageById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) : Promise<Stage> {
    return this.stagesService.update(id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<void>  {
    return this.stagesService.deleteStage(id);
  }
}
