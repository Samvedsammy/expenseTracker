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

  // ✅ TOTAL EXPENSES (THIS WAS MISSING)
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.price),
    0
  );

  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const addIncome = (amount) => {
    setBalance((b) => b + Number(amount));
  };

  const addExpense = (expense) => {
    const price = Number(expense.price);
    if (price > balance) return false;

    setExpenses((prev) => [...prev, { ...expense, price }]);
    setBalance((b) => b - price);
    return true;
  };

  const deleteExpense = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (!exp) return;

    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setBalance((b) => b + exp.price);
  };

  const updateExpense = (updated) => {
    const newPrice = Number(updated.price);
    let oldPrice = 0;

    setExpenses((prev) =>
      prev.map((e) => {
        if (e.id === updated.id) {
          oldPrice = e.price;
          return { ...updated, price: newPrice };
        }
        return e;
      })
    );

    setBalance((b) => b + oldPrice - newPrice);
  };

  return (
    <ExpenseContext.Provider
      value={{
        balance,
        expenses,
        totalExpenses, // ✅ EXPOSED
        addIncome,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
