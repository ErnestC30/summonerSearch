import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material"

import { displaySummonerName, getChampionName, getGameTime, getSearchedSummonerData, getParticipantItems, getQueueType } from "../utilities/matchFunctions";
import MatchDetails from "./MatchDetails";
import { theme } from '../theme'
import { SummonerDTO } from '../interfaces'; 


export default function Match({
  summonerData,
  matchData,
}: {
  summonerData: SummonerDTO
  matchData: any
}) {
  /* Component for detailed information on a single match.  */

  const dataDragonVersion = process.env.dataDragonVersion
  const gameDuration = getGameTime(matchData.info.gameDuration);
  const searchedSummonerData = getSearchedSummonerData(
    summonerData,
    matchData.info.participants
  );
  const searchedSummonerItems = getParticipantItems(searchedSummonerData);
  const teamOneParticipants = matchData.info.participants.slice(0, 5);
  const teamTwoParticipants = matchData.info.participants.slice(5, 10);

  console.log(dataDragonVersion)

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: searchedSummonerData.win ? "win" : "lose",
          margin: "5px",
          minWidth: "933px",
        }}
      >
        {/* Match overview component */}
        <AccordionSummary>
          <Grid container columns={15} spacing={3} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="body2" align="center">{getQueueType(matchData.info.queueId)}</Typography>
              <Typography variant="body2" align="center">
                {gameDuration}
              </Typography>
              <Typography variant="body1" align="center">
                {searchedSummonerData.win ? "Victory" : "Defeat"}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>{searchedSummonerData.championName}</Typography>
                </Grid>
                <Grid item>
                  <img
                    width="50px"
                    height="50px"
                    src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${searchedSummonerData.championName}.png`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>
                    {searchedSummonerData.kills} /&nbsp;
                    {searchedSummonerData.deaths} /&nbsp;
                    {searchedSummonerData.assists}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    K/D/A:
                    {(
                      (searchedSummonerData.kills +
                        searchedSummonerData.assists) /
                      searchedSummonerData.deaths
                    ).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* Grid of items of the searched user. */}
              <Grid container spacing={0.25}>
                {searchedSummonerItems.map((item, index) => {
                  return item != "0" ? (
                    <Grid item key={index}> 
                      <img
                        width="30px"
                        height="30px"
                        src={`https://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item}.png`}
                      />
                    </Grid>
                  ) : (
                    <Grid item key={index}>
                      <Box
                        sx={{
                          width: "30px",
                          height: "30px",
                          borderStyle: "solid",
                          opacity: "70%",
                          borderColor: "#e3e3e3",
                          backgroundColor: "#ededed",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container direction="column" alignItems="right">
                {teamOneParticipants.map((participant: any) => {
                  return (
                    <Typography
                      key={participant.puuid}
                      variant="body2"
                      sx={{
                        verticalAlign: "center",
                        display: "inline-flex",
                        margin: "1px",
                      }}
                    >
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${getChampionName(participant.championName)}.png`}
                        height="20px"
                        width="20px"
                      />
                      &nbsp;
                      {displaySummonerName(participant.summonerName)}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container direction="column">
                {teamTwoParticipants.map((participant: any) => {
                  return (
                    <Typography
                      key={participant.puuid}
                      variant="body2"
                      sx={{
                        verticalAlign: "center",
                        display: "inline-flex",
                        margin: "1px",
                      }}
                    >
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${participant.championName}.png`}
                        height="20px"
                        width="20px"
                      />
                      &nbsp;
                      {displaySummonerName(participant.summonerName)}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        {/* Match detail component */}
        <AccordionDetails sx={{backgroundColor: searchedSummonerData.win ? "winBG" : "loseBG", padding: '0px'}}>
          <MatchDetails matchData={matchData} searchedSummonerData={searchedSummonerData}></MatchDetails>
        </AccordionDetails>
      </Accordion>
    </>
  );
} 