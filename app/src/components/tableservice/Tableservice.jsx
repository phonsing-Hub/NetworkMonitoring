import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import { Rate, Card } from "antd";
import { columns, hostname } from "./data";
import ListItems from "../lisBox/Listbox";

export default function Tableservice() {
  const [cascaderVisible, setCascaderVisible] = useState(false);
  const [cascaderPosition, setCascaderPosition] = useState({ x: 0, y: 0 });
  const renderCell = useCallback((hostname, columnKey) => {
    const cellValue = hostname[columnKey];
    switch (columnKey) {
      case "host":
        return (
          <div>
            <p className="text-bold text-sm capitalize">{cellValue[0]}</p>
            <Link
              href="#"
              underline="hover"
              showAnchorIcon
              color="primary"
              size="sm"
            >
              {cellValue[1]}
            </Link>
          </div>
        );
      case "responetime":
        return <div>{cellValue}</div>;
      case "priority":
        return <Rate disabled defaultValue={cellValue} className="text-sm" />;
      default:
        return cellValue;
    }
  }, []);

  const handleRowContextMenu = (event, item) => {
    event.preventDefault();
    console.log(item);
    setCascaderVisible(true);
    setCascaderPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCascaderChange = (value) => {
    console.log(value);
    setCascaderVisible(false);
  };

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        color="primary"
        selectionMode="multiple"
        classNames={{
          wrapper: "max-h-[700px] bg-transparent	",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={hostname}>
          {(item) => (
            <TableRow
              key={item.id}
              className="chart"
              onContextMenu={(event) => handleRowContextMenu(event, item)}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {cascaderVisible && (
        <div
          style={{
            position: "absolute",
            top: cascaderPosition.y,
            left: cascaderPosition.x,
            zIndex: 1000,
          }}
        >
           <Card size="small" title="Small size card">
          <ListItems />
          </Card>
        </div>
      )}
    </>
  );
}
