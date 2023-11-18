import mongoose from 'mongoose';


// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/notes'; // Replace with your MongoDB URL and database name

// Establish MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB.');
});

export default db;
