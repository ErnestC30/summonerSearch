import { Badge, Box, Grid, Link, Typography } from "@mui/material"
import { useContext } from "react"

import { getChampionName, getParticipantItems, getSummonerSpellImage } from "../utilities/matchFunctions";
import { RegionContext } from "../RegionContext";

export default function MatchPlayerDetails({ participant }: { participant: any }) {
  /* Returns a single participant's match details. */

  const summonerSpells = require("../data/summonerSpells.json");
  const participantItems = getParticipantItems(participant)
  const region = useContext(RegionContext)

  return (
    <>
      <Grid item sx={{ maxHeight: "50px" }}>
        <Grid container columns={17} spacing={1} alignItems="center">
          {/* Participant's champion, summoner spells, and name. */}
          <Grid item xs={4}>
            <Box>
              <Grid container columnSpacing={1} alignItems="center">
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
                        marginBottom: "3px",
                      }}
                    >
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${getChampionName(participant.championName)}.png`}
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
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <img
                      src={getSummonerSpellImage(
                        participant.summoner1Id,
                        summonerSpells.data
                      )}
                      height="20px"
                      width="20px"
                    />
                    <img
                      src={getSummonerSpellImage(
                        participant.summoner2Id,
                        summonerSpells.data
                      )}
                      height="20px"
                      width="20px"
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography align="center">
                    <Link
                      href={`/${region}/user/${participant.summonerName}`}
                      underline="hover"
                      color="inherit"
                    >
                      {participant.summonerName}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* KDA */}
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography align="center">
                {participant.kills} /&nbsp;
                {participant.deaths} /&nbsp;
                {participant.assists}
              </Typography>
              <Typography variant="body2" align="center">
                KDA:
                {(
                  (participant.kills + participant.assists) /
                  participant.deaths
                ).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">
              {participant.totalDamageDealtToChampions}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">
              {participant.totalMinionsKilled +
                participant.neutralMinionsKilled}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">{participant.goldEarned}</Typography>
          </Grid>
          {/* Participant's items */}
          <Grid item xs>
            <Grid container spacing={0.25} justifyContent="center">
              {participantItems.map((item, index) => {
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
        </Grid>
      </Grid>
    </>
  );
}
