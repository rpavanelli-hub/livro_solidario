import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { capaDoLivro, condicaoClasse, condicaoRotulo, tipoOfertaRotulo, STATUS_LIVRO_ROTULOS } from '../constants.js';

export default function LivroDetalhes() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    setCarregando(true);
    api.get(`/livros/${id}`)
      .then((res) => setLivro(res.data))
      .catch(() => setLivro(null))
      .finally(() => setCarregando(false));
  }, [id]);

  async function solicitar() {
    setEnviando(true);
    setMensagem('');
    try {
      await api.post('/solicitacoes', { livroId: id });
      setMensagem('Solicitação enviada com sucesso! Acompanhe em "Solicitações".');
    } catch (err) {
      setMensagem(err.response?.data?.error || 'Não foi possível enviar a solicitação.');
    } finally {
      setEnviando(false);
    }
  }

  async function excluir() {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    await api.delete(`/livros/${id}`);
    navigate('/meus-livros');
  }

  if (carregando) {
    return <AppLayout><p className="text-muted">Carregando livro...</p></AppLayout>;
  }
  if (!livro) {
    return <AppLayout><p className="text-muted">Livro não encontrado.</p></AppLayout>;
  }

  const capa = capaDoLivro(livro.id);
  const ehProprietario = usuario?.id === livro.usuarioId;
  const podeSolicitar = livro.status === 'DISPONIVEL' && !ehProprietario;

  return (
    <AppLayout>
      <div className="breadcrumb">
        <Link to="/catalogo">Catálogo</Link><span>/</span><span>{livro.titulo}</span>
      </div>

      <div className="book-detail-layout">
        <div className="book-detail-cover" style={{ background: capa.bg }}>
          <span>{capa.emoji}</span>
          <span className={`type-badge ${livro.tipoOferta === 'DOACAO' ? 'badge-doacao' : 'badge-troca'}`}>
            {tipoOfertaRotulo(livro.tipoOferta)}
          </span>
        </div>

        <div>
          <h1 className="page-title">{livro.titulo}</h1>
          <p className="page-subtitle" style={{ marginBottom: 16 }}>{livro.autor}</p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <span className="badge badge-neutral">{livro.categoria}</span>
            <span className={`book-cond ${condicaoClasse(livro.condicao)}`}>{condicaoRotulo(livro.condicao)}</span>
            <span className="badge badge-info">{STATUS_LIVRO_ROTULOS[livro.status]}</span>
            <span className="badge badge-neutral"><i className="fa-solid fa-location-dot" /> {livro.cidade}</span>
          </div>

          <p style={{ color: 'var(--text-md)', lineHeight: 1.75, marginBottom: 24 }}>{livro.descricao}</p>

          <div className="owner-card mb-24">
            <div className="avatar lg" style={{ background: 'var(--primary)' }}>{livro.usuario?.nome?.[0]}</div>
            <div>
              <div className="owner-name">{livro.usuario?.nome}</div>
              <div className="owner-meta">{livro.usuario?.cidade}</div>
            </div>
          </div>

          {mensagem && <div className="badge badge-info mb-16" style={{ display: 'block', padding: '10px 14px' }}>{mensagem}</div>}

          {ehProprietario ? (
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to={`/livros/${livro.id}/editar`} className="btn btn-outline"><i className="fa-solid fa-pen" /> Editar</Link>
              <button className="btn btn-danger" onClick={excluir}><i className="fa-solid fa-trash" /> Excluir</button>
            </div>
          ) : podeSolicitar ? (
            <button className="btn btn-primary btn-lg" onClick={solicitar} disabled={enviando}>
              {enviando ? <span className="spinner" /> : <><i className="fa-solid fa-hand-holding-heart" /> Tenho interesse</>}
            </button>
          ) : (
            <span className="badge badge-neutral">Este livro não está disponível no momento.</span>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
