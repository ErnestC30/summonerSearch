import { AppBar, Box, Toolbar, Typography} from "@mui/material"

import SearchBar from './SearchBar'

function NavBar() {
  return (
  <AppBar position='static' sx={{margin: '0', boxShadow: 'none', backgroundColor: '#7dccfa'}}>
      <Toolbar>
        <Typography variant='h5'>SummonerSearch</Typography>
        <Box sx={{position: 'absolute', right: '10px'}}>
            <SearchBar width='20%' minWidth='300px' addLabel={false} fieldLabel='Search Name' buttonSize='small'></SearchBar>
        </Box>
      </Toolbar>
  </AppBar>
  )
}

export default NavBar