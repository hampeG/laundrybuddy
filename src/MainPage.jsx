import { Container, Button } from 'react-bootstrap';
import './MainPage.css';

const MainPage = () => {
    return (
        <Container fluid className="mainContainer">
            <div className="content">
            <h2>Book Your Laundry Time </h2>
                    <h1>Right On Your Device!</h1>
                <Button className="bookButton">BOOK NOW!</Button>
            </div>
            <img 
                src="src/images/laundry-hero.png"
                alt="Laundry Buddy"
                className="heroImage"
            />
        </Container>
    );
};

export default MainPage;

