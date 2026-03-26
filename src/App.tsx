import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import DepartamentoDetalhe from './pages/Departamentos/DepartamentoDetalhe'
import Home from './pages/Home'
import Contato from './pages/Contato'
import EstruturaFuncional from './pages/Institucional/EstruturaFuncional'
import Organograma from './pages/Institucional/Organograma'
import QuemSomos from './pages/Institucional/QuemSomos'
import MissaoVisaoValores from './pages/Institucional/MissaoVisaoValores'
import Legislacao from './pages/Legislacao'
import Orientacoes from './pages/Servicos/Orientacoes'
import Relatorios from './pages/Servicos/Relatorios'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="institucional">
          <Route index element={<Navigate to="/institucional/quem-somos" replace />} />
          <Route path="quem-somos" element={<QuemSomos />} />
          <Route path="missao-visao-valores" element={<MissaoVisaoValores />} />
          <Route path="organograma" element={<Organograma />} />
          <Route path="estrutura-funcional" element={<EstruturaFuncional />} />
        </Route>
        <Route path="departamentos">
          <Route path=":slug" element={<DepartamentoDetalhe />} />
        </Route>
        <Route path="servicos">
          <Route index element={<Navigate to="/servicos/orientacoes" replace />} />
          <Route path="orientacoes" element={<Orientacoes />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
        <Route path="legislacao" element={<Legislacao />} />
        <Route path="contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
