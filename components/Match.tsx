import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material"

import { displaySummonerName, getChampionName, getGameTime, getSearchedSummonerData, getParticipantItems, getQueueType } from "../utilities/matchFunctions";
import MatchDetails from "./MatchDetails";
import { MatchDTO, Participant, SummonerDTO } from '../interfaces'; 


export default function Match({summonerData,matchData}: {summonerData: SummonerDTO, matchData: MatchDTO}) {
  /* Component displaying the summary of the given match data and holds the MatchDetails component.  */

  const dataDragonVersion = process.env.dataDragonVersion
  const gameDuration = getGameTime(matchData.info.gameDuration);
  const searchedSummonerData: Participant = getSearchedSummonerData(summonerData, matchData.info.participants);
  const searchedSummonerItems: Array<string> = getParticipantItems(searchedSummonerData);
  const teamOneParticipants: Array<Participant> = matchData.info.participants.slice(0, 5);
  const teamTwoParticipants: Array<Participant> = matchData.info.participants.slice(5, 10);

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
          <Grid container columns={22} spacing={2} alignItems="center">
            {/* Match type info */}
            <Grid item xs={3}>
              <Typography variant="body2" align="center">
                {getQueueType(matchData.info.queueId)}
              </Typography>
              <Typography variant="body2" align="center">
                {gameDuration}
              </Typography>
              <Typography variant="body1" align="center">
                {searchedSummonerData.win ? "Victory" : "Defeat"}
              </Typography>
            </Grid>
            {/* Champion icon and name */}
            <Grid item xs={3}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>{searchedSummonerData.championName}</Typography>
                </Grid>
                <Grid item>
                  <img
                    width="50px"
                    height="50px"
                    src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${getChampionName(searchedSummonerData.championName)}.png`}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* KDA */}
            <Grid item xs={3}>
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
            {/* Items */}
            <Grid item xs={6}>
              <Grid container spacing={0.25}>
                {searchedSummonerItems.map((item: string, index: number) => {
                  return item != "0" ? (
                    <Grid item key={index}>
                      <img
                        width="30px"
                        height="30px"
                        src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${item}.png`}
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
            {/* Team one participants */}
            <Grid item xs={3}>
              <Grid container direction="column" alignItems="right">
                {teamOneParticipants.map((participant: Participant) => {
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
                        src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${getChampionName(participant.championName)}.png`}
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
            {/* Team two participants */}
            <Grid item xs={3}>
              <Grid container direction="column">
                {teamTwoParticipants.map((participant: Participant) => {
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
                        src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${getChampionName(participant.championName)}.png`}
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
        <AccordionDetails
          sx={{
            backgroundColor: searchedSummonerData.win ? "winBG" : "loseBG",
            padding: "0px",
          }}
        >
          <MatchDetails
            matchData={matchData}
            searchedSummonerData={searchedSummonerData}
          ></MatchDetails>
        </AccordionDetails>
      </Accordion>
    </>
  );
} 