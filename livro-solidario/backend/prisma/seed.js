const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const USUARIOS = [
  { nome: 'Ana Clara Ferreira', email: 'ana.clara@email.com', cidade: 'São Paulo' },
  { nome: 'Carlos Henrique Souza', email: 'carlos.henrique@exemplo.com', cidade: 'Rio de Janeiro' },
  { nome: 'Mariana Santos', email: 'mariana.santos@exemplo.com', cidade: 'Belo Horizonte' },
  { nome: 'Diego Neves', email: 'diego.neves@exemplo.com', cidade: 'São Paulo' },
];

const SENHA_PADRAO = 'senha123';

const LIVROS = [
  { titulo: 'Dom Casmurro', autor: 'Machado de Assis', categoria: 'Literatura Brasileira', condicao: 'OTIMO', tipoOferta: 'DOACAO', cidade: 'São Paulo', descricao: 'Obra clássica da literatura brasileira, em ótimo estado, lida apenas uma vez.' },
  { titulo: 'O Alquimista', autor: 'Paulo Coelho', categoria: 'Ficção', condicao: 'NOVO', tipoOferta: 'DOACAO', cidade: 'Belo Horizonte', descricao: 'Livro praticamente novo, presente que não foi lido.' },
  { titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'História', condicao: 'OTIMO', tipoOferta: 'TROCA', cidade: 'São Paulo', descricao: 'Edição atualizada em ótimo estado. Interesse em trocar por livros de filosofia.' },
  { titulo: '1984', autor: 'George Orwell', categoria: 'Ficção Científica', condicao: 'REGULAR', tipoOferta: 'DOACAO', cidade: 'Curitiba', descricao: 'Clássico distópico, páginas amareladas pelo tempo mas legível.' },
  { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', categoria: 'Fantasia', condicao: 'BOM', tipoOferta: 'TROCA', cidade: 'Rio de Janeiro', descricao: 'Trilogia completa em caixa especial, pequenas marcas de uso.' },
  { titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Tecnologia', condicao: 'BOM', tipoOferta: 'DOACAO', cidade: 'Campinas', descricao: 'Bíblia dos programadores em bom estado.' },
  { titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', categoria: 'Infantil', condicao: 'NOVO', tipoOferta: 'DOACAO', cidade: 'Salvador', descricao: 'Edição ilustrada completa, capa dura, presente não utilizado.' },
  { titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', categoria: 'Literatura', condicao: 'OTIMO', tipoOferta: 'TROCA', cidade: 'São Paulo', descricao: 'Obra-prima do realismo mágico, edição de colecionador.' },
  { titulo: 'O Poder do Hábito', autor: 'Charles Duhigg', categoria: 'Autoajuda', condicao: 'BOM', tipoOferta: 'TROCA', cidade: 'Belo Horizonte', descricao: 'Livro transformador sobre como criar e mudar hábitos.' },
  { titulo: 'Duna', autor: 'Frank Herbert', categoria: 'Ficção Científica', condicao: 'OTIMO', tipoOferta: 'TROCA', cidade: 'Rio de Janeiro', descricao: 'Ficção científica épica, edição especial com capa dura.' },
  { titulo: 'A Revolução dos Bichos', autor: 'George Orwell', categoria: 'Ficção', condicao: 'BOM', tipoOferta: 'DOACAO', cidade: 'São Paulo', descricao: 'Fábula política imprescindível, algumas marcas de lápis apagadas.' },
  { titulo: 'Não Me Faça Pensar', autor: 'Steve Krug', categoria: 'Tecnologia', condicao: 'OTIMO', tipoOferta: 'DOACAO', cidade: 'Curitiba', descricao: 'Livro essencial sobre UX/UI, ótimo estado, sem marcações.' },
];

async function main() {
  console.log('Verificando dados iniciais...');

  // Verificar se Ana Clara já existe
  const anaClara = await prisma.usuario.findUnique({
    where: { email: 'ana.clara@email.com' }
  });

  if (anaClara) {
    console.log('✅ Ana Clara já existe no banco.');
    console.log(`   ID: ${anaClara.id}`);
    console.log(`   Email: ${anaClara.email}`);
    console.log('   Seed não necessário.');
    return;
  }

  console.log('Criando dados iniciais...');
  const senhaHash = await bcrypt.hash(SENHA_PADRAO, 10);
  const usuariosCriados = [];

  console.log('Criando usuários...');
  for (const dados of USUARIOS) {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email: dados.email } });
    if (!usuarioExistente) {
      const usuario = await prisma.usuario.create({ data: { ...dados, senha: senhaHash } });
      usuariosCriados.push(usuario);
      console.log(`  ✅ ${usuario.email}`);
    } else {
      usuariosCriados.push(usuarioExistente);
      console.log(`  ℹ️  ${usuarioExistente.email} (já existe)`);
    }
  }

  // Verificar se já tem livros
  const livrosExistentes = await prisma.livro.count();
  if (livrosExistentes > 0) {
    console.log(`ℹ️  ${livrosExistentes} livros já existem no banco.`);
  } else {
    console.log('Criando livros...');
    const livrosCriados = [];
    for (let i = 0; i < LIVROS.length; i += 1) {
      const proprietario = usuariosCriados[i % usuariosCriados.length];
      const livro = await prisma.livro.create({
        data: { ...LIVROS[i], usuarioId: proprietario.id },
      });
      livrosCriados.push(livro);
    }

    console.log('Criando solicitações de exemplo...');
    const solicitanteA = usuariosCriados[1];
    const solicitanteB = usuariosCriados[2];

    await prisma.solicitacao.create({
      data: { livroId: livrosCriados[0].id, solicitanteId: solicitanteA.id, status: 'PENDENTE' },
    });
    await prisma.solicitacao.create({
      data: { livroId: livrosCriados[1].id, solicitanteId: solicitanteB.id, status: 'PENDENTE' },
    });

    const livroAceito = livrosCriados[5];
    await prisma.solicitacao.create({
      data: { livroId: livroAceito.id, solicitanteId: solicitanteA.id, status: 'ACEITA' },
    });
    await prisma.livro.update({ where: { id: livroAceito.id }, data: { status: 'RESERVADO' } });

    await prisma.solicitacao.create({
      data: { livroId: livrosCriados[8].id, solicitanteId: solicitanteB.id, status: 'RECUSADA' },
    });
  }

  console.log('Seed concluído com sucesso.');
  console.log(`Usuários de teste (senha para todos: "${SENHA_PADRAO}"):`);
  USUARIOS.forEach((u) => console.log(`  - ${u.email}`));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
