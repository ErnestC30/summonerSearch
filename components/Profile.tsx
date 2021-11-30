import { Box, Typography } from "@mui/material"

function Profile({summonerData}: {summonerData: any}) {
  return (
    <>
      <Box>
        <img src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/${summonerData.profileIconId}.png`}></img>
      </Box>
    </>
  );
}

export default Profile 