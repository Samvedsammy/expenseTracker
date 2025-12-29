import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function BarChartView() {
  const { expenses } = useContext(ExpenseContext);

  // Aggregate expenses by category
  const totals = {
    Food: 0,
    Entertainment: 0,
    Travel: 0,
  };

  expenses.forEach((e) => {
    if (totals[e.category] !== undefined) {
      totals[e.category] += Number(e.price);
    }
  });

  // Fixed order
  const data = [
    { category: "Food", amount: totals.Food },
    { category: "Entertainment", amount: totals.Entertainment },
    { category: "Travel", amount: totals.Travel },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical">
        {/* Horizontal values */}
        <XAxis type="number" />

        {/* Categories on left */}
        <YAxis type="category" dataKey="category" />

        <Tooltip />

        <Bar dataKey="amount" fill="#42a5f5" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
