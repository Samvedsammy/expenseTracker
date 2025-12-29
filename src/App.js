import { useState } from "react";
import Modal from "react-modal";
import "./App.css";

import { ExpenseProvider } from "./context/ExpenseContext";
import WalletBalance from "./components/WalletBalance";
import ExpensesCard from "./components/ExpensesCard";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import PieChartView from "./components/PieChartView";
import BarChartView from "./components/BarChartView";

Modal.setAppElement("#root");

export default function App() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <ExpenseProvider>
      {/* ✅ REQUIRED: ONLY ONE h1 */}
      <h1>Expense Tracker</h1>

      {/* ================= TOP SECTION ================= */}
      <div className="top-cards">
        {/* Wallet */}
        <WalletBalance onAddIncome={() => setShowIncomeModal(true)} />

        {/* Expenses */}
        <ExpensesCard onAddExpense={() => setShowExpenseModal(true)} />

        {/* Pie Chart */}
        <div className="pie-card">
          <PieChartView />
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* Add Income Modal */}
      <Modal
        isOpen={showIncomeModal}
        onRequestClose={() => setShowIncomeModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Balance</h2>
        <IncomeForm onClose={() => setShowIncomeModal(false)} />
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onRequestClose={() => setShowExpenseModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Expenses</h2>
        <ExpenseForm onClose={() => setShowExpenseModal(false)} />
      </Modal>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="bottom-section">

        {/* LEFT: RECENT TRANSACTIONS */}
        <div>
          <h3>Recent Transactions</h3>
          <div className="recent-card">
            <ExpenseList />
          </div>
        </div>

        {/* RIGHT: TOP EXPENSES */}
        <div>
          <h3>Top Expenses</h3>
          <div className="top-expense-card">
            <BarChartView />
          </div>
        </div>

      </div>
    </ExpenseProvider>
  );
}
