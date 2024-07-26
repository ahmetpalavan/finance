import { Cell, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '~/lib/utils';
import { CategoryTooltip } from './category-tooltip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <RadialBarChart
        cx='50%'
        cy='30%'
        barSize={10}
        innerRadius='90%'
        outerRadius='40%'
        data={data.map((entry, index) => ({
          ...entry,
          fill: COLORS[index % COLORS.length],
        }))}
      >
        <Legend
          layout='horizontal'
          align='right'
          verticalAlign='bottom'
          iconType='circle'
          content={({ payload }: any) => {
            return (
              <ul className='flex flex-col space-y-2'>
                {payload.map((entry: any, index: number) => (
                  <li key={`item-${index}`} className='flex items-center space-x-2'>
                    <span className='size-2 rounded-full' style={{ backgroundColor: entry.color }} />
                    <span className='text-sm text-muted-foreground'>{entry.value}</span>
                    <span>{formatCurrency(entry.payload.value)}</span>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <RadialBar label={{ fill: '#fff', position: 'insideStart', fontSize: '12px' }} background dataKey={'value'}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </RadialBar>
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
