import { useEffect, useContext, useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { DataContext } from "../../context/DataContext";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "customer",
    label: "NAME",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "amount",
    label: "AMOUNT",
  },
];

export default function DisplayTable() {
  // const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const [isLoading, setIsLoading] = useState(true);

  //! ==========> data context <==========
  const {
    tableData,
    data,
    calcTotalAmountOfDay,
    getDataOfUser,
    calcTotalAmount,
  } = useContext(DataContext);

  //! ==========> get data <==========
  async function getTableData() {
    const res = await tableData();
    setIsLoading(false);
    calcTotalAmount(res);
  }

  useEffect(() => {
    getTableData();
  }, []);

  //! ==========> sort data <==========
  const [sortDescriptor, setSortDescriptor] = useState(
    {
      column: "name",
      direction: "ascending",
    },
    {
      column: "amount",
      direction: "ascending",
    }
  );

  const sortedItems = useMemo(() => {
    return [...data].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data]);

  return (
    <section className="container mx-auto">
      {/* ==========> table <========== */}
      <Table
        classNames={{
          base: "max-h-[50vh] overflow-y-auto",
        }}
        isHeaderSticky
        aria-label="Controlled table example with dynamic content"
        selectionMode="single"
        color="secondary"
        // selectedKeys={selectedKeys}
        // onSelectionChange={setSelectedKeys}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        {/* ==========> table header <========== */}
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              allowsSorting
              sortDescriptor={column.sortDescriptor}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        {/* ==========> table body <========== */}
        <TableBody
          items={sortedItems}
          emptyContent={"No rows to display."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell
                  onClick={() => {
                    calcTotalAmountOfDay(item), getDataOfUser(item);
                  }}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
