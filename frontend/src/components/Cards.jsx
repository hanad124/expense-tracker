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
import {
  getAllTransactionsOfUser,
  getAllTransactions,
} from "../apicalls/transactions";
import { getCategories } from "../apicalls/categories";

const Cards = () => {
  const [income, setIncome] = React.useState(0);
  const [expense, setExpense] = React.useState(0);
  const [categories, setCategories] = React.useState(0);

  const getIncome = async () => {
    try {
      const data = await getAllTransactions();

      console.log(data.data);

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const income = data.data.reduce((totalIncome, transaction) => {
        if (transaction.type === "income") {
          return totalIncome + transaction.amount;
        }
        return totalIncome;
      }, 0);

      setIncome(income);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  const getExpense = async () => {
    try {
      const data = await getAllTransactions();

      console.log(data.data);

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const expense = data.data.reduce((totalExpense, transaction) => {
        if (transaction.type === "expense") {
          return totalExpense + transaction.amount;
        }
        return totalExpense;
      }, 0);

      setExpense(expense);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  // get categories as count
  const getCategoriesCount = async () => {
    try {
      const data = await getCategories();

      if (data.data.error) {
        console.error(data.data.error);
        return;
      }

      const categories = data.data.length;

      setCategories(categories);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  React.useEffect(() => {
    getIncome();
    getExpense();
    getCategoriesCount();
  }, []);

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
                ${income}
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
                ${expense}
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
                Balance
              </span>
            </CardTitle>
            <CardDescription className="">
              <span className="text-3xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                {income > expense ? (
                  <span className="">${income - expense}</span>
                ) : (
                  <span className="text-red-500">- ${expense - income}</span>
                )}
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
                {categories}
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
