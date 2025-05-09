import Container from "@/components/Container";
import NavBreadcrumb from "@/components/NavBreadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinPage = () => {
    return (
        <Container containerTitle="Join Game">
            <Label>Code</Label>
            <Input placeholder="Enter code"></Input>

            <Label>Name</Label>
            <Input placeholder="Enter name"></Input>
        </Container>
    )
}

export default JoinPage;