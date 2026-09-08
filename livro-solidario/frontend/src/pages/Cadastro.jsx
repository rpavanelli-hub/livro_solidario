import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cidade: '' });
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.usuario, data.token);
      navigate('/dashboard');
    } catch (err) {
      setErro(err.response?.data?.error || 'Não foi possível criar sua conta. Tente novamente.');
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
        <h1 className="auth-title">Crie sua conta</h1>
        <p className="auth-subtitle">Gratuito, rápido e sem burocracia.</p>

        {erro && <div className="badge badge-danger mb-16" style={{ display: 'block', padding: '10px 14px' }}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome <span className="req">*</span></label>
            <input id="nome" className="form-control" required value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} placeholder="Seu nome completo" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email <span className="req">*</span></label>
            <input id="email" type="email" className="form-control" required value={form.email} onChange={(e) => atualizar('email', e.target.value)} placeholder="voce@email.com" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="senha">Senha <span className="req">*</span></label>
              <input id="senha" type="password" className="form-control" required minLength={6} value={form.senha} onChange={(e) => atualizar('senha', e.target.value)} placeholder="Mínimo 6 caracteres" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cidade">Cidade <span className="req">*</span></label>
              <input id="cidade" className="form-control" required value={form.cidade} onChange={(e) => atualizar('cidade', e.target.value)} placeholder="Sua cidade" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={enviando}>
            {enviando ? <span className="spinner" /> : 'Criar conta grátis'}
          </button>
        </form>

        <div className="auth-switch">Já tem conta? <Link to="/login">Entrar</Link></div>
      </div>
      <div className="auth-right">
        <div className="auth-hero-quote">
          <h2>Compartilhe livros, espalhe conhecimento.</h2>
          <p>Doe o que não usa mais e encontre novas leituras perto de você.</p>
        </div>
      </div>
    </div>
  );
}
