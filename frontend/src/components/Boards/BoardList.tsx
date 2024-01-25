import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Divider, Fab, Grid, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {hideModal, selectBoards, selectCreateLoading, selectFetchLoading, showModal} from '../../store/boardSlice';
import {createBoard, fetchBoard} from '../../store/boardThunks';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';
import {BoardMutation} from '../../types';

const BoardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const isLoading = useAppSelector(selectFetchLoading);
  const isCreating = useAppSelector(selectCreateLoading);
  
  const openModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  
  
  useEffect(() => {
    dispatch(fetchBoard());
  }, [dispatch]);
  
  
  const onSubmit = async (board: BoardMutation) => {
    await dispatch(createBoard(board));
    await dispatch(fetchBoard());
    dispatch(hideModal());
  };
  
  let content: React.ReactNode = <CircularProgress/>;
  
  if (!isLoading && boards) {
    content = boards.map(board => (
      <BoardItem board={board} key={board.id}/>
    ));
  } else if (!isLoading && !boards) {
    content = (<Typography>Empty boards</Typography>);
  }
  
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center" sx={{marginBottom: 4, marginTop: 4}}>
        <Grid item>
          <Typography variant="h4">Image boards</Typography>
        </Grid>
        <Grid item>
          <Fab color="primary" onClick={openModal}>
            <AddIcon/>
          </Fab>
        </Grid>
      </Grid>
      <Divider sx={{marginBottom: 4}}/>
      <Grid item container spacing={2}>
        {content}
      </Grid>
      <BoardModal
        onSubmit={onSubmit}
        isLoading={isCreating}
      />
    </Grid>
  );
};

export default BoardList;