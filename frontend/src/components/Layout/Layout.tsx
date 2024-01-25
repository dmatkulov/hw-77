import React, {PropsWithChildren} from 'react';
import {Container} from '@mui/material';
import AppToolbar from '../UI/AppToolbar/AppToolbar';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;