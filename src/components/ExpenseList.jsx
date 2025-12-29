import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import {
  FaUtensils,
  FaPlane,
  FaFilm,
  FaTimes,
  FaPen,
} from "react-icons/fa";

const categoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <FaUtensils />;
    case "Travel":
      return <FaPlane />;
    case "Entertainment":
      return <FaFilm />;
    default:
      return null;
  }
};

export default function ExpenseList() {
  const { expenses, deleteExpense, addExpense } =
    useContext(ExpenseContext);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
  });

  const startEdit = (exp) => {
    setEditId(exp.id);
    setEditForm({
      title: exp.title,
      price: exp.price,
    });
  };

  const saveEdit = (exp) => {
    deleteExpense(exp.id);

    addExpense({
      ...exp,
      title: editForm.title,
      price: Number(editForm.price),
    });

    setEditId(null);
  };

  if (expenses.length === 0) {
    return <p>No transactions!</p>;
  }

  return (
    <>
      {expenses.map((exp) => (
        <div className="expense-item" key={exp.id}>
          {/* LEFT */}
          <div className="expense-left">
            <div className="category-icon">
              {categoryIcon(exp.category)}
            </div>

            {editId === exp.id ? (
              <div>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                />
              </div>
            ) : (
              <div>
                <div className="expense-title">{exp.title}</div>
                <div className="expense-date">{exp.date}</div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="expense-right">
            <div className="expense-amount">₹{exp.price}</div>

            {editId === exp.id ? (
              <button
                className="icon-btn edit"
                onClick={() => saveEdit(exp)}
              >
                Save
              </button>
            ) : (
              <>
                {/* ❌ DELETE */}
                <button
                  className="icon-btn delete"
                  onClick={() => deleteExpense(exp.id)}
                >
                  <FaTimes />
                </button>

                {/* ✏️ EDIT */}
                <button
                  className="icon-btn edit"
                  onClick={() => startEdit(exp)}
                >
                  <FaPen />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
