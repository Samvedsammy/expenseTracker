import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpensesCard({ onAddExpense }) {
  const { expenses } = useContext(ExpenseContext);

  // ✅ Calculate total expenses from context
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.price),
    0
  );

  return (
    <div className="expense-card">
      <h2>
        Expenses: <span style={{ color: "#ffb74d" }}>₹{totalExpenses}</span>
      </h2>

      {/* Button text MUST match test */}
      <button type="button" onClick={onAddExpense}>
        + Add Expense
      </button>
    </div>
  );
}
