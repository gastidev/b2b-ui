import { Card } from "@/components/ui/card";
import { departments, categories } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

// Mock data - replace with real data from your backend
const departmentExpenses = departments.map(dept => ({
  name: dept.name,
  amount: Math.floor(Math.random() * 100000) + 10000 // Random amount for demo
}));

const categoryExpenses = categories.map(cat => ({
  name: cat.name,
  amount: Math.floor(Math.random() * 100000) + 10000 // Random amount for demo
}));

export function ExpenseCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Department Expenses */}
      <Card className="p-6">
        <h3 className="text-sm font-medium mb-6">Gastos por área</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentExpenses}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Expenses */}
      <Card className="p-6">
        <h3 className="text-sm font-medium mb-6">Gastos por categoría</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryExpenses}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
              >
                {categoryExpenses.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {categoryExpenses.map((category, index) => (
            <div key={category.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm flex-1 truncate">{category.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}