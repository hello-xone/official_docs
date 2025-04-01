import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link} from "@nextui-org/react";

export const columns = [
  { name: "Name", uid: "name" },
  { name: "Describe", uid: "describe" },
];

export const users = [
  {
    id: 1,
    name: "Chainid Network",
    describe: "A list of EVM-based chains that also allows you to add chains to your favorite Web3 wallet.",
    avatar: "https://chainlist.org/favicon.ico",
    url: "https://chainid.network/chain/3721/",
  },
  {
    id: 2,
    name: "Chainlist WTF",
    describe: "A list of EVM-based chains that also allows you to add chains to your favorite Web3 wallet.",
    avatar: "https://chainlist.org/favicon.ico",
    url: "https://chainlist.wtf/chain/3721/",
  },
  {
    id: 3,
    name: "Chainlist",
    describe: "Find the best Xone Mainnet RPC to connect to your wallets and Web3 middleware providers.",
    avatar: "https://chainlist.org/favicon.ico",
    url: "https://chainlist.org/chain/3721",
  },
  {
    id: 4,
    name: "EVM Box",
    describe: "EVM Box is a list of EVM networks. Helping users connect to EVM powered networks.use EVM Compatible Network with ease.",
    avatar: "https://networks.vercel.app/images/favicon.png",
    url: "https://networks.vercel.app/",
  },
  {
    id: 5,
    name: "EVMChain Info",
    describe: "A list of EVM-based chains that also allows you to add chains to metamask or other of your favorite Web3 wallet. Find the best RPC for both Mainnet and Testnet to connect to the correct chain.",
    avatar: "https://evmchain.info/favicon.ico",
    url: "https://evmchain.info/chain/3721",
  },
  {
    id: 6,
    name: "EVMChain list",
    describe: "Find the best Xone Mainnet RPC to connect to your wallets and Web3 middleware providers.",
    avatar: "https://evmchainlist.org/favicon.ico",
    url: "https://evmchainlist.org/chain/3721",
  },
  {
    id: 7,
    name: "Chains Wagmi",
    describe: "Wagmi compatible chain configurations compiled from ethereum-lists.",
    avatar: "https://spenhouet.com/chains/favicon-32x32.png",
    url: "https://spenhouet.com/chains",
  },
  {
    id: 8,
    name: "Simplr",
    describe: "A simple, information-rich application for browsing and managing EVM chains.",
    avatar: "https://chainlist.simplr.sh/favicon.png",
    url: "https://chainlist.simplr.sh/",
  },
  {
    id: 9,
    name: "Chainscout",
    describe: "Explorer for Blockscout instances.",
    avatar: "https://chains.blockscout.com/favicon-32x32.png",
    url: "https://chains.blockscout.com/",
  },
];

const NetworkListed = () => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg" />
            <div className="flex flex-col min-w-max">
              <Link
                isExternal
                showAnchorIcon
                href={user.url}
                className='text-primaryHue'
              >
                {user.name}
              </Link>
            </div>
          </div>
        );
      case "describe":
        return <p className="text-sm text-default-600">{cellValue}</p>;
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

export default NetworkListed;