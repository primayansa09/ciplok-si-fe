import Container from "@mui/material/Container";
import { DefaultDataRuangan } from "./DefaultDataRuangan";

export function DataRuangan (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataRuangan/>            
        </Container>
    )
}