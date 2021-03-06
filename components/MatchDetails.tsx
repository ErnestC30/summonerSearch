import { Box, Grid, Typography } from "@mui/material"

import { MatchDTO, Participant, Stat } from "../interfaces";
import { getTeamStats } from "../utilities/matchFunctions";
import MatchPlayerDetails from "./MatchPlayerDetails";


export default function MatchDetails({matchData, searchedSummonerData}: {matchData: MatchDTO, searchedSummonerData: Participant}) {
    /* Component that displays the detailed information of the given match data. */

    const searchedSummonerTeamId = searchedSummonerData.teamId
    const usersTeamParticipants = matchData.info.participants.filter((participant: Participant) => participant.teamId == searchedSummonerTeamId)
    const opponentTeamParticipants = matchData.info.participants.filter((participant: Participant) => participant.teamId != searchedSummonerTeamId)
    let teamStats: Stat[] = getTeamStats(usersTeamParticipants, opponentTeamParticipants, matchData.info.teams)

    return (
      <>
        <Grid container direction="column">
          <Grid item sx={{padding: '20px'}}>
            {/* Labels */}
            <Grid container columns={18} justifyContent="space-evenly" alignItems='center' sx={{marginBottom: '10px'}}>
              <Grid item xs={5} sx={{ display: "flex" }}>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerData.win ? "Victory" : "Defeat"} -&nbsp;
                </Typography>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerTeamId == 100 ? "Blue Team" : "Red Team"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>KDA</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>Damage</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>CS</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>Gold Earned</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold" align='center'>Items</Typography>
              </Grid>
            </Grid>
            {/* Displays the details searched summoner's team */}
            <Grid container direction="column">
              {usersTeamParticipants.map((participant: Participant) => {
                return (
                    <MatchPlayerDetails
                      key={participant.puuid}
                      participant={participant}
                    />
                );
              })}
            </Grid>
            {/* Displays stat comparisons between the two teams*/}
            <Grid item sx={{marginTop: '10px', marginBottom: '10px', marginLeft: '-20px', padding: '5px', backgroundColor: 'rgba(252, 252, 252, 0.4)', width: `calc(100% + 40px)`}}>
              <Grid container columnSpacing={2} alignItems='center' justifyContent='center'>
                {teamStats.map((stat: Stat, index: number) => {
                  return (
                    <Grid item key={index}>
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
            {/* Labels */}
            <Grid container columns={18} justifyContent="space-evenly" alignItems='center' sx={{marginTop: '20px' ,marginBottom: '10px'}}>
              <Grid item xs={5} sx={{ display: "flex" }}>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerData.win ? "Defeat" : "Victory"} -&nbsp;
                </Typography>
                <Typography fontWeight="fontWeightBold">
                  {searchedSummonerTeamId == 100 ? "Red Team" : "Blue Team"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>KDA</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>Damage</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>CS</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontWeight="fontWeightBold" align='center'>Gold Earned</Typography>
              </Grid>
              <Grid item xs>
                <Typography fontWeight="fontWeightBold" align='center'>Items</Typography>
              </Grid>
            </Grid>
            {/* Displays the details for the opponent team */}
            <Grid container direction="column">
              {opponentTeamParticipants.map((participant: Participant) => {
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


