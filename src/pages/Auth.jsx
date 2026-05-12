import adduBG from '../images/addu-bg.png';
import adduSeal from '../images/addu-seal-trans.png';
import googleIcon from '../images/google-icon.png';
import TrajanProRegular from '../assets/fonts/TrajanPro-Regular.ttf';

const fontFaceStyle = `
  @font-face {
    font-family: 'TrajanPro-Regular';
    src: url('${TrajanProRegular}') format('truetype');
  }
`;

export default function Auth() {
    return(
        <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: 'TrajanPro-Regular, sans-serif' }}>
            <style>{fontFaceStyle}</style>
            {/* Background Image */}
            <img 
                src={adduBG} 
                alt="ADDU background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Content Container */}
            <div className="relative w-full h-full flex flex-col items-start justify-center pl-16">
                {/* ADDU Seal - Top Right */}
                <div className="absolute top-12 right-12">
                    <img 
                        src={adduSeal} 
                        alt="ADDU seal" 
                        className="w-64 h-64 opacity-95"
                    />
                </div>
                
                {/* Text Content - Left Side */}
                <div className="z-10 max-w-4xl">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-wide whitespace-nowrap">
                        ATENEO DE DAVAO UNIVERSITY
                    </h1>
                    <p className="text-4xl text-white mb-12 font-light tracking-widest">
                        REINSTATEMENT FORM
                    </p>
                    
                    {/* Google Sign In Button */}
                    <button className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-3 shadow-lg transition-all" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}>
                        Sign in with
                        <img 
                            src={googleIcon} 
                            alt="Google icon" 
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}