export interface GridColumn {
    id: string;
    title: string;
    type: 'input' | 'action' | 'enrich';
  }
  
  export interface GridRow {
    id: string;
    cells: Record<string, string>;
    timestamp: string;
    loading?: boolean;
    warning?: boolean;
    link?: boolean;
  }
  
  export interface GridData {
    columns: GridColumn[];
    rows: GridRow[];
  }
  
  