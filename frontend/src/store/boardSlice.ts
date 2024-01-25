import {Board} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createBoard, fetchBoard} from './boardThunks';
import {RootState} from '../app/store';

interface BoardState {
  items: Board[];
  createLoading: boolean;
  fetchLoading: boolean;
  modalOpen: boolean;
}

const initialState: BoardState = {
  items: [],
  createLoading: false,
  fetchLoading: false,
  modalOpen: false,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalOpen = true;
    },
    hideModal: (state) => {
      state.modalOpen = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(createBoard.pending, (state) => {
      state.createLoading = true;
    }).addCase(createBoard.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createBoard.rejected, (state) => {
      state.createLoading = false;
    }).addCase(fetchBoard.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchBoard.fulfilled, (state, {payload: boards}) => {
      state.fetchLoading = false;
      state.items = boards;
    }).addCase(fetchBoard.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});


export const {showModal, hideModal} = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
export const selectBoards = (state: RootState) => state.boards.items;
export const selectModal = (state: RootState) => state.boards.modalOpen;
export const selectCreateLoading = (state: RootState) => state.boards.createLoading;
export const selectFetchLoading = (state: RootState) => state.boards.fetchLoading;