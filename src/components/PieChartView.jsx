import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const COLORS = {
  Food: "#8e44ad",          // Purple
  Entertainment: "#f39c12", // Orange
  Travel: "#f1c40f",        // Yellow
};

// Solid pie label renderer
const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  value,
}) => {
  const radius =
    value === 0
      ? outerRadius + 14
      : outerRadius - 30;

  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

export default function PieChartView() {
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

  // FIXED ORDER
  const data = [
    { name: "Food", value: totals.Food },
    { name: "Entertainment", value: totals.Entertainment },
    { name: "Travel", value: totals.Travel },
  ];

  return (
    <PieChart width={260} height={260}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"          // 🔥 center pie vertically
        outerRadius={90}
        labelLine={false}
        label={renderLabel}
      >
        {data.map((entry) => (
          <Cell key={entry.name} fill={COLORS[entry.name]} />
        ))}
      </Pie>

      <Tooltip />

      {/* 🔥 LEGEND: EXACTLY BELOW PIE */}
      <Legend
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        iconType="square"
        wrapperStyle={{
          marginTop: -10,     // 🔥 removes gap
          whiteSpace: "nowrap",
        }}
      />
    </PieChart>
  );
}
