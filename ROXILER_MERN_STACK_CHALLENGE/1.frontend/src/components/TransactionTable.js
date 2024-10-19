import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Pagination, 
    CircularProgress, 
    IconButton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import the search icon

const TransactionTable = ({ selectedMonth }) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');

    // Fetch transactions from the API
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            console.log(`Fetching transactions for ${selectedMonth}, page ${page}, perPage ${perPage}, search "${search}"`);
            const response = await axios.get(`http://localhost:5000/api/transactions`, {
                params: { month: selectedMonth, page, perPage, search }
            });
            setTransactions(response.data.transactions);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [page, selectedMonth, search]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options); // Returns a human-readable date format
    };

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '20px' }}
                InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
            <TableContainer style={{ border: '2px solid #4A90E2', borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>S.No</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Sold</TableCell>
                            <TableCell align="center" style={{ border: '2px solid #ccc', color: '#4A90E2', fontWeight: 'bold' }}>Date of Sale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <TableRow key={transaction._id}>
                                        <TableCell align="center" style={{ border: '2px solid #ccc' }}>{(page - 1) * perPage + index + 1}</TableCell>
                                        <TableCell align="center" style={{ border: '2px solid #ccc' }}>
                                            <img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>{transaction.title}</TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>{transaction.description}</TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>${transaction.price}</TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>{transaction.category}</TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                                        <TableCell style={{ border: '2px solid #ccc' }}>{formatDate(transaction.dateOfSale)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(total / perPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default TransactionTable;
