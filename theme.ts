import { lightBlue, red } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  
    interface Palette {
      win: string
      lose: string
    }
    interface PaletteOptions {
      win: string
      lose: string
    }
}  

export const theme: ThemeOptions = createTheme({
    palette: {
        primary: lightBlue,
        secondary: red,
        win: '#b5f0b4',
        lose: '#f0b4b4'
    },
})