import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
//import Note from './database/mongo/Note';
import Note from './database/sqlite/Note';

const app = express();
const port = 3005;

//const a : ConnectOptions 
mongoose.connect('mongodb://localhost:27017/notesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.get('/notes', async (_req: Request, res: Response)=>{
  try {
    const notes = await Note.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : error});
  }
});

app.post('/notes', async (req: Request, res: Response) => {
    const { title, content } = req.body;
    
    try {
        const newNote = await Note.createNewNote(title, content);
        res.status(201).json(newNote); //201 - success for post request
    } catch (error) {
        res.status(400).json({message: error instanceof Error ? error.message : error }); //400 - bad request
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default app;