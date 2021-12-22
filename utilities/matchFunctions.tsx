/* Helper functions related to Match, MatchDetails, MatchPlayerDetails components. */

import { MatchDTO, Participant, QueueDisplay, SpellData, SummonerDTO, Team} from '../interfaces'; 

export function displaySummonerName(name: string, maxLength: number = 8): string {
  /* Displays the user's name, shortening the name if it passes the maxLength */

  if (name.length > maxLength) {
      return (name.substring(0, maxLength) + '...')
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

export function getSearchedSummonerData(summonerData: SummonerDTO, participants: Participant[]): Participant {
  /* Returns the match data of the searched summoner. */
  let searchedSummoner = participants.find((participant: Participant) => {
      return participant.puuid == summonerData.puuid
  })
  return searchedSummoner as Participant
}

export function getSummonerSpellImage(
  spellId: number,
  summonerSpellsList: { [key: string]: SpellData }
): string {
  /* Returns the data dragon link for the given summoner spell id */

  let summonerSpellLink;
  for (const [spellName, spellData] of Object.entries(summonerSpellsList)) {
    if ((spellData as SpellData).key == spellId.toString()) {
      summonerSpellLink = (spellData as SpellData).image.full;
    }
  }
  return `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${summonerSpellLink}`;
}

export function getParticipantItems(participantData: Participant): Array<string> {
  /* Return an array of strings containing item IDs or '0' for no item. */
  const itemArray = []
  for (let i=0; i<7; i++) {
      itemArray.push(participantData[`item${i}` as keyof Participant].toString())
  }
  return itemArray
}

export function getQueueType(queueId: number): string {
  /* Return a string detailing the type of match based on the queueId*/
  const stringQueueId = queueId.toString()
  const queueDict: QueueDisplay = {
    '400': 'Normals Draft',
    '420': 'Ranked Solos',
    '430': 'Normals Blind',
    '440': 'Ranked Flex',
    '450': 'ARAM',
  }
  return queueDict[stringQueueId]
}

export function getTeamStats(searchedTeamParticipants: Participant[], opponentTeamParticipants: Participant[], teamsData: Team[]) {
  /* Returns both team statistics to be displayed. */

  const userTeamObjectives = teamsData.find((team: Team) => searchedTeamParticipants[0].teamId == team.teamId).objectives
  const opponentTeamObjectives = teamsData.find((team: Team) => opponentTeamParticipants[0].teamId == team.teamId).objectives

  let teamStats = [
    {name: 'Total Kills', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: Participant) => {return total += participant.kills}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: Participant) => {return total += participant.kills}), 0)},
    {name: 'Total Gold Earned', 
      searchedUserTeamValue: searchedTeamParticipants.reduce(((total: number, participant: Participant) => {return total += participant.goldEarned}), 0),
      opponentTeamValue: opponentTeamParticipants.reduce(((total: number, participant: Participant) => {return total += participant.goldEarned}), 0)},
    {name: 'Barons Killed', searchedUserTeamValue: userTeamObjectives.baron.kills, opponentTeamValue: opponentTeamObjectives.baron.kills},
    {name: 'Dragons Killed', searchedUserTeamValue: userTeamObjectives.dragon.kills, opponentTeamValue: opponentTeamObjectives.dragon.kills},
    {name: 'Towers Destroyed', searchedUserTeamValue: userTeamObjectives.tower.kills, opponentTeamValue: opponentTeamObjectives.tower.kills},
  ]
  
  return teamStats
}

