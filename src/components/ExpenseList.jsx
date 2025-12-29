import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseList() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  if (!expenses.length) return <p>No transactions!</p>;

  return (
    <>
      {expenses.map((e) => (
        <div key={e.id} className="expense-item">
          <span>
            {e.title} - ₹{e.price}
          </span>
          <button onClick={() => deleteExpense(e.id)}>X</button>
        </div>
      ))}
    </>
  );
}
