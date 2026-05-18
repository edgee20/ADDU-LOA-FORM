import adduBG from "../assets/images/addu-bg.png";
import adduSeal from "../assets/images/addu-seal-trans.png";
import googleIcon from "../assets/images/google-icon.png";

export default function Auth() {
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ fontFamily: "'Trajan', sans-serif" }}
    >
      {/* Background Image */}
      <img
        src={adduBG}
        alt="ADDU background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Container - Centered on mobile, left-aligned on desktop */}
      <div className="relative w-full h-full flex flex-col items-center md:items-start justify-center px-3 sm:px-6 md:px-10 lg:pl-16 xl:pl-24">
        {/* ADDU Seal - Top right on desktop, above text on mobile */}
        <div className="md:absolute md:top-8 md:right-8 lg:top-12 lg:right-12 xl:top-16 xl:right-16 mb-6 sm:mb-8 md:mb-0 z-20">
          <img
            src={adduSeal}
            alt="ADDU seal"
            className="w-32 sm:w-40 md:w-56 lg:w-72 h-32 sm:h-40 md:h-56 lg:h-72 opacity-95"
          />
        </div>

        {/* Text Content - Centered on mobile, left-aligned on desktop */}
        <div className="z-10 max-w-4xl w-full text-center md:text-left md:pr-4 lg:pr-0 flex flex-col items-center md:items-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-wide">
            ATENEO DE DAVAO UNIVERSITY
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6 sm:mb-8 md:mb-12 font-light tracking-widest">
            REINSTATEMENT FORM
          </p>

          {/* Google Sign In Button - Centered on mobile, left-aligned on desktop */}
          <button
            className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center gap-2 sm:gap-3 shadow-lg transition-all text-sm sm:text-base mx-auto md:mx-0"
            style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
          >
            Sign in with
            <img
              src={googleIcon}
              alt="Google icon"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
