import React from "react";
import { Container, Grid } from "@mui/material";
import UsersList from "../components/UsersList";

const App = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={6} lg={6}>
                    <UsersList/>
                </Grid>
            </Grid>
        </Container>
    )
};

export default App;