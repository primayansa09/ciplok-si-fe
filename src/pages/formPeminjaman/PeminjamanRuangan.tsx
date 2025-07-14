import Container from "@mui/material/Container";
import { DefaultPeminjamanRuangan } from "./DefaultPeminjamanRuangan";

export function PeminjamanRuangan (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultPeminjamanRuangan/>            
        </Container>
    )
}