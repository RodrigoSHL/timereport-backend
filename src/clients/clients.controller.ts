import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) : Promise<Client>{
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAll() : Promise<Client[]> {
    return this.clientsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Client> {
    return this.clientsService.getClientById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) : Promise<Client>  {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<void> {
    return this.clientsService.deleteClient(id);
  }
}
