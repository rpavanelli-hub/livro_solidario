import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import { STATUS_SOLICITACAO_ROTULOS } from '../constants.js';

const STATUS_CLASSE = { PENDENTE: 'badge-warning', ACEITA: 'badge-success', RECUSADA: 'badge-danger', CANCELADA: 'badge-neutral' };

export default function Solicitacoes() {
  const [aba, setAba] = useState('recebidas');
  const [recebidas, setRecebidas] = useState([]);
  const [enviadas, setEnviadas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);
    const [resRecebidas, resEnviadas] = await Promise.all([
      api.get('/solicitacoes/recebidas'),
      api.get('/solicitacoes/enviadas'),
    ]);
    setRecebidas(resRecebidas.data);
    setEnviadas(resEnviadas.data);
    setCarregando(false);
  }

  useEffect(() => { carregar(); }, []);

  async function responder(id, acao) {
    await api.put(`/solicitacoes/${id}/${acao}`);
    carregar();
  }

  const lista = aba === 'recebidas' ? recebidas : enviadas;

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Solicitações</h1>
        <p className="page-subtitle">Acompanhe os pedidos de interesse nos seus livros e os que você enviou.</p>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${aba === 'recebidas' ? 'active' : ''}`} onClick={() => setAba('recebidas')}>Recebidas ({recebidas.length})</button>
        <button className={`tab-btn ${aba === 'enviadas' ? 'active' : ''}`} onClick={() => setAba('enviadas')}>Enviadas ({enviadas.length})</button>
      </div>

      {carregando ? (
        <p className="text-muted">Carregando...</p>
      ) : lista.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">Nenhuma solicitação aqui</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lista.map((s) => (
            <div className="card" key={s.id}>
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <Link to={`/livros/${s.livro.id}`} style={{ fontWeight: 700, color: 'var(--text)' }}>{s.livro.titulo}</Link>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{s.livro.autor}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {aba === 'recebidas' ? `Solicitado por ${s.solicitante.nome}` : `Proprietário: ${s.livro.usuario.nome}`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className={`badge ${STATUS_CLASSE[s.status]}`}>{STATUS_SOLICITACAO_ROTULOS[s.status]}</span>
                  {aba === 'recebidas' && s.status === 'PENDENTE' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-sm btn-primary" onClick={() => responder(s.id, 'aceitar')}><i className="fa-solid fa-check" /> Aceitar</button>
                      <button className="btn btn-sm btn-outline" onClick={() => responder(s.id, 'recusar')}><i className="fa-solid fa-xmark" /> Recusar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
