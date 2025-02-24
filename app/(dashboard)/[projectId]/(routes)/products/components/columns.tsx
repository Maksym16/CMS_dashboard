"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string,
  price: string,
  size: string,
  category: string,
  coffeeType: string,
  roastType: string,
  region: string,
  description: string,
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "coffeeType",
    header: "Coffee Type",
  },
  {
    accessorKey: "roastType",
    header: "Roast Type",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.roastType}
        <div className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.roastType}}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>,
  }
]
