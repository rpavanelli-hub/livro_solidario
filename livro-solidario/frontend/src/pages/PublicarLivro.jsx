import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import { CATEGORIAS, CONDICOES, TIPOS_OFERTA } from '../constants.js';

const VAZIO = { titulo: '', autor: '', descricao: '', categoria: '', condicao: '', tipoOferta: '', cidade: '' };

export default function PublicarLivro() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(VAZIO);
  const [carregando, setCarregando] = useState(editando);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!editando) return;
    api.get(`/livros/${id}`)
      .then((res) => {
        const { titulo, autor, descricao, categoria, condicao, tipoOferta, cidade } = res.data;
        setForm({ titulo, autor, descricao, categoria, condicao, tipoOferta, cidade });
      })
      .finally(() => setCarregando(false));
  }, [id, editando]);

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      if (editando) {
        await api.put(`/livros/${id}`, form);
        navigate(`/livros/${id}`);
      } else {
        const { data } = await api.post('/livros', form);
        navigate(`/livros/${data.id}`);
      }
    } catch (err) {
      setErro(err.response?.data?.error || 'Não foi possível salvar o livro.');
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return <AppLayout><p className="text-muted">Carregando...</p></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">{editando ? 'Editar livro' : 'Publicar livro'}</h1>
        <p className="page-subtitle">Preencha as informações do livro que deseja doar ou trocar.</p>
      </div>

      <div className="card" style={{ maxWidth: 640 }}>
        <div className="card-body">
          {erro && <div className="badge badge-danger mb-16" style={{ display: 'block', padding: '10px 14px' }}>{erro}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="titulo">Título <span className="req">*</span></label>
              <input id="titulo" className="form-control" required value={form.titulo} onChange={(e) => atualizar('titulo', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="autor">Autor <span className="req">*</span></label>
              <input id="autor" className="form-control" required value={form.autor} onChange={(e) => atualizar('autor', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="descricao">Descrição <span className="req">*</span></label>
              <textarea id="descricao" className="form-control" required value={form.descricao} onChange={(e) => atualizar('descricao', e.target.value)} placeholder="Conte sobre o estado do livro e detalhes relevantes." />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="categoria">Categoria <span className="req">*</span></label>
                <select id="categoria" className="form-control" required value={form.categoria} onChange={(e) => atualizar('categoria', e.target.value)}>
                  <option value="">Selecione</option>
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cidade">Cidade <span className="req">*</span></label>
                <input id="cidade" className="form-control" required value={form.cidade} onChange={(e) => atualizar('cidade', e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Condição <span className="req">*</span></label>
              <div className="radio-group">
                {CONDICOES.map((c) => (
                  <label key={c.valor} className="radio-card">
                    <input type="radio" name="condicao" value={c.valor} checked={form.condicao === c.valor} onChange={(e) => atualizar('condicao', e.target.value)} required />
                    <div className="radio-card-body">{c.rotulo}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de oferta <span className="req">*</span></label>
              <div className="radio-group">
                {TIPOS_OFERTA.map((t) => (
                  <label key={t.valor} className="radio-card">
                    <input type="radio" name="tipoOferta" value={t.valor} checked={form.tipoOferta === t.valor} onChange={(e) => atualizar('tipoOferta', e.target.value)} required />
                    <div className="radio-card-body">
                      <i className={`fa-solid ${t.valor === 'DOACAO' ? 'fa-gift' : 'fa-arrows-rotate'}`} /> {t.rotulo}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={enviando}>
              {enviando ? <span className="spinner" /> : editando ? 'Salvar alterações' : 'Publicar livro'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
