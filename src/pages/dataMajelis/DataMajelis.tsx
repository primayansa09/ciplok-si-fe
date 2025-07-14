import Container from "@mui/material/Container";
import { DefaultDataMajelis } from "./DefaultDataMajelis";

export function DataMajelis (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataMajelis/>            
        </Container>
    )
}