import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

const RPC_ERROR_CODES = [
  {
    code: '-32700',
    meaning: 'Parse error',
    description: 'Invalid JSON',
  },
  {
    code: '-32600',
    meaning: 'Invalid request',
    description:
      'Request is malformed. Some providers also use this to signal that a method is unavailable or needs a paid tier.',
  },
  {
    code: '-32601',
    meaning: 'Method not found',
    description:
      'The method is not supported by this provider. Try another provider or a higher tier.',
  },
  {
    code: '-32602',
    meaning: 'Invalid params',
    description:
      'Check the parameters; they do not match the spec.',
  },
  {
    code: '-32603',
    meaning: 'Internal error',
    description:
      'Node reverted or request is malformed/invalid.',
  },
  {
    code: '-32000',
    meaning: 'Invalid input',
    description: 'Missing or invalid parameters.',
  },
  {
    code: '-32001',
    meaning: 'Resource not found',
    description:
      'Method not supported. Switch method or provider.',
  },
  {
    code: '-32002',
    meaning: 'Resource unavailable',
    description: 'Requested resource not available.',
  },
  {
    code: '-32003',
    meaning: 'Transaction rejected',
    description: 'Transaction creation failed.',
  },
  {
    code: '-32004',
    meaning: 'Method not supported',
    description: 'Method is not implemented.',
  },
  {
    code: '-32005',
    meaning: 'Limit exceeded',
    description: 'Request exceeds defined limit.',
  },
  {
    code: '-32006',
    meaning: 'JSON‑RPC version not supported',
    description: 'Protocol version not supported.',
  },
];

export default function ErrorCode() {
  return (
    <div className="overflow-x-auto">
      <Table
        aria-label="JSON‑RPC Error Codes"
        removeWrapper
        className="mt-2"
      >
        <TableHeader>
          <TableColumn width={110}>Code</TableColumn>
          <TableColumn>Meaning</TableColumn>
          <TableColumn>Typical Fix / Description</TableColumn>
        </TableHeader>

        <TableBody items={RPC_ERROR_CODES}>
          {(item) => (
            <TableRow key={item.code}>
              <TableCell className="font-mono">{item.code}</TableCell>
              <TableCell>{item.meaning}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
