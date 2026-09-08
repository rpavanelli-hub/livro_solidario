/* ========================================================
   LIVRO SOLIDÁRIO — App JavaScript (Prototype)
   Dados fictícios · Navegação simulada · Sem backend
   ======================================================== */

/* === DADOS FICTÍCIOS === */
const MOCK_USER = {
  id: 1, name: 'Ana Clara Ferreira', initials: 'AC',
  email: 'ana.clara@email.com', city: 'São Paulo', neighborhood: 'Vila Madalena',
  bio: 'Estudante de Pedagogia, apaixonada por livros e por compartilhar conhecimento.',
  member_since: 'Janeiro 2024', rating: 4.7, total_ratings: 23,
  donated: 14, exchanged: 8, received: 11
};

const BOOK_COVERS = [
  { bg: 'linear-gradient(135deg,#667eea,#764ba2)', emoji: '📚' },
  { bg: 'linear-gradient(135deg,#2E7D32,#43A047)', emoji: '📖' },
  { bg: 'linear-gradient(135deg,#F97316,#EF4444)', emoji: '🎭' },
  { bg: 'linear-gradient(135deg,#1976D2,#0097A7)', emoji: '🌎' },
  { bg: 'linear-gradient(135deg,#E91E63,#9C27B0)', emoji: '🦋' },
  { bg: 'linear-gradient(135deg,#F59E0B,#EF4444)', emoji: '⚔️' },
  { bg: 'linear-gradient(135deg,#00897B,#2E7D32)', emoji: '🌿' },
  { bg: 'linear-gradient(135deg,#1A237E,#1976D2)', emoji: '🔮' },
  { bg: 'linear-gradient(135deg,#880E4F,#E91E63)', emoji: '🌸' },
  { bg: 'linear-gradient(135deg,#01579B,#26C6DA)', emoji: '🌊' },
  { bg: 'linear-gradient(135deg,#4A148C,#7B1FA2)', emoji: '⭐' },
  { bg: 'linear-gradient(135deg,#BF360C,#F57C00)', emoji: '🔥' },
];

