import Container from "@/components/Container";
import NavBreadcrumb from "@/components/NavBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinPage = () => {
    return (
        <Container containerTitle="Join Game">
            <NavBreadcrumb/>
            <Label>Code</Label>
            <Input placeholder="Enter code"></Input>

            <Label>Name</Label>
            <Input placeholder="Enter name"></Input>

            <Button>Join Game</Button>
        </Container>
    )
}

export default JoinPage;