import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AILegalAssistant from './pages/AILegalAssistant'
import PetitionGenerator from './pages/PetitionGenerator'
import CourtNavigation from './pages/CourtNavigation'
import ResourceCenter from './pages/ResourceCenter'
import ResourceDetails from "./pages/ResourceDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="assistant" element={<AILegalAssistant />} />
          <Route path="petition" element={<PetitionGenerator />} />
          <Route path="court" element={<CourtNavigation />} />
          <Route path="resources" element={<ResourceCenter />} />
          <Route path="/resources/:id" element={<ResourceDetails />}/>


        </Route>
      </Routes>
    </BrowserRouter>
  )
}
