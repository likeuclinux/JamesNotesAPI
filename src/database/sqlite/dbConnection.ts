import sqlite3 from 'sqlite3';

// Establish SQLite connection
const db = new sqlite3.Database('notes.sqlite', (err) => {
    if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to SQLite database.');
        // Create a 'notes' table if it doesn't exist
        db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)');
      }
});

export default db;