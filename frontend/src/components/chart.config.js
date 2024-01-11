import { ApexOptions } from "apexcharts";
import { getAllTransactions } from "../apicalls/transactions";
import { getCategories } from "../apicalls/categories";

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
  };

  return totalRevenueOptions;
};

export const generatePieChartRevenueSeries = async () => {
  try {
    const categoryData = [];
    const transactions = await getAllTransactions();

    transactions.data.forEach((transaction) => {
      const category = transaction.category;

      if (category) {
        const index = categoryData.findIndex((item) => item.name === category);
        if (index !== -1) {
          categoryData[index].data += transaction.amount;
        } else {
          categoryData.push({ name: category, data: transaction.amount });
        }
      }
    });

    return categoryData;
  } catch (error) {
    console.error("Error generating revenue series:", error);
    return [];
  }
};

// pie chart
export const generatePieChart = async () => {
  const seriesData = await generatePieChartRevenueSeries();

  const pieChartOptions = {
    series: seriesData.map((item) => item.data),
    chart: {
      width: 380,
      type: "pie",
    },
    labels: seriesData.map((item) => item.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return pieChartOptions;
};

// ====================== CATEGORY BASES =====================

// import { ApexOptions } from "apexcharts";
// import { getAllTransactions } from "../apicalls/transactions";
// import { getCategories } from "../apicalls/categories";

// export const generateRevenueSeries = async () => {
//   const categoryData = {};

//   const transactions = await getAllTransactions();

//   transactions.data.forEach((transaction) => {
//     const category = transaction.category;

//     if (!categoryData[category]) {
//       categoryData[category] = [];
//     }

//     const transactionDate = new Date(transaction.date);
//     const monthIndex = transactionDate.getMonth();

//     categoryData[category][monthIndex] =
//       (categoryData[category][monthIndex] || 0) + transaction.amount;
//   });

//   const totalRevenueSeries = Object.keys(categoryData).map((category) => {
//     return {
//       name: category,
//       data: categoryData[category],
//     };
//   });

//   return totalRevenueSeries;
// };

// export const generateRevenueOptions = async () => {
//   const categories = await getCategories(); // Assuming you have a function to get categories from the API

//   const totalRevenueOptions = {
//     chart: {
//       type: "bar",
//       toolbar: {
//         show: false,
//       },
//     },
//     colors: ["#475BE8", "#CFC8FF", "#FFD700", "#00FF00", "#FF4500"], // Add more colors as needed
//     plotOptions: {
//       bar: {
//         borderRadius: 10,
//         horizontal: false,
//         columnWidth: "75%",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     grid: {
//       show: false,
//     },
//     stroke: {
//       colors: ["transparent"],
//       width: 4,
//     },
//     xaxis: {
//       categories: categories.data.map((category) => category.name), // Use category names for the x-axis
//     },
//     yaxis: {
//       title: {
//         text: "$ (thousands)",
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "right",
//     },
//     tooltip: {
//       y: {
//         formatter(val) {
//           return `$ ${val} ${val > 1 ? "thousands" : "thousand"}`;
//         },
//       },
//     },
//     series: [], // Empty series array to store income and expense data for each category
//   };

//   const totalRevenueSeries = await generateRevenueSeries(); // Assuming you have a function to generate revenue series

//   totalRevenueSeries.forEach((categorySeries) => {
//     const incomeData = {
//       name: `Income (${categorySeries.name})`,
//       data: categorySeries.data.map((value) => (value > 0 ? value : 0)), // Set negative values to 0 for income data
//     };

//     const expenseData = {
//       name: `Expense (${categorySeries.name})`,
//       data: categorySeries.data.map((value) => (value < 0 ? -value : 0)), // Set positive values to 0 for expense data
//     };

//     totalRevenueOptions.series.push(incomeData, expenseData);
//   });

//   return totalRevenueOptions;
// };

// ====================== MONTHLY BASES =====================

// import { ApexOptions } from "apexcharts";
// import { getAllTransactions } from "../apicalls/transactions";
// import { getCategories } from "../apicalls/categories";

// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
// export const generateRevenueSeries = async () => {
//   const monthData = {};
//   const transactions = await getAllTransactions();

//   if (!transactions || !transactions.data) {
//     return []; // Return an empty array or handle the error appropriately
//   }

//   transactions.data.forEach((transaction) => {
//     const transactionDate = new Date(transaction.date);
//     const monthIndex = transactionDate.getMonth();

//     if (!monthData[monthIndex]) {
//       monthData[monthIndex] = [];
//     }

//     monthData[monthIndex].push({
//       name: transaction.type,
//       y: transaction.amount,
//       category: transaction.category,
//     });
//   });

//   const totalRevenueSeries = Object.keys(monthData).map((month) => {
//     return {
//       name: months[month], // Make sure 'months' array is defined
//       data: monthData[month],
//     };
//   });

//   return totalRevenueSeries;
// };

// export const generateRevenueOptions = async () => {
//   const categories = await getCategories();

//   if (!categories || !categories.data) {
//     return {}; // Return an empty object or handle the error appropriately
//   }

//   const totalRevenueOptions = {
//     chart: {
//       type: "bar",
//       toolbar: {
//         show: false,
//       },
//     },
//     colors: ["#475BE8", "#CFC8FF"],
//     plotOptions: {
//       bar: {
//         borderRadius: 4,
//         horizontal: false,
//         columnWidth: "55%",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     grid: {
//       show: false,
//     },
//     stroke: {
//       colors: ["transparent"],
//       width: 4,
//     },
//     xaxis: {
//       categories: [], // Will be dynamically set based on unique transaction months
//     },
//     yaxis: {
//       title: {
//         text: "$ (thousands)",
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "right",
//     },
//     tooltip: {
//       y: {
//         formatter(val) {
//           return `$ ${val} ${val > 1 ? "thousands" : "thousand"}`;
//         },
//       },
//     },
//   };

//   return totalRevenueOptions;
// };
