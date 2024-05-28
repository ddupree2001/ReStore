import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

interface Props {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: Props) {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch onChange={() => setDarkMode(!darkMode)} />
            </Toolbar>
        </AppBar>
    )
}