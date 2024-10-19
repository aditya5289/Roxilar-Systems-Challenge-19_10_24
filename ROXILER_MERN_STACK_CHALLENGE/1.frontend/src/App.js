import React from 'react';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme with custom palette settings
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Primary color
        },
        background: {
            default: '#f0f2f5', // Set a default background color
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Dashboard />
            </div>
        </ThemeProvider>
    );
};

export default App;
