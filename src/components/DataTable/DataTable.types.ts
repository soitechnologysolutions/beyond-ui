export interface Column<T = any> {
  key?: string;
  id?: string;
  title?: React.ReactNode;
  header?: React.ReactNode | ((props?: any) => React.ReactNode);
  dataIndex?: keyof T | string;
  accessorKey?: keyof T | string;
  width?: number | string;
  sortable?: boolean;
  enableSorting?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number';
  filterOptions?: Array<{ label: string; value: any }>;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  cell?: (info: { row: { original: T; index: number }; getValue?: () => any; value?: any }) => React.ReactNode;
  align?: 'left' | 'center' | 'right' | string;
  className?: string;
  [key: string]: any;
}

export interface FilterValue {
  [key: string]: any;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}

export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  [key: string]: any;
}

export interface RowSelection<T = any> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean };
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
}

export interface DataTableProps<T = any> {
  columns: Column<T>[];
  dataSource?: T[];
  data?: T[];
  loading?: boolean;
  rowKey?: string | ((record: T, index?: number) => React.Key);
  pagination?: PaginationConfig | boolean;
  rowSelection?: RowSelection<T>;
  scroll?: { x?: number | string; y?: number | string };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  title?: () => React.ReactNode;
  footer?: () => React.ReactNode;
  expandable?: {
    expandedRowRender?: (record: T, index: number) => React.ReactNode;
    rowExpandable?: (record: T) => boolean;
  };
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLTableRowElement>;
  className?: string;
  // Callback functions
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filters: FilterValue) => void;
  onChange?: (pagination: PaginationConfig, filters: FilterValue, sorter: SortConfig) => void;
}

export interface TableContextValue {
  prefixCls: string;
  size: 'small' | 'middle' | 'large';
}