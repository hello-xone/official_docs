import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link} from "@nextui-org/react";
import { CopyToClipboard } from "@/components/CopyToClipboard";

export const columns = [
  { name: "Contracts Name", uid: "name" },
  { name: "Describe", uid: "describe" },
  { name: "Address", uid: "address" },
];

export const users = [
  {
    id: 1,
    name: "Admin",
    address: "TB6N5gHdNfgr6dGjxfHiiwkQstWcrEijyJ",
    describe: "Manage all proxy contracts of the Rinlink bridge.",
  },
  {
    id: 2,
    name: "Proxy_01",
    address: "TB1Uz7so6tEN9f4zKPcQH8zfL4bZoHnuRN",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 3,
    name: "Proxy_02",
    address: "TJk99R58zRphC3J3zSSXw73yaR4WBnWJoi",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 4,
    name: "Proxy_03",
    address: "TP2xcFQNvPagGFAZhu5r6QJjHuwHyaSVDF",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 5,
    name: "Proxy_04",
    address: "TBMCimtduFWZRJUvxDdP7cW1SSMXcWDi8z",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 6,
    name: "Validator",
    address: "TPpNYSt66oMmtbLB8jbG3tzKnj3mx13mwK",
    describe: "Rinlink bridge Monitor and verify transaction events on the source chain.",
  },
  {
    id: 7,
    name: "Messager",
    address: "TFuFsavxcwonsYzDDGkUbLPBLSWL8LkBTf",
    describe: "Rinlink bridge Transferring information between chains.",
  },
  {
    id: 8,
    name: "Pool",
    address: "TSd9cGrWsHWccXxNSymqmon7S3okso8eYB",
    describe: "Rinlink bridge Liquidity pool for storing cross-chain assets.",
  },
  {
    id: 9,
    name: "Executor",
    address: "TM8RETJxtXZ19D4Ad71DmVDiU6pvVJjvwA",
    describe: "Rinlink bridge Execute operations corresponding to cross-chain messages.",
  },
  {
    id: 10,
    name: "TokenBatch",
    address: "TZ2ZhSie1CyGB9Bimb4n2mdJLEtqoEZYyX",
    describe: "Rinlink bridge Packaging multiple token transfers or cross-chain operations.",
  },
];

const TronList = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    const addressUrl = `https://tronscan.org/#/contract/${user.address}`

    switch (columnKey) {
      case "name":
        return <p className="text-sm text-default-600">{cellValue}</p>;
      case "describe":
        return <p className="text-sm text-default-600">{cellValue}</p>;
      case "address":
        return (
          <div className="flex items-center gap-[5px] truncate">
            <Link
            isExternal
            showAnchorIcon
            href={addressUrl}
            className='text-primaryHue hover:underline'
            >
              {user.address}
            </Link>
            <CopyToClipboard value={user.address} iconSize={16} />
          </div>
        );
        default:
          return cellValue;
      }
    }, [users]);

  return (
    <div className="overflow-x-auto">
      <Table removeWrapper aria-label="Network Listed Table" className="mt-2">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.uid}>
            {column.name}
          </TableColumn>}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

  );
};

export default TronList;