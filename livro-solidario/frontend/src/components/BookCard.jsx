import { Link } from 'react-router-dom';
import { capaDoLivro, condicaoClasse, condicaoRotulo, tipoOfertaRotulo } from '../constants';

export default function BookCard({ livro }) {
  const capa = capaDoLivro(livro.id);
  const tipoCls = livro.tipoOferta === 'DOACAO' ? 'badge-doacao' : 'badge-troca';

  return (
    <Link to={`/livros/${livro.id}`} className="book-card fade-in">
      <div className="book-cover" style={{ background: capa.bg }}>
        <span>{capa.emoji}</span>
        <span className={`book-cover-badge ${tipoCls}`}>{tipoOfertaRotulo(livro.tipoOferta)}</span>
      </div>
      <div className="book-info">
        <div className="book-title">{livro.titulo}</div>
        <div className="book-author">{livro.autor}</div>
        <div className="book-footer">
          <div className="book-location">
            <i className="fa-solid fa-location-dot" /> {livro.cidade}
          </div>
          <span className={`book-cond ${condicaoClasse(livro.condicao)}`}>{condicaoRotulo(livro.condicao)}</span>
        </div>
      </div>
    </Link>
  );
}
