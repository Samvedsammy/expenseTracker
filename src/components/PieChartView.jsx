import { PieChart, Pie, Cell, Legend } from "recharts";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const COLORS = {
  Food: "#8e44ad",
  Entertainment: "#f39c12",
  Travel: "#f1c40f",
};

export default function PieChartView() {
  const { expenses } = useContext(ExpenseContext);

  const totals = { Food: 0, Entertainment: 0, Travel: 0 };

  expenses.forEach((e) => {
    totals[e.category] += Number(e.price || 0);
  });

  const data = [
    { name: "Food", value: totals.Food },
    { name: "Entertainment", value: totals.Entertainment },
    { name: "Travel", value: totals.Travel },
  ];

  return (
    <PieChart width={220} height={220}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={80}
        labelLine={false}
      >
        {data.map((d) => (
          <Cell key={d.name} fill={COLORS[d.name]} />
        ))}
      </Pie>
      <Legend
  layout="horizontal"
  verticalAlign="bottom"
  align="center"
  iconType="square"
  wrapperStyle={{
    fontSize: "12px",      // 🔥 REDUCED FONT SIZE
    fontWeight: 600,
    whiteSpace: "nowrap",  // 🔥 FORCE SINGLE LINE
    marginTop: -8,         // 🔥 REDUCE GAP
  }}
/>

    </PieChart>
  );
}
