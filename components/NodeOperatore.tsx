import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const NodeOperatore = () => {
    const FullNode = {
        name: "Full Node",
        CPU: "4 cores",
        memory: "8 GB RAM",
        os: "Ubuntu 22.04 or later",
        network: "Symmetric 100 Mbps",
        disk: "≥ 1.5 TB available (adjust based on log & data volume)",
    };

    const ArchiveNode = {
        name: "Archive Node",
        CPU: "",
        memory: "",
        os: "Under construction…",
        network: "",
        disk: "",
    };

    const LightNode = {
        name: "Light Node",
        CPU: "",
        memory: "",
        os: "Under construction…",
        network: "",
        disk: "",
    };

    return (
        <div className="overflow-x-auto">
            <Table removeWrapper aria-label="Network Information Table" className="mt-2">
                <TableHeader>
                    <TableColumn>&nbsp;</TableColumn>
                    <TableColumn><strong>{FullNode.name}</strong></TableColumn>
                    <TableColumn><strong>{ArchiveNode.name}</strong></TableColumn>
                    <TableColumn><strong>{LightNode.name}</strong></TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell><strong>CPU</strong></TableCell>
                        <TableCell>{FullNode.CPU}</TableCell>
                        <TableCell>{ArchiveNode.CPU}</TableCell>
                        <TableCell>{LightNode.CPU}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell><strong>Memory</strong></TableCell>
                        <TableCell>{FullNode.memory}</TableCell>
                        <TableCell>{ArchiveNode.memory}</TableCell>
                        <TableCell>{LightNode.memory}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell><strong>OS</strong></TableCell>
                        <TableCell>{FullNode.os}</TableCell>
                        <TableCell>{ArchiveNode.os}</TableCell>
                        <TableCell>{LightNode.os}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell><strong>Network</strong></TableCell>
                        <TableCell>{FullNode.network}</TableCell>
                        <TableCell>{ArchiveNode.network}</TableCell>
                        <TableCell>{LightNode.network}</TableCell>
                    </TableRow>
                    <TableRow key="5">
                        <TableCell><strong>Disk</strong></TableCell>
                        <TableCell>{FullNode.disk}</TableCell>
                        <TableCell>{ArchiveNode.disk}</TableCell>
                        <TableCell>{LightNode.disk}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default NodeOperatore;
