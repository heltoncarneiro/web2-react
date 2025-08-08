import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import alunoRoutes from './routes/aluno.js';
import disciplinaRoutes from './routes/disciplina.js';
import alunoDisciplinaRoutes from './routes/alunoDisciplina.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/aluno-disciplinas', alunoDisciplinaRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/escola';

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    return;
  } catch (err) {
    console.warn('MongoDB not available at', MONGO_URI, '- starting in-memory MongoDB for dev...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
  }
}

async function start() {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();