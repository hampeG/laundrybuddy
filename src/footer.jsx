import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12 text-center">
                        <div className="social-icons">
                            <a href="#" className="icon"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#" className="icon"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebook} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
