/* Helper functions related to Match, MatchDetails, MatchPlayerDetails components. */

import { queueDisplay, spellData, SummonerDTO } from '../interfaces'; 

export function displaySummonerName(name: string, maxLength: number = 8): string {
  /* Displays the user's name limiting the maximum length that can be displayed. */
  const MAX_NAME_LENGTH = maxLength
  if (name.length > MAX_NAME_LENGTH) {
      return (name.substring(0, MAX_NAME_LENGTH) + '...')
  } else {
      return name
  }
}

export function getChampionName(championName: string): string {
  /* Returns the refactored champion name if it does not match the data dragon file structure. */

    if (championName == "FiddleSticks") { 
      return 'Fiddlesticks'
    }
    return championName
  }
  
export function getGameTime(timeInSeconds: number): string {
    /* Returns the game duration in string format. */

    let minutes = Math.floor(timeInSeconds / 60)
    let seconds = timeInSeconds - (minutes * 60)
    return `${minutes}min ${seconds}sec`
}

export function getSearchedSummonerData(summonerData: SummonerDTO, participants: any): any {
  /* Returns the match data of the searched summoner. */
  let searchedSummoner = participants.find((participant: any) => {
      return participant.puuid == summonerData.puuid
  })
  return searchedSummoner
}

export function getSummonerSpellImage(
  spellId: string,
  summonerSpellsList: any
): string {
  let summonerSpellLink;
  for (const [spellName, spellData] of Object.entries(summonerSpellsList)) {
    if ((spellData as spellData).key == spellId) {
      summonerSpellLink = (spellData as spellData).image.full;
    }
  }
  return `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${summonerSpellLink}`;
}

export function getParticipantItems(searchedSummonerData: any): Array<string> {
  /* Return an array of strings containing item IDs or '0' for no item. */
  const itemArray = []
  for (let i=0; i<7; i++) {
      itemArray.push(searchedSummonerData[`item${i}`].toString())
  }
  return itemArray
}

export function getQueueType(queueId: number): string {
  /* Return a string detailing the type of match based on the queueId*/
  const stringQueueId = queueId.toString()
  const queueDict: queueDisplay = {
    '400': 'Normals Draft',
    '420': 'Ranked Solos',
    '430': 'Normals Blind',
    '440': 'Ranked Flex',
    '450': 'ARAM',
  }
  return queueDict[stringQueueId]
}

export function getTeamStats(searchedTeamParticipants: any, opponentTeamParticipants: any, matchData: any) {
  /* Returns both team statistics to be displayed. */

  let userTeamObjectives = matchData.info.teams.find((team: any) => searchedTeamParticipants[0].teamId == team.teamId).objectives
  let opponentTeamObjectives = matchData.info.teams.find((team: any) => opponentTeamParticipants[0].teamId == team.teamId).objectives

  let teamStats = [
    {name: 'Total Kills', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.kills}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.kills}), 0)},
    {name: 'Total Gold Earned', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.goldEarned}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: any) => {return total += participant.goldEarned}), 0)},
    {name: 'Barons Killed', searchedUserTeamValue: userTeamObjectives.baron.kills, opponentTeamValue: opponentTeamObjectives.baron.kills},
    {name: 'Dragons Killed', searchedUserTeamValue: userTeamObjectives.dragon.kills, opponentTeamValue: opponentTeamObjectives.dragon.kills},
    {name: 'Towers Destroyed', searchedUserTeamValue: userTeamObjectives.tower.kills, opponentTeamValue: opponentTeamObjectives.tower.kills},
  ]
  
  return teamStats
}

