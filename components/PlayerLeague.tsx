import { Grid, Typography} from "@mui/material"
import Image from 'next/image'

import { queueDisplay } from '../interfaces'; 

function PlayerLeague({leagueInfo}: {leagueInfo: any}) {
    /* Component displaying a user's information for a given queue type. */

    const queueDisplay: queueDisplay = {
        'RANKED_SOLO_5x5': 'Ranked Solo/Duo',
        'RANKED_FLEX_SR': 'Ranked Flex'
    }

    return (
        <>
            <Grid container>
                <Grid item>
                    {/* image */}
                    <Image src={`/Emblem_${leagueInfo.tier}.png`} width='75px' height='75px'/>
                </Grid>
                <Grid item>
                    <Grid container direction='column'>
                        {/* info */}
                        <Typography>{queueDisplay[leagueInfo.queueType]}</Typography>
                        <Typography>LP: {leagueInfo.leaguePoints}</Typography>
                        <Typography>Wins: {leagueInfo.wins}</Typography>
                        <Typography>Losses: {leagueInfo.losses}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default PlayerLeague