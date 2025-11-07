import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTable } from "../src/components/DataTable";
import type { Column } from "../src/components/DataTable/DataTable.types";

// Sample data and columns
interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name" },
  { key: "email", title: "Email", dataIndex: "email" },
];

const dataSource: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

describe("DataTable", () => {
  it("renders table with valid columns and dataSource", () => {
    render(
      <DataTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders loading skeletons when loading is true", () => {
    render(
      <DataTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={true}
      />
    );
    // Should not show fallback "Loading table data..."
    expect(screen.queryByText("Loading table data...")).not.toBeInTheDocument();
    // Optionally, check for skeleton elements by className if needed
  });

  it("renders fallback when columns is not a valid array", () => {
    render(
      <DataTable<User>
        columns={null as any}
        dataSource={dataSource}
        rowKey="id"
      />
    );
    expect(screen.getByText("Loading table data...")).toBeInTheDocument();
  });

  it("renders fallback when dataSource is not a valid array", () => {
    render(
      <DataTable<User>
        columns={columns}
        dataSource={null as any}
        rowKey="id"
      />
    );
    expect(screen.getByText("Loading table data...")).toBeInTheDocument();
  });

  it("does not throw hook errors when toggling loading", () => {
    // Simulate toggling loading state
    const { rerender } = render(
      <DataTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={true}
      />
    );
    rerender(
      <DataTable<User>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={false}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});