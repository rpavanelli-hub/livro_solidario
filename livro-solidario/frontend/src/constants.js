export const CATEGORIAS = [
  'Literatura Brasileira', 'Ficção', 'Ficção Científica', 'Fantasia', 'Romance', 'Suspense',
  'História', 'Filosofia', 'Ciências', 'Tecnologia', 'Autoajuda', 'Infantil', 'Arte & Design',
  'Direito', 'Medicina', 'Pedagogia', 'Administração', 'Economia', 'Literatura', 'Outros',
];

export const CONDICOES = [
  { valor: 'NOVO', rotulo: 'Novo' },
  { valor: 'OTIMO', rotulo: 'Ótimo' },
  { valor: 'BOM', rotulo: 'Bom' },
  { valor: 'REGULAR', rotulo: 'Regular' },
];

export const TIPOS_OFERTA = [
  { valor: 'DOACAO', rotulo: 'Doação' },
  { valor: 'TROCA', rotulo: 'Troca' },
];

export const STATUS_LIVRO_ROTULOS = {
  DISPONIVEL: 'Disponível',
  RESERVADO: 'Reservado',
  DOADO: 'Doado',
  TROCADO: 'Trocado',
};

export const STATUS_SOLICITACAO_ROTULOS = {
  PENDENTE: 'Pendente',
  ACEITA: 'Aceita',
  RECUSADA: 'Recusada',
  CANCELADA: 'Cancelada',
};

const CAPAS = [
  { bg: 'linear-gradient(135deg,#667eea,#764ba2)', emoji: '📚' },
  { bg: 'linear-gradient(135deg,#2E7D32,#43A047)', emoji: '📖' },
  { bg: 'linear-gradient(135deg,#F97316,#EF4444)', emoji: '🎭' },
  { bg: 'linear-gradient(135deg,#1976D2,#0097A7)', emoji: '🌎' },
  { bg: 'linear-gradient(135deg,#E91E63,#9C27B0)', emoji: '🦋' },
  { bg: 'linear-gradient(135deg,#F59E0B,#EF4444)', emoji: '⚔️' },
  { bg: 'linear-gradient(135deg,#00897B,#2E7D32)', emoji: '🌿' },
  { bg: 'linear-gradient(135deg,#1A237E,#1976D2)', emoji: '🔮' },
];

export function capaDoLivro(livroId) {
  let hash = 0;
  for (let i = 0; i < livroId.length; i += 1) {
    hash = (hash * 31 + livroId.charCodeAt(i)) >>> 0;
  }
  return CAPAS[hash % CAPAS.length];
}

export function condicaoClasse(condicao) {
  const mapa = { NOVO: 'cond-novo', OTIMO: 'cond-otimo', BOM: 'cond-bom', REGULAR: 'cond-regular' };
  return mapa[condicao] || 'cond-bom';
}

export function condicaoRotulo(condicao) {
  return CONDICOES.find((c) => c.valor === condicao)?.rotulo || condicao;
}

export function tipoOfertaRotulo(tipo) {
  return TIPOS_OFERTA.find((t) => t.valor === tipo)?.rotulo || tipo;
}
