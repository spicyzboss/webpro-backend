import clc from 'cli-color';
import { config } from 'dotenv';
import app from './app';

config();

const PORT = process.env.PORT || 3001;

const listener = app.listen(PORT, () => {
  process.stdout.write(`Started on port ${clc.yellow(listener.address().port)}\n`);
});