const BOOKS = [
  { id:1,  title:'Dom Casmurro',               author:'Machado de Assis',    category:'Literatura Brasileira', condition:'Ótimo',   type:'doacao',  city:'São Paulo',    neighborhood:'Vila Madalena',  cover:0, desc:'Obra clássica da literatura brasileira em ótimo estado. Lido apenas uma vez, sem grifos ou marcas. Capa dura.',   owner:{id:2,name:'Carlos Henrique',initials:'CH',rating:4.8,city:'São Paulo'} },
  { id:2,  title:'O Senhor dos Anéis',          author:'J.R.R. Tolkien',      category:'Fantasia',              condition:'Bom',     type:'troca',   city:'Rio de Janeiro',neighborhood:'Botafogo',       cover:1, desc:'Trilogia completa em caixa especial. Pequenas marcas de uso, sem rasgos. Edição comemorativa.',               owner:{id:3,name:'Mariana Santos',initials:'MS',rating:4.9,city:'Rio de Janeiro'} },
  { id:3,  title:'O Alquimista',                author:'Paulo Coelho',         category:'Ficção',                condition:'Novo',    type:'doacao',  city:'Belo Horizonte',neighborhood:'Savassi',         cover:2, desc:'Livro praticamente novo, presente que não foi lido. Perfeito para quem busca inspiração.',                   owner:{id:4,name:'Fernanda Lima',initials:'FL',rating:5.0,city:'Belo Horizonte'} },
  { id:4,  title:'1984',                        author:'George Orwell',        category:'Ficção Científica',     condition:'Regular', type:'doacao',  city:'Curitiba',     neighborhood:'Batel',           cover:3, desc:'Clássico distópico, páginas um pouco amareladas pelo tempo mas legível. Ótimo para estudantes.',              owner:{id:5,name:'Roberto Alves',initials:'RA',rating:4.5,city:'Curitiba'} },
  { id:5,  title:'Sapiens',                     author:'Yuval Noah Harari',    category:'História',              condition:'Ótimo',   type:'troca',   city:'São Paulo',    neighborhood:'Pinheiros',        cover:4, desc:'Edição atualizada em ótimo estado. Tenho interesse em trocar por livros de filosofia.',                       owner:{id:6,name:'Juliana Costa',initials:'JC',rating:4.6,city:'São Paulo'} },
  { id:6,  title:'A Revolução dos Bichos',      author:'George Orwell',        category:'Ficção',                condition:'Bom',     type:'doacao',  city:'Porto Alegre', neighborhood:'Moinhos de Vento',cover:5, desc:'Fábula política imprescindível. Livro em bom estado, algumas marcas de lápis apagadas.',                     owner:{id:7,name:'Paulo Mendes',initials:'PM',rating:4.7,city:'Porto Alegre'} },
  { id:7,  title:'Harry Potter - Pedra Filosofal',author:'J.K. Rowling',      category:'Fantasia',              condition:'Bom',     type:'troca',   city:'São Paulo',    neighborhood:'Moema',            cover:6, desc:'Primeira edição brasileira, capa mole, bom estado. Busco trocar por outros da série ou aventura.',           owner:{id:8,name:'Camila Rocha',initials:'CR',rating:4.9,city:'São Paulo'} },
  { id:8,  title:'O Pequeno Príncipe',          author:'Antoine de Saint-Exupéry',category:'Infantil',          condition:'Novo',    type:'doacao',  city:'Salvador',     neighborhood:'Pituba',           cover:7, desc:'Edição ilustrada completa, capa dura. Presente não utilizado. Perfeito estado.',                              owner:{id:9,name:'Diego Neves',initials:'DN',rating:4.8,city:'Salvador'} },
  { id:9,  title:'Não Me Faças Pensar',         author:'Steve Krug',           category:'Tecnologia',            condition:'Ótimo',   type:'doacao',  city:'Brasília',     neighborhood:'Asa Norte',        cover:8, desc:'Livro essencial sobre UX/UI. Ótimo estado, sem marcações. Imperdível para designers e desenvolvedores.',     owner:{id:10,name:'Larissa Vieira',initials:'LV',rating:4.7,city:'Brasília'} },
  { id:10, title:'O Poder do Hábito',           author:'Charles Duhigg',       category:'Autoajuda',             condition:'Bom',     type:'troca',   city:'Fortaleza',    neighborhood:'Meireles',         cover:9, desc:'Livro transformador sobre como criar e mudar hábitos. Bom estado, algumas anotações a lápis.',               owner:{id:11,name:'Beatriz Gomes',initials:'BG',rating:4.6,city:'Fortaleza'} },
  { id:11, title:'Duna',                        author:'Frank Herbert',        category:'Ficção Científica',     condition:'Ótimo',   type:'troca',   city:'Recife',       neighborhood:'Boa Viagem',        cover:10,desc:'Ficção científica épica, edição especial com capa dura. Praticamente novo. Aceito trocar por clássicos.',   owner:{id:12,name:'Thiago Castro',initials:'TC',rating:4.8,city:'Recife'} },
  { id:12, title:'Psicologia das Cores',        author:'Eva Heller',           category:'Arte & Design',         condition:'Novo',    type:'doacao',  city:'São Paulo',    neighborhood:'Itaim Bibi',        cover:11,desc:'Livro raro e valioso para designers. Novo, lacrado. Doando pois recebi duplicado.',                         owner:{id:13,name:'Amanda Ferraz',initials:'AF',rating:5.0,city:'São Paulo'} },
  { id:13, title:'Clean Code',                  author:'Robert C. Martin',     category:'Tecnologia',            condition:'Bom',     type:'doacao',  city:'Campinas',     neighborhood:'Cambuí',           cover:0, desc:'Bíblia dos programadores em bom estado. Algumas páginas com marcadores de post-it.',                        owner:{id:14,name:'Lucas Batista',initials:'LB',rating:4.5,city:'Campinas'} },
  { id:14, title:'Memórias Póstumas de Brás Cubas',author:'Machado de Assis', category:'Literatura Brasileira', condition:'Regular', type:'doacao',  city:'Rio de Janeiro',neighborhood:'Lapa',            cover:1, desc:'Clássico indispensável. Livro com capa desgastada mas conteúdo íntegro.',                                    owner:{id:15,name:'Renata Souza',initials:'RS',rating:4.4,city:'Rio de Janeiro'} },
  { id:15, title:'Cem Anos de Solidão',         author:'Gabriel García Márquez',category:'Literatura',           condition:'Ótimo',   type:'troca',   city:'São Paulo',    neighborhood:'Jardins',           cover:2, desc:'Obra-prima do realismo mágico. Edição de colecionador, ótimo estado. Aceito clássicos europeus.',            owner:{id:16,name:'Sofia Alencar',initials:'SA',rating:4.9,city:'São Paulo'} },
  { id:16, title:'O Cortiço',                   author:'Aluísio Azevedo',      category:'Literatura Brasileira', condition:'Bom',     type:'doacao',  city:'Manaus',       neighborhood:'Centro',           cover:3, desc:'Grande obra do naturalismo brasileiro. Bom estado, ideal para estudantes de literatura.',                   owner:{id:17,name:'Eduardo Pinto',initials:'EP',rating:4.6,city:'Manaus'} },
];

