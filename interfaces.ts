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

export interface queueDisplay {
    [queueType: string]: string
}

export interface spellImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface spellData {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: any;
    effect: number[][];
    effectBurn: string[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: spellImage;
    resource: string;
}


/*
export interface spellData {
    [stat: string] : any
}
*/