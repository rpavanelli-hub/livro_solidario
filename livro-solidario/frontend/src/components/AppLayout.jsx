import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'fa-house', label: 'Dashboard' },
  { to: '/catalogo', icon: 'fa-magnifying-glass', label: 'Buscar livros' },
  { to: '/publicar', icon: 'fa-plus-circle', label: 'Publicar livro' },
  { to: '/meus-livros', icon: 'fa-book', label: 'Meus livros' },
  { to: '/solicitacoes', icon: 'fa-clipboard-list', label: 'Solicitações' },
];

export default function AppLayout({ children }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  function sair() {
    logout();
    navigate('/');
  }

  const iniciais = usuario?.nome
    ?.split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <div className="app-layout">
      <aside className={`sidebar ${sidebarAberta ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-mark"><i className="fa-solid fa-book-open-reader" /></div>
          <span className="logo-text">Livro <span>Solidário</span></span>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Principal</div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${location.pathname.startsWith(item.to) ? 'active' : ''}`}
              onClick={() => setSidebarAberta(false)}
            >
              <i className={`fa-solid ${item.icon}`} />{item.label}
            </Link>
          ))}
          <div className="nav-section-label">Conta</div>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); sair(); }}>
            <i className="fa-solid fa-right-from-bracket" />Sair
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-mini">
            <div className="avatar md" style={{ background: 'var(--primary)' }}>{iniciais}</div>
            <div className="user-mini-info">
              <div className="user-mini-name">{usuario?.nome}</div>
              <div className="user-mini-role">{usuario?.cidade}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="main-header">
          <button className="hamburger-btn" onClick={() => setSidebarAberta((v) => !v)}>
            <i className="fa-solid fa-bars" />
          </button>
          <div style={{ flex: 1 }} />
          <div className="header-actions">
            <Link to="/meus-livros" className="icon-btn" title="Meus livros"><i className="fa-solid fa-book" /></Link>
            <div className="avatar md" style={{ background: 'var(--primary)' }}>{iniciais}</div>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>

      {sidebarAberta && <div className="mobile-overlay show" onClick={() => setSidebarAberta(false)} />}
    </div>
  );
}
