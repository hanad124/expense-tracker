import { ApexOptions } from "apexcharts";
import { getAllTransactions } from "../apicalls/transactions";
import { getCategories } from "../apicalls/categories";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export const generateCategorySeries = async () => {
  const transactions = await getAllTransactions();
  const categories = await getCategories();

  const categoryData = [];

  categories.data.forEach((category) => {
    const categoryTransactions = transactions.data.filter(
      (transaction) => transaction.categoryId === category.id
    );

    const totalAmount = categoryTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    categoryData.push({
      category: category.name,
      amount: totalAmount,
    });
  });

  return categoryData;
};

export const generateCategoryOptions = () => {
  const totalCategoryOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    colors: ["#475BE8", "#CFC8FF", "#FFA500", "#00CED1"], // Add more colors if needed
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `$ ${val}`;
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val}`;
        },
      },
    },
  };

  return totalCategoryOptions;
};

const CategoryChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const seriesData = await generateCategorySeries();
      setChartData(seriesData);
    }

    fetchData();
  }, []);

  const chartOptions = generateCategoryOptions();

  return (
    <div>
      {chartData.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="pie"
          height={350}
        />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default CategoryChart;
