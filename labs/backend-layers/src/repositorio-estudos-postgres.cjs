'use strict';

const { criarPoolEstudos } = require('./configuracao-banco.cjs');

function criarRepositorioEstudosPostgres(pool = criarPoolEstudos()) {
  function apresentar(estudo) {
    return { id: estudo.id, titulo: estudo.titulo };
  }

  function apresentarSessao(sessao) {
    return {
      id: sessao.id,
      estudoId: sessao.estudo_id,
      minutos: sessao.minutos,
      registradaEm: sessao.registrada_em
    };
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
    async criarComSessao(titulo, tituloCanonico, minutos) {
      const cliente = await pool.connect();
      try {
        await cliente.query('BEGIN');
        const resultadoEstudo = await cliente.query(
          'INSERT INTO estudos (titulo, titulo_canonico) VALUES ($1, $2) RETURNING id, titulo',
          [titulo, tituloCanonico]
        );
        const estudo = resultadoEstudo.rows[0];
        const resultadoSessao = await cliente.query(
          'INSERT INTO sessoes_estudo (estudo_id, minutos) VALUES ($1, $2) RETURNING id, estudo_id, minutos, registrada_em',
          [estudo.id, minutos]
        );
        await cliente.query('COMMIT');
        return { estudo: apresentar(estudo), sessao: apresentarSessao(resultadoSessao.rows[0]) };
      } catch (erro) {
        await cliente.query('ROLLBACK').catch(() => {});
        throw erro;
      } finally {
        cliente.release();
      }
    },
    async encerrar() {
      await pool.end();
    }
  };
}

module.exports = { criarRepositorioEstudosPostgres };
