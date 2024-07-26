import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <RadarChart cx='50%' cy='50%' outerRadius='60%' data={data}>
        <PolarGrid />
        <PolarAngleAxis
          style={{
            fontSize: '12px',
          }}
          dataKey='name'
        />
        <PolarRadiusAxis
          style={{
            fontSize: '12px',
          }}
        />
        <Radar dataKey='value' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};
