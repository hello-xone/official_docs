import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link} from "@nextui-org/react";

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
];

const MajoContractsList = () => {
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
          <Link
            isExternal
            showAnchorIcon
            href={addressUrl}
            className='text-primaryHue hover:underline'
          >
            {user.address}
          </Link>
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

export default MajoContractsList;