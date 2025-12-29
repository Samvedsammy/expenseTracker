/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import Modal from "react-modal";
import EditExpenseModal from "./EditExpenseModal";

import {
  FaPen,
  FaTimes,
  FaUtensils,
  FaPlane,
  FaFilm,
} from "react-icons/fa";

Modal.setAppElement("#root");

/* CATEGORY → ICON MAP */
const categoryIcons = {
  Food: <FaUtensils />,
  Travel: <FaPlane />,
  Entertainment: <FaFilm />,
};

export default function ExpenseList() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const [editing, setEditing] = useState(null);

  if (!expenses.length) return <p>No transactions</p>;

  return (
    <>
      {expenses.map((e) => (
        <div key={e.id} className="expense-item">

          {/* LEFT SECTION */}
          <div className="expense-left">
            <div className="category-icon">
              {categoryIcons[e.category]}
            </div>

            <div>
              <div className="expense-title">{e.title}</div>
              <div className="expense-date">
                {e.category} • {e.date}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="expense-right">
            <span className="expense-amount">₹{e.price}</span>

            {/* EDIT */}
            <button
              className="icon-btn edit"
              onClick={() => setEditing(e)}
            >
              <FaPen />
            </button>

            {/* DELETE */}
            <button
              className="icon-btn delete"
              onClick={() => deleteExpense(e.id)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editing && (
        <Modal
          isOpen={true}
          onRequestClose={() => setEditing(null)}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Edit Expense</h2>
          <EditExpenseModal
            expense={editing}
            onClose={() => setEditing(null)}
          />
        </Modal>
      )}
    </>
  );
}
