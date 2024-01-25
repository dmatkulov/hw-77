import {Board} from '../../types';
import {createSlice} from '@reduxjs/toolkit';

interface BoardState {
  items: Board[];
  createLoading: boolean;
  fetchLoading: boolean;
}

const initialState: BoardState = {
  items: [],
  createLoading: false,
  fetchLoading: false
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
})

export const boardReducer = boardSlice.reducer;