import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Fab, Grid, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectBoards, selectFetchLoading, showModal} from '../../store/boardSlice';
import {fetchBoard} from '../../store/boardThunks';
import BoardItem from './BoardItem';
import BoardModal from './BoardModal';

const BoardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const isLoading = useAppSelector(selectFetchLoading);
  
  const openModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  
  
  useEffect(() => {
    dispatch(fetchBoard());
  }, [dispatch]);
  
  
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
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Image boards</Typography>
        </Grid>
        <Grid item>
          <Fab color="primary" onClick={openModal}>
            <AddIcon/>
          </Fab>
        </Grid>
      </Grid>
      
      <Grid item container spacing={2}>
        {content}
      </Grid>
      <BoardModal/>
    </Grid>
  );
};

export default BoardList;