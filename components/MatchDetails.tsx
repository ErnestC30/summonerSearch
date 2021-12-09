import { Box, Grid, Typography } from "@mui/material"

import MatchPlayerDetails from "./MatchPlayerDetails";


function MatchDetails({matchData, searchedSummonerData}: {matchData: any, searchedSummonerData: any}) {
    /* Displays the detailed information from the given match data. */

    const searchedSummonerTeamId = searchedSummonerData.teamId
    const usersTeamParticipants = matchData.info.participants.filter((participant: any) => participant.teamId == searchedSummonerTeamId)
    const opponentTeamParticipants = matchData.info.participants.filter((participant: any) => participant.teamId != searchedSummonerTeamId)
    let teamStats = getTeamStats(usersTeamParticipants, opponentTeamParticipants, matchData)

    return (
      <>
        <Grid container direction="column">
          <Grid item>
            {/* Labels */}
            <Grid container spacing={2}>
              <Grid item xs sx={{ display: "flex" }}>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerData.win ? "Victory" : "Defeat"} -&nbsp;
                </Typography>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerTeamId == 100 ? "Blue Team" : "Red team"}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold">KDA</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold">Damage</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold">CS</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold">Gold Earned</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold">Items</Typography>
              </Grid>
            </Grid>
            {/* Displays the details searched summoner's team */}
            <Grid container direction="column">
              {usersTeamParticipants.map((participant: any) => {
                return (
                  <MatchPlayerDetails
                    key={participant.puuid}
                    participant={participant}
                  />
                );
              })}
            </Grid>
            {/* Displays stat comparisons between the two teams*/}
            <Grid item>
              <Grid container spacing={3}>
                {teamStats.map((stat: any) => {
                  return (
                    <Grid item>
                      <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                        <Typography fontWeight="fontWeightBold">{stat.name}</Typography>
                        <Typography>{stat.searchedUserTeamValue}</Typography>
                        <Typography>{stat.opponentTeamValue}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            {/* Displays the details for the opponent team */}
            <Grid container direction="column">
              {opponentTeamParticipants.map((participant: any) => {
                return (
                  <MatchPlayerDetails
                    key={participant.puuid}
                    participant={participant}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export default MatchDetails

function getTeamStats(searchedTeamParticipants: any, opponentTeamParticipants: any, matchData: any) {
  /* Returns both team statistics to be displayed. */

  let userTeamObjectives = matchData.info.teams.find((team: any) => searchedTeamParticipants[0].teamId == team.teamId).objectives
  let opponentTeamObjectives = matchData.info.teams.find((team: any) => opponentTeamParticipants[0].teamId == team.teamId).objectives

  let teamStats = [
    {name: 'Total Kills', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.kills}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.kills}), 0)},
    {name: 'Total Gold Earned', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.goldEarned}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.goldEarned}), 0)},
    {name: 'Barons Killed', searchedUserTeamValue: userTeamObjectives.baron.kills, opponentTeamValue: opponentTeamObjectives.baron.kills},
    {name: 'Dragons Killed', searchedUserTeamValue: userTeamObjectives.dragon.kills, opponentTeamValue: opponentTeamObjectives.dragon.kills},
    {name: 'Towers Destroyed', searchedUserTeamValue: userTeamObjectives.tower.kills, opponentTeamValue: opponentTeamObjectives.tower.kills},
  ]
  
  return teamStats
}
