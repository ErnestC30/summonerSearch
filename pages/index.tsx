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
          <Typography variant='h4'>Summoner Search</Typography>
          <SearchBar minWidth='500px' fieldLabel="Enter summoner name to search"/>     
       </Box>
      </Container>
    </>
  );
};

export default Home