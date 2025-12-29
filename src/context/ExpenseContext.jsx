import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

const DEFAULT_BALANCE = 5000;

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? Number(saved) : DEFAULT_BALANCE;
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", balance);
  }, [expenses, balance]);

  // ✅ STEP 1: TOTAL EXPENSES (THIS WAS MISSING)
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.price),
    0
  );

  const addIncome = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const addExpense = (expense) => {
    if (expense.price > balance) {
      alert("Insufficient wallet balance");
      return false;
    }

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
      value={{
        expenses,
        balance,
        totalExpenses, // ✅ NOW AVAILABLE EVERYWHERE
        addIncome,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
