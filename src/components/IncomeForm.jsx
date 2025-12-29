/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function IncomeForm({ onClose }) {
    const { addIncome } = useContext(ExpenseContext);
  const [amount, setAmount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(Number(amount));
    setAmount("");
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Income Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Add Balance</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}
