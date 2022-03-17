import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ClientsModule } from './../src/clients/clients.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './../src/clients/entities/client.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
    const mockClientRepository = {
        create: jest.fn().mockImplementation((dto) => dto),
        save: jest.fn()
              .mockImplementation((user) =>
              Promise.resolve({id:'1', ...user}),
              ),
    }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(getRepositoryToken(Client))
    .useValue(mockClientRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/clients/d662da22-473c-4538-969e-9441f6b4977b')
      .expect(200)
      .then((res) => {
          console.log(res.body)
      });
  });

    it('should create a new task', () => {
        return request(app.getHttpServer())
        .post('/clients')
        .send({name:"testing",shortName:"TTS",active:true})
        .expect(201)
        .then(response => {
            expect(response.body).toEqual({
                id: expect.any(String),
                name: "testing",
                shortName: "TTS",
                active: true
            })
        });
    });

});