import { Box, Typography } from "@mui/material"
import Link from 'next/link'

export default function Custom404() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Typography variant='h5' sx={{marginBottom: '10px'}}>
          User could not be found, check if username or region is incorrect.
        </Typography>
        <Link href="/">
          <Typography>Click to return to home page.</Typography>
        </Link>
      </Box>
    )
  }