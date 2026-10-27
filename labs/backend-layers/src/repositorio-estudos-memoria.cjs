'use strict';

function criarRepositorioEstudos() {
  const sessoes = [];
  const estudos = [
    { id: 1, titulo: 'HTML', tituloCanonico: 'html' },
    { id: 2, titulo: 'JavaScript', tituloCanonico: 'javascript' }
  ];

  function apresentar(estudo) {
    return { id: estudo.id, titulo: estudo.titulo };
  }

  return {
    async listar() {
      return estudos.map(apresentar);
    },
    async encontrarPorTituloCanonico(tituloCanonico) {
      const estudo = estudos.find((item) => item.tituloCanonico === tituloCanonico);
      return estudo ? apresentar(estudo) : null;
    },
    async inserir(titulo, tituloCanonico) {
      if (estudos.some((estudo) => estudo.tituloCanonico === tituloCanonico)) {
        throw Object.assign(new Error('Título duplicado'), {
          code: '23505',
          constraint: 'estudos_titulo_canonico_unico'
        });
      }
      const estudo = { id: estudos.at(-1).id + 1, titulo, tituloCanonico };
      estudos.push(estudo);
      return apresentar(estudo);
    },
    async criarComSessao(titulo, tituloCanonico, minutos) {
      if (estudos.some((estudo) => estudo.tituloCanonico === tituloCanonico)) {
        throw Object.assign(new Error('Título duplicado'), {
          code: '23505',
          constraint: 'estudos_titulo_canonico_unico'
        });
      }
      const estudo = { id: estudos.at(-1).id + 1, titulo, tituloCanonico };
      const sessao = {
        id: sessoes.length + 1,
        estudo_id: estudo.id,
        minutos,
        registrada_em: new Date().toISOString()
      };
      estudos.push(estudo);
      sessoes.push(sessao);
      return {
        estudo: apresentar(estudo),
        sessao: {
          id: sessao.id,
          estudoId: sessao.estudo_id,
          minutos: sessao.minutos,
          registradaEm: sessao.registrada_em
        }
      };
    }
  };
}

module.exports = { criarRepositorioEstudos };
