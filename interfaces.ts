export interface SummonerDTO {
    accountid: string
    profileIconId: number
    revisionDate: number
    name: string
    id: string
    puuid: string 
    summonerLevel: number
}

export interface riotRouter {
    [region: string]: string
}
