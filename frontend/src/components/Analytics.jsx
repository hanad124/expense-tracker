import { Progress } from "antd";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getCategories } from "../apicalls/categories";

function Analytics({ transactions }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await getCategories();
        console.log(response);
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    getCategoriesData();
  }, []);

  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;
  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;
  // const categories = [
  //   "salary",
  //   "freelance",
  //   "food",
  //   "entertainment",
  //   "medical",
  //   "education",
  //   "investment",
  //   "travel",
  //   "shopping",
  //   "tax",
  // ];
  return (
    <Container className="mt-4" fluid={true}>
      <p className="text-slate-700 uppercase tracking-widest text-2xl font-bold">
        Analytics 📊
      </p>
      <div className="">
        <div className="flex gap-x-10 flex-col md:flex-row">
          <div className=" flex-1">
            <div className="mb-5 border rounded p-4">
              <div>
                <p className="border-b pb-2 mb-5 text-slate-700  text-xl">
                  Total Transactions :{" "}
                  <span className="font-bold">{totalTransactions}</span>
                </p>
                <div className="d-flex justify-content-around gap-3">
                  <p className=" text-slate-700 ">
                    Income : {totalIncomeTransactions.length}
                  </p>
                  <p className=" text-slate-700 ">
                    Expense : {totalExpenseTransactions.length}
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 justify-content-around">
                <Progress
                  type="circle"
                  strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                  percent={totalIncomeTransactionsPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={{ "0%": "#ff6600", "100%": "#ff0000" }}
                  percent={totalExpenseTransactionsPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
          <div className=" flex-1">
            <div className="mb-5 border rounded p-4">
              <div>
                <p className="border-b pb-2 mb-5 text-slate-700 text-xl ">
                  Total Turnover :{" "}
                  <span className="font-bold">${totalTurnover}</span>
                </p>
                <div className="d-flex justify-content-around gap-3">
                  <p className=" text-slate-700 ">
                    Income : {totalIncomeTurnover}
                  </p>
                  <p className=" text-slate-700 ">
                    Expense : {totalExpenseTurnover}
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 justify-content-around">
                <Progress
                  type="circle"
                  strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                  percent={totalIncomeTurnoverPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={{ "0%": "#ff6600", "100%": "#ff0000" }}
                  percent={totalExpenseTurnoverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-x-10 flex-col md:flex-row">
          <div className="flex-1">
            <div className="mb-5 border rounded p-4">
              <div>
                <p className="border-b pb-2 text-xl text-slate-700 ">
                  Income - Category Wise
                </p>
                {totalIncomeTransactions.length === 0 && (
                  <div className=" border-bottom p-3">
                    <p className="text-sm text-center  text-slate-700 ">
                      No Category Transactions To Display
                    </p>
                  </div>
                )}
                {categories.map((category) => {
                  console.log(category);
                  const amount = transactions
                    .filter(
                      (transaction) =>
                        transaction.type === "income" &&
                        transaction.category === category.name
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  if (amount) {
                    return (
                      <div className=" border-bottom p-3">
                        <h5>{category.name}</h5>
                        <Progress
                          percent={(
                            (amount / totalIncomeTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-5 border  rounded p-4">
              <div>
                <p className="border-b pb-2 text-xl text-slate-700 ">
                  Expense - Category Wise
                </p>
                {totalExpenseTransactions.length === 0 && (
                  <div className=" border-bottom p-3">
                    <p className=" text-slate-700 text-sm text-center">
                      No Category Transactions To Display
                    </p>
                  </div>
                )}

                {categories.map((category) => {
                  const amount = transactions
                    .filter(
                      (transaction) =>
                        transaction.type === "expense" &&
                        transaction.category === category.name
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  if (amount) {
                    return (
                      <div className=" border-bottom p-3" key={category._id}>
                        <h5>{category.name}</h5>
                        <Progress
                          percent={(
                            (amount / totalExpenseTurnover) *
                            100
                          ).toFixed(0)}
                          status="exception"
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Analytics;
