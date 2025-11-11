import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link} from "@nextui-org/react";
import {CopyToClipboard} from "@/components/CopyToClipboard";

const EASContract = () => {
  const testnet = {
    name: "Xone Testnet",
    easContract: "0x5281A0c5dD1B2ed4Cf97BB4387B345237612c4F2",
    SchemaRegistryContract: "0xa32B1254C754E8709c4AEaF7B0034071348B235B",
    explorer: "https://testnet.xonescan.com/",
  };

  const mainnet = {
    name: "Xone Mainnet",
    easContract: "0xF1F8D5bD252d96c2F6C22afaf04d704BCEEFCC69",
    SchemaRegistryContract: "0x5281A0c5dD1B2ed4Cf97BB4387B345237612c4F2",
    explorer: "https://xonescan.com/",
  };

  const renderAddress = (address: string, explorer: string) => (
    <div className="flex items-center gap-[5px] truncate">
      <Link
        isExternal
        showAnchorIcon
        href={`${explorer}address/${address}`}
        className="text-primaryHue hover:underline"
      >
        {address}
      </Link>
      <CopyToClipboard value={address} iconSize={16} />
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <Table removeWrapper aria-label="Network Information Table" className="mt-2">
        <TableHeader>
          <TableColumn>&nbsp;</TableColumn>
          <TableColumn><strong>{testnet.name}</strong></TableColumn>
          <TableColumn><strong>{mainnet.name}</strong></TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell><strong>EAS</strong></TableCell>
            <TableCell>{renderAddress(testnet.easContract, testnet.explorer)}</TableCell>
            <TableCell>{renderAddress(mainnet.easContract, mainnet.explorer)}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell><strong>SchemaRegistry</strong></TableCell>
            <TableCell>{renderAddress(testnet.SchemaRegistryContract, testnet.explorer)}</TableCell>
            <TableCell>{renderAddress(mainnet.SchemaRegistryContract, mainnet.explorer)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default EASContract;
