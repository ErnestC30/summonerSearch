import { MatchDTO, SummonerDTO } from "../interfaces";
import { useEffect, useState } from "react";
import Match from "./Match";
import useMatchSearch from "../useMatchSearch";

const numOfMatches = 5

export default function MatchesContainer({summonerData, region} : {summonerData: SummonerDTO, region: string}) {
  const [pageNumber, setPageNumber] = useState(1); //will need to convert to num?
  const { arrayOfMatches, loading } = useMatchSearch(
    summonerData.puuid,
    pageNumber,
    numOfMatches,
    region
  );

  //load matches based off summonerdata - with useMatchSearch?
  //display matches using Match component

  //'if loading' check needed before rendering matches?
  console.log(loading)
  return (
    <>
      {loading && arrayOfMatches.length == 0 ? (
        <div>Loading</div>
      ) : (
        <div>
          {arrayOfMatches.map((match: MatchDTO) => {
            return (
              <Match
                key={match.metadata.matchId}
                summonerData={summonerData}
                matchData={match}
              ></Match>
            );
          })}
        </div>
      )}
    </>
  );
}