import {createAsyncThunk} from '@reduxjs/toolkit';
import {Board, BoardMutation} from '../types';
import axiosApi from '../axiosApi';
import {routes} from '../api';

export const createBoard = createAsyncThunk<void, BoardMutation>(
  'board/create',
  async (board) => {
    const formData = new FormData();
    
    formData.append('message', board.message);
    
    if (board.author) {
      formData.append('author', board.author);
    }
    
    if (board.image) {
      formData.append('image', board.image);
    }
    
    await axiosApi.post(routes.boards, formData);
  }
);

export const fetchBoard = createAsyncThunk<Board[]>(
  'board/fetch',
  async () => {
    const boardResponse = await axiosApi.get<Board[] | null>(routes.boards);
    const boards = boardResponse.data;
    
    if (!boards) {
      return [];
    }
    
    return boards;
  }
);