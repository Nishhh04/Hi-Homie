import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20"></div>


      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="ml-10 max-w-3xl">
          <h1 className="text-white text-2xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
            Hi Homie! <br />
            Let’s Find the Home <br />
            That Feels Like <span className="text-amber-400">Yours </span>
          </h1>


          <p className="mt-6 text-white text-lg md:text-xl drop-shadow-md">
            Discover premium residential and rental properties with Hi Homie.
            Your trusted partner for finding the perfect place to call home.
          </p>

          <Link
            to="/properties"
            className="inline-block mt-8 bg-amber-400 text-[#4a2f1b] px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition"
          >
            View Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
