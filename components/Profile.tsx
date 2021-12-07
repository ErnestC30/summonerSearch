import { Box, Grid, Typography } from "@mui/material"
import PlayerLeague from "./PlayerLeague"

function Profile({ summonerData, arrayOfLeaguesData }: { summonerData: any, arrayOfLeaguesData: any }) {
  console.log(arrayOfLeaguesData);

  function renderIfLeagueExists(arrayOfLeaguesData: any, leagueType: any): any {
    /* Returns a PlayerLeague component for the league if it exists. */
    let leagueInfo = arrayOfLeaguesData.find((league: any) => 
      league.queueType == leagueType
    )
    return leagueInfo ? <PlayerLeague leagueInfo={leagueInfo}/> : null
  }
  


  return (
    <Grid container spacing={2} alignItems='center' sx={{ backgroundColor: "#a7ddeb" }}>
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
        <Typography variant='h4'>{summonerData.name}</Typography>
      </Grid>
      {/* Render PlayerLeague component for Ranked Solo or Flex stats if they exist. */}
      <Grid item>
        {renderIfLeagueExists(arrayOfLeaguesData, "RANKED_SOLO_5x5")}
      </Grid>
      <Grid item>
        {renderIfLeagueExists(arrayOfLeaguesData, "RANKED_FLEX_SR")}
      </Grid>
    </Grid>
  );
}

export default Profile 
