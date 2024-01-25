import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {Board} from '../../types';
import {apiURL} from '../../constants';

interface Props {
  board: Board;
}

const BoardItem: React.FC<Props> = ({board}) => {
  let cardImage = undefined;
  
  if (board.image) {
    cardImage = apiURL + '/' + board.image;
  }
  
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        {board.image && (
          <CardMedia
            sx={{height: 140}}
            image={cardImage}
            title={board.id}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {board.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {board.message}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BoardItem;