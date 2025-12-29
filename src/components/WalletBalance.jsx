import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function WalletBalance({ onAddIncome }) {
  const { balance } = useContext(ExpenseContext);

  return (
    <div className="wallet-card">
      <h2>Wallet Balance</h2>
      <h2>
        <span>₹{balance.toFixed(2)}</span>
      </h2>

      {/* REQUIRED BY CYPRESS */}
      <button type="button" onClick={onAddIncome} className="add-income-btn">
        + Add Income
      </button>
    </div>
  );
}
