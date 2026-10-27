'use strict';

const { criarPoolEstudos } = require('./configuracao-banco.cjs');

function criarRepositorioEstudosPostgres(pool = criarPoolEstudos()) {
  function apresentar(estudo) {
    return { id: estudo.id, titulo: estudo.titulo };
  }

  return {
    async listar() {
      const resultado = await pool.query(
        'SELECT id, titulo FROM estudos ORDER BY id'
      );
      return resultado.rows.map(apresentar);
    },
    async encontrarPorTituloCanonico(tituloCanonico) {
      const resultado = await pool.query(
        'SELECT id, titulo FROM estudos WHERE titulo_canonico = $1',
        [tituloCanonico]
      );
      return resultado.rows[0] ? apresentar(resultado.rows[0]) : null;
    },
    async inserir(titulo, tituloCanonico) {
      const resultado = await pool.query(
        'INSERT INTO estudos (titulo, titulo_canonico) VALUES ($1, $2) RETURNING id, titulo',
        [titulo, tituloCanonico]
      );
      return apresentar(resultado.rows[0]);
    },
    async encerrar() {
      await pool.end();
    }
  };
}

module.exports = { criarRepositorioEstudosPostgres };
