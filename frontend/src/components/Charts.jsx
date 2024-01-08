import React from "react";
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
  ArrowCircleDownRounded,
  ArrowCircleUpRounded,
} from "@mui/icons-material";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

import {
  getAllTransactionsOfUser,
  getAllTransactions,
} from "../apicalls/transactions";

const ApexChart = () => {
  const [transactions, setTransactions] = React.useState([]);

  const getTransactions = async () => {
    try {
      const data = await getAllTransactions();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }
      const latestTransactions = data.data.slice(0, 3);

      setTransactions(latestTransactions);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="flex flex-col md:flex-row mt-10 gap-4">
      <Card className=" rounded-[15px] p-4 flex flex-col shadow-none w-full">
        <Typography
          fontSize={18}
          fontWeight={600}
          // color="#11142d"
          className="dark:text-slate-200 text-slate-700"
        >
          Total Badget
        </Typography>

        <Stack my="10px" direction="row" gap={4} flexWrap="wrap">
          <Typography
            fontSize={28}
            fontWeight={700}
            // color="#11142d"
            className="dark:text-slate-200 text-slate-700"
          >
            $4,805
          </Typography>
        </Stack>

        <ReactApexChart
          series={TotalRevenueSeries}
          type="bar"
          height={310}
          options={TotalRevenueOptions}
        />
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Recent History</CardTitle>
          <CardDescription>Overview of recent transections</CardDescription>
        </CardHeader>
        <CardContent>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "15px",
            }}
          >
            {transactions.map((transaction) => (
              <div
                className="flex items-center justify-between py-2"
                key={transaction._id}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-[15px] ${
                      transaction.type === "income"
                        ? "bg-green-400/20"
                        : "bg-red-400/20"
                    }
                  }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowCircleUpRounded className="text-green-500 text-2xl" />
                    ) : (
                      <ArrowCircleDownRounded className="text-red-500 text-2xl" />
                    )}
                  </div>
                  <div className="ml-4">
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      // color="#11142d"
                      className="dark:text-slate-200 text-slate-700"
                    >
                      {transaction.title}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight={400}
                      // color="#11142d"
                      className={`dark:text-slate-200 text-slate-700`}
                    >
                      <span className={`mr-1 font-medium text-lg`}>
                        {" "}
                        {transaction.description}
                      </span>
                      |
                      <span className="ml-1 text-sm">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center">
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    // color="#11142d"
                    className="dark:text-slate-200 text-slate-700"
                  >
                    <span
                      className={`${
                        transaction.type === "income" ? "" : "text-red-500"
                      }`}
                    >
                      {" "}
                      {transaction.type === "income" ? (
                        <span className=" text-lg font-medium">
                          ${transaction.amount}
                        </span>
                      ) : (
                        <span className="text-red-500 text-lg font-medium">
                          - ${transaction.amount}
                        </span>
                      )}
                    </span>
                  </Typography>
                </div>
              </div>
            ))}
          </Box>
        </CardContent>
        {/* <CardFooter>
          <CardDescription>Updated 2 days ago</CardDescription>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default ApexChart;
