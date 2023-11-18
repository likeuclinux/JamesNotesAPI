import db from './dbConnection';
import { INote, INoteModel } from '../interface'; // Import the INote and INoteModel interfaces

export class SQLiteNote implements INoteModel {
  createNewNote(title: string, content: string): Promise<INote> {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function (err) {
        if (err) {
          reject(new Error(`Error creating a new note in SQLite: ${err.message}`));
        } else {
          const newNote: INote = {
            title,
            content,
          };
          resolve(newNote);
        }
      });
    });
  }

  getAllNotes(): Promise<INote[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM notes', function (err, rows: INote[]) {
        if (err) {
          reject(new Error(`Error fetching notes from SQLite: ${err.message}`));
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default new SQLiteNote(); // Export an instance of the SQLiteNote class
