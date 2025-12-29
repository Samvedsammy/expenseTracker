import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function WalletBalance({ onAddIncome }) {
  const { balance } = useContext(ExpenseContext);

  return (
    <div className="wallet-card">
      <h2>Wallet Balance</h2>
      <p>₹{balance.toFixed(2)}</p>

      {/* REQUIRED BY CYPRESS */}
      <button type="button" onClick={onAddIncome}>
        + Add Income
      </button>
    </div>
  );
}
