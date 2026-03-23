import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import RoutesPage from './pages/Routes';
import Results from './pages/Results';
import Rules from './pages/Rules';
import Terms from './pages/Terms';
import Registration from './pages/Registration';
import RegistrationForm from './pages/RegistrationForm';

export default function App() {
  const basename = import.meta.env.MODE === 'production' ? '/Ceahlau-Trail-Race' : '/';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trasee" element={<RoutesPage />} />
          <Route path="rezultate" element={<Results />} />
          <Route path="regulament" element={<Rules />} />
          <Route path="termeni" element={<Terms />} />
          <Route path="inscriere" element={<Registration />} />
          <Route path="inscriere/:raceId" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
