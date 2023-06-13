import { Typography, Link, Grid } from "@mui/material";
import React, {useState} from "react";
import HomePage from "./HomePage";
import MapPage from "./MapPage";
import ItineraryPage from "./ItineraryPage";


function MainMenu() {
    let content;
    const [flag, setFlag] = useState(0);

    if (flag === 0) {
        content = <HomePage />
    } else if (flag === 1) {
        content = <MapPage />
    } else if (flag === 2) {
        content = <ItineraryPage />
    }
    return (
        <div style={{margin: '10px'}}>
            <Grid container direction="column" sx={{ padding: '50px' }}>
                <Grid item>
                    <Typography>
                        <Link href="#" onClick={() => setFlag(0)} sx={{ marginRight: "1rem" }}>
                            Home
                        </Link>
                        <Link href="#" onClick={() => setFlag(1)} sx={{ marginRight: "1rem" }}>
                            Map
                        </Link>
                        <Link href="#" onClick={() => setFlag(2)} sx={{ marginRight: "1rem" }}>
                            Itinerary
                        </Link>

                    </Typography>
                </Grid>
                <Grid item sx={{ bgcolor: 'white'}}>
                    {content}
                </Grid>
            </Grid>     
        </div>       
    );
}


export default MainMenu;