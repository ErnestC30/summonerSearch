import { useEffect, useState } from "react";
import { MatchDTO, RiotRouter } from "./interfaces";



export default function useMatchSearch(searchedPuuid: string, pageNumber: number, region: string) {
    /* Calls the backend api to fetch next set of match data to be added. */

    const numOfMatches = 10
    const router = getRouter(region)
    const [arrayOfMatches, setArrayOfMatches] = useState<[]|MatchDTO[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        //Load match data
        setLoading(true)

        async function fetchMatches() {
            /* Call backend API to fetch data without exposing riot api key. */
            const res = await fetch('http://localhost:3000/api/matches', {
                method: 'POST',
                body: JSON.stringify({puuid: searchedPuuid, pageNumber: pageNumber, numOfMatches: numOfMatches, region: region }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            const data = await res.json()
            //console.log(`useMatchSearch returned: ${data}`)
            setArrayOfMatches(prevArrayOfMatches => {
                return [...prevArrayOfMatches, ...data]
            })
            setLoading(false)
        
        }
        fetchMatches()
    }, [pageNumber])

    return { arrayOfMatches, loading }
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