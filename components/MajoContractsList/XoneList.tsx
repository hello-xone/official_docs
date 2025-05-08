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
    name: "XOCTeamRelease",
    address: "0x1b553A9B5C47F55F1777f024CaB3038ddbF89c0e",
    describe: "Team Token Release.",
  },
  {
    id: 2,
    name: "XOCRelease",
    address: "0xCB741e27f9C3742636fa8474a981b702FCE6602E",
    describe: "Donate Token Release.",
  },
  {
    id: 3,
    name: "Admin",
    address: "0xB3331B5dD34b183C7772Ae50c9009df603EeeD49",
    describe: "Manage all proxy contracts of the Rinlink bridge.",
  },
  {
    id: 4,
    name: "Proxy_01",
    address: "0xfeBc13df64252cb83FbDAFa8d916867dAa30501a",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 5,
    name: "Proxy_02",
    address: "0xda6869A6435c3bef2Ece47cD1B0B020ffc62E1A3",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 6,
    name: "Proxy_02",
    address: "0x4aeDc117527fD270D4d56aA32f2E4e532547c8Dc",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 7,
    name: "Proxy_02",
    address: "0x5B6C580F2Af1eDD51349716f40A9104Bd918aef7",
    describe: "Rinlink bridge Agency Contract.",
  },
  {
    id: 8,
    name: "Validator",
    address: "0x1A72cecE1422eb94258BA242E2905B187103936f",
    describe: "Rinlink bridge Monitor and verify transaction events on the source chain.",
  },
  {
    id: 9,
    name: "Messager",
    address: "0x82cdA9c9E913a41bB69947b8A672983Ca7235b9E",
    describe: "Rinlink bridge Transferring information between chains.",
  },
  {
    id: 10,
    name: "Pool",
    address: "0x7BC276A77c4B2AA577d5dDf9A39D64465AE7464A",
    describe: "Rinlink bridge Liquidity pool for storing cross-chain assets.",
  },
  {
    id: 11,
    name: "Executor",
    address: "0x5560eeFb67C5ed25098dd1F16a6A024a169D0f70",
    describe: "Rinlink bridge Execute operations corresponding to cross-chain messages.",
  },
  {
    id: 12,
    name: "TokenBatch",
    address: "0x7969DA379E4eEe30376a9fc3EDAB2b4A1035271B",
    describe: "Rinlink bridge Packaging multiple token transfers or cross-chain operations.",
  },
];

const XoneList = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    const addressUrl = `https://xonescan.com/address/${user.address}`

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

export default XoneList;