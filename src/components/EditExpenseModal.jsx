import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function EditExpenseModal({ expense, onClose }) {
  const { updateExpense } = useContext(ExpenseContext);
  const [form, setForm] = useState({ ...expense });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateExpense({
      ...form,
      price: Number(form.price), // 🔥 REQUIRED
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <button type="submit">Update Expense</button>
    </form>
  );
}
