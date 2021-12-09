import { Grid, Typography} from "@mui/material"
import Image from 'next/image'

import { queueDisplay } from '../interfaces'; 

function PlayerLeague({leagueInfo}: {leagueInfo: any}) {
    /* Component displaying a user's information for a given queue type. */

    const queueDisplay: queueDisplay = {
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
                    {/* image */}
                    <Image src={`/Emblem_${leagueInfo.tier}.png`} width='75px' height='75px'/>
                </Grid>
                <Grid item>
                    <Grid container direction='column'>
                        {/* info */}
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