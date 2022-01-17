import { MatchDTO, SummonerDTO } from "../interfaces";
import { useEffect, useState, useRef, useCallback, MutableRefObject } from "react";
import Match from "./Match";
import useMatchSearch from "../useMatchSearch";

export default function MatchesContainer({summonerData, region} : {summonerData: SummonerDTO, region: string}) {
  const [pageNumber, setPageNumber] = useState(0); 
  const puuid = summonerData.puuid
 
  const { arrayOfMatches, loading } = useMatchSearch(
    puuid,
    pageNumber,
    region
  );

  const observer = useRef<IntersectionObserver|null>(null)
  const lastMatchElementRef = useCallback(node => {
    if (loading) {return}
    if (observer.current) {observer.current.disconnect()}
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(prevPageNum => prevPageNum + 1)
      }
    })
    if (node) {observer.current.observe(node)}
  }, [loading])

  return (
    <>
      {arrayOfMatches.length > 0 ? (
        <div>
        {arrayOfMatches.map((match: MatchDTO, index: number) => {
          if (index + 1 == arrayOfMatches.length) {
            return (
              <div ref={lastMatchElementRef} key={match.metadata.matchId}> 
                <Match
                key={match.metadata.matchId}
                summonerData={summonerData}
                matchData={match}
              ></Match>
            </div>
            )
          }
          return (
            <Match
              key={match.metadata.matchId}
              summonerData={summonerData}
              matchData={match}
            ></Match>
          );
        })}
      </div>
      ) : (
        /* Loading Image */
        <div>Loading...</div>
      ) 
      }
    </>
  );
}