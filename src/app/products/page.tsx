"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

export default function BlogProductList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "price",
        flex: 1,
        headerName: "Price",
        minWidth: 250,
      },
      {
        field: "category",
        flex: 1,
        headerName: "Category",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.category;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value?.id)?.title
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}