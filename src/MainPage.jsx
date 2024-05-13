import { Container, Button } from 'react-bootstrap';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const MainPage = () => {
    const { user } = useAuth(); // Getting the user from AuthContext

    return (
        <Container className="mainContainer">
            <div className="content">
            <h2>Book Your Laundry Time </h2>
                    <h1>Right On Your Device.</h1>
                {user ? (
                  <Link to="/book" className="link"><Button className="bookButton">BOOK NOW</Button></Link>
                ) : (
                  <Link to="/login" className="link"><Button className="bookButton">BOOK NOW</Button></Link>
                )}
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
