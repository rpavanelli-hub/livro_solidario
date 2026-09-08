const { Router } = require('express');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma');

const router = Router();

router.post('/seed', async (req, res, next) => {
  try {
    console.log('\n🌱 Executando seed manualmente...\n');

    // Verificar se Ana Clara já existe
    const anaClara = await prisma.usuario.findUnique({
      where: { email: 'ana.clara@email.com' }
    });

    if (anaClara) {
      console.log('✅ Ana Clara já existe no banco.');
      return res.json({
        message: 'Ana Clara já existe',
        usuario: { email: anaClara.email, id: anaClara.id }
      });
    }

    // Criar usuários de teste
    const USUARIOS = [
      { nome: 'Ana Clara Ferreira', email: 'ana.clara@email.com', cidade: 'São Paulo' },
      { nome: 'Carlos Henrique Souza', email: 'carlos.henrique@exemplo.com', cidade: 'Rio de Janeiro' },
      { nome: 'Mariana Santos', email: 'mariana.santos@exemplo.com', cidade: 'Belo Horizonte' },
      { nome: 'Diego Neves', email: 'diego.neves@exemplo.com', cidade: 'São Paulo' },
    ];

    const SENHA_PADRAO = 'senha123';
    const senhaHash = await bcrypt.hash(SENHA_PADRAO, 10);

    console.log('Criando usuários de teste...');
    const usuariosCriados = [];
    for (const dados of USUARIOS) {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: dados.email }
      });

      if (!usuarioExistente) {
        const usuario = await prisma.usuario.create({
          data: { ...dados, senha: senhaHash }
        });
        usuariosCriados.push(usuario);
        console.log(`  ✅ ${usuario.email}`);
      } else {
        usuariosCriados.push(usuarioExistente);
        console.log(`  ℹ️  ${usuarioExistente.email} (já existe)`);
      }
    }

    console.log('\n✨ Seed concluído com sucesso!\n');

    res.json({
      message: 'Seed executado com sucesso',
      usuariosCriados: usuariosCriados.length,
      usuarios: USUARIOS.map(u => ({
        email: u.email,
        nome: u.nome,
        senha: SENHA_PADRAO
      }))
    });
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    next(error);
  }
});

module.exports = router;
