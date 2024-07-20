import React, { useState, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
  Link,
  Button as Btn,
  Listbox,
  ListboxItem,
  cn,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Card,
  Image,
} from "@nextui-org/react";
import { GrDocumentUpdate } from "react-icons/gr";
import { DeleteDocumentIcon } from "../icons/DeleteDocumentIcon.jsx";
import { Button, Empty, message } from "antd";
import { AiTwotoneStop } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { TbFolderSearch, TbWorldCheck } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { IoCloseSharp, IoEarthSharp } from "react-icons/io5";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "ip", "status", "points"];
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

export default function TableMNR({
  devices,
  setAddModalDevices,
  UpdateHost,
}) {
  const [cascaderVisible, setCascaderVisible] = useState(false);
  const [cascaderPosition, setCascaderPosition] = useState({ x: 0, y: 0 });
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({});
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredDevices = [...devices];

    if (hasSearchFilter) {
      filteredDevices = filteredDevices.filter(
        (device) =>
          device.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          device.id
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          device.ip.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all" && statusFilter.size !== statusOptions.length) {
      filteredDevices = filteredDevices.filter((device) =>
        statusFilter.has(device.status)
      );
    }

    return filteredDevices;
  }, [devices, filterValue, statusFilter, hasSearchFilter, statusOptions]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((device, columnKey) => {
    const cellValue = device[columnKey];
    switch (columnKey) {
      case "name":
        return <p className="font-bold text-sm">{cellValue}</p>;

      case "ip":
        return (
          <Link
            className="font-bold text-sm"
            underline="hover"
            href="#"
            showAnchorIcon
            color="foreground"
          >
            {cellValue}
          </Link>
        );

      case "status":
        return (
          <Chip
            radius="sm"
            endContent={
              cellValue === "Active" ? <TbWorldCheck /> : <AiTwotoneStop />
            }
            color={cellValue === "Active" ? "success" : "primary"}
          >
            {cellValue}
          </Chip>
        );

      case "points":
        const elements = [];
        for (let i = 0; i < cellValue; i++)
          elements.push(<IoMdStar key={i} size={16} />);

        return <div className="flex">{elements}</div>;

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            color="primary"
            radius="sm"
            className="w-full sm:max-w-[22%]"
            placeholder="Search by name..."
            startContent={<TbFolderSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button icon={<FaChevronDown className="text-small" />}>
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button icon={<FaChevronDown className="text-small" />}>
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              icon={<IoEarthSharp />}
              onClick={() => setAddModalDevices(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {devices.length} devices
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={10}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    devices.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          showControls
          showShadow
          variant="faded"
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button onClick={onPreviousPage}>Previous</Button>
          <Button onClick={onNextPage}>Next</Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const handleRowContextMenu = (event, item) => {
    event.preventDefault();
    setEdit(item);
    setCascaderVisible(true);
    setCascaderPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCascaderChange = (key) => {
    switch (key) {
      case "update":
        UpdateHost(edit.id);
        setCascaderVisible(false);
        break;
      case "active":
        //console.log("set Active");
        return message.success("set Active");

      case "paused":
        //console.log("set Paused");
        return message.success("set paused");

      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (selectedKeys === "all") return console.log(selectedKeys);
  //   const keysArray = Array.from(selectedKeys);
  //   console.log(keysArray);
  // }, [selectedKeys]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        isStriped
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[700px] bg-transparent	",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        color="success"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        //onRowAction={setSelectedRowData}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={<Empty />} items={sortedItems}>
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
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3 justify-between">
              <div className="flex flex-col">
                <p className="text-md">Edit {edit.name}</p>
              </div>
              <button onClick={() => setCascaderVisible(false)}>
                <IoCloseSharp />
              </button>
            </CardHeader>
            <Divider />
            <CardBody>
              <Listbox
                variant="flat"
                aria-label="Listbox menu with descriptions"
                onAction={handleCascaderChange}
              >
                <ListboxItem
                  key="update"
                  //description="Create a new file"
                  startContent={<GrDocumentUpdate className={iconClasses} />}
                >
                  Update
                </ListboxItem>
                <ListboxItem
                  key="active"
                  //description="Create a new file"
                  startContent={<TbWorldCheck className={iconClasses} />}
                >
                  Set active
                </ListboxItem>
                <ListboxItem
                  key="paused"
                  //description="Create a new file"
                  startContent={<AiTwotoneStop className={iconClasses} />}
                >
                  Set paused
                </ListboxItem>
                <ListboxItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description="Permanently delete the Host"
                  startContent={
                    <DeleteDocumentIcon
                      className={cn(iconClasses, "text-danger")}
                    />
                  }
                >
                  Delete file
                </ListboxItem>
              </Listbox>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                className="font-bold text-sm"
                underline="hover"
                href="#"
                showAnchorIcon
                color="foreground"
              >
                {edit.ip}
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
