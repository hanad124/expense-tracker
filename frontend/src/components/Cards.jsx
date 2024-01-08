import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  BiSolidCart,
  BiSolidWallet,
  BiCheckDouble,
  BiSolidBank,
  BiFile,
  BiCategory,
} from "react-icons/bi";

const Cards = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 w-full">
      <Card className="flex-1 w-full md:min-w-[12rem] shadow-none ">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-lg tracking-wider text-slate-500 font-normal">
                Income
              </span>
            </CardTitle>
            <CardDescription className="">
              <span className="text-3xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                $15
              </span>
              {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
            </CardDescription>
          </CardHeader>
          <div className="w-12 h-12 bg-green-400/20 rounded-lg mr-6 flex justify-center items-center">
            <BiSolidWallet className="text-green-500 text-2xl" />
          </div>
        </div>
      </Card>
      <Card className="flex-1 w-full md:min-w-[12rem] shadow-none ">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-lg tracking-wider text-slate-500 font-normal">
                Expense
              </span>
            </CardTitle>
            <CardDescription className="">
              <span className="text-3xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                $15
              </span>
              {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
            </CardDescription>
          </CardHeader>
          <div className="w-12 h-12 bg-red-400/20 rounded-lg mr-6 flex justify-center items-center">
            <BiSolidWallet className="text-red-500 text-2xl" />
          </div>
        </div>
      </Card>
      <Card className="flex-1 w-full md:min-w-[12rem] shadow-none ">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-lg tracking-wider text-slate-500 font-normal">
                Total
              </span>
            </CardTitle>
            <CardDescription className="">
              <span className="text-3xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                $15
              </span>
              {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
            </CardDescription>
          </CardHeader>
          <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
            <BiSolidBank className="text-blue-500 text-2xl" />
          </div>
        </div>
      </Card>
      <Card className="flex-1 w-full md:min-w-[12rem] shadow-none ">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>
              <span className="text-lg tracking-wider text-slate-500 font-normal">
                Category
              </span>
            </CardTitle>
            <CardDescription className="">
              <span className="text-3xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                3
              </span>
              {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
            </CardDescription>
          </CardHeader>
          <div className="w-12 h-12 bg-slate-400/20 rounded-lg mr-6 flex justify-center items-center">
            <BiCategory className="text-slate-500 text-2xl" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cards;
