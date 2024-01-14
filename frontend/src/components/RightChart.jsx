import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
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
import { Progress } from "./ui/progress";
// import * as Progress from "@radix-ui/react-progress";

import Stack from "@mui/material/Stack";
import {
  ArrowCircleDownRounded,
  ArrowCircleUpRounded,
} from "@mui/icons-material";

import {
  getAllTransactionsOfUser,
  getAllTransactions,
} from "../apicalls/transactions";
import { getCategories } from "../apicalls/categories";
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
  const [categories, setCategories] = React.useState([]);
  const [categoryAmounts, setCategoryAmounts] = React.useState([]);
  const [totalTransactions, setTotalTransactions] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const getTransactions = async () => {
    try {
      const data = await getAllTransactions();
      const totalTransactions = data.data.length;
      setTotalTransactions(totalTransactions);

      const categories = await getCategories();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const latestTransactions = data.data.slice(0, 4);

      // Calculate total of all transactions
      const totalAmount = data.data.reduce((sum, transaction) => {
        return sum + transaction.amount;
      }, 0);
      setTotalAmount(totalAmount);

      setTransactions(latestTransactions);

      // get categories by amount
      const categoryAmounts = {};
      data.data.forEach((transaction) => {
        if (categoryAmounts[transaction.category]) {
          categoryAmounts[transaction.category] += transaction.amount;
        } else {
          categoryAmounts[transaction.category] = transaction.amount;
        }
      });

      setCategoryAmounts(
        Object.entries(categoryAmounts).sort((a, b) => b[1] - a[1])
        // categoryAmounts
      );

      const categoryCounts = {};
      data.data.forEach((transaction) => {
        if (categoryCounts[transaction.category]) {
          categoryCounts[transaction.category] += 1;
        } else {
          categoryCounts[transaction.category] = 1;
        }
      });

      // Set categories state
      setCategories(Object.entries(categoryCounts));
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  console.log("categoryAmounts: ", categoryAmounts);

  return (
    <>
      <Carousel
        opts={{
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
            <Card className=" light:cardWidget  dark:border-none">
              <CardHeader>
                <CardTitle className="text-slate-700 dark:text-slate-400 text-2xl">
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
                    // backgroundColor: "#fff",
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
            <Card className=" light:cardWidget  dark:border-none ">
              <CardHeader>
                <CardTitle className="text-slate-700 dark:text-slate-400 text-2xl">
                  User Categories
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>Most used categories</span>
                  <span
                    className="flex items-center gap-1 text-primary cursor-pointer"
                    onClick={() => {
                      navigate("/category");
                    }}
                  >
                    <span className="text-sm ">View All</span>
                    <BiChevronRight className="text-lg font-light " />
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    // backgroundColor: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  <div className="flex flex-col gap-3">
                    {categoryAmounts.map(([category, amount]) => {
                      return (
                        <div key={category} className="">
                          <div className="flex justify-between items-center font-light text-sm">
                            <span className="text-gray-600 dark:text-slate-400 ">
                              {category}
                            </span>
                            <span className="text-gray-600 dark:text-slate-400 ">
                              ${amount}
                            </span>
                          </div>
                          <div className="mt-1">
                            <Progress
                              className="bg-slate-200 dark:bg-slate-400 rounded-full w-full h-[5px]"
                              value={Math.min(
                                100,
                                (amount / totalAmount) * 100
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
