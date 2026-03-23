import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Trasee', path: '/trasee' },
    { name: 'Rezultate', path: '/rezultate' },
    { name: 'Regulament', path: '/regulament' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="public/logo.png" 
                  alt="Ceahlău Trail Race" 
                  className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-emerald-400',
                    location.pathname === link.path ? 'text-emerald-500' : 'text-slate-300'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/inscriere" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full font-semibold transition-colors text-sm"
              >
                Înscrie-te
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    location.pathname === link.path
                      ? 'bg-slate-900 text-emerald-500'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/inscriere" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-emerald-600 text-white hover:bg-emerald-500"
              >
                Înscrie-te Acum
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Ceahlău Trail Race" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
            <p className="text-sm">
              Competiție de alergare montană în inima Masivului Ceahlău. Descoperă sălbăticia și frumusețea Carpaților Orientali.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Link-uri Utile</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/regulament" className="hover:text-emerald-400 flex items-center gap-1"><ChevronRight className="h-4 w-4"/> Regulament</Link></li>
              <li><Link to="/termeni" className="hover:text-emerald-400 flex items-center gap-1"><ChevronRight className="h-4 w-4"/> Termeni și Condiții</Link></li>
              <li><Link to="/rezultate" className="hover:text-emerald-400 flex items-center gap-1"><ChevronRight className="h-4 w-4"/> Rezultate Anterioare</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@ceahlautrail.ro</li>
              <li>Telefon: +40 700 000 000</li>
              <li>Locație: Durău, Jud. Neamț, România</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; {new Date().getFullYear()} Ceahlău Trail Race. Toate drepturile rezervate.
        </div>
      </footer>
    </div>
  );
}
