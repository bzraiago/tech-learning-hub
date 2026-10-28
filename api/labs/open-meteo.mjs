import clienteOpenMeteo from '../../labs/backend-layers/src/cliente-open-meteo.cjs';
import rotaPrevisao from '../../labs/backend-layers/src/rota-previsao.cjs';

const servicoPrevisao = clienteOpenMeteo.criarClienteOpenMeteo();
const coordenadasDemo = { latitude: -3.73, longitude: -38.52 };

const servicoDemo = {
  consultar() {
    return servicoPrevisao.consultar(coordenadasDemo);
  }
};

export default rotaPrevisao.criarRotaPrevisao(servicoDemo, {
  cacheControl: 'public, s-maxage=300, stale-while-revalidate=600',
  coordenadasFixas: coordenadasDemo
});
