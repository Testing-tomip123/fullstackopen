const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const e = require('express');

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
        username: 'root',
        name: 'Superuser',
        password: 'secret'
    })
    await user.save();
})

describe('User api', () => {

    test('creation succeeds with a fresh username', async () => {
        const newUser = {
            username: 'new user',
            name: 'New User',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(await User.countDocuments()).toBe(2);
        expect(await User.findOne({ username: newUser.username })).toBeDefined();
        expect(await User.findOne({ name: newUser.name })).toBeDefined();
        expect(await User.findOne({ password: newUser.password })).toBeDefined();
        
        const users = await User.find({});
        expect(users.length).toBe(2);

        const usernames = users.map(u => u.username);
        expect(usernames).toContain(newUser.username);
  
    })

    test('password is hashed correctly', async () => {
        const newUser = {
            username: 'new user',
            name: 'New User',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const user = await User.findOne({ username: newUser.username });
        expect(user.password).not.toBe(newUser.password);
    })

    test('password length is at least 3 characters', async () => {
        const newUser = {
            username: 'new user',
            name: 'New User',
            password: 'se',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(await User.countDocuments()).toBe(1);

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('username and password must be at least 3 characters');
    })

    test('username length is at least 3 characters', async () => {
        const newUser = {
            username: 'nu',
            name: 'New User',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(await User.countDocuments()).toBe(1);

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('username and password must be at least 3 characters');

    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(await User.countDocuments()).toBe(1);
        
        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('Username should be unique');

    })
    
})

afterAll(() => {
    mongoose.connection.close()
})
