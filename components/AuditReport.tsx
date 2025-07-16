import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link} from "@nextui-org/react";
import { CopyToClipboard } from "@/components/CopyToClipboard";

export const columns = [
  { name: "Auditing Agency", uid: "name" },
  { name: "Scope", uid: "scope" },
  { name: "Report", uid: "file" },
];

export const users = [
  {
    id: 1,
    name: "Salusec",
    website: "https://salusec.io/",
    file: "Xone-chain_2025-04-07.pdf",
    scope: "Underlying architecture security.",
  }
];

const AuditReportList = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    const FileUrl = `https://xone-docs.s3.ap-southeast-1.amazonaws.com/audit_report/${user.file}`
    const WebsiteUrl = user.website;

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-[5px] truncate">
            <Link
            isExternal
            showAnchorIcon
            href={WebsiteUrl}
            className='text-primaryHue hover:underline'
            >
              {user.name}
            </Link>
          </div>
        );
      case "scope":
        return <p className="text-sm text-default-600">{cellValue}</p>;
      case "file":
        return (
          <div className="flex items-center gap-[5px] truncate">
            <Link
            isExternal
            showAnchorIcon
            href={FileUrl}
            className='text-primaryHue hover:underline'
            >
              {user.file}
            </Link>
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

export default AuditReportList;