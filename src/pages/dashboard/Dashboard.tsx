import Container from "@mui/material/Container";
import { DefaultDashboard } from "./DefaultDashboard";

export function Dashboard (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDashboard/>            
        </Container>
    )
}