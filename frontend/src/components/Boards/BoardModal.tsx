import React, {useState} from 'react';
import clsx from 'clsx';
import {css, styled} from '@mui/system';
import {Modal as BaseModal} from '@mui/base/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {hideModal, selectModal} from '../../store/boardSlice';
import {Grid, TextField, Typography} from '@mui/material';
import FileInput from '../UI/FileInput/FileInput';
import {BoardMutation} from '../../types';
import AddIcon from '@mui/icons-material/Add';
import {LoadingButton} from '@mui/lab';


interface Props {
  onSubmit: (productMutation: BoardMutation) => void;
  isLoading: boolean;
}

const BoardModal: React.FC<Props> = ({onSubmit, isLoading}) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModal);
  
  const [state, setState] = useState<BoardMutation>({
    author: '',
    message: '',
    image: null,
  });
  
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      author: '',
      message: '',
      image: null
    });
  };
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    
    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
  };
  
  return (
    <div>
      <Modal
        open={open}
        onClose={() => dispatch(hideModal())}
        slots={{backdrop: StyledBackdrop}}
      >
        <ModalContent sx={{width: 400}}>
          <Typography>Create board</Typography>
          <form onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  id="author"
                  label="Author"
                  name="author"
                  fullWidth
                  onChange={inputChangeHandler}
                  value={state.author}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  id="message"
                  label="Message"
                  name="message"
                  fullWidth
                  onChange={inputChangeHandler}
                  value={state.message}
                />
              </Grid>
              <Grid item xs>
                <FileInput
                  name="image"
                  label="Board image"
                  onChange={fileInputChangeHandler}
                />
              </Grid>
              <Grid item xs>
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isLoading}
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<AddIcon/>}
                >
                  Create
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BoardModal;

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const {open, className, ...other} = props;
  return (
    <div
      className={clsx({'base-Backdrop-open': open}, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({theme}) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  `,
);
