import express from 'express';
import cors from 'cors';
import boardRouter from './routers/boards';
import boardsDb from './boardsDb';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/boards', boardRouter);

const run = async () => {
  await boardsDb.init();
  
  app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
};

run().catch(console.error);