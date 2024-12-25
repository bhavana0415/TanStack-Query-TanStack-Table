"use client";

import React from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, User } from "lucide-react";
import CustomPagination from "./CustomPagination";

type User = {
  id: string;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: {
    title: string;
    key_skill: string;
  };
  address: {
    city: string;
    street_name: string;
    street_address: string;
    zip_code: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  credit_card: {
    cc_number: string;
  };
  subscription: {
    plan: string;
    status: string;
    payment_method: string;
    term: string;
  };
};

const UserTable = ({ data, ...props }) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns = React.useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "First Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address.city",
        header: "City",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address.state",
        header: "State",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "address.country",
        header: "Country",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-6">
      <div className="mb-4 relative">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-backgroundReverse text-foregroundReverse border border-cyan-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foregroundReverse"
          size={20}
        />
      </div>
      <Table className="p-2">
        <TableHeader className="text-bold text-xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b border-cyan-500"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? " ⇅"}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="pb-2">
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table &&
            table?.getRowModel()?.rows?.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  className={`${
                    index % 2 == 0
                      ? "bg-backgroundReverse text-foregroundReverse"
                      : "bg-background text-foreground"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="h-2" />
      {Object.keys(props).length === 0 ? (
        <CustomPagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          pageSize={table.getState().pagination.pageSize}
          onPageSizeChange={(count) => table.setPageSize(count)}
        />
      ) : (
        <CustomPagination
          currentPage={props.page}
          totalPages={Math.ceil(props.totalCount / props.pageSize)}
          onPageChange={(page) => props.setPage(page)}
          pageSize={props.pageSize}
          onPageSizeChange={(count) => {
            props.setPageSize(count);
            table.setPageSize(count);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;

function Filter({ column }: { column: Column<unknown, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  const map = (str: string) => {
    switch (str) {
      case "first_name":
        return "First Name";
      case "last_name":
        return "Last Name";
      case "email":
        return "Email";
      case "gender":
        return "Gender";
      case "phone_number":
        return "Number";
      case "date_of_birth":
        return "DOB";
      case "address_city":
        return "City";
      case "address_state":
        return "State";
      case "address_country":
        return "Country";
    }
  };

  return (
    <DebouncedInput
      className="full border shadow rounded text-base text-foregroundReverse bg-backgroundReverse"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search ${map(column.id)} ...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
