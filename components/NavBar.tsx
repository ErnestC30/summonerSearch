import { AppBar, Box, Link, Toolbar, Typography} from "@mui/material"

import SearchBar from './SearchBar'

function NavBar() {
  return (
    <AppBar
      position="static"
      sx={{
        margin: "0",
        minWidth: "700px",
        boxShadow: "none",
        backgroundColor: "#7dccfa",
      }}
    >
      <Toolbar>
        <Link href="/" underline="none" color="black">
          <Typography variant="h5">SummonerSearch</Typography>
        </Link>
        <Box sx={{ position: "absolute", right: "10px" }}>
          <SearchBar
            width="20%"
            minWidth="400px"
            addLabel={false}
            fieldLabel="Search Name"
            buttonSize="small"
          ></SearchBar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar