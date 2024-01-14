import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Stack from "@mui/material/Stack";

import {
  generateRevenueOptions,
  generateRevenueSeries,
  generatePieChart,
} from "./chart.config";

import {
  getAllTransactionsOfUser,
  getAllTransactions,
} from "../apicalls/transactions";
import { BiDollarCircle, BiChevronRight } from "react-icons/bi";
import RightChart from "./RightChart";

const ApexChart = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seriesData = await generateRevenueSeries();
        const optionsData = generateRevenueOptions();

        setSeries(seriesData);
        setOptions(optionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTransactions = async () => {
    try {
      const data = await getAllTransactions();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }
      const latestTransactions = data.data.slice(0, 4);

      // calculate total of all transactions
      const totalAmount = data.data.reduce((sum, transaction) => {
        return sum + transaction.amount;
      }, 0);

      setTotalAmount(totalAmount);

      setTransactions(latestTransactions);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mt-6 gap-2">
      <Card className="light:cardWidget  dark:border-none  rounded-[15px] p-4 flex flex-col w-full md:max-w-[54%]">
        <Typography
          fontSize={18}
          fontWeight={600}
          // color="#11142d"
          className="dark:text-slate-200 text-slate-700 flex items-center"
        >
          <span className="text-sm font-medium">Total Badget</span>
          <BiDollarCircle className="text-lg font-light ml-2 text-slate-500 " />
        </Typography>

        <Stack my="10px" direction="row" gap={4} flexWrap="wrap">
          <Typography
            fontSize={28}
            fontWeight={700}
            // color="#11142d"
            className="dark:text-slate-200 text-slate-700 font-medium"
          >
            <span className="font-medium">${totalAmount}</span>
          </Typography>
        </Stack>

        {/* <ReactApexChart
          options={pieChartOptions}
          series={pieChartOptions.series}
          type="pie"
          width={380}
        /> */}
        <ReactApexChart
          series={series}
          type="bar"
          height={310}
          options={options}
        />
        {/*  <PieChart />*/}
        {/* <CategoryChart /> */}
      </Card>
      <RightChart />
    </div>
  );
};

export default ApexChart;
