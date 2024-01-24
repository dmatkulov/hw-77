import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {Board, BoardWithoutId} from './types';

const fileName = './db.json';
let data: Board[] = [];

const boardsDb = {
  async init() {
    try {
      const boardContents = await fs.readFile(fileName);
      data = JSON.parse(boardContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItem() {
    return data;
  },
  async addItem(item: BoardWithoutId) {
    const id = crypto.randomUUID();
    const board = {id, ...item};
    data.push(board);
    await this.save();
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  }
};

export default boardsDb;