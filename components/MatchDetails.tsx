import { Badge, Box, Grid, Typography } from "@mui/material"


function MatchDetails({matchData, searchedSummonerData}: {matchData: any, searchedSummonerData: any}) {
    /* Displays the detailed information from the given match data. */

    const searchedSummonerTeamId = searchedSummonerData.teamId
    const usersTeamParticipants = matchData.info.participants.filter((participant: any) => participant.teamId == searchedSummonerTeamId)
    const opponentTeamParticipants = matchData.info.participants.filter((participant: any) => participant.teamId != searchedSummonerTeamId)
    const summonerSpells = require('../data/summonerSpells.json')
    
    function getSummonerSpellImage(spellId: string, summonerSpellsList: any): string{
        let summonerSpellLink
        /* LOOK UP TYPECASTING -> CHANGE TYPE (CREATE SPELL INTERFACE INSTEAD OF 'ANY'??)*/
        for(const [spellName, spellData] of Object.entries(summonerSpellsList)) {
            if ((spellData as any).key == spellId) {
                summonerSpellLink = (spellData as any).image.full
            }
        }
        console.log(summonerSpellLink)
        return summonerSpellLink
    }

    return (
      <>
        <Grid container direction="column">
          <Grid item>
            {/* Labels */}
            <Grid container spacing={2}>
              <Grid item xs sx={{ display: "flex" }}>
                <Typography>
                  {searchedSummonerData.win ? "Victory" : "Defeat"} -&nbsp;
                </Typography>
                <Typography>
                  {searchedSummonerTeamId == 100 ? "Blue Team" : "Red team"}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography>KDA</Typography>
              </Grid>
              <Grid item xs>
                <Typography>Damage</Typography>
              </Grid>
              <Grid item xs>
                <Typography>CS</Typography>
              </Grid>
              <Grid item xs>
                <Typography>Items</Typography>
              </Grid>
            </Grid>
            {/* Display searched summoner's team here*/}
            <Grid container direction='column'>
              {usersTeamParticipants.map((participant: any) => {
                return (
                  <Grid item key={participant.puuid}>
                    <Grid container>
                      <Grid item>
                        <Badge
                          badgeContent={participant.champLevel}
                          overlap="circular"
                          sx={{
                            "& .MuiBadge-badge": {
                              color: "white",
                              backgroundColor: "rgba(62, 64, 70, 0.9)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              height: "40px",
                              width: "40px",
                              marginBottom: '3px',
                            }}
                          >
                            <img
                              src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${participant.championName}.png`}
                              height="45px"
                              width="45px"
                              style={{
                                display: "block",
                                marginLeft: "-2px",
                                marginTop: "-2px",
                              }}
                            />
                          </Box>
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Typography>hello</Typography>
                        {getSummonerSpellImage('4', summonerSpells.data)}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export default MatchDetails

