import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientsService } from '../clients.service';
import { Client } from '../entities/client.entity';
import { Repository } from 'typeorm';
import { response } from 'express';

import * as reqClientFail from '../test/data/dataClientFail.json';
import * as reqClients from '../test/data/dataClients.json';

import * as req from '../test/data/dataClient.json'
import { NotFoundException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;
  
  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, {
        provide: getRepositoryToken(Client),
        useValue: mockTaskRepository
      }],
    }).compile();
    service = module.get<ClientsService>(ClientsService);
    repository = module.get(getRepositoryToken(Client));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

