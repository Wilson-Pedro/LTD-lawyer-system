import React, { useState } from 'react';
import { createColumnHelper, tableFeatures } from '@tanstack/react-table';
import CustomTable from '../components/Table'; // Importando o seu componente visual limpo

type DemandaListResponse = {
  id: number;
  descricaoDemanda: string;
  prazo: string;
  nomeEstagiario: string;
  nomeProfessor: string;
};

const dummyData: DemandaListResponse[] = [
  { 
    id: 101, 
    descricaoDemanda: 'Um consumidor processa uma loja de eletrodomésticos após comprar uma geladeira que veio com defeito e nunca foi trocada, pedindo o dinheiro de volta (dano material) e uma compensação pela frustração e desgaste (dano moral).', 
    prazo: '2026-09-15', 
    nomeEstagiario: 'Lucas Almeida', 
    nomeProfessor: 'Prof. Roberto' 
  },
  { 
    id: 102, 
    descricaoDemanda: 'Um ex-funcionário processa a empresa onde trabalhava porque fazia duas horas a mais por dia e nunca recebeu o pagamento referente às horas extras, além de não ter recebido as verbas rescisórias corretas ao ser demitido.', 
    prazo: '2026-09-18', 
    nomeEstagiario: 'Mariana Costa', 
    nomeProfessor: 'Prof. Roberto' 
  },
  { 
    id: 103, 
    descricaoDemanda: 'Um ex-funcionário processa a empresa onde trabalhava porque fazia duas horas a mais por dia e nunca recebeu o pagamento referente às horas extras, além de não ter recebido as verbas rescisórias corretas ao ser demitido.', 
    prazo: '2026-09-22', 
    nomeEstagiario: 'Felipe Santos', 
    nomeProfessor: 'Profa. Helena' 
  },
];

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, DemandaListResponse>();

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('descricaoDemanda', {
    header: 'Descrição',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('prazo', {
    header: 'Prazo',
    cell: info => {
        const data = info.getValue();
        return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    },
  }),
  columnHelper.accessor('nomeEstagiario', {
    header: 'Estagiário',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('nomeProfessor', {
    header: 'Professor(a)',
    cell: info => info.getValue(),
  }),
]);

export default function ListarDemandas() {
  const [data] = useState(() => [...dummyData]);

  return (
    <div className="p-4">
      <h3 className="mb-4">Lista de Demandas</h3>
      
      {/* O componente limpo é chamado aqui, recebendo os dados e colunas por parâmetro */}
      <CustomTable data={data} columns={columns} />
      
    </div>
  );
}