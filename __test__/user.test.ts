import request from 'supertest';
import app from '../src/app';
import { faker } from '@faker-js/faker';
import { userController } from '../src/controllers/user.controller';
import { sequelize } from '../src/config/db';
import User from '../src/models/user.model';

describe('API tests for user', () => {
  let userData: any;

  beforeAll(async () => {
    userData = {
      name: faker.person.fullName(),
      email: 'kalaunidipak5@gmail.com',
      phone: faker.phone.number(),
    };

    sequelize.addModels([User]);
    await sequelize.sync({ force: true });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .field('name', userData.name)
      .field('email', userData.email)
      .field('phone', userData.phone)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('newUser')
    expect(res.body.message).toBe('New user created.')
  });

  it('should fail to create user, email already in use', async () => {
       await User.create(userData);
       
       const res = await request(app).post('/api/users').field('name', userData.name).field('email', userData.email).field('phone', userData.phone).set('Content-Type', 'application/json');
       expect(res.status).toBe(409);
       expect(res.body.message).toBe('Email already in use')
  })


  it('should get all users', async () => {
     const res = await request(app).get('/api/users');
     expect(res.status).toBe(200);
     expect(res.body).toHaveProperty('users');
     expect(res.body.message).toBe('All users fetched successfully.')
  })
});
