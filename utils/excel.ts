import * as XLSX from 'xlsx';
import type { GridData } from '../types/grid';

export const exportToExcel = (data: GridData, name: string) => {
  const worksheet = XLSX.utils.aoa_to_sheet([
    data.columns.map(col => col.title),
    ...data.rows.map(row => 
      data.columns.map(col => row.cells[col.id])
    )
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Grid Data');
  XLSX.writeFile(workbook, `${name}.xlsx`);
};

