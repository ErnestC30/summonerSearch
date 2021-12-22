import React from "react";
import { GetServerSideProps } from 'next'
import { Container } from '@mui/material';

import { RegionContext } from "../../../RegionContext";
import { MatchDTO, SummonerDTO, RiotRouter, LeagueData } from '../../../interfaces'; 
import Profile from '../../../components/Profile'
import Match from '../../../components/Match'

//Sets the number of matches that will be queried from riot API
const NUM_OF_MATCHES = 5

const UserInfo = ({summonerData, arrayOfMatchData, arrayOfLeaguesData, region}: {summonerData: SummonerDTO, arrayOfMatchData: MatchDTO[], arrayOfLeaguesData: LeagueData, region: string}) => {

    return (
      <>
        <RegionContext.Provider value={region}>
          <Container sx={{ minWidth: "933px" }}>
            <Profile
              summonerData={summonerData}
              arrayOfLeaguesData={arrayOfLeaguesData}
            />
            {/* Array of Match comoponents */}
            {arrayOfMatchData.map((match: MatchDTO) => {
              return (
                <Match
                  key={match.metadata.matchId}
                  summonerData={summonerData}
                  matchData={match}
                ></Match>
              );
            })}
          </Container>
        </RegionContext.Provider>
      </>
    );
}

export default UserInfo

function getRouter(region: string | string[] | undefined): string {
    //Returns the router associated with the given region.
    
    const strRegion = String(region)
    const routerMap: RiotRouter = {
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
    const getSummonerResponse = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(username as string)}?api_key=${riotKey}`)
    const summonerData: SummonerDTO = await getSummonerResponse.json()
    if(summonerData.status?.status_code == '404') {
      return {
        notFound: true
      }
    }
    
    //Find the user's recent matches by ID. --> can add more optional parameters
    const puuid = summonerData.puuid
    const getMatchesIdResponse = await fetch(`https://${router}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${NUM_OF_MATCHES}&api_key=${riotKey}`)
    const matchesIdData: Array<number> = await getMatchesIdResponse.json()

    //Get the data of recent matches.
    let arrayOfMatchData: MatchDTO[] = []
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
            region,
        },
    }
}