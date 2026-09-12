import Rotas from './Rotas'; // Ajuste o caminho conforme o nome da sua pasta/arquivo
// 1. Importe o componente da tabela
import DemandasTable from './components/Table';

import { BrowserRouter } from 'react-router-dom';
import './App.css';
// Mantenha os seus outros imports originais aqui (como o componente Rotas)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* 2. Área de teste inserida antes das suas rotas */}
      <div className="container mt-5 mb-5">
        <h1>Meu Painel de Testes</h1>
        <DemandasTable />
      </div>

      {/* Suas rotas originais continuam funcionando abaixo */}
      <Rotas />
    </BrowserRouter>
  );
};

export default App;