import type { NextApiRequest, NextApiResponse } from 'next'
import { MatchDTO, RiotRouter } from '../../../interfaces'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchDTO[] | Data>
) {
  
  //Fetch and returns an array of match data
  if (req.method === 'POST') {
    console.log('Fetching data from Riot...')
    const riotKey = process.env.RIOT_API
    const {puuid, pageNumber, numOfMatches, region} = req.body
    const router = getRouter(region)

    //Get an array of matchIds using the user's 'puuid'.
    const getMatchesIdResponse = await fetch(`https://${router}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numOfMatches}&api_key=${riotKey}`)
    const matchesIdData: Array<number> = await getMatchesIdResponse.json()

    //Get the detailed match data using the matchId and store into an array.
    let arrayOfMatchData: MatchDTO[] = []
    for (let matchId of matchesIdData) {
        let matchResponse = await fetch(`https://${router}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${riotKey}`)
        let matchData = await matchResponse.json()
        arrayOfMatchData.push(matchData)
    }
    res.status(200).json(arrayOfMatchData)
  } else {
  res.status(200).json({ message: 'Error: Could not return data from Riot API.' })
  }
}

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
