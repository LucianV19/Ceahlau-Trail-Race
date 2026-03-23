import { useState, useMemo } from 'react';
import { Search, Filter, Trophy, Medal, Award } from 'lucide-react';
import clsx from 'clsx';

// Mock Data
const mockResults = [
  { id: 1, race: 'cros', name: 'Popescu Ion', gender: 'M', category: '18-29', city: 'Piatra Neamț', time: '01:15:22', rank: 1 },
  { id: 2, race: 'cros', name: 'Ionescu Maria', gender: 'F', category: '30-39', city: 'Iași', time: '01:22:10', rank: 2 },
  { id: 3, race: 'cros', name: 'Radu Andrei', gender: 'M', category: '30-39', city: 'București', time: '01:25:45', rank: 3 },
  { id: 4, race: 'cros', name: 'Dumitru Elena', gender: 'F', category: '18-29', city: 'Cluj-Napoca', time: '01:30:05', rank: 4 },
  { id: 5, race: 'cros', name: 'Stan Vasile', gender: 'M', category: '40-49', city: 'Suceava', time: '01:35:50', rank: 5 },
  
  { id: 6, race: 'semi', name: 'Gheorghe Mihai', gender: 'M', category: '30-39', city: 'Brașov', time: '02:10:15', rank: 1 },
  { id: 7, race: 'semi', name: 'Marin Andreea', gender: 'F', category: '18-29', city: 'București', time: '02:25:30', rank: 2 },
  { id: 8, race: 'semi', name: 'Constantin Florin', gender: 'M', category: '40-49', city: 'Piatra Neamț', time: '02:30:45', rank: 3 },
  { id: 9, race: 'semi', name: 'Ilie Ana', gender: 'F', category: '30-39', city: 'Timișoara', time: '02:45:20', rank: 4 },
  
  { id: 10, race: 'maraton', name: 'Avram Bogdan', gender: 'M', category: '30-39', city: 'Cluj-Napoca', time: '04:45:10', rank: 1 },
  { id: 11, race: 'maraton', name: 'Popa Cristian', gender: 'M', category: '40-49', city: 'București', time: '05:10:25', rank: 2 },
  { id: 12, race: 'maraton', name: 'Munteanu Ioana', gender: 'F', category: '30-39', city: 'Brașov', time: '05:30:40', rank: 3 },
];

export default function Results() {
  const [activeTab, setActiveTab] = useState('cros');
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  const tabs = [
    { id: 'cros', label: 'Cros 12km' },
    { id: 'semi', label: 'Semimaraton 21km' },
    { id: 'maraton', label: 'Maraton 42km' },
  ];

  // Extract unique cities and categories for filters
  const uniqueCities = Array.from(new Set(mockResults.filter(r => r.race === activeTab).map(r => r.city))).sort();
  const uniqueCategories = Array.from(new Set(mockResults.filter(r => r.race === activeTab).map(r => r.category))).sort();

  const filteredResults = useMemo(() => {
    return mockResults.filter(result => {
      const matchRace = result.race === activeTab;
      const matchSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          result.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGender = genderFilter === 'all' || result.gender === genderFilter;
      const matchCategory = categoryFilter === 'all' || result.category === categoryFilter;
      const matchCity = cityFilter === 'all' || result.city === cityFilter;

      return matchRace && matchSearch && matchGender && matchCategory && matchCity;
    }).sort((a, b) => a.rank - b.rank);
  }, [activeTab, searchTerm, genderFilter, categoryFilter, cityFilter]);

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-slate-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="font-mono text-slate-500">{rank}</span>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">Rezultate</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Clasamentele oficiale pentru ediția curentă Ceahlău Trail Race.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm('');
                setGenderFilter('all');
                setCategoryFilter('all');
                setCityFilter('all');
              }}
              className={clsx(
                'px-6 py-3 rounded-t-lg font-semibold transition-colors',
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 border-b-0'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Caută participant sau oraș..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            {/* Gender Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none bg-white"
              >
                <option value="all">Toate Sexele</option>
                <option value="M">Masculin (M)</option>
                <option value="F">Feminin (F)</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none bg-white"
              >
                <option value="all">Toate Categoriile</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat} ani</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none bg-white"
              >
                <option value="all">Toate Orașele</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Loc
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Nume Participant
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Timp
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Sex
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Categorie
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Oraș
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                          {getRankIcon(result.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{result.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-semibold text-emerald-600">{result.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                          result.gender === 'M' ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                        )}>
                          {result.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {result.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {result.city}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      Nu s-au găsit rezultate conform filtrelor selectate.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
