import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '~/components/ui/select';
import { cn } from '~/lib/utils';

interface TableHeadSelectProps {
  columnIndex: number;
  selected: Record<string, string | null>;
  onSelect: (columnIndex: number, value: string | null) => void;
}

const options = ['date', 'amount', 'payee'];

export const TableHeadSelect = ({ columnIndex, selected, onSelect }: TableHeadSelectProps) => {
  const currentSelect = selected[`column_${columnIndex}`];
  return (
    <Select onValueChange={(value) => onSelect(columnIndex, value)} value={currentSelect || ''}>
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelect && 'text-blue-500'
        )}
      >
        <SelectValue placeholder='Skip' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='skip'>Skip</SelectItem>
        {options.map((option) => {
          const disabled = Object.values(selected).includes(option) && currentSelect !== option;
          return (
            <SelectItem disabled={disabled} key={option} value={option} className='capitalize'>
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
