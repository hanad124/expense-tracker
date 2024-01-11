import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
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
  ArrowCircleDownRounded,
  ArrowCircleUpRounded,
} from "@mui/icons-material";

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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const RightChart = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState([]);

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

      setTransactions(latestTransactions);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  React.useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
      <Carousel
        opts={{
          //   align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="min-w-fit-content">
          <CarouselItem>
            <Card className=" cardWidget">
              <CardHeader>
                <CardTitle className="text-slate-700 text-2xl">
                  Latest Transaction
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>Overview of recent transaction</span>
                  <span
                    className="flex items-center gap-1 text-primary cursor-pointer"
                    onClick={() => {
                      navigate("/transaction");
                    }}
                  >
                    <span className="text-sm ">View All</span>
                    <BiChevronRight className="text-lg font-light " />
                  </span>
                </CardDescription>
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
                      className={`flex items-center justify-between py-3 ${
                        transactions.length === 1
                          ? ""
                          : "border-b border-dashed "
                      }`}
                      key={transaction._id}
                    >
                      <div className="flex items-center justify-between ">
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
                            fontSize={12}
                            fontWeight={400}
                            // color="#11142d"
                            className={`dark:text-slate-200 text-slate-700 flex flex-col`}
                          >
                            <span className={` font-medium text-[14px]`}>
                              {" "}
                              {transaction.description.slice(0, 15) +
                                (transaction.description.length > 15
                                  ? " ..."
                                  : "")}
                            </span>
                            <span className=" text-sm font-light text-slate-500">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString("en-US", {
                                // weekday: "long",
                                month: "long",
                                year: "numeric",
                                day: "numeric",
                              })}
                            </span>
                          </Typography>
                        </div>
                      </div>
                      <div className="">
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          // color="#11142d"
                          className="dark:text-slate-200 font-light text-sm  text-slate-700"
                        >
                          <span className="font-normal text-left">
                            {transaction.category}
                          </span>
                        </Typography>
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
                              transaction.type === "income"
                                ? "text-green-500"
                                : "text-red-500"
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
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className=" cardWidget w-full">
              <CardHeader>
                <CardTitle className="text-slate-700 text-2xl">
                  Latest Transaction
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>Overview of recent transaction</span>
                  <span
                    className="flex items-center gap-1 text-primary cursor-pointer"
                    onClick={() => {
                      navigate("/transaction");
                    }}
                  >
                    <span className="text-sm ">View All</span>
                    <BiChevronRight className="text-lg font-light " />
                  </span>
                </CardDescription>
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
                  {/* {transactions.map((transaction) => (
                    <div
                      className={`flex items-center justify-between py-3 ${
                        transactions.length === 1
                          ? ""
                          : "border-b border-dashed "
                      }`}
                      key={transaction._id}
                    >
                      <div className="flex items-center justify-between ">
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
                            fontSize={12}
                            fontWeight={400}
                            // color="#11142d"
                            className={`dark:text-slate-200 text-slate-700 flex flex-col`}
                          >
                            <span className={` font-medium text-[14px]`}>
                              {" "}
                              {transaction.description.slice(0, 15) +
                                (transaction.description.length > 15
                                  ? " ..."
                                  : "")}
                            </span>
                            <span className=" text-sm font-light text-slate-500">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString("en-US", {
                                // weekday: "long",
                                month: "long",
                                year: "numeric",
                                day: "numeric",
                              })}
                            </span>
                          </Typography>
                        </div>
                      </div>
                      <div className="">
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          // color="#11142d"
                          className="dark:text-slate-200 font-light text-sm  text-slate-700"
                        >
                          <span className="font-normal text-left">
                            {transaction.category}
                          </span>
                        </Typography>
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
                              transaction.type === "income"
                                ? "text-green-500"
                                : "text-red-500"
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
                  ))} */}
                </Box>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default RightChart;
