import { GetServerSideProps } from 'next'
import { Container } from '@mui/material';

import { RegionContext } from "../../../RegionContext";
import { SummonerDTO, RiotRouter, LeagueData } from '../../../interfaces'; 
import Profile from '../../../components/Profile'
import MatchesContainer from "../../../components/MatchesContainer";

//Sets the number of matches that will be queried from riot API

const UserInfo = ({summonerData, arrayOfLeaguesData, region}: {summonerData: SummonerDTO, arrayOfLeaguesData: LeagueData[], region: string}) => {
    
    return (
      <>
        <RegionContext.Provider value={region}>
          <Container sx={{ minWidth: "933px" }}>
            <Profile
              summonerData={summonerData}
              arrayOfLeaguesData={arrayOfLeaguesData}
            />
            {/* Container containing the array of matches. */}
            <MatchesContainer summonerData={summonerData} region={region}></MatchesContainer>
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

    const { username, region } = context.query
    const router = getRouter(region)

    //Fetch user's puuid and other information.
    const getSummonerResponse = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(username as string)}?api_key=${riotKey}`)
    const summonerData: SummonerDTO = await getSummonerResponse.json()
    if(summonerData.status?.status_code == '404') {
      return {
        notFound: true
      }
    }

    //Fetch user's leagues for profile.
    const summonerId = summonerData.id
    let leaguesResponse = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${riotKey}`)
    let arrayOfLeaguesData = await leaguesResponse.json()
    
    return {
        props: {
            summonerData,
            arrayOfLeaguesData,
            region,
        },
    }
}