import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Confirmation from './confirmation';
import Badge from '@mui/material/Badge';
import Checkout from './checkout';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { chartCounter } from '../context/manageContext';

export default function NavBar(props: any) {

    const [incrementListBook, setIncrementListBook] = useAtom(chartCounter);

    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [showCheckout, setShowCheckout] = React.useState(false);
    const [showRows, setShowRows] = React.useState(new Array());

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setShowConfirmation(true);
    };

    const handleOpenCheckout = (event: React.MouseEvent<HTMLElement>) => {
        setShowCheckout(true);
        let monSet = new Map();
        let localSet = localStorage.getItem("listOfBooks");
        if (localSet !== null) {
            monSet = new Map(JSON.parse(localSet));
        }

        setShowRows(Array.from(monSet.values()));
    };

    return (
        <Box sx={{ display: 'flex' }}>


            <Checkout 
                rows={showRows}
                openModal={showCheckout}
                onCloseWindow={(event: boolean) => {setShowCheckout(event)}}
            />

            <Confirmation title="Ready?"
                message="Do you want to log out?"
                openModal={showConfirmation}
                onCloseWindow={(event: boolean) => {setShowConfirmation(event)}}
                onOk={() => {
                    localStorage.removeItem("authenticated");
                    localStorage.removeItem("listOfBooks");
                    localStorage.removeItem("addChartCounter");
                    localStorage.removeItem("userPassword");
                    navigate('/login')
                }}
            />

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            BOOKSHOP
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Tooltip title="Shopping Cart">
                                <Badge badgeContent={incrementListBook} color="secondary">
                                    <IconButton onClick={handleOpenCheckout} sx={{ p: 0 }}>
                                        <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                    </IconButton>
                                </Badge>
                            </Tooltip>
                            <Tooltip title="Log out">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                                    <LogoutIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

