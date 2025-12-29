import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function IncomeForm({ onClose }) {
  const { addIncome } = useContext(ExpenseContext);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return;

    addIncome(Number(amount));
    setAmount("");
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ REAL INPUT ONLY */}
      <input
        type="number"
        placeholder="Income Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        data-testid="income-input"
      />

      {/* ✅ REAL BUTTON ONLY */}
      <button
        type="submit"
        data-testid="add-income-btn"
      >
        Add Balance
      </button>
    </form>
  );
}
