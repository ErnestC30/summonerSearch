import { Box, Grid, Typography } from "@mui/material"
import PlayerLeague from "./PlayerLeague"

function Profile({
  summonerData,
  arrayOfLeaguesData,
}: {
  summonerData: any;
  arrayOfLeaguesData: any;
}) {
  const dataDragonVersion = process.env.dataDragonVersion;

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      sx={{ margin: "5px", width:'99%', minWidth: "933px", backgroundColor: "#a7ddeb" }}
    >
      {/* User's profile image and username*/}
      <Grid item xs={2}>
        <Box position="relative">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${summonerData.profileIconId}.png`}
            height="128px"
            width="128px"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "4px",
              width: "128px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.60)",
            }}
          >
            <Typography color="common.white">
              {summonerData.summonerLevel}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h4">{summonerData.name}</Typography>
      </Grid>
      {/* Render PlayerLeague component for Ranked Solo and/or Flex stats if they exist. */}
      <Grid item xs={3}>
        {renderIfLeagueExists(arrayOfLeaguesData, "RANKED_SOLO_5x5")}
      </Grid>
      <Grid item xs={3}>
        {renderIfLeagueExists(arrayOfLeaguesData, "RANKED_FLEX_SR")}
      </Grid>
    </Grid>
  )
}

export default Profile 

function renderIfLeagueExists(arrayOfLeaguesData: any, leagueType: any): any {
  /* Returns a PlayerLeague component for the league if it exists. */

  let leagueInfo = arrayOfLeaguesData.find((league: any) => 
    league.queueType == leagueType
  )
  return leagueInfo ? <PlayerLeague leagueInfo={leagueInfo}/> : null
}

