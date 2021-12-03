import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material"

import { theme } from '../theme'
import { SummonerDTO } from '../interfaces'; 

function Match({summonerData, matchData}: {summonerData: SummonerDTO, matchData: any}) {
    /* Component for detailed information on a single match.  */

    const gameDuration = getGameTime(matchData.info.gameDuration)
    const searchedSummonerData = getSearchedSummonerData(summonerData, matchData.info.participants)
    const searchedSummonerItems = getSearchedSummonerItems(searchedSummonerData)

    return (
        <>
            <Accordion sx={{backgroundColor: searchedSummonerData.win ? 'win' : 'lose'}}> 
                <AccordionSummary >
                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography>{gameDuration}</Typography>
                            <Typography>{searchedSummonerData.win ? 'Victory' : 'Defeat'}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{searchedSummonerData.championName}</Typography>
                            <img width='50px'
                                 height='50px'
                                 src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${searchedSummonerData.championName}.png`}/>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {searchedSummonerData.kills} /&nbsp; 
                                {searchedSummonerData.deaths} /&nbsp;
                                {searchedSummonerData.assists}
                            </Typography>
                            <Typography>K/D/A: {((searchedSummonerData.kills + searchedSummonerData.assists) / searchedSummonerData.deaths).toFixed(2)}</Typography>
                        </Grid>
                        <Grid item sx={{display: 'flex'}}>
                            {searchedSummonerItems.map((item, index) => {
                                {/* Renders item images or empty placeholder. -> MIGHT NEED TO CHANGE TO GRID FORMAT */}
                                return item != '0' ? <img key={index} 
                                            width='30px'
                                            height='30px'
                                            src={`https://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item}.png`}/>
                                        : <Box key={index} sx={{display: 'inline', width: '30px', height: '30px', borderStyle: 'solid', borderColor: 'black'}}></Box>
                            })}
                        </Grid>
                        <Grid item>
                            {/* GRID TO DIVIDE PARTICIPANTS IN 2 GROUPS?*/}
                            {matchData.info.participants.map((participant: any) => {
                                return <Typography 
                                        key={participant.puuid}
                                        variant='body2'
                                        >
                                            {participant.summonerName}</Typography>
                            })}
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Hello Again</Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
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
