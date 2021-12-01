import { Box, Grid, Typography } from "@mui/material"

function Profile({ summonerData }: { summonerData: any }) {
  console.log(summonerData);
  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#a7ddeb" }}>
      <Grid item position="relative">
        {/* resize as 128x128 image */}
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${summonerData.profileIconId}.png`}
          height="128px"
          width="128px"
        />
        <Box
          sx={{position: 'absolute', bottom:'4px', width: '128px', textAlign: 'center', backgroundColor:"rgba(0, 0, 0, 0.60)"}}
        >
          <Typography color="common.white">
            {summonerData.summonerLevel}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Typography>{summonerData.name}</Typography>
      </Grid>
    </Grid>
  );
}

export default Profile 