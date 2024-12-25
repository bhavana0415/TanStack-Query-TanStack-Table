"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Column, flexRender } from "@tanstack/react-table";

const TanstackTable = ({ table }) => {
  return (
    <Table className="p-2 max-h-[100px]">
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
        {table.getRowModel().rows.map((row, index) => {
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TanstackTable;

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