const CATEGORIES = [
  'Literatura Brasileira','Ficção','Ficção Científica','Fantasia','Romance','Suspense',
  'História','Filosofia','Ciências','Tecnologia','Autoajuda','Infantil','Arte & Design',
  'Direito','Medicina','Pedagogia','Administração','Economia'
];

const NOTIFICATIONS = [
  { id:1, type:'request', icon:'📬', title:'Nova solicitação recebida', text:'Mariana Santos solicitou o livro "Dom Casmurro" que você publicou.', time:'Há 5 minutos', unread:true },
  { id:2, type:'message', icon:'💬', title:'Nova mensagem de Carlos Henrique', text:'Oi! Ainda tem interesse no livro? Posso encontrar amanhã.', time:'Há 20 minutos', unread:true },
  { id:3, type:'rating',  icon:'⭐', title:'Avaliação recebida', text:'Fernanda Lima te avaliou com 5 estrelas pela doação do livro.', time:'Há 2 horas', unread:true },
  { id:4, type:'system',  icon:'✅', title:'Troca concluída com sucesso', text:'Sua troca do livro "O Alquimista" foi marcada como concluída.', time:'Há 1 dia', unread:false },
  { id:5, type:'message', icon:'💬', title:'Mensagem de Roberto Alves', text:'Obrigado pelo livro! Está chegando amanhã.', time:'Há 1 dia', unread:false },
  { id:6, type:'request', icon:'📬', title:'Solicitação aceita', text:'Carlos Henrique aceitou sua solicitação do livro "Sapiens".', time:'Há 2 dias', unread:false },
  { id:7, type:'system',  icon:'🎉', title:'Parabéns! Primeira doação', text:'Você completou sua primeira doação na plataforma!', time:'Há 5 dias', unread:false },
  { id:8, type:'system',  icon:'📢', title:'Novos livros na sua região', text:'12 novos livros foram publicados em Vila Madalena.', time:'Há 1 semana', unread:false },
];

const HISTORY = [
  { id:1, bookTitle:'O Cortiço', author:'Aluísio Azevedo', type:'doação', cover:3, with:'Biblioteca Comunitária São João', date:'01/06/2024', status:'concluido' },
  { id:2, bookTitle:'A Revolução dos Bichos', author:'George Orwell', type:'troca', cover:5, with:'Paulo Mendes', date:'28/05/2024', status:'concluido' },
  { id:3, bookTitle:'Cem Anos de Solidão', author:'García Márquez', type:'recebido', cover:2, with:'Sofia Alencar', date:'20/05/2024', status:'concluido' },
  { id:4, bookTitle:'Sapiens', author:'Yuval Noah Harari', type:'troca', cover:4, with:'Juliana Costa', date:'15/05/2024', status:'andamento' },
  { id:5, bookTitle:'Harry Potter - Pedra Filosofal', author:'J.K. Rowling', type:'recebido', cover:6, with:'Camila Rocha', date:'10/05/2024', status:'concluido' },
  { id:6, bookTitle:'1984', author:'George Orwell', type:'doação', cover:3, with:'Pedro Leal', date:'02/05/2024', status:'concluido' },
  { id:7, bookTitle:'Duna', author:'Frank Herbert', type:'troca', cover:10, with:'Thiago Castro', date:'25/04/2024', status:'cancelado' },
  { id:8, bookTitle:'O Pequeno Príncipe', author:'Antoine de Saint-Exupéry', type:'recebido', cover:7, with:'Diego Neves', date:'18/04/2024', status:'concluido' },
];

