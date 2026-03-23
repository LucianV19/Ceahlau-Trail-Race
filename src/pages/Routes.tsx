import { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip, Marker, Popup } from 'react-leaflet';
import { MapPin, Mountain, Activity, Clock, Droplet, Apple, Cross, HeartPulse, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Compass, Camera } from 'lucide-react';
import L from 'leaflet';
import clsx from 'clsx';

// Fix for default Leaflet icons in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const aidIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const finishIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createArrowIcon = (angle: number, color: string) => L.divIcon({
  className: 'custom-arrow-icon',
  html: `<div style="transform: rotate(${angle}deg); color: ${color}; font-size: 16px; font-weight: bold; line-height: 1; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px;">➤</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const getArrows = (path: [number, number][], color: string) => {
  const arrows = [];
  const step = Math.max(1, Math.floor(path.length / 6));
  
  for (let i = 0; i < path.length - 1; i += step) {
    const p1 = path[i];
    const p2 = path[i + 1];
    const midLat = (p1[0] + p2[0]) / 2;
    const midLng = (p1[1] + p2[1]) / 2;
    const dy = p2[0] - p1[0];
    const dx = p2[1] - p1[1];
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    arrows.push({
      pos: [midLat, midLng] as [number, number],
      angle: -angle,
      color
    });
  }
  return arrows;
};

export default function RoutesPage() {
  const [activeTab, setActiveTab] = useState('cros');

  // Realistic coordinates for Ceahlau trails based on exploregis.ro routes
  const crosRoute: [number, number][] = [
    [46.998, 25.922], // Durau Start
    [46.985, 25.938], // Cabana Fantanele
    [46.965, 25.945], // Varful Toaca
    [46.960, 25.948], // Cabana Dochia
    [46.970, 25.920], // Cascada Duruitoarea
    [46.998, 25.922]  // Durau Finish
  ];
  
  const semiRoute: [number, number][] = [
    [46.998, 25.922], // Durau Start
    [46.985, 25.938], // Cabana Fantanele
    [46.965, 25.945], // Varful Toaca
    [46.960, 25.948], // Cabana Dochia
    [46.950, 25.960], // Curmatura Lutu Rosu
    [46.940, 25.970], // Izvorul Muntelui
    [46.955, 25.965], // Jgheabu Cu Hotaru
    [46.960, 25.948], // Cabana Dochia
    [46.970, 25.920], // Cascada Duruitoarea
    [46.998, 25.922]  // Durau Finish
  ];
  
  const maratonRoute: [number, number][] = [
    [46.998, 25.922], // Durau Start
    [46.985, 25.938], // Cabana Fantanele
    [46.965, 25.945], // Varful Toaca
    [46.960, 25.948], // Cabana Dochia
    [46.945, 25.940], // Poiana Maicilor
    [46.920, 25.930], // Poiana Varatec
    [46.890, 25.950], // Satul Neagra
    [46.920, 25.930], // Poiana Varatec
    [46.945, 25.940], // Poiana Maicilor
    [46.960, 25.948], // Cabana Dochia
    [46.970, 25.920], // Cascada Duruitoarea
    [46.998, 25.922]  // Durau Finish
  ];

  const routes = [
    {
      id: 'cros',
      name: 'Crosul Zimbrilor',
      distance: '13.8 km',
      elevation: '+1088m',
      timeLimit: '4 ore',
      color: '#3b82f6',
      center: [46.980, 25.935] as [number, number],
      zoom: 13,
      description: 'Un traseu perfect pentru cei care doresc o cursă rapidă, dar provocatoare. Pornește din Durău, urcă susținut pe bandă roșie până la Cabana Fântânele și Vârful Toaca, apoi coboară pe cruce roșie pe la Cascada Duruitoarea și se întoarce în stațiune.',
      maxAlt: '1904m',
      minAlt: '850m',
      ascent: '+1088m (50%)',
      descent: '-1088m (50%)',
      direction: 'Circuit: Urcare pe bandă roșie (Traseul 4), coborâre pe cruce roșie (Traseul 5).',
      attractions: [
        { name: 'Cabana Fântânele (1220m)', desc: 'Punct de reper important pe urcarea dinspre Durău.' },
        { name: 'Vârful Toaca (1904m)', desc: 'Cel mai înalt punct al traseului, oferind o panoramă spectaculoasă.' },
        { name: 'Cascada Duruitoarea (1210m)', desc: 'Cădere de apă impresionantă de 25m, situată pe coborâre.' }
      ],
      path: crosRoute,
      checkpoints: [
        { name: 'Start Durău', dist: '0 km', cutOff: '-', water: true, food: false, medical: true, pos: [46.998, 25.922] as [number, number] },
        { name: 'Cabana Fântânele', dist: '4.5 km', cutOff: '1h 30m', water: true, food: true, medical: true, pos: [46.985, 25.938] as [number, number] },
        { name: 'Vârful Toaca', dist: '6.9 km', cutOff: '2h 30m', water: true, food: false, medical: true, pos: [46.965, 25.945] as [number, number] },
        { name: 'Cascada Duruitoarea', dist: '10.5 km', cutOff: '3h 30m', water: true, food: false, medical: false, pos: [46.970, 25.920] as [number, number] },
        { name: 'Finish Durău', dist: '13.8 km', cutOff: '4h 00m', water: true, food: true, medical: true, pos: [46.998, 25.922] as [number, number] }
      ],
      officialMaps: [
        { name: 'Traseul 4 (Urcare)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul4.png' },
        { name: 'Traseul 5 (Coborâre)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul5.png' }
      ]
    },
    {
      id: 'semi',
      name: 'Semimaratonul Panaghia',
      distance: '26.0 km',
      elevation: '+2013m',
      timeLimit: '8 ore',
      color: '#eab308',
      center: [46.970, 25.945] as [number, number],
      zoom: 12,
      description: 'Un traseu clasic și solicitant care traversează masivul. Urcare din Durău pe la Cabana Fântânele (Traseul 4), coborâre spre Izvorul Muntelui pe Lutu Roșu (Traseul 2), urcare înapoi pe Jgheabu Cu Hotaru (Traseul 3) și coborâre finală pe la Cascada Duruitoarea (Traseul 5).',
      maxAlt: '1904m',
      minAlt: '797m',
      ascent: '+2013m (50%)',
      descent: '-2013m (50%)',
      direction: 'Circuit în formă de 8: Durău -> Dochia -> Izvorul Muntelui -> Dochia -> Durău.',
      attractions: [
        { name: 'Stânca Panaghia', desc: 'Formațiune stâncoasă legendară, vizibilă pe urcarea spre Toaca.' },
        { name: 'Curmătura Lutu Roșu (1020m)', desc: 'Zonă împădurită spectaculoasă pe coborârea spre Izvorul Muntelui.' },
        { name: 'Stânca Dochia (1179m)', desc: 'Punct de atracție pe urcarea tehnică dinspre Izvorul Muntelui.' }
      ],
      path: semiRoute,
      checkpoints: [
        { name: 'Start Durău', dist: '0 km', cutOff: '-', water: true, food: false, medical: true, pos: [46.998, 25.922] as [number, number] },
        { name: 'Cabana Dochia 1', dist: '6.9 km', cutOff: '2h 30m', water: true, food: true, medical: true, pos: [46.960, 25.948] as [number, number] },
        { name: 'Izvorul Muntelui', dist: '12.6 km', cutOff: '4h 00m', water: true, food: true, medical: true, pos: [46.940, 25.970] as [number, number] },
        { name: 'Cabana Dochia 2', dist: '19.1 km', cutOff: '6h 30m', water: true, food: true, medical: true, pos: [46.960, 25.948] as [number, number] },
        { name: 'Cascada Duruitoarea', dist: '22.5 km', cutOff: '7h 30m', water: true, food: false, medical: false, pos: [46.970, 25.920] as [number, number] },
        { name: 'Finish Durău', dist: '26.0 km', cutOff: '8h 00m', water: true, food: true, medical: true, pos: [46.998, 25.922] as [number, number] }
      ],
      officialMaps: [
        { name: 'Traseul 4 (Urcare Durău)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul4.png' },
        { name: 'Traseul 2 (Coborâre Izvor)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul2.png' },
        { name: 'Traseul 3 (Urcare Izvor)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul3.png' },
        { name: 'Traseul 5 (Coborâre Durău)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul5.png' }
      ]
    },
    {
      id: 'maraton',
      name: 'Maratonul Toaca',
      distance: '42.4 km',
      elevation: '+2570m',
      timeLimit: '12 ore',
      color: '#ef4444',
      center: [46.940, 25.935] as [number, number],
      zoom: 11,
      description: 'Cursa regină a competiției. Un traseu de anduranță extremă ce include urcarea din Durău pe Vârful Toaca (Traseul 4), o coborâre lungă spre Satul Neagra prin Poiana Maicilor (Traseul 7), urcarea înapoi la Cabana Dochia și coborârea finală pe la Cascada Duruitoarea (Traseul 5).',
      maxAlt: '1904m',
      minAlt: '540m',
      ascent: '+2570m (50%)',
      descent: '-2570m (50%)',
      direction: 'Circuit extins: Durău -> Dochia -> Satul Neagra -> Dochia -> Durău.',
      attractions: [
        { name: 'Poiana Maicilor (1330m)', desc: 'Zonă de belvedere superbă pe traseul spre Satul Neagra.' },
        { name: 'Clăile lui Miron', desc: 'Formațiuni stâncoase izolate, vizibile pe traseul 7.' },
        { name: 'Poiana Văratec', desc: 'Poiană largă, punct de reper important pe urcarea/coborârea lungă.' }
      ],
      path: maratonRoute,
      checkpoints: [
        { name: 'Start Durău', dist: '0 km', cutOff: '-', water: true, food: false, medical: true, pos: [46.998, 25.922] as [number, number] },
        { name: 'Cabana Dochia 1', dist: '6.9 km', cutOff: '2h 30m', water: true, food: true, medical: true, pos: [46.960, 25.948] as [number, number] },
        { name: 'Poiana Maicilor 1', dist: '11.0 km', cutOff: '3h 30m', water: true, food: false, medical: false, pos: [46.945, 25.940] as [number, number] },
        { name: 'Satul Neagra', dist: '21.2 km', cutOff: '6h 00m', water: true, food: true, medical: true, pos: [46.890, 25.950] as [number, number] },
        { name: 'Poiana Maicilor 2', dist: '31.4 km', cutOff: '9h 00m', water: true, food: true, medical: false, pos: [46.945, 25.940] as [number, number] },
        { name: 'Cabana Dochia 2', dist: '35.5 km', cutOff: '10h 30m', water: true, food: true, medical: true, pos: [46.960, 25.948] as [number, number] },
        { name: 'Finish Durău', dist: '42.4 km', cutOff: '12h 00m', water: true, food: true, medical: true, pos: [46.998, 25.922] as [number, number] }
      ],
      officialMaps: [
        { name: 'Traseul 4 (Urcare Durău)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul4.png' },
        { name: 'Traseul 7 (Coborâre/Urcare Neagra)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul7.png' },
        { name: 'Traseul 5 (Coborâre Durău)', url: 'https://www.exploregis.ro/wp-content/uploads/2017/03/Traseul5.png' }
      ]
    }
  ];

  const activeRouteData = routes.find(r => r.id === activeTab) || routes[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">Traseele Competiției</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Descoperă rutele care te vor purta prin inima Masivului Ceahlău. Alege provocarea care ți se potrivește.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Route Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {routes.map(route => (
            <button
              key={route.id}
              onClick={() => setActiveTab(route.id)}
              className={clsx(
                'px-6 py-3 rounded-t-lg font-semibold transition-colors',
                activeTab === route.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 border-b-0'
              )}
            >
              {route.name}
            </button>
          ))}
        </div>

        {/* Active Route Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Route Details & Checkpoints */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="h-2 w-full" style={{ backgroundColor: activeRouteData.color }}></div>
              <div className="p-6">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{activeRouteData.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Distanță</div>
                      <div className="font-semibold text-slate-900">{activeRouteData.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mountain className="h-5 w-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Diferență Nivel</div>
                      <div className="font-semibold text-slate-900">{activeRouteData.elevation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Timp Limită</div>
                      <div className="font-semibold text-slate-900">{activeRouteData.timeLimit}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Activity className="h-5 w-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Puncte ITRA</div>
                      <div className="font-semibold text-slate-900">{activeRouteData.id === 'maraton' ? '2' : activeRouteData.id === 'semi' ? '1' : '0'}</div>
                    </div>
                  </div>
                </div>

                {/* New Stats Grid */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 border border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Altitudine</div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <TrendingUp className="h-4 w-4 text-emerald-500" /> Max: {activeRouteData.maxAlt}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 mt-1.5">
                      <TrendingDown className="h-4 w-4 text-blue-500" /> Min: {activeRouteData.minAlt}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Înclinație</div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" /> {activeRouteData.ascent}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 mt-1.5">
                      <ArrowDownRight className="h-4 w-4 text-blue-500" /> {activeRouteData.descent}
                    </div>
                  </div>
                  <div className="col-span-2 pt-3 border-t border-slate-200">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Direcția de mers</div>
                    <div className="flex items-start gap-2 text-sm font-medium text-slate-900">
                      <Compass className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{activeRouteData.direction}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {activeRouteData.description}
                </p>

                {/* Attractions */}
                <div className="mb-2">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                    <Camera className="h-4 w-4 text-emerald-600" />
                    Puncte de atracție
                  </h4>
                  <ul className="space-y-3">
                    {activeRouteData.attractions.map((attr, idx) => (
                      <li key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="block text-sm text-slate-900 mb-0.5">{attr.name}</strong>
                        <span className="text-xs text-slate-600 leading-snug block">{attr.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Checkpoints Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Puncte de Control & Alimentare</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Punct (PC)</th>
                      <th className="px-4 py-3">Dist.</th>
                      <th className="px-4 py-3">Timp Limită</th>
                      <th className="px-4 py-3 text-center">Servicii</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeRouteData.checkpoints.map((cp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{cp.name}</td>
                        <td className="px-4 py-3 text-slate-600">{cp.dist}</td>
                        <td className="px-4 py-3 text-slate-600 font-mono">{cp.cutOff}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {cp.water && <Droplet className="h-4 w-4 text-blue-500" title="Apă / Isotonic" />}
                            {cp.food && <Apple className="h-4 w-4 text-emerald-500" title="Alimente / Fructe" />}
                            {cp.medical && <HeartPulse className="h-4 w-4 text-red-500" title="Prim Ajutor" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-center gap-4">
                <span className="flex items-center gap-1"><Droplet className="h-3 w-3 text-blue-500"/> Hidratare</span>
                <span className="flex items-center gap-1"><Apple className="h-3 w-3 text-emerald-500"/> Alimentare</span>
                <span className="flex items-center gap-1"><HeartPulse className="h-3 w-3 text-red-500"/> Prim Ajutor</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[600px] lg:h-auto relative z-0">
            <MapContainer 
              key={activeRouteData.id} // Forces map to re-render and re-center when tab changes
              center={activeRouteData.center} 
              zoom={activeRouteData.zoom} 
              scrollWheelZoom={false}
              className="h-full w-full min-h-[600px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Render Active Route */}
              <Polyline 
                positions={activeRouteData.path} 
                pathOptions={{ color: activeRouteData.color, weight: 5, opacity: 0.9 }}
              >
                <Tooltip sticky>{activeRouteData.name}</Tooltip>
              </Polyline>

              {/* Render Direction Arrows */}
              {getArrows(activeRouteData.path, activeRouteData.color).map((arrow, idx) => (
                <Marker 
                  key={`arrow-${idx}`} 
                  position={arrow.pos} 
                  icon={createArrowIcon(arrow.angle, arrow.color)}
                  interactive={false}
                />
              ))}

              {/* Render Checkpoints as Markers */}
              {activeRouteData.checkpoints.map((cp, idx) => {
                // Use startIcon for Start, finishIcon for Finish, aidIcon for medical, customIcon for rest
                let iconToUse = customIcon;
                let pos = cp.pos;
                
                if (idx === 0) {
                  iconToUse = startIcon;
                } else if (idx === activeRouteData.checkpoints.length - 1) {
                  iconToUse = finishIcon;
                  // Slight offset for finish line so it doesn't completely hide the start marker
                  pos = [cp.pos[0] - 0.0005, cp.pos[1] + 0.0005] as [number, number];
                } else if (cp.medical) {
                  iconToUse = aidIcon;
                }

                return (
                  <Marker key={idx} position={pos} icon={iconToUse}>
                    <Popup>
                      <div className="text-center min-w-[150px]">
                        <strong className="block text-slate-900 mb-1 border-b border-slate-200 pb-1">{cp.name}</strong>
                        <div className="text-sm text-slate-600 mb-2">Distanță: {cp.dist}</div>
                        <div className="flex justify-center gap-3 mt-2">
                          {cp.water && <div className="flex flex-col items-center"><Droplet className="h-4 w-4 text-blue-500"/><span className="text-[10px] text-slate-500">Apă</span></div>}
                          {cp.food && <div className="flex flex-col items-center"><Apple className="h-4 w-4 text-emerald-500"/><span className="text-[10px] text-slate-500">Hrană</span></div>}
                          {cp.medical && <div className="flex flex-col items-center"><HeartPulse className="h-4 w-4 text-red-500"/><span className="text-[10px] text-slate-500">Medical</span></div>}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          
        </div>
      </div>
    </div>
  );
}
