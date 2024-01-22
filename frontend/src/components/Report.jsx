import React, { useState, useEffect } from "react";
import { Table, message, Select, DatePicker } from "antd";
import moment from "moment";

import logo from "../assets/header-icon.png";

const Report = React.forwardRef((props, ref) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const transactionsData = props.transactionsData;

  const dates = transactionsData.map((obj) => new Date(obj.date));

  // calculate total income
  useEffect(() => {
    const totalIncome = transactionsData
      .filter((obj) => obj.type === "income")
      .reduce((acc, obj) => acc + obj.amount, 0);
    setTotalIncome(totalIncome);
  }, [transactionsData]);

  // calculate total expense
  useEffect(() => {
    const totalExpense = transactionsData
      .filter((obj) => obj.type === "expense")
      .reduce((acc, obj) => acc + obj.amount, 0);
    setTotalExpense(totalExpense);
  }, [transactionsData]);

  // calculate total balance
  useEffect(() => {
    const totalBalance = totalIncome - totalExpense;
    setTotalBalance(totalBalance);
  }, [totalIncome, totalExpense]);

  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date(Math.max(...dates));

  const oldestDateString = oldestDate.toLocaleDateString();
  const newestDateString = newestDate.toLocaleDateString();

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.type;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text, record) => {
        return record.category;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        if (record.type === "expense") {
          return <div style={{ color: "red" }}>- $ {record.amount}</div>;
        } else {
          return <div style={{ color: "green" }}>+ $ {record.amount}</div>;
        }
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        return record.reference;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => {
        return record.description;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.date).format("DD/MM/YYYY");
      },
    },
  ];
  return (
    <div ref={ref} className="">
      {/* beautiful report title & responsive */}
      <div className="report-title p-10 border-b border-dashed mb-10">
        <div className="flex items-center justify-center gap-3">
          <img src={logo} alt="logo" className="w-8 h-8 -mt-3" />
          <h1 className="uppercase tracking-wider text-center font-bold">
            Expense Tracker
          </h1>
        </div>
        <h2 className=" tracking-wider text-center text-2xl mb-5">
          Transaction Report
        </h2>
        <div className="flex justify-between">
          <div className="report-date flex gap-5 font-medium text-sm">
            <span>
              <span className="font-bold">From:</span>{" "}
              <span className="tracking-widest">{oldestDateString}</span>
            </span>
            <span>
              <span className="font-bold">To:</span>{" "}
              <span className="tracking-widest">{newestDateString}</span>
            </span>
          </div>
          <div className="report-date flex gap-5 font-medium text-sm">
            <span>
              <span className="font-bold"> Print Date:</span>{" "}
              <span className="tracking-widest">
                {new Date().toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="  mx-4">
        <div className="report-table">
          <Table
            columns={columns}
            dataSource={props.transactionsData}
            pagination={false}
          />
        </div>

        {/* banner */}

        <div className="flex justify-end w-full mt-1">
          <div className="w-60 mx-w-72 py-5">
            <div className="flex justify-between border-b border-dashed border-b-slate-400 mb-1">
              <div className="flex flex-col gap-1 text-slate-800 font-medium">
                <p>Total Income : </p>
                <p>Total Expenes : </p>
              </div>
              <div className="flex flex-col gap-1 text-slate-800 font-medium">
                <p>${totalIncome}</p>
                <p>${totalExpense}</p>
              </div>
            </div>
            {/* <div className="border-b w-full "></div> */}
            <div className="flex justify-between mt-2">
              <div className="flex flex-col gap-1 text-slate-800 font-medium">
                <p>Total Balance : </p>
              </div>
              <div className="flex flex-col gap-1 text-slate-800 font-medium">
                <p>
                  {totalIncome > totalExpense ? (
                    <span className="">${totalIncome - totalExpense}</span>
                  ) : (
                    <span className="">- ${totalExpense - totalIncome}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Report;
