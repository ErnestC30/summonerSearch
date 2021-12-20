import '../styles/globals.css'
import type { AppProps } from 'next/app'

import NavBar from '../components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ThemeProvider theme={theme}>
      <NavBar/>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
  )
}

export default MyApp
