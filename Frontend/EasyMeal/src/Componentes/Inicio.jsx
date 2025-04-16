import Header from "./Header";
import Footer from "./Footer";



const Inicio = () => {
    return (
        <>
            <Header />
            <h1 className="text-3xl font-bold mb-7">
                Tu comida, tu plan.<br />Empieza desde tu nevera.
            </h1>
            <p className="max-w-xl text-sm mb-8">
                No necesitas más ingredientes, solo organización.
                Descubre recetas y planifica tu semana usando lo que ya tienes
                en casa. Rápido, inteligente y sin desperdicios.
            </p>
            <img src="/images/index/queso.png" alt="queso" className="absolute top-10 left-16 w-10" />
            <img src="/images/index/aguacate.png" alt="palta" className="absolute top-10 right-16 w-10" />
            <img src="/images/index/brocoli.png" alt="brócoli" className="absolute top-1/2 right-10 w-12" />
            <img src="/images/index/zanahoria.png" alt="zanahoria" className="absolute bottom-10 right-20 w-10" />
            <img src="/images/index/naranja.png" alt="naranja" className="absolute bottom-28 right-36 w-8" />
            <img src="/images/index/manzana.png" alt="manzana" className="absolute bottom-28 left-36 w-8" />
            <img src="/images/index/pollo.png" alt="pollo" className="absolute top-1/2 left-16 w-10" />
            <img src="/images/index/carne.png" alt="carne" className="absolute top-32 left-24 w-10" />

            <img src="/images/index/index.png" alt="persona" className="w-40 mb-6" />

            <button className="bg-green-300 text-white px-6 py-2 rounded-md mb-4 hover:bg-green-400 transition">Iniciar sesión</button>

            <div >
                <img src="/images/index/fondo_texto.png" alt="fondoTextoRegistro" />
                <p >
                    ¿Aún no tienes cuenta? <strong><em>¡Regístrate</em></strong> gratis y empieza a planificar mejor!
                </p>
            </div>
            <Footer />
        </>

    )
}
export default Inicio;