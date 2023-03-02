import ItemListComponent from "./item-list/ItemList.component";
import { Container } from "./styles/index.styled";

export default function MainComponent(props) {
    return (
        <>
            <Container>
                <ItemListComponent />
            </Container>
        </>
    );
}