const CHATS = [
  {
    id:1, with:'Carlos Henrique', initials:'CH', color:'#1976D2',
    book:'Dom Casmurro', preview:'Posso buscar amanhã?', time:'10:34', unread:2,
    messages:[
      { dir:'in',  text:'Oi Ana! Vi que você publicou o Dom Casmurro para doação.', time:'10:10' },
      { dir:'out', text:'Oi Carlos! Sim, está disponível! 😊', time:'10:12' },
      { dir:'in',  text:'Perfeito! Você prefere entregar pessoalmente ou pelo Correios?', time:'10:15' },
      { dir:'out', text:'Prefiro pessoalmente, fica mais fácil. Você é aqui em SP?', time:'10:17' },
      { dir:'in',  text:'Sim! Moro no Brooklin. Posso ir até Vila Madalena tranquilo.', time:'10:20' },
      { dir:'out', text:'Ótimo! Que tal sábado de manhã? Posso encontrar no metrô.', time:'10:22' },
      { dir:'in',  text:'Sábado funciona sim! Que horas?', time:'10:30' },
      { dir:'in',  text:'Posso buscar amanhã?', time:'10:34' },
    ]
  },
  {
    id:2, with:'Mariana Santos', initials:'MS', color:'#9C27B0',
    book:'O Senhor dos Anéis', preview:'Obrigada pela troca!', time:'Ontem', unread:0,
    messages:[
      { dir:'in',  text:'Olá! Tenho interesse na sua trilogia do Senhor dos Anéis.', time:'09:00' },
      { dir:'out', text:'Oi Mariana! Está disponível sim. Qual livro você oferece em troca?', time:'09:05' },
      { dir:'in',  text:'Tenho o Hobbit e o Silmarillion, ambos em ótimo estado.', time:'09:08' },
      { dir:'out', text:'Perfeito! Vamos combinar a troca então. Você é de onde?', time:'09:10' },
      { dir:'in',  text:'Sou do Botafogo, Rio. Posso enviar pelo Correios se quiser.', time:'09:12' },
      { dir:'out', text:'Combinado! Me manda os dados para o envio.', time:'09:15' },
      { dir:'in',  text:'Obrigada pela troca!', time:'Ontem' },
    ]
  },
  {
    id:3, with:'Biblioteca Comunitária São João', initials:'BS', color:'#2E7D32',
    book:'Lote de livros didáticos', preview:'Muito obrigados pela doação!', time:'Segunda', unread:0,
    messages:[
      { dir:'in',  text:'Boa tarde! Vimos que você tem livros disponíveis para doação.', time:'14:00' },
      { dir:'out', text:'Boa tarde! Sim, tenho alguns livros didáticos e literatura. Quais vocês precisam?', time:'14:05' },
      { dir:'in',  text:'Precisamos principalmente de livros de português e história para o ensino médio.', time:'14:10' },
      { dir:'out', text:'Tenho alguns! Posso levar pessoalmente ou vocês buscam?', time:'14:12' },
      { dir:'in',  text:'Podemos buscar! Qual endereço?', time:'14:15' },
      { dir:'out', text:'Vila Madalena, SP. Mando o endereço completo por aqui mesmo.', time:'14:17' },
      { dir:'in',  text:'Muito obrigados pela doação!', time:'Segunda' },
    ]
  },
];


let currentChat = 0;
let isLoggedIn = localStorage.getItem('ls_logged_in') === 'true';


function toast(msg, type = 'success', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || '✅'}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => {
    t.classList.add('out');
    setTimeout(() => t.remove(), 350);
  }, duration);
}


function showModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
}
function hideModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('show'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});


function initSidebar() {
  const ham = document.querySelector('.hamburger-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');
  if (!ham || !sidebar) return;
  ham.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay && overlay.classList.toggle('show');
  });
  overlay && overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}


function requireAuth() {
  if (!isLoggedIn) { window.location.href = 'login.html'; }
}
function checkAuthRedirect() {
  if (isLoggedIn && (location.pathname.endsWith('login.html') || location.pathname.endsWith('cadastro.html'))) {
    window.location.href = 'dashboard.html';
  }
}

function buildBookCard(book, href = 'livro.html') {
  const cover = BOOK_COVERS[book.cover % BOOK_COVERS.length];
  const typeLabel = book.type === 'doacao' ? 'Doação' : 'Troca';
  const typeCls   = book.type === 'doacao' ? 'badge-doacao' : 'badge-troca';
  const condMap   = { 'Novo':'cond-novo','Ótimo':'cond-otimo','Bom':'cond-bom','Regular':'cond-regular' };
  const condCls   = condMap[book.condition] || 'cond-bom';
  return `
    <div class="book-card fade-in" onclick="location.href='${href}?id=${book.id}'">
      <div class="book-cover" style="background:${cover.bg}">
        <span>${cover.emoji}</span>
        <span class="book-cover-badge ${typeCls}">${typeLabel}</span>
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-footer">
          <div class="book-location"><i class="fa-solid fa-location-dot"></i>${book.neighborhood}</div>
          <span class="book-cond ${condCls}">${book.condition}</span>
        </div>
      </div>
    </div>`;
}

function renderBookGrid(containerId, books, href) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!books.length) {
    el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">📭</div><div class="empty-state-title">Nenhum livro encontrado</div><div class="empty-state-text">Tente ajustar os filtros de busca.</div></div>`;
    return;
  }
  el.innerHTML = books.map(b => buildBookCard(b, href)).join('');
}


