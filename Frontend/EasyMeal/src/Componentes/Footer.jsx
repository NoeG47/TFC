import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className="w-full flex flex-col md:flex-row justify-between items-center bg-peach p-2">
            <img
                src="../images/logo.ico"
                alt="EasyMeal Logo"
                className="w-12 md:w-16 lg:w-20 h-auto"
            />
            <div className="flex flex-col items-center">
                <div className="font-bold mb-2 text-center text-xs md:text-sm lg:text-base">
                    <p>Easymeal © Todos los derechos reservados</p>
                    <div className="flex justify-center gap-5 pt-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-2xl text-[#1877f2] transition-transform duration-300 hover:scale-125 hover:opacity-80" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl text-[#e4405f] transition-transform duration-300 hover:scale-125 hover:opacity-80" />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="text-2xl text-black transition-transform duration-300 hover:scale-125 hover:opacity-80" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-2xl text-[#ff0000] transition-transform duration-300 hover:scale-125 hover:opacity-80" />
                        </a>
                    </div>

                </div>
            </div>
            <div className="hidden md:block w-20">
                {/* div vacío para que quede alineado al centro y que se quite cuando se haga móvil */}
            </div>

        </footer>
    )
}
export default Footer;

