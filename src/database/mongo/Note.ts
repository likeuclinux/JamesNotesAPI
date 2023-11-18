import { Schema, Document } from 'mongoose';
import { INote, INoteModel } from '../interface'; // Import the INote and INoteModel interfaces
import db from './dbConnection'; // Import the MongoDB connection

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const MongoNote = db.model<INote>('Note', NoteSchema);

class MongoDBNote implements INoteModel {
    async getAllNotes(): Promise<INote[]> {
        try {
            const notes = await MongoNote.find();
            return notes;
        } catch (error:any) {
            throw new Error(`Error fetching notes from MongoDB: ${error.message}`);
        }
    }

    async createNewNote(title: string, content: string): Promise<INote> {
        try {
            const newNote = new MongoNote({ title, content });
            const savedNote = await newNote.save();
            return savedNote;
        } catch (error:any) {
            throw new Error(`Error creating a new note in MongoDB: ${error.message}`);
        }
    }
}

export default new MongoDBNote(); // Export an instance of the MongoDBNote class
