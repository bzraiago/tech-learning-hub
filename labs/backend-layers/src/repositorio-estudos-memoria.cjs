'use strict';

function criarRepositorioEstudos() {
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
      const estudo = { id: estudos.at(-1).id + 1, titulo, tituloCanonico };
      estudos.push(estudo);
      return apresentar(estudo);
    }
  };
}

module.exports = { criarRepositorioEstudos };
