import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? Number(saved) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const addIncome = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const addExpense = (expense) => {
    if (expense.price > balance) return false;
    setExpenses((prev) => [...prev, expense]);
    setBalance((prev) => prev - expense.price);
    return true;
  };

  const deleteExpense = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (!exp) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setBalance((prev) => prev + exp.price);
  };

  return (
    <ExpenseContext.Provider
      value={{ balance, expenses, addIncome, addExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
