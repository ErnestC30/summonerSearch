import { GetServerSideProps } from 'next'
import { Container } from '@mui/material';

import { SummonerDTO, riotRouter } from '../../../interfaces'; 
import Profile from '../../../components/Profile'
import Match from '../../../components/Match'

const NUM_OF_MATCHES = 5

const UserInfo = ({summonerData, arrayOfMatchData, arrayOfLeaguesData}: {summonerData: SummonerDTO, arrayOfMatchData: any, arrayOfLeaguesData: any}) => {

    let matches = arrayOfMatchData.map((match: any, index: number) => {
        return <Match key={match.metadata.matchId} summonerData={summonerData} matchData={match}></Match>
    })

    //Render Match components
    return (
        <>
            <Container>
                <Profile summonerData={summonerData} arrayOfLeaguesData={arrayOfLeaguesData}></Profile>
                {/* List of matches */}
                {matches} 
            </Container>
        </>
    )
}

export default UserInfo

function getRouter(region: string | string[] | undefined): string {
    //Returns the router associated with the given region.
    
    const strRegion = String(region)
    const routerMap: riotRouter = {
        'NA1': 'americas',
        'BR1': 'americas',
        'EUW1': 'europe',
        'EUN1': 'europe',
        'KR': 'asia',
        'JP1': 'asia',
    }
    return routerMap[strRegion]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const riotKey = process.env.RIOT_API

    /* NEED TO HANDLE ERRORS - IF DATA CANNOT BE FETCHED*/

    const {username, region} = context.query
    const router = getRouter(region)

    //Find user's information.
    const getSummonerResponse = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${riotKey}`)
    const summonerData: SummonerDTO = await getSummonerResponse.json()
    
    //Find the user's recent matches by ID. --> can add more optional parameters
    const puuid = summonerData.puuid
    const getMatchesIdResponse = await fetch(`https://${router}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${NUM_OF_MATCHES}&api_key=${riotKey}`)
    const matchesIdData: Array<number> = await getMatchesIdResponse.json()

    //Get the data of recent matches.
    let arrayOfMatchData = []
    for (let matchId of matchesIdData) {
        let matchResponse = await fetch(`https://${router}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${riotKey}`)
        let matchData = await matchResponse.json()
        arrayOfMatchData.push(matchData)
    }

    const summonerId = summonerData.id
    let leaguesResponse = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${riotKey}`)
    let arrayOfLeaguesData = await leaguesResponse.json()

    //console.log(summonerData)
    //console.log(matchesIdData)
    //console.log(arrayOfMatchData[0])
    
    return {
        props: {
            summonerData,
            arrayOfMatchData,
            arrayOfLeaguesData,
        },
    }
}