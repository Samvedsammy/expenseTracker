import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseForm({ onClose }) {
  const { addExpense } = useContext(ExpenseContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = addExpense({
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      date: form.date,
    });

    if (success) {
      setForm({ title: "", price: "", category: "", date: "" });
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ TITLE */}
      <input
        name="title"
        placeholder="Expense Title"
        value={form.title}
        onChange={handleChange}
        data-testid="expense-title-input"
      />

      {/* ✅ PRICE */}
      <input
        name="price"
        type="number"
        placeholder="Expense Amount"
        value={form.price}
        onChange={handleChange}
        data-testid="expense-price-input"
      />

      {/* ✅ CATEGORY */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        data-testid="expense-category-select"
      >
        <option value="">Select</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      {/* ✅ DATE */}
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        data-testid="expense-date-input"
      />

      {/* ✅ SUBMIT */}
      <button
        type="submit"
        data-testid="add-expense-btn"
      >
        Add Expense
      </button>
    </form>
  );
}
