import { Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Registration() {
  const tickets = [
    {
      id: 'cros',
      name: 'Crosul Zimbrilor',
      distance: '12 km',
      price: '150 RON',
      popular: false,
      features: [
        'Număr de concurs personalizat',
        'Tricou tehnic oficial',
        'Medalie de finisher',
        'Puncte de alimentare pe traseu',
        'Asistență medicală',
        'Porție de paste la final',
        'Fotografii pe traseu'
      ]
    },
    {
      id: 'semi',
      name: 'Semimaratonul Panaghia',
      distance: '21 km',
      price: '200 RON',
      popular: true,
      features: [
        'Număr de concurs personalizat',
        'Tricou tehnic oficial premium',
        'Medalie de finisher',
        'Puncte de alimentare pe traseu',
        'Asistență medicală',
        'Porție de paste la final',
        'Fotografii pe traseu',
        '1 Punct ITRA'
      ]
    },
    {
      id: 'maraton',
      name: 'Maratonul Toaca',
      distance: '42 km',
      price: '250 RON',
      popular: false,
      features: [
        'Număr de concurs personalizat',
        'Tricou tehnic oficial premium',
        'Medalie de finisher',
        'Puncte de alimentare pe traseu',
        'Asistență medicală',
        'Porție de paste la final',
        'Fotografii pe traseu',
        '2 Puncte ITRA',
        'GPS Tracker inclus'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">Înscriere</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Alege cursa care ți se potrivește și asigură-ți locul la linia de start.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Info Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-12 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                <strong>Atenție!</strong> Înscrierile se închid pe data de 1 August 2026 sau la atingerea limitei de 1000 de participanți cumulat pe toate probele.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className={`bg-white rounded-2xl shadow-sm border flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl ${
                ticket.popular ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200'
              }`}
            >
              {ticket.popular && (
                <div className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-1 text-center">
                  Cea mai populară alegere
                </div>
              )}
              
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{ticket.name}</h3>
                <p className="text-slate-500 font-medium mb-6">Distanță: {ticket.distance}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-slate-900">{ticket.price}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0 mr-3" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <Link 
                  to={`/inscriere/${ticket.id}`}
                  className={`block w-full py-3 px-4 rounded-xl font-bold text-center transition-colors ${
                    ticket.popular 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Selectează {ticket.distance}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
