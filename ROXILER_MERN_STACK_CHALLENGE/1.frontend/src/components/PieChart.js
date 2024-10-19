import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { Container, Typography, TextField, Grid, Paper, Box, IconButton, Switch } from '@mui/material';
import { styled } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import theme tools

const ContentWrapper = styled(Box)(({ theme }) => ({
    padding: '30px',
    backgroundColor: theme.palette.background.default,
    borderRadius: '15px',
    boxShadow: theme.palette.mode === 'dark' ? '0px 2px 10px rgba(0, 0, 0, 0.5)' : '0px 2px 10px rgba(0, 0, 0, 0.1)',
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontFamily: 'Roboto, sans-serif',
}));

const CardPaper = styled(Paper)(({ theme }) => ({
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.15)',
    },
}));

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');  // Set default to March
    const [darkMode, setDarkMode] = useState(false);

    const handleMonthChange = (event) => {
        const selectedValue = event.target.value.trim();  // Trim the value to remove extra whitespace
        setSelectedMonth(selectedValue);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const themeIcon = darkMode ? <LightModeIcon /> : <DarkModeIcon />;

    // Create a custom theme
    const customTheme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#4A90E2',
            },
            background: {
                default: darkMode ? '#333' : '#fafafa',
            },
        },
    });

    return (
        <ThemeProvider theme={customTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: customTheme.palette.background.default }}>
                <ContentWrapper>
                    <Container maxWidth="lg">
                        {/* Title, Refresh Button, and Theme Toggle */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <HeaderTypography variant="h4" gutterBottom>
                                Transaction Dashboard
                            </HeaderTypography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="refresh" color="primary" sx={{ marginRight: '10px' }}>
                                    <RefreshIcon />
                                </IconButton>
                                <Switch
                                    checked={darkMode}
                                    onChange={handleThemeChange}
                                    icon={themeIcon}
                                    checkedIcon={themeIcon}
                                />
                            </Box>
                        </Box>

                        {/* Month Selector */}
                        <TextField
                            select
                            label="Select Month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            SelectProps={{ native: true }}
                            variant="outlined"
                            sx={{
                                marginBottom: '30px',
                                width: '220px',
                                display: 'block',
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                            }}
                        >
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </TextField>

                        {/* Dashboard Statistics and Charts */}
                        <Grid container spacing={4}>
                            {/* Statistics Card */}
                            <Grid item xs={12} md={6}>
                                <CardPaper>
                                    <Typography variant="h5" sx={{ color: '#4A90E2', marginBottom: '10px' }}>
                                        Statistics for {selectedMonth}
                                    </Typography>
                                    <Statistics selectedMonth={selectedMonth} />
                                </CardPaper>
                            </Grid>

                            {/* Pie Chart Card */}
                            <Grid item xs={12} md={6}>
                                <CardPaper>
                                    <Typography variant="h5" sx={{ color: '#4A90E2', marginBottom: '10px' }}>
                                        Pie Chart for {selectedMonth}
                                    </Typography>
                                    <PieChart selectedMonth={selectedMonth} />
                                </CardPaper>
                            </Grid>

                            {/* Bar Chart Card */}
                            <Grid item xs={12}>
                                <CardPaper>
                                    <Typography variant="h5" sx={{ color: '#4A90E2', marginBottom: '10px' }}>
                                        Bar Chart for {selectedMonth}
                                    </Typography>
                                    <BarChart selectedMonth={selectedMonth} />
                                </CardPaper>
                            </Grid>

                            {/* Transaction Table Card */}
                            <Grid item xs={12}>
                                <CardPaper>
                                    <Typography variant="h5" sx={{ color: '#4A90E2', marginBottom: '10px' }}>
                                        Transaction Table for {selectedMonth}
                                    </Typography>
                                    <TransactionTable selectedMonth={selectedMonth} />
                                </CardPaper>
                            </Grid>
                        </Grid>
                    </Container>
                </ContentWrapper>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
