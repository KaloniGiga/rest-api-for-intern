import request from 'supertest';
import app from '../src/app';
import { faker } from '@faker-js/faker';
import { sequelize } from '../src/config/db';
import User from '../src/models/user.model';
import { NextFunction } from 'express';

describe('API tests for user', () => {
  let userData: any;
  let mockNext: jest.Mock<NextFunction>;


  beforeAll(async () => {
    userData = {
      name: faker.person.fullName(),
      email: 'kalaunidipak5@gmail.com',
      phone: '9868810439',
    };
    sequelize.addModels([User]);
    await sequelize.sync({ force: true });
  }, 10000);

  beforeEach(async function () {
    jest.useFakeTimers();
    jest.setTimeout(100000);
    await User.sync({ force: true });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  /**
   * user created successfully.
  */

  it('should create user', async () => {
    const res = await request(app).post('/api/users').send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('newUser');
    expect(res.body.message).toBe('New user created.');
  });


  /**
   * failed to create user, email is already in use
  */
  it('should fail to create user, email already in use', async () => {
    await User.create(userData);
    const res = await request(app).post('/api/users').send(userData);
    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Email is already in use');
  });


/**
 * failed to create user, server error
*/
  // it('should fail to create user, server error ', async () => {
  //   jest.spyOn(User, 'create').mockRejectedValue(new Error('Database Error'));
  //   const res = await request(app).post('/api/users').send(userData);

  //   expect(res.status).toBe(500);
  //   expect(res.body.error).toBe('An error occured while creating user');
  // });

  /**
   * get all users successfully.
  */

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.message).toBe('All users fetched successfully.');
  });


  /**
   * should fail to get all user, server error
  */

  // it('should fail to get all users', async () => {
  //   jest.spyOn(User, 'findAll').mockRejectedValue(new Error('Database Error'));
  //   const response = await request(app).get('/api/users');
  //   expect(response.status).toBe(500);
  //   expect(response.body).toHaveProperty('error');
  // });


  /**
   * get user by id successfully.
  */

  it('should get user by id', async () => {
    await User.create(userData);
    const res = await request(app).get(`/api/users/${1}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.message).toBe('User fetched successfully!');
  });

  /**
   * failed to get user by id, user not found
  */
  it('should fail to get user, user not found', async () => {
    const res = await request(app).get(`/api/users/${100}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  /**
   * failed to get user by id because of server error
  */

  // it('should fail to get user, server error', async () => {
  //   jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'));
  //   const res = await request(app).get(`/api/users/${100}`);
  //   expect(res.status).toBe(500);
  // });

  /**
   * update user successfully
  */

  it('should update user', async () => {
    await User.create(userData);
    const res = await request(app)
      .put(`/api/users/${1}`)
      .send({ name: 'dipak kalauni', email: 'kalaunidipak5@gmail.com', phone: '9848930903' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('updatedUser');
    expect(res.body.message).toBe('user is updated');
  });

  /**
   * fail to update user, user not found
  */
  it('should fail to update user', async () => {
    const res = await request(app)
      .put(`/api/users/${100}`)
      .send({ name: 'dipak kalauni', email: 'kalaunidipak5@gmail.com', phone: '9868810345' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Failed to update user.');
  });

  /**
   * delete user successfully.
  */

  it('should delete User', async () => {
    await User.create(userData);
    const res = await request(app).delete(`/api/users/${1}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('user deleted successfully.');
  });


  /**
   * failed to delete user, user not found
  */

  // it('should fail to delete user, user not found', async () => {
  //   const res = await request(app).delete(`/api/users/${1}`);
  //   expect(res.status).toBe(404);
  //   expect(res.body.error).toBe('User not found.');
  // });


  /**
   * failed to delete user with server error
  */

  // it('should fail to delete user, with server error', async () => {
  //   jest.spyOn(User, 'destroy').mockRejectedValue(new Error('Database Error'));
  //   mockNext = jest.fn()
  //   const res = await request(app).delete(`/api/users/${1}`);

  //   expect(mockNext).toHaveBeenCalled();
  //   expect(res.status).toBe(500);
  //   expect(res.body.error).toBe('Something went wrong while deleting user.');
  // });
});
