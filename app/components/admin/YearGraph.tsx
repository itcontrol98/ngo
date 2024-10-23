"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AttendanceChartProps {
  month: string;
  totalAmount: number;
}

const YearGraph: React.FC<{ data: AttendanceChartProps[] }> = ({ data }) => {
  // Step 1: Aggregate data by month
  const monthlyData = data.reduce((acc, item) => {
    // Ensure the month is formatted as "MMMM YYYY" to match your data fetching logic
    const month = new Date(item.month).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Initialize the month entry if it doesn't exist
    if (!acc[month]) {
      acc[month] = { month, totalSales: 0 };
    }
    
    // Aggregate sales
    acc[month].totalSales += item.totalAmount; 

    return acc;
  }, {} as { [key: string]: { month: string; totalSales: number } });

  // Step 2: Prepare the final data for the chart
  const finalData = Object.values(monthlyData).map(item => ({
    month: item.month,
    Sale: item.totalSales / 100, // Divide by 100 if needed (as per your requirement)
  }));

  return (
    <div className="rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">Month Wise Sales</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={finalData} barSize={20}>
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="white" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tick={{ fill: "white" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "white" }} tickLine={true} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "white" }} />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="Sale"
            fill="green"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearGraph;
