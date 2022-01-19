import { Grid, Typography} from "@mui/material"

import { LeagueData, QueueDisplay } from '../interfaces'; 
import Image from 'next/image'

function PlayerLeague({leagueInfo}: {leagueInfo: LeagueData}) {
    /* Component displaying a user's information for a given queue type. */

    const queueDisplay: QueueDisplay = {
        'RANKED_SOLO_5x5': 'Ranked Solo/Duo',
        'RANKED_FLEX_SR': 'Ranked Flex'
    }

    function displayLeagueTier(tier: string, rank: string): string {
        return `${tier.charAt(0)}${tier.slice(1).toLowerCase()} ${rank}` 
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item>
                    <Image src={`/Emblem_${leagueInfo.tier}.png`} width='75px' height='75px'/>
                </Grid>
                <Grid item>
                    <Grid container direction='column'>
                        <Typography variant='body2'>{queueDisplay[leagueInfo.queueType]}</Typography>
                        <Typography variant='body2'>{displayLeagueTier(leagueInfo.tier, leagueInfo.rank)}</Typography>
                        <Typography variant='body2'>LP: {leagueInfo.leaguePoints}</Typography>
                        <Typography variant='body2'>W/L: {leagueInfo.wins}/{leagueInfo.losses}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default PlayerLeague