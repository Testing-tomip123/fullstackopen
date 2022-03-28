const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

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
    
})

afterAll(() => {
    mongoose.connection.close()
})
