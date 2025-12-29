import { useState } from "react";
import Modal from "react-modal";
import "./App.css";

import { ExpenseProvider } from "./context/ExpenseContext";
import WalletBalance from "./components/WalletBalance";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

Modal.setAppElement("#root");

function App() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <ExpenseProvider>
      {/* REQUIRED */}
      <h1>Expense Tracker</h1>

      <div className="top-cards">
        <WalletBalance onAddIncome={() => setShowIncomeModal(true)} />

        <div className="expense-card">
          <h2>Expenses</h2>
          <button type="button" onClick={() => setShowExpenseModal(true)}>
            + Add Expense
          </button>
        </div>
      </div>

      {/* MODALS */}
      <Modal
        isOpen={showIncomeModal}
        onRequestClose={() => setShowIncomeModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Balance</h2>
        <IncomeForm onClose={() => setShowIncomeModal(false)} />
      </Modal>

      <Modal
        isOpen={showExpenseModal}
        onRequestClose={() => setShowExpenseModal(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Expenses</h2>
        <ExpenseForm onClose={() => setShowExpenseModal(false)} />
      </Modal>

      <div className="bottom-section">
        <div className="recent-card">
          <h3>Recent Transactions</h3>
          <ExpenseList />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
