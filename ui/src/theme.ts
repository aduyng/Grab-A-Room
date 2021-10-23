import createTheme, {ThemeOptions} from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#e50000',
        },
        secondary: {
            main: '#007b94',
        },
        background: {
            default: '#f6f6f7',
        },
        text: {
            primary: '#121315',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
        },
        h6: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        },
        h5: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        },
        h4: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        },
        h3: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        },
        h2: {
            fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
        },
        body1: {
            lineHeight: 1.5,
        },
    },
};

export default responsiveFontSizes(createTheme(themeOptions));
