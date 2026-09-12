import React from 'react';
import { useTable, tableFeatures } from '@tanstack/react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

// Define que a tabela receberá data e columns de quem a chamar
interface CustomTableProps {
  data: any[];
  columns: any[];
}

const features = tableFeatures({});

export default function CustomTable({ data, columns }: CustomTableProps) {
  const table = useTable(
    {
      features,
      data,
      columns,
    },
    (state) => state
  );

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getAllCells().map(cell => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}