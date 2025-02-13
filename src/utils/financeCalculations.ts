import { Transaction } from "../types";
import { Balance } from "../types/index";

export function financeCalculations(transactions: Transaction[]): Balance {
  // acc : 累積値
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else if (transaction.type === "expense") {
        acc.expense += transaction.amount;
      }

      acc.balance = acc.income - acc.expense;
      return acc;
    },
    {
      income: 0,
      expense: 0,
      balance: 0,
    }
  ); // <- 累積値の初期値を設定
}
