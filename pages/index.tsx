import type { NextPage } from 'next'
//separate import statements  into smaller bundles?
import { Box, Container,Typography } from '@mui/material';
import React, { useState } from 'react';

import SearchBar from '../components/SearchBar'

const Home: NextPage = (riotKey) => {

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Typography variant='h4' sx={{marginBottom: '10px'}}>Summoner Search</Typography>
          <SearchBar width='70%' minWidth='500px' buttonSize='medium' addLabel={true} fieldLabel="Enter summoner name to search"/>     
       </Box>
      </Container>
    </>
  );
};

export default Home