import Container from "@mui/material/Container";
import { DefaultDataKegiatan } from "./DefaultDataKegiatan";

export function DataKegiatan (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataKegiatan/>            
        </Container>
    )
}