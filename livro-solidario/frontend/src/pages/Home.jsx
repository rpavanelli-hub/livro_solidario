import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import PublicNavbar from '../components/PublicNavbar.jsx';
import BookCard from '../components/BookCard.jsx';

export default function Home() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    api.get('/livros')
      .then((res) => setLivros(Array.isArray(res.data) ? res.data.slice(0, 8) : []))
      .catch(() => setLivros([]));
  }, []);

  return (
    <>
      <PublicNavbar />

      <section className="hero-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <div className="hero-tag" style={{ margin: '0 auto' }}>
              <i className="fa-solid fa-seedling" /> Plataforma de doação e troca de livros
            </div>
            <h1 className="hero-title">Compartilhe livros,<br />espalhe <span className="highlight">conhecimento</span></h1>
            <p className="hero-desc" style={{ margin: '0 auto' }}>
              Conectamos pessoas que desejam doar ou trocar livros com leitores que buscam novas histórias. Simples, gratuito e sustentável.
            </p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <Link to="/cadastro" className="btn btn-primary btn-xl">
                <i className="fa-solid fa-rocket" /> Começar agora — é grátis
              </Link>
              <a href="#como-funciona" className="btn btn-outline btn-xl">Ver como funciona</a>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section" id="como-funciona">
        <div className="container">
          <div className="text-center">
            <div className="section-tag"><i className="fa-solid fa-circle-info" /> Simples e rápido</div>
            <h2 style={{ color: 'var(--text)', marginBottom: 12 }}>Como funciona?</h2>
            <p style={{ maxWidth: 520, margin: '0 auto' }}>Em apenas 4 passos você começa a compartilhar e receber livros na sua comunidade.</p>
          </div>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-num">1</div>
              <div className="how-title">Crie sua conta</div>
              <div className="how-desc">Cadastre-se gratuitamente com e-mail. Sem taxas, sem burocracia.</div>
            </div>
            <div className="how-card">
              <div className="how-num">2</div>
              <div className="how-title">Publique livros</div>
              <div className="how-desc">Cadastre os livros que deseja doar ou trocar com título, autor e descrição.</div>
            </div>
            <div className="how-card">
              <div className="how-num">3</div>
              <div className="how-title">Encontre & solicite</div>
              <div className="how-desc">Busque por título, autor, cidade ou categoria e demonstre interesse.</div>
            </div>
            <div className="how-card">
              <div className="how-num">4</div>
              <div className="how-title">Conclua a troca</div>
              <div className="how-desc">O proprietário aceita sua solicitação e combina a entrega com você.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="funcionalidades">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-tag"><i className="fa-solid fa-star" /> Funcionalidades</div>
            <h2 className="features-title">Tudo que você precisa para compartilhar</h2>
            <p className="features-sub" style={{ margin: '0 auto' }}>Uma plataforma simples para conectar leitores e doadores.</p>
          </div>
          <div className="features-grid">
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#E8F5E9', color: '#2E7D32' }}><i className="fa-solid fa-gift" /></div>
              <div className="feat-title">Doação Direta</div>
              <div className="feat-desc">Doe livros diretamente para outras pessoas da comunidade.</div>
            </div>
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#E3F2FD', color: '#1976D2' }}><i className="fa-solid fa-arrows-rotate" /></div>
              <div className="feat-title">Troca de Livros</div>
              <div className="feat-desc">Proponha trocas com outros leitores e renove seu acervo sem gastar nada.</div>
            </div>
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}><i className="fa-solid fa-magnifying-glass" /></div>
              <div className="feat-title">Busca Simples</div>
              <div className="feat-desc">Encontre livros por título, autor, categoria, cidade ou tipo de oferta.</div>
            </div>
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#FEE2E2', color: '#DC2626' }}><i className="fa-solid fa-handshake" /></div>
              <div className="feat-title">Solicitações</div>
              <div className="feat-desc">Demonstre interesse e acompanhe o status do seu pedido em tempo real.</div>
            </div>
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#F3E8FF', color: '#7C3AED' }}><i className="fa-solid fa-shield-halved" /></div>
              <div className="feat-title">Cadastro Seguro</div>
              <div className="feat-desc">Login protegido, com senha criptografada e sessões autenticadas.</div>
            </div>
            <div className="feat-card">
              <div className="feat-icon" style={{ background: '#ECFDF5', color: '#059669' }}><i className="fa-solid fa-chart-line" /></div>
              <div className="feat-title">Dashboard Completo</div>
              <div className="feat-desc">Acompanhe seus livros publicados e solicitações em um painel intuitivo.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="books-preview-section" id="livros">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag" style={{ marginBottom: 8 }}><i className="fa-solid fa-book" /> Acervo ativo</div>
              <h2 style={{ color: 'var(--text)', marginBottom: 0 }}>Livros disponíveis agora</h2>
            </div>
            <Link to="/login" className="btn btn-outline-primary">Ver todos os livros <i className="fa-solid fa-arrow-right" /></Link>
          </div>
          <div className="book-grid">
            {livros.length === 0 && (
              <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-title">Nenhum livro cadastrado ainda</div>
                <div className="empty-state-text">Seja o primeiro a publicar um livro na plataforma.</div>
              </div>
            )}
            {livros.map((livro) => <BookCard key={livro.id} livro={livro} />)}
          </div>
          <div className="text-center mt-32">
            <Link to="/cadastro" className="btn btn-primary btn-lg"><i className="fa-solid fa-plus" /> Junte-se e acesse todos os livros</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <i className="fa-solid fa-book-open-reader" style={{ fontSize: '3rem', color: 'rgba(255,255,255,.4)', marginBottom: 16 }} />
          <h2>Pronto para começar a compartilhar?</h2>
          <p>Junte-se à comunidade Livro Solidário e transforme livros parados em novas histórias.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/cadastro" className="btn btn-xl" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
              <i className="fa-solid fa-rocket" /> Criar conta gratuitamente
            </Link>
            <Link to="/login" className="btn-outline-white btn btn-xl">Já tenho conta</Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <div className="logo-mark" style={{ width: 32, height: 32, fontSize: '.9rem' }}><i className="fa-solid fa-book-open-reader" /></div>
                <span className="footer-logo-text">Livro <span>Solidário</span></span>
              </div>
              <p className="footer-about">Plataforma gratuita para doação e troca de livros. Promovendo o acesso à leitura e a sustentabilidade.</p>
            </div>
            <div>
              <div className="footer-col-title">Plataforma</div>
              <div className="footer-links">
                <Link to="/cadastro">Criar conta</Link>
                <Link to="/login">Entrar</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Livro Solidário. Projeto Integrador — Segunda Etapa.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
