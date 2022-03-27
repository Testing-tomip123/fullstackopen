const { after } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body.length).toBe(initialBlogs.length);
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs');
        const titles = response.body.map(r => r.title);
        expect(titles).toContain('React patterns');
    })

    test('blog posts is named id', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0]._id).toBeDefined();
    })

    test('a blog is added', async () => {
        const newBlog = {
            title: "Test blog",
            author: "Test author",
            url: "https://test.com",
            likes: 23
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs');
        const titles = response.body.map(r => r.title);

        expect(titles).toContain('Test blog');
        expect(response.body.length).toBe(initialBlogs.length + 1);

    })

    test('a blog without likes is added with 0 likes', async () => {
        const newBlog = {
            title: "Test blog2",
            author: "Test author2",
            url: "https://test2.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        const likes = response.body.map(r => r.likes)

        expect(likes).toContain(0);
        expect(response.body.length).toBe(initialBlogs.length + 1);

    })

    test('a blog without title and url is not added', async () => {
        const newBlog = {
            author: "Test author3",
            likes: 23
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(res => {
                expect(res.body.error).toBe('title and url are required');
            })
        
        const response = await api.get('/api/blogs');
        expect(response.body.length).toBe(initialBlogs.length);

    })
})

afterAll(() => {
    mongoose.connection.close();
})