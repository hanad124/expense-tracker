import { ApexOptions } from "apexcharts";
import { getAllTransactions } from "../apicalls/transactions";

export const generateRevenueSeries = async () => {
  const incomeData = [];
  let totalExpense = 0;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const transactions = await getAllTransactions();

  transactions.data.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthIndex = transactionDate.getMonth();

    if (transaction.type === "income") {
      incomeData[monthIndex] =
        (incomeData[monthIndex] || 0) + transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpense += transaction.amount;
    }
  });

  const expenseData = Array(incomeData.length).fill(totalExpense);

  const totalRevenueSeries = [
    {
      name: "income",
      data: incomeData,
    },
    {
      name: "expense",
      data: expenseData,
    },
  ];

  return totalRevenueSeries;
};

export const generateRevenueOptions = () => {
  const totalRevenueOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
      width: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} ${val > 1 ? "thousands" : "thousand"}`;
        },
      },
    },
    // title: {
    //   text: "Monthly Income and Expense",
    //   align: "center",
    // },
    // subtitle: {
    //   text: "Values are in thousands",
    //   align: "center",
    // },
  };

  return totalRevenueOptions;
};
