import { faker } from '@faker-js/faker';
import app from '../src/app';
import { sequelize } from '../src/config/db';
import Post from '../src/models/post.model';
import User from '../src/models/user.model';
import request from 'supertest';

describe('API tests for posts', () => {
  let postData: any;
  let userData: any;

  beforeAll(async () => {
    postData = {
      title: 'This is the title of the post',
      content: 'This content represent the description, what the post is actually all about.',
    };

    userData = {
      name: faker.person.fullName(),
      email: 'kalaunidipak5@gmail.com',
      phone: '9868810438',
    };
    sequelize.addModels([User, Post]);
    await sequelize.sync({ force: true });
  }, 10000);

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setTimeout(100000);
    await Post.sync({ force: true });
  });

  afterEach(async () => {
    jest.clearAllTimers();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create post', async () => {
    const user = await User.create(userData);
    const res = await request(app).post(`/api/posts/${user.id}`).send(postData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('newPost');
  });

  it('should get all posts of user', async () => {
    const user = await User.create(userData);
    const res = await request(app).get(`/app/posts/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  it('should get post by id', async () => {
    await Post.create(postData);
    const res = await request(app).get(`/app/posts/${1}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('post');
  });
});
