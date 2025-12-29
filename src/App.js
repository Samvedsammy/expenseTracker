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

function App() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <ExpenseProvider>
      {/* ✅ ONLY ONE h1 */}
      <h1>Expense Tracker</h1>

      {/* ===== TOP CARDS ===== */}
      <div className="top-cards">
        <WalletBalance onAddIncome={() => setShowIncomeModal(true)} />

        <ExpensesCard onAddExpense={() => setShowExpenseModal(true)} />

        <div className="pie-card">
          <PieChartView />
        </div>
      </div>

      {/* ===== MODALS ===== */}

      {/* Add Balance Modal */}
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

      {/* ===== BOTTOM SECTION ===== */}
      <div className="bottom-section">
        <div className="recent-card">
          <h3>Recent Transactions</h3>
          <ExpenseList />
        </div>

        <div className="top-expense-card">
          <h3>Top Expenses</h3>
          <BarChartView />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
