import { useEffect, useState } from 'react';
import api from '../api/client.js';
import AppLayout from '../components/AppLayout.jsx';
import BookCard from '../components/BookCard.jsx';
import { CATEGORIAS, TIPOS_OFERTA } from '../constants.js';

export default function Catalogo() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({ busca: '', categoria: '', cidade: '', tipoOferta: '' });

  async function buscar(filtrosAtuais) {
    setCarregando(true);
    try {
      const params = Object.fromEntries(Object.entries(filtrosAtuais).filter(([, v]) => v));
      const { data } = await api.get('/livros', { params });
      setLivros(data);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscar(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    buscar(filtros);
  }

  function limparFiltros() {
    const vazio = { busca: '', categoria: '', cidade: '', tipoOferta: '' };
    setFiltros(vazio);
    buscar(vazio);
  }

  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="page-title">Catálogo de livros</h1>
        <p className="page-subtitle">Encontre livros disponíveis para doação ou troca.</p>
      </div>

      <form className="search-top-bar" onSubmit={handleSubmit}>
        <div className="search-big-input">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            placeholder="Buscar por título ou autor..."
            value={filtros.busca}
            onChange={(e) => setFiltros((f) => ({ ...f, busca: e.target.value }))}
          />
        </div>
        <select className="form-control" style={{ maxWidth: 180 }} value={filtros.categoria} onChange={(e) => setFiltros((f) => ({ ...f, categoria: e.target.value }))}>
          <option value="">Todas categorias</option>
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-control" style={{ maxWidth: 160 }} value={filtros.tipoOferta} onChange={(e) => setFiltros((f) => ({ ...f, tipoOferta: e.target.value }))}>
          <option value="">Doação e troca</option>
          {TIPOS_OFERTA.map((t) => <option key={t.valor} value={t.valor}>{t.rotulo}</option>)}
        </select>
        <input
          className="form-control"
          style={{ maxWidth: 160 }}
          placeholder="Cidade"
          value={filtros.cidade}
          onChange={(e) => setFiltros((f) => ({ ...f, cidade: e.target.value }))}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
        <button type="button" className="btn btn-ghost" onClick={limparFiltros}>Limpar</button>
      </form>

      {carregando ? (
        <p className="text-muted">Carregando livros...</p>
      ) : livros.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">Nenhum livro encontrado</div>
          <div className="empty-state-text">Tente ajustar os filtros de busca.</div>
        </div>
      ) : (
        <div className="book-grid">
          {livros.map((livro) => <BookCard key={livro.id} livro={livro} />)}
        </div>
      )}
    </AppLayout>
  );
}
