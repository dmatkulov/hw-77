import {Router} from 'express';
import boardsDb from '../boardsDb';
import {imagesUpload} from '../multer';
import {BoardWithoutId} from '../types';


const boardRouter = Router();

boardRouter.get('/', async (req, res, next) => {
  try {
    const boards = await boardsDb.getItem();
    res.send(boards);
  } catch (e) {
    next(e);
  }
});

boardRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const message = req.body.message;
    
    if (!message) {
      return res.status(422).send({error: 'Message must be present'});
    }
    
    const board: BoardWithoutId = {
      author: req.body.author ? req.body.author : "Anonymous",
      message: req.body.message,
      image: req.file ? req.file.filename : null,
    };
    
    const newBoard = await boardsDb.addItem(board);
    res.send(newBoard);
  } catch (e) {
    next(e);
  }
});

export default boardRouter;