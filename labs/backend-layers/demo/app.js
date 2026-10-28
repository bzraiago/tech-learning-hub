'use strict';

const botaoConsulta = document.querySelector('#consultar');
const mensagem = document.querySelector('#mensagem');
const resultado = document.querySelector('#resultado');

botaoConsulta.addEventListener('click', async () => {
  const parametros = new URLSearchParams({ latitude: '-3.73', longitude: '-38.52' });
  botaoConsulta.disabled = true;
  mensagem.textContent = 'Consultando o serviço meteorológico…';
  resultado.textContent = 'Aguardando resposta.';
  try {
    const resposta = await fetch(`/api/labs/open-meteo?${parametros}`);
    const dados = await resposta.json();
    if (!resposta.ok) {
      mensagem.textContent = dados.erro || `A consulta falhou (HTTP ${resposta.status}).`;
      return;
    }
    mensagem.textContent = 'Consulta concluída.';
    resultado.textContent = `Temperatura: ${dados.temperatura} ${dados.unidade} · umidade: ${dados.umidade}${dados.unidadeUmidade} · ${dados.horario} (${dados.fusoHorario}).`;
  } catch {
    mensagem.textContent = 'Não foi possível conectar à demonstração. Tente novamente.';
    resultado.textContent = 'Nenhum resultado carregado.';
  } finally {
    botaoConsulta.disabled = false;
  }
});
