import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid} from '@mui/material';
import {Board} from '../../types';
import {styled} from '@mui/system';
import {apiURL} from '../../constants';

const ImageCardMedia = styled(CardMedia) ({
  height: 0,
  paddingTop: '56.25%'
})

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
      <Card>
        <CardHeader title={board.author}/>
        <ImageCardMedia image={cardImage} title={board.id}/>
        <CardContent>
          {board.message}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BoardItem;