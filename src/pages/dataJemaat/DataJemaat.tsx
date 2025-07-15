import Container from "@mui/material/Container";
import { DefaultDataJemaat } from "./DefaultDataJemaat";

export function DataJemaat (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultDataJemaat/>            
        </Container>
    )
}