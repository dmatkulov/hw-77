import {createAsyncThunk} from '@reduxjs/toolkit';
import {BoardMutation} from '../../types';
import axiosApi from '../axiosApi';
import {routes} from '../api';

export const createBoard = createAsyncThunk<void, BoardMutation>(
  'board/create',
  async (board) => {
    await axiosApi.post(routes.boards, board);
  }
);

export const fetchBoard = createAsyncThunk(
  'board/fetch',
  async () => {
  
  }
);