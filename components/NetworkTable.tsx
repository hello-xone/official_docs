import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import AddNetworkButton from "@/components/addNetwork";
import {Code} from "@nextui-org/react";

const NetworkTable = () => {
    const testnet = {
        name: "Xone Testnet",
        networkName: "Xone Testnet",
        rpcUrls: [
            "https://rpc-testnet.xone.plus",
            "https://rpc-testnet.xone.org",
            "https://rpc-testnet.knight.center",
            "wss://wss-rpc-testnet.xone.org",
        ],
        chainId: 33772211,
        symbol: "XOC",
        explorer: "https://testnet.xscscan.com/",
    };

    const mainnet = {
        name: "Xone Mainnet",
        networkName: "Xone Mainnet",
        rpcUrls: [
            "https://rpc.xone.org",
            "wss://rpc-wss.xone.org",
        ],
        chainId: 3721,
        symbol: "XOC",
        explorer: "https://xscscan.com/",
    };

    return (
        <div className="overflow-x-auto">
            <Table removeWrapper aria-label="Network Information Table" className="mt-2">
                <TableHeader>
                    <TableColumn>Placeholder</TableColumn>
                    <TableColumn><strong>{testnet.name}</strong></TableColumn>
                    <TableColumn><strong>{mainnet.name}</strong></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell><strong>Network Name</strong></TableCell>
                        <TableCell>{testnet.networkName}</TableCell>
                        <TableCell>{mainnet.networkName}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell><strong>New RPC URL</strong></TableCell>
                        <TableCell>
                            {testnet.rpcUrls.map((url, index) => (
                                <div className="pt-2" key={index}><Code>{url}</Code></div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {mainnet.rpcUrls.map((url, index) => (
                                <div className="pt-2" key={index}><Code>{url}</Code></div>
                            ))}
                        </TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell><strong>Chain ID</strong></TableCell>
                        <TableCell>{testnet.chainId}</TableCell>
                        <TableCell>{mainnet.chainId}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell><strong>Symbol</strong></TableCell>
                        <TableCell>{testnet.symbol}</TableCell>
                        <TableCell>{mainnet.symbol}</TableCell>
                    </TableRow>
                    <TableRow key="5">
                        <TableCell><strong>Block Explorer URL</strong></TableCell>
                        <TableCell><Code>{testnet.explorer}</Code></TableCell>
                        <TableCell><Code>{mainnet.explorer}</Code></TableCell>
                    </TableRow>
                    <TableRow key="6">
                        <TableCell>—</TableCell>
                        <TableCell>placeholder<AddNetworkButton network="testnet" /></TableCell>
                        <TableCell>placeholder<AddNetworkButton network="mainnet" /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default NetworkTable;
