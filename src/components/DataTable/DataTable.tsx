import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Check,
  Minus
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Badge } from "../Badge";
import { Spinner } from "../Spinner";
import { Skeleton } from "../Skeleton";
import { Card, CardContent } from "../Card";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { Select } from "../Select";
import type {
  DataTableProps,
  Column,
  FilterValue,
  SortConfig,
  PaginationConfig,
  RowSelection
} from "./DataTable.types";

const tableVariants = cva(
  "w-full border-collapse bg-white dark:bg-gray-900",
  {
    variants: {
      size: {
        small: "text-xs",
        middle: "text-sm",
        large: "text-base",
      },
      bordered: {
        true: "border border-gray-200 dark:border-gray-800",
        false: "",
      },
    },
    defaultVariants: {
      size: "middle",
      bordered: false,
    },
  }
);

const cellVariants = cva(
  "border-b border-gray-200 dark:border-gray-800 transition-colors",
  {
    variants: {
      size: {
        small: "px-2 py-1",
        middle: "px-4 py-3",
        large: "px-6 py-4",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      type: {
        header: "bg-gray-50 dark:bg-gray-800/50 font-semibold text-gray-900 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-800",
        body: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50",
      },
    },
    defaultVariants: {
      size: "middle",
      align: "left",
      type: "body",
    },
  }
);

// Filter component for individual columns
const ColumnFilter = <T extends Record<string, any>>({
  column,
  value,
  onChange,
}: {
  column: Column<T>;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const handleApply = () => {
    onChange(tempValue);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempValue('');
    onChange('');
    setIsOpen(false);
  };

  if (!column.filterable) return null;

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-1 h-6 w-6",
          value && "text-primary-600"
        )}
      >
        <Filter className="h-3 w-3" />
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-3 min-w-[200px]">
            {column.filterType === 'select' && column.filterOptions ? (
              <div className="space-y-2">
                {column.filterOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={tempValue === option.value}
                      onChange={() => setTempValue(
                        tempValue === option.value ? '' : option.value
                      )}
                    />
                    <span className="text-sm dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <Input
                placeholder={`Filter ${column.title}`}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="mb-2"
              />
            )}
            
            <div className="flex justify-end space-x-2 mt-3">
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="primary" size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Pagination component
const TablePagination: React.FC<{
  pagination: PaginationConfig;
  onChange: (page: number, pageSize: number) => void;
}> = ({ pagination, onChange }) => {
  const { current, pageSize, total, showSizeChanger = true, pageSizeOptions = [10, 20, 50, 100] } = pagination;
  const totalPages = Math.ceil(total / pageSize);
  const startRecord = (current - 1) * pageSize + 1;
  const endRecord = Math.min(current * pageSize, total);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, current - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // Convert pageSizeOptions to SelectOption format
  const selectOptions = pageSizeOptions.map(size => ({
    label: String(size),
    value: String(size),
  }));

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startRecord} to {endRecord} of {total} results
        </span>
        
        {showSizeChanger && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
            <Select
              options={selectOptions}
              value={String(pageSize)}
              onChange={e => onChange(1, Number(e.target.value))}
              variant="default"
              selectSize="sm"
              aria-label="Select number of items per page"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(1, pageSize)}
          disabled={current === 1}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(current - 1, pageSize)}
          disabled={current === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map(page => (
          <Button
            key={page}
            variant={current === page ? "primary" : "ghost"}
            size="sm"
            onClick={() => onChange(page, pageSize)}
            className="min-w-[32px]"
            aria-label={`Go to page ${page}`}
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(current + 1, pageSize)}
          disabled={current === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(totalPages, pageSize)}
          disabled={current === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const DataTable = <T extends Record<string, any>>({
  columns,
  dataSource,
  loading = false,
  rowKey = 'id',
  pagination = { current: 1, pageSize: 10, total: 0 },
  rowSelection,
  size = 'middle',
  bordered = false,
  showHeader = true,
  title,
  footer,
  className,
  onSort,
  onFilter,
  onChange,
  emptyLabel = 'No data available',
  ...props
}: DataTableProps<T> & { emptyLabel?: React.ReactNode }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
  const [filters, setFilters] = useState<FilterValue>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  );

  // Get row key function
  const getRowKey = useCallback((record: T, index: number): React.Key => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  }, [rowKey]);

  // Handle sorting
  const handleSort = useCallback((columnKey: string) => {
    let newDirection: 'asc' | 'desc' | null;
    if (sortConfig.key !== columnKey) {
      newDirection = 'asc';
    } else if (sortConfig.direction === 'asc') {
      newDirection = 'desc';
    } else if (sortConfig.direction === 'desc') {
      newDirection = null;
    } else {
      newDirection = 'asc';
    }
    const newSortConfig: SortConfig = { key: columnKey, direction: newDirection };
    setSortConfig(newSortConfig);
    onSort?.(newSortConfig);
    onChange?.(pagination as PaginationConfig, filters, newSortConfig);
  }, [sortConfig, pagination, filters, onSort, onChange]);

  // Handle filtering
  const handleFilter = useCallback((columnKey: string, value: any) => {
    const newFilters = { ...filters };
    if (value === '' || value === null || value === undefined) {
      delete newFilters[columnKey];
    } else {
      newFilters[columnKey] = value;
    }
    
    setFilters(newFilters);
    onFilter?.(newFilters);
    onChange?.(pagination as PaginationConfig, newFilters, sortConfig);
  }, [filters, pagination, sortConfig, onFilter, onChange]);

  // Handle row selection
  const handleRowSelect = useCallback((record: T, selected: boolean) => {
    const key = getRowKey(record, 0);
    let newSelectedKeys: React.Key[];
    
    if (rowSelection?.type === 'radio') {
      newSelectedKeys = selected ? [key] : [];
    } else {
      newSelectedKeys = selected 
        ? [...selectedRowKeys, key]
        : selectedRowKeys.filter(k => k !== key);
    }
    
    setSelectedRowKeys(newSelectedKeys);
    const selectedRows = dataSource.filter(item => 
      newSelectedKeys.includes(getRowKey(item, 0))
    );
    
    rowSelection?.onChange?.(newSelectedKeys, selectedRows);
    rowSelection?.onSelect?.(record, selected, selectedRows, {} as Event);
  }, [selectedRowKeys, rowSelection, dataSource, getRowKey]);

  // Handle select all
  const handleSelectAll = useCallback((selected: boolean) => {
    const newSelectedKeys = selected 
      ? dataSource.map((item, index) => getRowKey(item, index))
      : [];
    
    setSelectedRowKeys(newSelectedKeys);
    const selectedRows = selected ? dataSource : [];
    
    rowSelection?.onChange?.(newSelectedKeys, selectedRows);
    rowSelection?.onSelectAll?.(selected, selectedRows, dataSource);
  }, [dataSource, rowSelection, getRowKey]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...dataSource];
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        result = result.filter(item => {
          const itemValue = item[key];
          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(String(value).toLowerCase());
          }
          return itemValue === value;
        });
      }
    });
    
    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [dataSource, filters, sortConfig]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (pagination === false) return processedData;
    
    const current = (pagination && typeof pagination === 'object' && pagination.current) ? Math.max(1, Number(pagination.current) || 1) : 1;
    const pageSize = (pagination && typeof pagination === 'object' && pagination.pageSize) ? Math.max(1, Number(pagination.pageSize) || 10) : 10;
    const startIndex = (current - 1) * pageSize;
    
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, pagination]);

  // Update pagination total
  const currentPagination = useMemo(() => {
    if (pagination === false) return false;
    return {
      ...(typeof pagination === 'object' ? pagination : {}),
      current: (pagination && typeof pagination === 'object' && pagination.current) ? Math.max(1, Number(pagination.current) || 1) : 1,
      pageSize: (pagination && typeof pagination === 'object' && pagination.pageSize) ? Math.max(1, Number(pagination.pageSize) || 10) : 10,
      total: processedData.length,
    };
  }, [pagination, processedData.length]);

  // Selection state
  const isAllSelected = selectedRowKeys.length === dataSource.length && dataSource.length > 0;
  const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length;

  // Mobile-first responsive: useBreakpoint to switch between table and card layouts
  const { isBelow } = useBreakpoint();

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        {title && <div className="mb-4">{title()}</div>}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {title && <div className="mb-4">{title()}</div>}

      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        {/* Card layout for mobile */}
        {isBelow('md') ? (
          <div className="space-y-4 p-2">
            {paginatedData.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <div className="text-4xl mb-2">📋</div>
                <div>{emptyLabel}</div>
              </div>
            ) : (
              paginatedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRowKeys.includes(key);

                return (
                  <Card
                    key={key}
                    variant={isSelected ? "elevated" : "default"}
                    padding="sm"
                    className={cn(
                      "transition-shadow",
                      isSelected && "border-primary-600 shadow-lg"
                    )}
                  >
                    <CardContent className="space-y-2">
                      {rowSelection && (
                        <div className="flex items-center mb-2">
                          <Checkbox
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(record, e.target.checked)}
                            {...rowSelection.getCheckboxProps?.(record)}
                          />
                          <span className="ml-2 text-xs text-gray-500">Select</span>
                        </div>
                      )}
                      {columns.map((column) => (
                        <div key={column.key} className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{column.title}</span>
                          <span className="text-gray-900 dark:text-gray-100">
                            {column.render
                              ? column.render(record[column.dataIndex], record, index)
                              : String(record[column.dataIndex] || '')
                            }
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        ) : (
          // Table layout for desktop/tablet
          <div className="overflow-x-auto">
            <table className={cn(tableVariants({ size, bordered }))}>
              {showHeader && (
                <thead>
                  <tr>
                    {rowSelection && (
                      <th className={cn(cellVariants({ size, type: "header" }), "w-12")}>
                        {rowSelection.type !== 'radio' && (
                          <Checkbox
                            checked={isAllSelected}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className={cn(isIndeterminate && "indeterminate")}
                          />
                        )}
                      </th>
                    )}
                    
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={cn(
                          cellVariants({
                            size,
                            align: column.align,
                            type: "header"
                          }),
                          column.width && `w-[${column.width}]`
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span>{column.title}</span>
                            {column.sortable && (
                              <button
                                onClick={() => handleSort(column.key)}
                                className="flex flex-col items-center hover:text-primary-600"
                              >
                                <ChevronUp
                                  className={cn(
                                    "h-3 w-3",
                                    sortConfig.key === column.key && sortConfig.direction === 'asc'
                                      ? "text-primary-600"
                                      : "text-gray-400 dark:text-gray-500"
                                  )}
                                />
                                <ChevronDown
                                  className={cn(
                                    "h-3 w-3 -mt-1",
                                    sortConfig.key === column.key && sortConfig.direction === 'desc'
                                      ? "text-primary-600"
                                      : "text-gray-400 dark:text-gray-500"
                                  )}
                                />
                              </button>
                            )}
                          </div>
                          
                          <ColumnFilter
                            column={column}
                            value={filters[column.key]}
                            onChange={(value) => handleFilter(column.key, value)}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (rowSelection ? 1 : 0)}
                      className={cn(cellVariants({ size, align: "center" }), "py-8")}
                    >
                      <div className="text-gray-500">
                        <div className="text-4xl mb-2">📋</div>
                        <div>{emptyLabel}</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((record, index) => {
                    const key = getRowKey(record, index);
                    const isSelected = selectedRowKeys.includes(key);
                    
                    return (
                      <tr
                        key={key}
                        className={cn(
                          "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                          isSelected && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                        {...(props.onRow?.(record, index) ?? {})}
                      >
                        {rowSelection && (
                          <td className={cn(cellVariants({ size }))}>
                            <Checkbox
                              checked={isSelected}
                              onChange={(e) => handleRowSelect(record, e.target.checked)}
                              {...rowSelection.getCheckboxProps?.(record)}
                            />
                          </td>
                        )}
                        
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className={cn(cellVariants({
                              size,
                              align: column.align
                            }))}
                          >
                            {column.render
                              ? column.render(record[column.dataIndex], record, index)
                              : String(record[column.dataIndex] || '')
                            }
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Always show pagination controls below data */}
        {currentPagination && (
          <div className="pt-2">
            <TablePagination
              pagination={currentPagination}
              onChange={(page, size) => {
                const newPagination = { ...currentPagination, current: page, pageSize: size };
                onChange?.(newPagination, filters, sortConfig);
              }}
            />
          </div>
        )}
      </div>

      {footer && <div className="mt-4">{footer()}</div>}
    </div>
  );
};

DataTable.displayName = "DataTable";