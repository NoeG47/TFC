import Header from "./Header";
import Footer from "./Footer";

const Inicio = () => {
    return (
        <>
            <Header />
            <h1 className="text-3xl font-bold mb-7 text-center mt-20 z-10">
                Tu comida, tu plan.<br />Empieza desde tu <br/> nevera.
            </h1>
            <p className="max-w-xl text-md mb-7 text-center z-10">
                No necesitas más ingredientes, solo organización.
                Descubre recetas y planifica tu semana usando lo que ya tienes
                en casa. Rápido, inteligente y sin desperdicios.
            </p>
            <img src="/images/index/queso.png" alt="queso" className="absolute top-40 left-16 w-10" />
            <img src="/images/index/aguacate.png" alt="palta" className="absolute top-40 right-16 w-10" />
            <img src="/images/index/brocoli.png" alt="brócoli" className="absolute top-1/2 right-10 w-12" />
            <img src="/images/index/zanahoria.png" alt="zanahoria" className="absolute bottom-0.5 right-20 w-10" />
            <img src="/images/index/naranja.png" alt="naranja" className="absolute bottom-28 right-36 w-8" />
            <img src="/images/index/manzana.png" alt="manzana" className="absolute bottom-0.5 left-36 w-8" />
            <img src="/images/index/pollo.png" alt="pollo" className="absolute top-1/2 left-16 w-10" />
            <img src="/images/index/carne.png" alt="carne" className="absolute top-100 left-24 w-10" />
            <img src="/images/index/index.png" alt="persona" className="w-50 -mb-15" />

            <button className="bg-sage text-white px-6 py-2 rounded-md mb-4 w-full sm:w-auto hover:bg-mint transition duration-300">Iniciar sesión</button>

            <div className="flex flex-col justify-center items-center mb-20"
            >
                <p>¿Aún no tienes cuenta?</p>
                <p>
                    <a className="italic font-bold text-black px-2 py-1 bg-[url('/images/index/fondo_texto.png')] bg-cover bg-center rounded -mr-2" href="#">¡Regístrate </a>gratis y empieza a planificar mejor!
                </p>

            </div>
            <Footer />
        </>

    )
}
export default Inicio;