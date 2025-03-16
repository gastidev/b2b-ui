import { Card } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {change > 0 ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </Card>
  );
}