import { lightBlue, red, green } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';


declare module '@mui/material/styles' {
  
    interface Palette {
      win: string
      winBG: string
      lose: string
      loseBG: string
    }
    interface PaletteOptions {
      win: string
      winBG: string
      lose: string
      loseBG: string
    }
}  

export const theme: ThemeOptions = createTheme({
    palette: {
        primary: lightBlue,
        secondary: red,
        win: green[300],
        winBG: green[200],
        lose: red[300],
        loseBG: red[200],
    },
})