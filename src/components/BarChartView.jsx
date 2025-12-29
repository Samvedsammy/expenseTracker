import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const COLORS = {
  Food: "#8e44ad",
  Entertainment: "#f39c12",
  Travel: "#f1c40f",
};

export default function BarChartView() {
  const { expenses } = useContext(ExpenseContext);

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

  const data = [
    { name: "Food", value: totals.Food },
    { name: "Entertainment", value: totals.Entertainment },
    { name: "Travel", value: totals.Travel },
  ];

  return (
    <BarChart
      width={340}
      height={240}
      data={data}
      layout="vertical"
      margin={{ right: 20, top: 10, bottom: 10 }}
    >
      {/* X AXIS (NUMBERS) */}
      <XAxis
        type="number"
        tick={{ fontSize: 14, fill: "#333", fontWeight: 600 }}
      />

      {/* Y AXIS (LABELS) */}
      <YAxis
        type="category"
        dataKey="name"
        width={120}
        tick={{ fontSize: 16, fill: "#333", fontWeight: 600 }}
      />

      {/* TOOLTIP */}
      <Tooltip
        contentStyle={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      />

      {/* BARS */}
      <Bar dataKey="value" barSize={20}>
        {data.map((entry) => (
          <Cell key={entry.name} fill={COLORS[entry.name]} />
        ))}
      </Bar>
    </BarChart>
  );
}
