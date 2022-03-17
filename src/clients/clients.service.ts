import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository : Repository<Client>
  ) {}

  async createClient(createClientDto: CreateClientDto) : Promise<Client>{
    const {name, shortName, active} = createClientDto;

    const client = this.clientRepository.create({
      name,
      shortName,
      active
    })

    const response = await this.clientRepository.save(client)
    return response;
  }

  async getAll() : Promise<Client[]>{
    const found = await this.clientRepository.find();
    if(!found){
      throw new NotFoundException(`Not clients found`);
    }
    return found;
  }

  async getClientById(id: string) : Promise<Client> {
    const found = await this.clientRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Not found client with ID "${id}"`);
    }
    return found;
  }

  async update(id: string, updateClientDto: UpdateClientDto) : Promise<Client> {
    const project = await this.getClientById(id);
    this.clientRepository.merge(project, updateClientDto)
    await this.clientRepository.save(project);
    return project;
  }

  async deleteClient(id: string): Promise<void> { 
    const result = await this.clientRepository.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`Client with ID #${id} not found`)
    }
  }
}
