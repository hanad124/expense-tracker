import { ApexOptions } from "apexcharts";
import { getAllTransactions } from "../apicalls/transactions";

export const generateRevenueSeries = async () => {
  const lastMonthData = [];
  const runningMonthData = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const transactions = await getAllTransactions();
  const currentDate = new Date();

  transactions.data.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthIndex = transactionDate.getMonth();

    if (currentDate.getMonth() === monthIndex) {
      runningMonthData[monthIndex] =
        (runningMonthData[monthIndex] || 0) + transaction.amount;
    }

    lastMonthData[monthIndex] =
      (lastMonthData[monthIndex] || 0) + transaction.amount;
  });

  const totalRevenueSeries = [
    {
      name: "Last Month",
      data: lastMonthData,
    },
    {
      name: "Running Month",
      data: runningMonthData,
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
  };

  return totalRevenueOptions;
};