function starsHtml(rating, max = 5) {
  let h = '';
  for (let i = 1; i <= max; i++) {
    h += `<span class="star ${i <= Math.round(rating) ? 'on' : ''}">★</span>`;
  }
  return h;
}


function initLogin() {
  checkAuthRedirect();
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.innerHTML = '<span class="spinner"></span> Entrando...';
    btn.disabled = true;
    setTimeout(() => {
      localStorage.setItem('ls_logged_in', 'true');
      localStorage.setItem('ls_user', JSON.stringify(MOCK_USER));
      toast('Bem-vinda de volta, Ana Clara! 👋', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    }, 1200);
  });
}

function initCadastro() {
  checkAuthRedirect();
  const form = document.getElementById('cadastroForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.innerHTML = '<span class="spinner"></span> Criando conta...';
    btn.disabled = true;
    setTimeout(() => {
      toast('Conta criada com sucesso! Faça login para continuar.', 'success');
      setTimeout(() => window.location.href = 'login.html', 1200);
    }, 1500);
  });
}

function initDashboard() {
  requireAuth();
  initSidebar();

  renderBookGrid('recentBooks', BOOKS.slice(0,4), 'livro.html');

  document.querySelectorAll('.stat-counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  });

  const headerSearch = document.getElementById('headerSearch');
  headerSearch && headerSearch.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      window.location.href = `busca.html?q=${encodeURIComponent(e.target.value)}`;
    }
  });
}

