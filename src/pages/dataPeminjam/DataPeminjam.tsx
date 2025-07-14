import Container from "@mui/material/Container";
import { DefaultDataPeminjam } from "./DefaultDataPeminjam";

export function DataPeminjam (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataPeminjam/>            
        </Container>
    )
}