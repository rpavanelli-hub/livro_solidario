import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const { data } = await api.post('/auth/login', { email, senha });
      login(data.usuario, data.token);
      navigate('/dashboard');
    } catch (err) {
      setErro(err.response?.data?.error || 'Não foi possível entrar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="auth-brand">
          <div className="auth-logo-mark"><i className="fa-solid fa-book-open-reader" /></div>
          <span className="auth-brand-name">Livro <span>Solidário</span></span>
        </Link>
        <h1 className="auth-title">Bem-vindo de volta</h1>
        <p className="auth-subtitle">Entre com sua conta para continuar compartilhando livros.</p>

        {erro && <div className="badge badge-danger mb-16" style={{ display: 'block', padding: '10px 14px' }}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email <span className="req">*</span></label>
            <input id="email" type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha <span className="req">*</span></label>
            <input id="senha" type="password" className="form-control" required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={enviando}>
            {enviando ? <span className="spinner" /> : 'Entrar'}
          </button>
        </form>

        <div className="auth-switch">Não tem conta? <Link to="/cadastro">Criar conta grátis</Link></div>
      </div>
      <div className="auth-right">
        <div className="auth-hero-quote">
          <h2>Cada livro tem uma nova história para contar.</h2>
          <p>Junte-se à comunidade que transforma livros parados em conhecimento compartilhado.</p>
        </div>
      </div>
    </div>
  );
}
