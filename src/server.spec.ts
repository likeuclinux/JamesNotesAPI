import request from 'supertest';
import app from './server';

describe('POST /notes', () => {
    it('responds with 201 status and adds a new note',async () => {
        const newNote = { title: 'Test Note saturday 01', content: 'This is a test note for saturday.' };

        const res = await request(app)
        .post('/notes')
        .send(newNote)
        .set('Accept', 'application/json');

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();   //.toHaveProperty('title', 'Test Note');
        expect(res.body.title).toBeDefined();
        expect(res.body.title).toBe('Test Note 01');

        expect(res.body.content).toBeDefined();
        expect(res.body.content).toBe('This is a test note.');
    });
});

describe('GET /notes', () => {
    it('responds with 200 status and returns all notes', async () => {
      const res = await request(app).get('/notes');
  
      expect(res.status).toBe(200);
      // Assuming your response is an array of notes
      expect(Array.isArray(res.body)).toBe(true);
      // You can add more detailed assertions based on your actual response structure
    });
  });