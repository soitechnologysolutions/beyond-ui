import * as React from "react";
import { useState } from "react";
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Plus
} from "lucide-react";
import { DataTable } from "./DataTable";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Avatar, AvatarImage, AvatarFallback } from "../Avatar";
import { Card, CardHeader, CardTitle, CardContent } from "../Card";
import { showToast } from "../Toast";
import type { Column, FilterValue, SortConfig, PaginationConfig } from "./DataTable.types";

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  joinDate: string;
  lastLogin: string;
  department: string;
}

interface Sale {
  id: number;
  product: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  region: string;
  salesperson: string;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  dueDate: string;
  project: string;
  tags: string[];
}

// Generate sample data
const generateUsers = (): User[] => {
  const roles = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@company.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://images.pexels.com/photos/${774909 + i}/pexels-photo-${774909 + i}.jpeg?auto=compress&cs=tinysrgb&w=64`,
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    department: departments[Math.floor(Math.random() * departments.length)],
  }));
};

const generateSales = (): Sale[] => {
  const products = ['Pro Plan', 'Basic Plan', 'Enterprise', 'Starter', 'Premium'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const statuses: Sale['status'][] = ['completed', 'pending', 'cancelled'];
  
  return Array.from({ length: 75 }, (_, i) => ({
    id: i + 1,
    product: products[Math.floor(Math.random() * products.length)],
    customer: `Customer ${i + 1}`,
    amount: Math.floor(Math.random() * 10000) + 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    region: regions[Math.floor(Math.random() * regions.length)],
    salesperson: `Sales Rep ${Math.floor(Math.random() * 10) + 1}`,
  }));
};

const generateTasks = (): Task[] => {
  const priorities: Task['priority'][] = ['low', 'medium', 'high', 'urgent'];
  const statuses: Task['status'][] = ['todo', 'in-progress', 'review', 'completed'];
  const projects = ['Website Redesign', 'Mobile App', 'API Integration', 'Dashboard', 'Marketing Campaign'];
  const tagOptions = ['frontend', 'backend', 'design', 'testing', 'documentation', 'bug', 'feature'];
  
  return Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}: Implement feature`,
    assignee: `Developer ${Math.floor(Math.random() * 8) + 1}`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    project: projects[Math.floor(Math.random() * projects.length)],
    tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      tagOptions[Math.floor(Math.random() * tagOptions.length)]
    ).filter((tag, index, arr) => arr.indexOf(tag) === index),
  }));
};

// Sample data
const usersData = generateUsers();
const salesData = generateSales();
const tasksData = generateTasks();

export const DataTableShowcase: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'users' | 'sales' | 'tasks'>('users');
  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 50, // default, will update below
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50],
  });

  // Update total when tab/data changes
  React.useEffect(() => {
    let total = 0;
    if (selectedTab === "users") total = usersData.length;
    else if (selectedTab === "sales") total = salesData.length;
    else if (selectedTab === "tasks") total = tasksData.length;
    setPagination(p => ({ ...p, total, current: 1 }));
  }, [selectedTab]);

  // User table columns
  const userColumns: Column<User>[] = [
    {
      key: 'user',
      title: 'User',
      dataIndex: 'name',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar size="sm">
            <AvatarImage src={record.avatar} />
            <AvatarFallback>{record.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Developer', value: 'Developer' },
        { label: 'Designer', value: 'Designer' },
        { label: 'Analyst', value: 'Analyst' },
      ],
    },
    {
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Design', value: 'Design' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Sales', value: 'Sales' },
        { label: 'HR', value: 'HR' },
      ],
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
      render: (status: User['status']) => (
        <Badge 
          variant={
            status === 'active' ? 'success' : 
            status === 'inactive' ? 'secondary' : 'warning'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      dataIndex: 'joinDate',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
    {
      key: 'actions',
      title: 'Actions',
      dataIndex: 'id',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center space-x-1">
          <Button variant="ghost" size="sm" onClick={() => showToast.info(`View user ${record.name}`)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => showToast.info(`Edit user ${record.name}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => showToast.warning(`Delete user ${record.name}`)}>
            <Trash2 className="h-4 w-4 text-danger-600" />
          </Button>
        </div>
      ),
    },
  ];

  // Sales table columns
  const salesColumns: Column<Sale>[] = [
    {
      key: 'product',
      title: 'Product',
      dataIndex: 'product',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (product) => (
        <div className="font-medium text-gray-900">{product}</div>
      ),
    },
    {
      key: 'customer',
      title: 'Customer',
      dataIndex: 'customer',
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      sortable: true,
      filterable: true,
      filterType: 'number',
      align: 'right',
      render: (amount: number) => (
        <div className="flex items-center justify-end space-x-1">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{amount.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      render: (status: Sale['status']) => (
        <Badge 
          variant={
            status === 'completed' ? 'success' : 
            status === 'pending' ? 'warning' : 'danger'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'region',
      title: 'Region',
      dataIndex: 'region',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'North America', value: 'North America' },
        { label: 'Europe', value: 'Europe' },
        { label: 'Asia Pacific', value: 'Asia Pacific' },
        { label: 'Latin America', value: 'Latin America' },
      ],
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
  ];

  // Tasks table columns
  const taskColumns: Column<Task>[] = [
    {
      key: 'title',
      title: 'Task',
      dataIndex: 'title',
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (title, record) => (
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{record.project}</div>
        </div>
      ),
    },
    {
      key: 'assignee',
      title: 'Assignee',
      dataIndex: 'assignee',
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    {
      key: 'priority',
      title: 'Priority',
      dataIndex: 'priority',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      render: (priority: Task['priority']) => (
        <Badge 
          variant={
            priority === 'urgent' ? 'danger' :
            priority === 'high' ? 'warning' :
            priority === 'medium' ? 'secondary' : 'outline'
          }
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'To Do', value: 'todo' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Review', value: 'review' },
        { label: 'Completed', value: 'completed' },
      ],
      render: (status: Task['status']) => (
        <Badge 
          variant={
            status === 'completed' ? 'success' :
            status === 'in-progress' ? 'warning' :
            status === 'review' ? 'secondary' : 'outline'
          }
        >
          {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
      ),
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      dataIndex: 'dueDate',
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
    {
      key: 'tags',
      title: 'Tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
  ];

  const getCurrentData = () => {
    switch (selectedTab) {
      case 'users': return usersData;
      case 'sales': return salesData;
      case 'tasks': return tasksData;
      default: return [];
    }
  };

  const getCurrentColumns = () => {
    switch (selectedTab) {
      case 'users': return userColumns;
      case 'sales': return salesColumns;
      case 'tasks': return taskColumns;
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DataTable Component</h1>
          <p className="text-gray-600 mt-1">
            A comprehensive table component with filtering, sorting, and pagination
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => showToast.info('Export functionality')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" onClick={() => showToast.success('Add new item')}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'users', label: 'Users', icon: Users },
            { key: 'sales', label: 'Sales', icon: DollarSign },
            { key: 'tasks', label: 'Tasks', icon: Calendar },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key as any)}
              className={`
                flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm
                ${selectedTab === key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{getCurrentData().length}</p>
              </div>
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selected</p>
                <p className="text-2xl font-bold text-gray-900">{selectedRows.length}</p>
              </div>
              <div className="p-2 bg-success-100 rounded-lg">
                <Filter className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Filters</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="p-2 bg-warning-100 rounded-lg">
                <Filter className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-success-600" />
                  <p className="text-2xl font-bold text-gray-900">Fast</p>
                </div>
              </div>
              <div className="p-2 bg-success-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DataTable */}
      <Card>
        <CardContent className="p-0">
          {selectedTab === "users" && (
            <DataTable<User>
              columns={userColumns}
              dataSource={usersData}
              rowKey="id"
              pagination={pagination}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: selectedRows,
                onChange: (keys) => {
                  setSelectedRows(keys);
                  showToast.info(`Selected ${keys.length} items`);
                },
              }}
              size="middle"
              bordered={false}
              title={() => (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Users Data
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {usersData.length} total
                    </Badge>
                    {selectedRows.length > 0 && (
                      <Badge variant="secondary">
                        {selectedRows.length} selected
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              onChange={(newPagination, filters, sorter) => {
                setPagination(p => ({
                  ...p,
                  current: newPagination.current,
                  pageSize: newPagination.pageSize,
                }));
              }}
            />
          )}

          {selectedTab === "sales" && (
            <DataTable<Sale>
              columns={salesColumns}
              dataSource={salesData}
              rowKey="id"
              pagination={pagination}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: selectedRows,
                onChange: (keys) => {
                  setSelectedRows(keys);
                  showToast.info(`Selected ${keys.length} items`);
                },
              }}
              size="middle"
              bordered={false}
              title={() => (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sales Data
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {salesData.length} total
                    </Badge>
                    {selectedRows.length > 0 && (
                      <Badge variant="secondary">
                        {selectedRows.length} selected
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              onChange={(newPagination, filters, sorter) => {
                setPagination(p => ({
                  ...p,
                  current: newPagination.current,
                  pageSize: newPagination.pageSize,
                }));
              }}
            />
          )}

          {selectedTab === "tasks" && (
            <DataTable<Task>
              columns={taskColumns}
              dataSource={tasksData}
              rowKey="id"
              pagination={pagination}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: selectedRows,
                onChange: (keys) => {
                  setSelectedRows(keys);
                  showToast.info(`Selected ${keys.length} items`);
                },
              }}
              size="middle"
              bordered={false}
              title={() => (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tasks Data
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {tasksData.length} total
                    </Badge>
                    {selectedRows.length > 0 && (
                      <Badge variant="secondary">
                        {selectedRows.length} selected
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              onChange={(newPagination, filters, sorter) => {
                setPagination(p => ({
                  ...p,
                  current: newPagination.current,
                  pageSize: newPagination.pageSize,
                }));
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Component Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Core Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Sortable columns with visual indicators</li>
                <li>• Advanced filtering (text, select, date)</li>
                <li>• Pagination with configurable page sizes</li>
                <li>• Row selection (single/multiple)</li>
                <li>• Responsive design for all screen sizes</li>
                <li>• Loading and empty states</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Custom cell renderers</li>
                <li>• TypeScript support with full typing</li>
                <li>• Accessibility features (ARIA labels)</li>
                <li>• Performance optimizations</li>
                <li>• Customizable styling and themes</li>
                <li>• Export and bulk actions support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};