function initBusca() {
  requireAuth();
  initSidebar();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const input = document.getElementById('searchInput');
  if (input && q) input.value = q;

  let filtered = [...BOOKS];

  function applyFilters() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const selTypes = [...document.querySelectorAll('.f-type:checked')].map(el => el.value);
    const selConds = [...document.querySelectorAll('.f-cond:checked')].map(el => el.value);
    const selCats  = [...document.querySelectorAll('.f-cat:checked')].map(el => el.value);
    const selCity  = document.getElementById('cityFilter')?.value || '';
    const sort     = document.getElementById('sortSelect')?.value || 'recent';

    filtered = BOOKS.filter(b => {
      if (query && !b.title.toLowerCase().includes(query) && !b.author.toLowerCase().includes(query)) return false;
      if (selTypes.length && !selTypes.includes(b.type)) return false;
      if (selConds.length && !selConds.includes(b.condition)) return false;
      if (selCats.length  && !selCats.includes(b.category)) return false;
      if (selCity && b.city !== selCity) return false;
      return true;
    });

    if (sort === 'alpha') filtered.sort((a,b) => a.title.localeCompare(b.title));
    else if (sort === 'condition') {
      const ord = {'Novo':0,'Ótimo':1,'Bom':2,'Regular':3};
      filtered.sort((a,b) => (ord[a.condition]||99) - (ord[b.condition]||99));
    }

    renderBookGrid('buscaResults', filtered, 'livro.html');
    const countEl = document.getElementById('resultsCount');
    if (countEl) countEl.innerHTML = `<strong>${filtered.length}</strong> livro${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
  }

  applyFilters();
  document.getElementById('searchInput')?.addEventListener('input', applyFilters);
  document.getElementById('searchBtn')?.addEventListener('click', applyFilters);
  document.querySelectorAll('.f-type,.f-cond,.f-cat').forEach(el => el.addEventListener('change', applyFilters));
  document.getElementById('cityFilter')?.addEventListener('change', applyFilters);
  document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    document.querySelectorAll('.f-type,.f-cond,.f-cat').forEach(el => el.checked = false);
    const city = document.getElementById('cityFilter'); if (city) city.value = '';
    if (input) input.value = '';
    applyFilters();
  });
}

function initLivro() {
  requireAuth();
  initSidebar();
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  const cover = BOOK_COVERS[book.cover % BOOK_COVERS.length];

  const el = id => document.getElementById(id);
  const coverEl = document.getElementById('bookCover');
  if (coverEl) { coverEl.style.background = cover.bg; coverEl.querySelector('.cover-emoji').textContent = cover.emoji; }
  const setTxt = (id, val) => { const e = el(id); if(e) e.textContent = val; };
  setTxt('bookTitle', book.title);
  setTxt('bookAuthor', book.author);
  setTxt('bookCategory', book.category);
  setTxt('bookCondition', book.condition);
  setTxt('bookCity', `${book.neighborhood}, ${book.city}`);
  setTxt('bookDesc', book.desc);
  const typeBadge = document.getElementById('bookTypeBadge');
  if (typeBadge) { typeBadge.textContent = book.type === 'doacao' ? 'Doação' : 'Troca'; typeBadge.className = `type-badge ${book.type === 'doacao' ? 'badge-doacao' : 'badge-troca'}`; }

  setTxt('ownerName', book.owner.name);
  setTxt('ownerCity', book.owner.city);
  setTxt('ownerRating', book.owner.rating);
  const ownerAvatar = document.getElementById('ownerAvatar');
  if (ownerAvatar) ownerAvatar.textContent = book.owner.initials;
  const ownerStars = document.getElementById('ownerStars');
  if (ownerStars) ownerStars.innerHTML = starsHtml(book.owner.rating);
  const condBadge = document.getElementById('condBadge');
  if (condBadge) { const m = {'Novo':'cond-novo','Ótimo':'cond-otimo','Bom':'cond-bom','Regular':'cond-regular'}; condBadge.className = `book-cond ${m[book.condition]||'cond-bom'}`; condBadge.textContent = book.condition; }


  const similar = BOOKS.filter(b => b.id !== book.id && (b.category === book.category || b.city === book.city)).slice(0, 4);
  renderBookGrid('similarBooks', similar.length ? similar : BOOKS.slice(0,4), 'livro.html');


  document.getElementById('btnSolicitar')?.addEventListener('click', () => {
    window.location.href = `solicitacao.html?id=${book.id}`;
  });
  document.getElementById('btnChat')?.addEventListener('click', () => {
    window.location.href = 'chat.html';
  });
  document.getElementById('ownerProfile')?.addEventListener('click', () => {
    window.location.href = 'perfil.html';
  });
}

function initPublicar() {
  requireAuth();
  initSidebar();
  const form = document.getElementById('publicarForm');


  const fileInput = document.getElementById('bookPhoto');
  const uploadZone = document.getElementById('uploadZone');
  const preview = document.getElementById('uploadPreview');
  const previewImg = document.getElementById('previewImg');
  const removeBtn = document.getElementById('removePhoto');

  fileInput?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => {
        previewImg.src = ev.target.result;
        uploadZone.classList.add('hidden');
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });
  removeBtn?.addEventListener('click', () => {
    fileInput.value = '';
    previewImg.src = '';
    preview.classList.add('hidden');
    uploadZone.classList.remove('hidden');
  });

  uploadZone?.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag'); });
  uploadZone?.addEventListener('dragleave', () => uploadZone.classList.remove('drag'));
  uploadZone?.addEventListener('drop', e => {
    e.preventDefault(); uploadZone.classList.remove('drag');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) fileInput.files = e.dataTransfer.files;
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.innerHTML = '<span class="spinner"></span> Publicando...';
    btn.disabled = true;
    setTimeout(() => {
      showModal('successModal');
    }, 1500);
  });

  document.getElementById('goToDashboard')?.addEventListener('click', () => window.location.href = 'dashboard.html');
  document.getElementById('publishAnother')?.addEventListener('click', () => { hideModal('successModal'); form.reset(); });
}


function initSolicitacao() {
  requireAuth();
  initSidebar();
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  const cover = BOOK_COVERS[book.cover % BOOK_COVERS.length];

  const coverEl = document.getElementById('reqBookCover');
  if (coverEl) { coverEl.style.background = cover.bg; coverEl.querySelector('.cover-emoji').textContent = cover.emoji; }
  const setTxt = (elId, val) => { const e = document.getElementById(elId); if(e) e.textContent = val; };
  setTxt('reqBookTitle', book.title);
  setTxt('reqBookAuthor', book.author);
  setTxt('reqBookType', book.type === 'doacao' ? 'Doação' : 'Troca');
  setTxt('reqOwner', book.owner.name);
  setTxt('reqCity', `${book.neighborhood}, ${book.city}`);

  const form = document.getElementById('solicitacaoForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.innerHTML = '<span class="spinner"></span> Enviando...';
    btn.disabled = true;
    setTimeout(() => { showModal('confirmModal'); }, 1200);
  });
  document.getElementById('goToChat')?.addEventListener('click', () => window.location.href = 'chat.html');
}

function initChat() {
  requireAuth();
  initSidebar();
  renderChatContacts();
  openChat(0);

  document.getElementById('sendBtn')?.addEventListener('click', sendMessage);
  document.getElementById('chatInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  document.getElementById('btnConcluir')?.addEventListener('click', () => showModal('concludeModal'));
  document.getElementById('confirmConcluir')?.addEventListener('click', () => {
    hideModal('concludeModal');
    toast('Transação concluída! Que tal avaliar o usuário?', 'success');
    setTimeout(() => window.location.href = 'avaliacao.html', 1500);
  });
}

function renderChatContacts() {
  const list = document.getElementById('contactsList');
  if (!list) return;
  list.innerHTML = CHATS.map((c,i) => `
    <div class="chat-contact-item ${i === currentChat ? 'active' : ''}" onclick="openChat(${i})">
      <div class="avatar md" style="background:${c.color}">${c.initials}</div>
      <div style="flex:1;min-width:0">
        <div class="chat-contact-name">${c.with}</div>
        <div class="chat-contact-preview">${c.preview}</div>
        <div style="font-size:.72rem;color:var(--text-light)">${c.book}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <span class="chat-contact-time">${c.time}</span>
        ${c.unread ? `<span class="chat-unread">${c.unread}</span>` : ''}
      </div>
    </div>`).join('');
}

function openChat(idx) {
  currentChat = idx;
  const chat = CHATS[idx];
  if (!chat) return;
  renderChatContacts();

  const nameEl = document.getElementById('chatWithName');
  const bookEl = document.getElementById('chatBookName');
  const avatarEl = document.getElementById('chatWithAvatar');
  if (nameEl) nameEl.textContent = chat.with;
  if (bookEl) bookEl.textContent = chat.book;
  if (avatarEl) { avatarEl.textContent = chat.initials; avatarEl.style.background = chat.color; }

  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  msgs.innerHTML = chat.messages.map(m => `
    <div class="msg ${m.dir === 'out' ? 'out' : 'in'}">
      <div class="msg-bubble">${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>`).join('');
  msgs.scrollTop = msgs.scrollHeight;
  CHATS[idx].unread = 0;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input?.value.trim();
  if (!text) return;
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const time = new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
  const div = document.createElement('div');
  div.className = 'msg out slide-up';
  div.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${time}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  input.value = '';
  CHATS[currentChat].messages.push({ dir:'out', text, time });
  const replies = ['Entendido! 👍','Combinado!','Obrigado pela resposta!','Perfeito, vejo você lá!','Ótimo, até breve! 😊'];
  setTimeout(() => {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'msg in slide-up';
    const reply = replies[Math.floor(Math.random() * replies.length)];
    replyDiv.innerHTML = `<div class="msg-bubble">${reply}</div><div class="msg-time">${time}</div>`;
    msgs.appendChild(replyDiv);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200 + Math.random() * 800);
}


function initHistorico() {
  requireAuth();
  initSidebar();
  renderHistory('todos');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderHistory(btn.dataset.tab);
    });
  });
}

function renderHistory(tab) {
  const list = document.getElementById('historyList');
  if (!list) return;
  const statusMap = { concluido:'success', andamento:'info', cancelado:'danger' };
  const statusLabel = { concluido:'Concluído', andamento:'Em andamento', cancelado:'Cancelado' };
  const typeIcon   = { 'doação':'🤝', 'troca':'🔄', 'recebido':'📥' };

  let items = HISTORY;
  if (tab !== 'todos') items = HISTORY.filter(h => {
    if (tab === 'doacoes') return h.type === 'doação';
    if (tab === 'trocas')  return h.type === 'troca';
    if (tab === 'recebidos') return h.type === 'recebido';
    return true;
  });

  if (!items.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-title">Nenhuma transação aqui</div></div>`;
    return;
  }
  const cover = b => BOOK_COVERS[b % BOOK_COVERS.length];
  list.innerHTML = items.map(h => `
    <div class="tx-item fade-in">
      <div class="tx-cover" style="background:${cover(h.cover).bg}">${cover(h.cover).emoji}</div>
      <div class="tx-info">
        <div class="tx-title">${h.bookTitle}</div>
        <div class="tx-meta">${h.author} · ${typeIcon[h.type]||''} ${h.type.charAt(0).toUpperCase()+h.type.slice(1)} com ${h.with}</div>
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
          ${h.status === 'concluido' ? `<button class="btn btn-sm btn-outline-primary" onclick="window.location.href='avaliacao.html'"><i class="fa-solid fa-star"></i> Avaliar</button>` : ''}
          <button class="btn btn-sm btn-ghost" onclick="window.location.href='chat.html'"><i class="fa-solid fa-message"></i> Ver conversa</button>
        </div>
      </div>
      <div class="tx-right">
        <span class="tx-date">${h.date}</span>
        <span class="badge badge-${statusMap[h.status]}">${statusLabel[h.status]}</span>
      </div>
    </div>`).join('');
}

