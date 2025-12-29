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
      setForm({
        title: "",
        price: "",
        category: "",
        date: "",
      });

      // 🔥 CLOSE MODAL AFTER SUCCESS
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Expense Title */}
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* Expense Price */}
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Travel">Travel</option>
      </select>

      {/* Expense Date */}
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      {/* Buttons */}
      <button type="submit">Add Expense</button>

      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
