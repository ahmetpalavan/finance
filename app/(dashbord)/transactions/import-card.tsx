import { useCallback, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { ImportTable } from './import-table';
import { convertAmountToMiliunits } from '~/lib/utils';
import { format, parse } from 'date-fns';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const outputFormat = 'yyyy-MM-dd';

const requiredOptions = ['date', 'amount', 'payee'];

interface SelectOption {
  [key: string]: string | null;
}

type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any[]) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const [selected, setSelected] = useState<SelectOption>({});
  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = useCallback((columnIndex: number, value: string | null) => {
    setSelected((prev) => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }
      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  }, []);

  const progress = Object.values(selected).filter(Boolean).length;

  const handleContinue = useCallback(() => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };
    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selected[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selected[`column_${columnIndex}`] ? cell : null;
          });
          return transformedRow.every((cell) => cell === null) ? [] : transformedRow;
        })
        .filter((row) => row?.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((row) => {
      const date = format(parse(row.date, dateFormat, new Date()), outputFormat);
      const amount = convertAmountToMiliunits(row.amount);
      return { ...row, date, amount };
    });
    onSubmit(formattedData);
  }, [headers, body, selected, onSubmit]);

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>Transaction History</CardTitle>
          <div className='flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center'>
            <Button size='sm' className='w-full lg:w-auto' onClick={onCancel}>
              Cancel
            </Button>
            <Button className='w-full lg:w-auto' disabled={progress < requiredOptions.length} onClick={handleContinue}>
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable header={headers} body={body} selected={selected} onSelect={onTableHeadSelectChange} />
        </CardContent>
      </Card>
    </div>
  );
};
