import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative py-8 overflow-x-hidden">
        {/* Capa de alimentos flotantes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Ocultas en móvil, visibles desde sm */}
          <img
            src="/images/index/queso.png"
            alt="queso"
            className="hidden sm:block absolute top-40 left-1/4 w-10 md:w-14 lg:w-16"
          />
          <img
            src="/images/index/aguacate.png"
            alt="palta"
            className="hidden sm:block absolute top-32 right-1/4 w-10 md:w-14 lg:w-16"
          />
          <img
            src="/images/index/zanahoria.png"
            alt="zanahoria"
            className="hidden sm:block absolute bottom-16 right-1/4 w-10 md:w-14 lg:w-16"
          />
          <img
            src="/images/index/naranja.png"
            alt="naranja"
            className="hidden sm:block absolute bottom-36 right-1/3 w-8 md:w-10 lg:w-12"
          />
          <img
            src="/images/index/manzana.png"
            alt="manzana"
            className="hidden sm:block absolute bottom-12 left-1/3 w-8 md:w-10 lg:w-12"
          />

          {/* SIEMPRE visibles, incluso en móvil */}
          <img
            src="/images/index/pollo.png"
            alt="pollo"
            className="absolute top-1/2 left-1/5 w-10 md:w-14 lg:w-16"
          />
          <img
            src="/images/index/carne.png"
            alt="carne"
            className="hidden sm:block absolute top-[70%] left-1/3 w-10 md:w-14 lg:w-16"
          />
          <img
            src="/images/index/brocoli.png"
            alt="brócoli"
            className="absolute top-1/2 right-1/5 w-12 md:w-16 lg:w-20"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-center mt-16 mb-6 px-4 z-10">
          Tu comida, tu plan.
          <br />
          Empieza desde tu <br /> nevera.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-center max-w-2xl px-6 mb-8 z-10">
          No necesitas más ingredientes, solo organización. Descubre recetas y
          planifica tu semana usando lo que ya tienes en casa. Rápido,
          inteligente y sin desperdicios.
        </p>

        <img
          src="/images/index/index.png"
          alt="persona"
          className="w-50 -mb-15 md:w-64 lg:w-72"
        />

        <Link
          to="/login"
          className="bg-sage text-white px-6 py-2 rounded-md mb-4 w-auto hover:bg-mint hover:scale-105 transform transition duration-300 text-center text-2xl"
        >
          Iniciar sesión
        </Link>

        <div className="flex flex-col justify-center items-center mb-20 text-xl md:text-2xl z-10">
          <p className="text-lg sm:text-xl md:text-2xl text-center">
            ¿Aún no tienes cuenta?
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-center">
            <a
              className="italic font-bold text-black px-2 py-1 bg-[url('/images/index/fondo_texto.png')] bg-cover bg-center rounded -mr-2"
              href="/registrar"
            >
              ¡Regístrate{" "}
            </a>
            gratis y empieza a planificar mejor!
          </p>
        </div>
      </div>
    </>
  );
};
export default Inicio;
