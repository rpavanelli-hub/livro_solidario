import { Link } from 'react-router-dom';

export default function PublicNavbar() {
  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="landing-nav-logo">
          <div className="logo-mark"><i className="fa-solid fa-book-open-reader" /></div>
          Livro <span>Solidário</span>
        </Link>
        <div className="landing-nav-links">
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#funcionalidades">Funcionalidades</a>
          <a href="/#livros">Livros</a>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-ghost">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary">Criar conta grátis</Link>
        </div>
      </div>
    </nav>
  );
}
