import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import BookCard from '../components/BookCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { STATUS_SOLICITACAO_ROTULOS } from '../constants.js';

const STATUS_CLASSE = { PENDENTE: 'badge-warning', ACEITA: 'badge-success', RECUSADA: 'badge-danger', CANCELADA: 'badge-neutral' };

export default function Dashboard() {
  const { usuario } = useAuth();
  const [meusLivros, setMeusLivros] = useState([]);
  const [enviadas, setEnviadas] = useState([]);
  const [recebidas, setRecebidas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/livros', { params: { meus: 'true' } }),
      api.get('/solicitacoes/enviadas'),
      api.get('/solicitacoes/recebidas'),
    ]).then(([resLivros, resEnviadas, resRecebidas]) => {
      setMeusLivros(resLivros.data);
      setEnviadas(resEnviadas.data);
      setRecebidas(resRecebidas.data);
    }).finally(() => setCarregando(false));
  }, []);

  const livrosDisponiveis = meusLivros.filter((l) => l.status === 'DISPONIVEL');
  const recentes = [...enviadas, ...recebidas]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (carregando) {
    return <AppLayout><p className="text-muted">Carregando dashboard...</p></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="card mb-24" style={{ background: 'linear-gradient(135deg,var(--primary-dark) 0%,var(--primary) 60%,#43A047 100%)', border: 'none' }}>
        <div className="card-body" style={{ padding: '28px 32px' }}>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.875rem', marginBottom: 4 }}>Olá, bem-vindo(a) de volta! 👋</div>
          <h2 style={{ color: 'white', fontSize: '1.6rem', marginBottom: 8 }}>{usuario?.nome}</h2>
          <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
            <Link to="/publicar" className="btn btn-sm" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}><i className="fa-solid fa-plus" /> Publicar livro</Link>
            <Link to="/catalogo" className="btn btn-sm" style={{ background: 'rgba(255,255,255,.15)', color: 'white', border: '1px solid rgba(255,255,255,.3)' }}><i className="fa-solid fa-search" /> Buscar livros</Link>
          </div>
        </div>
      </div>

      <div className="stats-grid mb-24">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#E8F5E9', color: '#2E7D32' }}><i className="fa-solid fa-book" /></div>
          <div className="stat-info">
            <div className="stat-value">{meusLivros.length}</div>
            <div className="stat-label">Livros publicados</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#E3F2FD', color: '#1976D2' }}><i className="fa-solid fa-paper-plane" /></div>
          <div className="stat-info">
            <div className="stat-value">{enviadas.length}</div>
            <div className="stat-label">Solicitações enviadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}><i className="fa-solid fa-inbox" /></div>
          <div className="stat-info">
            <div className="stat-value">{recebidas.length}</div>
            <div className="stat-label">Solicitações recebidas</div>
          </div>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">📚 Seus livros disponíveis</span>
        <Link to="/meus-livros" className="section-link">Ver todos <i className="fa-solid fa-arrow-right" /></Link>
      </div>
      {livrosDisponiveis.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-title">Nenhum livro disponível publicado</div>
          <Link to="/publicar" className="btn btn-primary">Publicar livro</Link>
        </div>
      ) : (
        <div className="book-grid mb-24">
          {livrosDisponiveis.map((livro) => <BookCard key={livro.id} livro={livro} />)}
        </div>
      )}

      <div className="card mt-24">
        <div className="card-header">
          <span className="card-title">📋 Solicitações recentes</span>
          <Link to="/solicitacoes" className="section-link" style={{ fontSize: '.78rem' }}>Ver todas</Link>
        </div>
        {recentes.length === 0 ? (
          <div className="card-body"><p className="text-muted">Nenhuma solicitação por enquanto.</p></div>
        ) : (
          <div>
            {recentes.map((s) => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{s.livro.titulo}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>
                    {s.solicitante.id === usuario.id ? `Você solicitou de ${s.livro.usuario.nome}` : `${s.solicitante.nome} solicitou`}
                  </div>
                </div>
                <span className={`badge ${STATUS_CLASSE[s.status]}`}>{STATUS_SOLICITACAO_ROTULOS[s.status]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
