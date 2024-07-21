import { Table, TableBody, TableHeader, TableCell, TableHead, TableRow } from '~/components/ui/table';
import { TableHeadSelect } from './table-head-select';

interface ImportTableProps {
  header: string[];
  body: string[][];
  selected: Record<string, string | null>;
  onSelect: (columnIndex: number, value: string | null) => void;
}

export const ImportTable = ({ header, body, selected, onSelect }: ImportTableProps) => {
  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader className='bg-muted'>
          <TableRow>
            {header.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect columnIndex={index} selected={selected} onSelect={onSelect} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {body.map((row: string[], index) => (
          <TableBody key={index}>
            <TableRow>
              {row.map((item, body) => (
                <TableCell key={body}>{item}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};
