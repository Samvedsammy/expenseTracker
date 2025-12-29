import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpensesCard({ onAddExpense }) {
  const { totalExpenses } = useContext(ExpenseContext);

  return (
    <div className="expense-card">
      <h2>
        Expenses:
        <br />
        <span style={{ color: "#ffb74d" }}>₹{totalExpenses}</span>
      </h2>

      {/* TEXT MUST MATCH TEST */}
      <button type="button" onClick={onAddExpense}>
        + Add Expense
      </button>
    </div>
  );
}