function initNotificacoes() {
  requireAuth();
  initSidebar();
  renderNotifications();

  document.getElementById('markAllRead')?.addEventListener('click', () => {
    NOTIFICATIONS.forEach(n => n.unread = false);
    renderNotifications();
    toast('Todas as notificações marcadas como lidas.', 'info');
  });
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;
  const iconColor = { request:'#1976D2', message:'#9C27B0', rating:'#F59E0B', system:'#2E7D32' };
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markRead(${n.id})">
      <div class="notif-icon-box" style="background:${iconColor[n.type]}22;color:${iconColor[n.type]}">${n.icon}</div>
      <div class="notif-content">
        <div class="notif-title">${n.title}</div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
      ${n.unread ? '<div class="notif-dot"></div>' : ''}
    </div>`).join('');
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
  const badge = document.getElementById('unreadCount');
  if (badge) badge.textContent = unreadCount ? `${unreadCount} não lida${unreadCount>1?'s':''}` : 'Tudo lido';
}

function markRead(id) {
  const n = NOTIFICATIONS.find(n => n.id === id);
  if (n) { n.unread = false; renderNotifications(); }
}

function initPerfil() {
  requireAuth();
  initSidebar();

  const myBooks = BOOKS.slice(0, 6);
  renderBookGrid('myBooksList', myBooks, 'livro.html');

  const reviews = [
    { name:'Carlos Henrique', initials:'CH', stars:5, date:'01/06/2024', text:'Ana foi super atenciosa, entregou o livro em perfeito estado e no horário combinado. Super recomendo!' },
    { name:'Mariana Santos',  initials:'MS', stars:5, date:'28/05/2024', text:'Troca excelente! Livro em ótimo estado, comunicação clara e rápida. Adorei a experiência!' },
    { name:'Fernanda Lima',   initials:'FL', stars:4, date:'20/05/2024', text:'Muito boa pessoa, cumpriu o combinado. O livro tinha uma marquinha que não aparecia na foto, mas nada grave.' },
    { name:'Roberto Alves',   initials:'RA', stars:5, date:'15/05/2024', text:'Ótima doadora! Livro estava impecável. Obrigado por compartilhar conhecimento!' },
  ];
  const reviewList = document.getElementById('reviewsList');
  if (reviewList) {
    reviewList.innerHTML = reviews.map(r => `
      <div class="review-card fade-in">
        <div class="review-header">
          <div class="avatar sm" style="background:var(--primary)">${r.initials}</div>
          <span class="review-name">${r.name}</span>
          <div class="stars" style="margin-left:8px">${starsHtml(r.stars)}</div>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-text">${r.text}</div>
      </div>`).join('');
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });

  document.getElementById('btnEditProfile')?.addEventListener('click', () => showModal('editProfileModal'));
  document.getElementById('saveProfile')?.addEventListener('click', () => {
    hideModal('editProfileModal');
    toast('Perfil atualizado com sucesso!', 'success');
  });
}

function initAvaliacao() {
  requireAuth();
  initSidebar();

  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => tag.classList.toggle('selected'));
  });

  const form = document.getElementById('avaliacaoForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.innerHTML = '<span class="spinner"></span> Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      showModal('thankModal');
    }, 1200);
  });
  document.getElementById('goHome')?.addEventListener('click', () => window.location.href = 'dashboard.html');
}

function logout() {
  localStorage.removeItem('ls_logged_in');
  localStorage.removeItem('ls_user');
  toast('Até logo! 👋', 'info');
  setTimeout(() => window.location.href = 'index.html', 800);
}

function initLanding() {
  function countUp(el, target, suffix='') {
    let cur = 0; const step = Math.ceil(target/50);
    const iv = setInterval(() => {
      cur = Math.min(cur+step, target);
      el.textContent = cur.toLocaleString('pt-BR') + suffix;
      if (cur >= target) clearInterval(iv);
    }, 30);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          countUp(el, parseInt(el.dataset.count), el.dataset.suffix || '');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stats-counter-section').forEach(s => observer.observe(s));

  renderBookGrid('featuredBooks', BOOKS.slice(0,8), 'login.html');

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.landing-nav');
    if (nav) nav.style.boxShadow = scrollY > 10 ? 'var(--shadow-md)' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop().replace('.html','') || 'index';
  const inits = {
    'index':        initLanding,
    '':             initLanding,
    'login':        initLogin,
    'cadastro':     initCadastro,
    'dashboard':    initDashboard,
    'busca':        initBusca,
    'livro':        initLivro,
    'publicar':     initPublicar,
    'solicitacao':  initSolicitacao,
    'chat':         initChat,
    'historico':    initHistorico,
    'notificacoes': initNotificacoes,
    'perfil':       initPerfil,
    'avaliacao':    initAvaliacao,
  };
  (inits[page] || (() => {}))();
});
