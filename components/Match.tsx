import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material"

import MatchDetails from "./MatchDetails";
import { theme } from '../theme'
import { SummonerDTO } from '../interfaces'; 

function Match({
  summonerData,
  matchData,
}: {
  summonerData: SummonerDTO
  matchData: any
}) {
  /* Component for detailed information on a single match.  */

  const gameDuration = getGameTime(matchData.info.gameDuration);
  const searchedSummonerData = getSearchedSummonerData(
    summonerData,
    matchData.info.participants
  );
  const searchedSummonerItems = getSearchedSummonerItems(searchedSummonerData);
  const teamOneParticipants = matchData.info.participants.slice(0, 5);
  const teamTwoParticipants = matchData.info.participants.slice(5, 10);

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
        <AccordionDetails>
          <MatchDetails matchData={matchData} searchedSummonerData={searchedSummonerData}></MatchDetails>
        </AccordionDetails>
      </Accordion>
    </>
  );
} 

export default Match 

function getGameTime(timeInSeconds: number): string {
    /* Returns the game duration in string format. */
    let minutes = Math.floor(timeInSeconds / 60)
    let seconds = timeInSeconds - (minutes * 60)
    return `${minutes}min ${seconds}sec`
}

function getSearchedSummonerData(summonerData: SummonerDTO, participants: any): any {
    /* Returns the match data of the searched summoner. */
    let searchedSummoner = participants.find((participant: any) => {
        return participant.puuid == summonerData.puuid
    })
    return searchedSummoner
}

function getSearchedSummonerItems(searchedSummonerData: any): Array<string> {
    /* Return an array of strings containing item IDs or '0' for no item. */
    const itemArray = []
    for (let i=0; i<7; i++) {
        itemArray.push(searchedSummonerData[`item${i}`].toString())
    }
    return itemArray
}

function displaySummonerName(name: string): string {
    /* Displays the user's name limiting the maximum length that can be displayed. */
    const MAX_NAME_LENGTH = 8
    if (name.length > MAX_NAME_LENGTH) {
        return (name.substring(0, MAX_NAME_LENGTH) + '...')
    } else {
        return name
    }
}
