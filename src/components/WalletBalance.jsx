import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function WalletBalance({ onAddIncome }) {
  const { balance } = useContext(ExpenseContext);

  return (
    <div className="wallet-card">
      <h2>
        Wallet Balance: <span>₹{balance.toFixed(2)}</span>
      </h2>

      <button className="add-income-btn" onClick={onAddIncome}>
        + Add Income
      </button>
    </div>
  );
}
