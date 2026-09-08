import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Catalogo from './pages/Catalogo.jsx';
import LivroDetalhes from './pages/LivroDetalhes.jsx';
import PublicarLivro from './pages/PublicarLivro.jsx';
import MeusLivros from './pages/MeusLivros.jsx';
import Solicitacoes from './pages/Solicitacoes.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/catalogo" element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
      <Route path="/livros/:id" element={<ProtectedRoute><LivroDetalhes /></ProtectedRoute>} />
      <Route path="/livros/:id/editar" element={<ProtectedRoute><PublicarLivro /></ProtectedRoute>} />
      <Route path="/publicar" element={<ProtectedRoute><PublicarLivro /></ProtectedRoute>} />
      <Route path="/meus-livros" element={<ProtectedRoute><MeusLivros /></ProtectedRoute>} />
      <Route path="/solicitacoes" element={<ProtectedRoute><Solicitacoes /></ProtectedRoute>} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
