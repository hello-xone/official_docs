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
    address: "0xdA339ed0663760202f3C27640686b30eA4e27d69",
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
  {
    id: 13,
    name: "deployed Uniswap_V2 Factory",
    address: "0x76bDc5a6190Ea31A6D5C7e93a8a2ff4dD15080A6",
    describe: "manages the generation of all V2 trading pair contracts.",
  },
  {
    id: 14,
    name: "deployed Uniswap_V2 Router02",
    address: "0x89eA27957bb86FBFFC2e0ABfc5a5a64BB0343367",
    describe: "V2 router is responsible for token swaps, adding/removing liquidity.",
  },
  {
    id: 15,
    name: "deployed Uniswap_V3 Factory",
    address: "0xd357373500c6E5ce3A4CfA966b56F5241C7Af3c4",
    describe: "creates V3 pools, supporting centralized liquidity and multiple fee tiers.",
  },
  {
    id: 16,
    name: "deployed wxoc9",
    address: "0x4eabbaBeBbb358660cA080e8F2bb09E4a911AB4E",
    describe: "is used to solve the application of main currency cross-chain, DEFI and other projects.",
  },
  {
    id: 17,
    name: "deploy multicall3",
    address: "0xe39d7BCDdaBBD0526D143185Fb7b459099Fd40c9",
    describe: "aggregation tool, which can call multiple contract methods in batches.",
  },
  {
    id: 18,
    name: "deploy proxyAdmin",
    address: "0x8C38838164A75FA944884e3AECE11A6a91F18348",
    describe: "is a management contract used to manage all proxy contracts.",
  },
  {
    id: 19,
    name: "deploy ticklens",
    address: "0x74AEcb01C49179340B63D242D3F92cb5ff850f86",
    describe: "Uniswap V3 price ticks.",
  },
  {
    id: 20,
    name: "deployed SwapX_V3 Quoter",
    address: "0x75491D0E42D48121D865c6B8beccd70a28Cfff5a",
    describe: "Estimated transaction results.",
  },
  {
    id: 21,
    name: "deployed SwapX_V3 SwapRouter",
    address: "0xCB56f3eDea7272224800C83eE958A4e4C1cb59Be",
    describe: "Execute Swap Transaction.",
  },
  {
    id: 22,
    name: "deployed SwapX_V3 NFTDescriptorlibrary",
    address: "0xA42dD72DCDAB39e31423151cB61109Ba0f98113E",
    describe: "Help generate NFT information.",
  },
  {
    id: 23,
    name: "deployed SwapX_V3 NFTPositionDescriptor",
    address: "0xe44e55b7f57BaEF8064ee06fF6Bccfa16D6a8cAB",
    describe: "Specific information of each LP NFT.",
  },
  {
    id: 24,
    name: "deployed SwapX_V3 NFTPositionManager",
    address: "0x5165486E99227e772bE2f81f595b5d9580BBdeE0",
    describe: "Creating, modifying, merging, and destroying Uniswap V3 LP positions (NFTs).",
  },
  {
    id: 25,
    name: "deployed transparentUpgradeableProxy",
    address: "0x05ADde17e62B04AFA826A19e8435F40AF9Aea5D9",
    describe: "Transparent Proxy Contract.",
  },
  {
    id: 26,
    name: "deployed SwapX_V3 v3Migrator",
    address: "0x2E464880f0aecF7F112b1dc2e7ef9A513878B3dE",
    describe: "Migrate to v3.",
  },
  {
    id: 27,
    name: "buysell",
    address: "0xB395a25034Bf40Da8Ad36BB168f0D3442e1Fac6c",
    describe: "Sales Contract.",
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