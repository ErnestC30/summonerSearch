import { Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material"
import { isUint8ClampedArray } from "util/types";

import { SummonerDTO } from '../interfaces'; 

function Match({summonerData, matchData}: {summonerData: SummonerDTO, matchData: any}) {
    /* Component for detailed information on a single match.  */

    const gameDuration = getGameTime(matchData.info.gameDuration)
    const searchedSummonerData = getSearchedSummonerData(summonerData, matchData.info.participants)
    const searchedSummonerItems = getSearchedSummonerItems(searchedSummonerData)
    console.log(searchedSummonerData)
    console.log(searchedSummonerItems)

    return (
        <>
            {/* Render different color background if user won or lost. */}
            <Accordion> 
                <AccordionSummary>
                    <Box>
                        <Box>
                            {gameDuration}
                            {searchedSummonerData.win ? 'victory' : 'defeat'}
                        </Box>
                        <Box>
                            {searchedSummonerData.championName}
                        </Box>
                        <Box>
                            {searchedSummonerData.kills} /&nbsp; 
                            {searchedSummonerData.deaths} /&nbsp;
                            {searchedSummonerData.assists}
                        </Box>
                        <Box>
                            {searchedSummonerItems.map((item, index) => {
                                return <img key={index} src={`https://ddragon.leagueoflegends.com/cdn/11.23.1/img/item/${item}.png`}/>
                            })}
                        </Box>
                    </Box>
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
