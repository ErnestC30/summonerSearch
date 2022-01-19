import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import type { NextPage } from 'next'

import SearchBar from '../components/SearchBar'

const Home: NextPage = () => {
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
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            Summoner Search
          </Typography>
          <SearchBar
            width="60%"
            minWidth="500px"
            buttonSize="medium"
            addLabel={true}
            fieldLabel="Enter summoner name to search"
          />
        </Box>
      </Container>
    </>
  );
};

export default Home