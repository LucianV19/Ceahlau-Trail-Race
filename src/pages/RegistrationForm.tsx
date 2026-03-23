import { useParams, Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function RegistrationForm() {
  const { raceId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const raceNames: Record<string, string> = {
    cros: 'Crosul Zimbrilor (12 km)',
    semi: 'Semimaratonul Panaghia (21 km)',
    maraton: 'Maratonul Toaca (42 km)'
  };

  const raceName = raceNames[raceId || ''] || 'Cursă necunoscută';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Înscriere Înregistrată!</h2>
          <p className="text-slate-600 mb-8">
            Mulțumim pentru înscrierea la <strong>{raceName}</strong>. Vei primi un email cu detaliile de plată și confirmarea locului în scurt timp.
          </p>
          <Link to="/" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-colors inline-block">
            Înapoi la Acasă
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Înapoi la bilete
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-6 md:p-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Formular de Înscriere</h1>
            <p className="text-emerald-400 font-medium mt-2 text-lg">{raceName}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            
            {/* Date Personale */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Date Personale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nume</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="Popescu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prenume</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="Ion" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="ion@exemplu.ro" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                  <input required type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="07xx xxx xxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data Nașterii</label>
                  <input required type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sex</label>
                  <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow bg-white">
                    <option value="">Selectează...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Feminin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Oraș / Localitate</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="Piatra Neamț" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Club Sportiv (Opțional)</label>
                  <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="Numele clubului" />
                </div>
              </div>
            </div>

            {/* Detalii Cursă */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Detalii Cursă</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mărime Tricou</label>
                  <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow bg-white">
                    <option value="">Selectează mărimea...</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Urgență */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Contact de Urgență</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nume Persoană Contact</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="Nume complet" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Urgență</label>
                  <input required type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" placeholder="07xx xxx xxx" />
                </div>
              </div>
            </div>

            {/* Acorduri */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input required type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <span className="text-sm text-slate-600">
                  Sunt de acord cu <Link to="/regulament" className="text-emerald-600 hover:underline font-medium">Regulamentul Competiției</Link> și declar pe proprie răspundere că sunt apt din punct de vedere medical pentru a participa.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input required type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                <span className="text-sm text-slate-600">
                  Sunt de acord cu <Link to="/termeni" className="text-emerald-600 hover:underline font-medium">Termenii și Condițiile</Link> și cu prelucrarea datelor cu caracter personal.
                </span>
              </label>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-colors shadow-sm"
              >
                Finalizează Înscrierea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
