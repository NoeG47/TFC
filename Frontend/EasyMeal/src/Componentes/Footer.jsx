import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";
import "../estilos/Footer.css"

const Footer = () => {

    return (
        <footer className="footer">
            <img
                src="../images/logo.ico"
                alt="EasyMeal Logo"
                className="logo w-12 h-auto"
            />
            <p className="footer-credits">Easymeal © Todos los derechos reservados</p>
            <div className="footer-container">
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="icon facebook" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon instagram" />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="icon tiktok" />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="icon youtube" />
                    </a>
                </div>
            </div>

        </footer>
    )
}
export default Footer;

