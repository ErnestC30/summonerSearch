import { MatchDTO, SummonerDTO } from "../interfaces";
import { useEffect, useState, useRef, useCallback } from "react";
import { CircularProgress, Typography } from "@mui/material";

import Match from "./Match";
import useMatchSearch from "../useMatchSearch";

export default function MatchesContainer({
  summonerData,
  region,
}: {
  summonerData: SummonerDTO;
  region: string;
}) {
  /* Container to hold all the matches of the user. */
  const [pageNumber, setPageNumber] = useState(0);
  const puuid = summonerData.puuid;

  const { arrayOfMatches, loading } = useMatchSearch(puuid, pageNumber, region);

  const observer = useRef<IntersectionObserver | null>(null);
  const secondLastMatchElementRef = useCallback(
    //Updates reference node of intersection observer when new matches are loaded
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  return (
    <>
      {arrayOfMatches.length > 0 && (
        <div>
          {arrayOfMatches.map((match: MatchDTO, index: number) => {
            if (index == arrayOfMatches.length - 2) {
              return (
                <div
                  ref={secondLastMatchElementRef}
                  key={match.metadata.matchId}
                >
                  <Match
                    key={match.metadata.matchId}
                    summonerData={summonerData}
                    matchData={match}
                  ></Match>
                </div>
              );
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
      )}
      <div style={{ height: "60px", textAlign: "center", marginTop: '20px' }}>
        {loading ? <CircularProgress disableShrink /> : <span>&nbsp;</span>}
      </div>
    </>
  );
}