import { Card } from '@/components/ui/card';
import { categories } from '@/lib/data';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ExpenseChart() {
  // Only show top 5 categories
  const topCategories = categories.slice(0, 5);
  const data = topCategories.map((category) => ({
    name: category.name,
    value: category.percentage,
  }));

  return (
    <Card className='h-[600px] p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-sm font-medium'>
          Distribución
        </h3>
        <Button
          variant='ghost'
          className='gap-2 text-sm'
          asChild
        >
          <Link to='/analytics'>
            Ver todas
            <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <div className='h-[300px] mb-8'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey='value'
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='space-y-4'>
        {data.map((category, index) => (
          <div
            key={category.name}
            className='flex items-center gap-2'
          >
            <div
              className='w-3 h-3 rounded-full'
              style={{
                backgroundColor:
                  COLORS[index % COLORS.length],
              }}
            />
            <span className='text-sm flex-1'>
              {category.name}
            </span>
            <span className='text-sm text-muted-foreground'>
              {category.value}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
