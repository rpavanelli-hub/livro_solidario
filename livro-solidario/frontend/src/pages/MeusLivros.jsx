import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import { STATUS_LIVRO_ROTULOS, condicaoClasse, condicaoRotulo, tipoOfertaRotulo, capaDoLivro } from '../constants.js';

export default function MeusLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function carregar() {
    setCarregando(true);
    const { data } = await api.get('/livros', { params: { meus: 'true' } });
    setLivros(data);
    setCarregando(false);
  }

  useEffect(() => { carregar(); }, []);

  async function excluir(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    await api.delete(`/livros/${id}`);
    carregar();
  }

  return (
    <AppLayout>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Meus livros</h1>
          <p className="page-subtitle">Gerencie os livros que você publicou.</p>
        </div>
        <Link to="/publicar" className="btn btn-primary"><i className="fa-solid fa-plus" /> Publicar livro</Link>
      </div>

      {carregando ? (
        <p className="text-muted">Carregando...</p>
      ) : livros.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-title">Você ainda não publicou nenhum livro</div>
          <div className="empty-state-text">Publique seu primeiro livro para doação ou troca.</div>
          <Link to="/publicar" className="btn btn-primary">Publicar livro</Link>
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '.78rem', color: 'var(--text-muted)' }}>Livro</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '.78rem', color: 'var(--text-muted)' }}>Tipo</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '.78rem', color: 'var(--text-muted)' }}>Condição</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '.78rem', color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '.78rem', color: 'var(--text-muted)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => {
                  const capa = capaDoLivro(livro.id);
                  return (
                    <tr key={livro.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 52, borderRadius: 8, background: capa.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{capa.emoji}</div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{livro.titulo}</div>
                            <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{livro.autor}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>{tipoOfertaRotulo(livro.tipoOferta)}</td>
                      <td style={{ padding: '14px 16px' }}><span className={`book-cond ${condicaoClasse(livro.condicao)}`}>{condicaoRotulo(livro.condicao)}</span></td>
                      <td style={{ padding: '14px 16px' }}><span className="badge badge-info">{STATUS_LIVRO_ROTULOS[livro.status]}</span></td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link to={`/livros/${livro.id}`} className="btn btn-sm btn-outline">Ver</Link>
                          <Link to={`/livros/${livro.id}/editar`} className="btn btn-sm btn-outline">Editar</Link>
                          <button className="btn btn-sm btn-danger" onClick={() => excluir(livro.id)}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
