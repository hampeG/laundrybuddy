import { Container, Button } from 'react-bootstrap';
import './MainPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const MainPage = () => {
    const { user } = useAuth(); // Getting the user from AuthContext
    const navigate = useNavigate();

    const handleBookNowClick = () => {
        const redirectPath = '/book';
        navigate('/login', { state: { redirectPath } });
    };

    return (
        <Container fluid className="mainContainer">
            <div className="content">
                <h2>Book Your Laundry Time</h2>
                <h1>Right On Your Device.</h1>
                {user ? (
                    <Link to="/book" className="link">
                        <Button className="bookButton">BOOK NOW</Button>
                    </Link>
                ) : (
                    <Button className="bookButton link" onClick={handleBookNowClick}>BOOK NOW</Button>
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
