import type { NextPage } from 'next'
//separate import statements  into smaller bundles?
import { Box, Button, Container, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Router from 'next/router'

const DEFAULT_REGION = 'NA1'

interface Region {
  regionId: string
  regionName: string
}

const Home: NextPage = (riotKey) => {
  const [username, setUsername] = useState<string>('')
  const [regionId, setRegionId] = useState<string>(DEFAULT_REGION)

  const regionsMap: Array<Region> = [
    {regionId: 'NA1', regionName: 'North America'},
    {regionId: 'JP1', regionName: 'Japan'},
    {regionId: 'KR',  regionName: 'Korea'},
    {regionId: 'EUW1', regionName: 'Europe West'},
    {regionId: 'EUN1', regionName: 'Europe North'},
    {regionId: 'BR1',  regionName: 'Brazil'},
  ]

  function updateName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUsername(e.target.value) 
  } 

  function updateRegion(e: SelectChangeEvent<string>) {
    setRegionId(e.target.value)
  } 

  function displayRegion(regionId: string, regionMap: Array<Region>): string {
    /* Displays the regionId of the selected region */
    let region = regionMap.find((region) => region.regionId == regionId)
    return region ? region.regionId : ''
  }

  function searchUser(region: string, username: string) {
    /* Redirects to page displaying user information*/
    Router.push(`/${region}/user/${username}`)
  }

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
          minWidth="400px"
        >
          <div className="searchBar">
            <TextField
              id="summoner-search-field"
              label="Enter summoner name to search"
              name="username"
              value={username}
              fullWidth
              onChange={updateName}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchUser(regionId, username);
                }
              }}
            />
            <FormControl
              sx={{
                position: "absolute",
                right: "2%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Select
                size="small"
                onChange={updateRegion}
                value={regionId}
                renderValue={(region) => displayRegion(region, regionsMap)}
              >
                {/* Renders the regions to be selectable. */}
                {regionsMap.map((region: Region) => {
                  return(
                  <MenuItem value={region.regionId} key={region.regionId}>
                    {region.regionName}
                  </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            sx={{ marginLeft: "5px", height: "50px" }}
            onClick={() => searchUser(regionId, username)}
          >
            Search
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Home