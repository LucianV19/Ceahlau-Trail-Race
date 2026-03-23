import { ArrowRight, MapPin, Calendar, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?q=80&w=2070&auto=format&fit=crop"
  ];

  const sponsors = [
    { name: 'Salomon', logo: 'https://cdn.worldvectorlogo.com/logos/salomon-1.svg' },
    { name: 'Garmin', logo: 'https://cdn.worldvectorlogo.com/logos/garmin-1.svg' },
    { name: 'The North Face', logo: 'https://cdn.worldvectorlogo.com/logos/the-north-face-1.svg' },
    { name: 'Red Bull', logo: 'https://cdn.worldvectorlogo.com/logos/red-bull-logo.svg' },
    { name: 'Gore-Tex', logo: 'https://cdn.worldvectorlogo.com/logos/gore-tex.svg' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-900">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.4}px) scale(1.15)`,
              }}
            >
              <img 
                src={img} 
                alt={`Ceahlau Mountains ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/60"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight uppercase">
            Ceahlău <span className="text-emerald-500">Trail Race</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light">
            Depășește-ți limitele pe potecile sălbatice ale Olimpului Moldovei.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/inscriere" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Înscrie-te Acum <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/trasee" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto justify-center flex items-center"
            >
              Vezi Traseele
            </Link>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-emerald-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-500/50">
            <div className="flex flex-col items-center p-4">
              <Calendar className="h-10 w-10 mb-3 text-emerald-200" />
              <h3 className="text-xl font-bold">15 August 2026</h3>
              <p className="text-emerald-100 mt-1">Data Competiției</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <MapPin className="h-10 w-10 mb-3 text-emerald-200" />
              <h3 className="text-xl font-bold">Stațiunea Durău</h3>
              <p className="text-emerald-100 mt-1">Locație Start/Finish</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Trophy className="h-10 w-10 mb-3 text-emerald-200" />
              <h3 className="text-xl font-bold">3 Trasee</h3>
              <p className="text-emerald-100 mt-1">Pentru toate nivelurile</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Despre Ceahlău Trail Race</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Ceahlău Trail Race este mai mult decât o competiție de alergare montană. Este o invitație de a descoperi frumusețea brută a Masivului Ceahlău, de a alerga printre stânci legendare precum Panaghia și Toaca, și de a te bucura de priveliștile spectaculoase asupra lacului Izvorul Muntelui.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Indiferent dacă ești la prima ta cursă montană sau ești un alergător experimentat în căutare de noi provocări, avem un traseu pregătit pentru tine.
              </p>
              <Link to="/regulament" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2">
                Citește regulamentul complet <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Runner in mountains" className="rounded-2xl h-64 w-full object-cover shadow-lg" />
              <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop" alt="Trail running" className="rounded-2xl h-64 w-full object-cover shadow-lg mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-10 uppercase tracking-wider">Parteneri și Sponsori</h2>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="w-24 md:w-36 h-16 flex items-center justify-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 hover:scale-110">
                <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
