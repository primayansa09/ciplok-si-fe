import Container from "@mui/material/Container";
import { DefaultApproval } from "./DefaultApproval/DefaultApproval";

export function Approval (){
    return(
        <Container maxWidth={false} disableGutters>
            <DefaultApproval/>            
        </Container>
    )
}