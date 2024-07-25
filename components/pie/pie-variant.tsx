import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatPercentage } from '~/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
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
                    <span>{formatPercentage(entry.payload.percent * 100)}</span>
                  </li>
                ))}
              </ul>
            );
          }}
        />

        <Pie
          data={data}
          dataKey='value'
          labelLine={false}
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill='#8884d8'
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
