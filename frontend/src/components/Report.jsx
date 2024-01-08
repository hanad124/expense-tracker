import React from "react";
import { Table, message, Select, DatePicker } from "antd";
import moment from "moment";

const Report = React.forwardRef((props, ref) => {
  const transactionsData = props.transactionsData;

  const dates = transactionsData.map((obj) => new Date(obj.date));

  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date(Math.max(...dates));

  const oldestDateString = oldestDate.toLocaleDateString();
  const newestDateString = newestDate.toLocaleDateString();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.date).format("DD/MM/YYYY");
      },
    },
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
  ];
  return (
    <div ref={ref} className="">
      {/* beautiful report title & responsive */}
      <div className="report-title p-10 border-b mb-10">
        <h1 className="uppercase tracking-wider text-center font-bold">
          Expense Tracker
        </h1>
        <h2 className="uppercase tracking-wider text-center mb-5">Report</h2>
        <div className="flex justify-between">
          <div className="report-date flex gap-5 font-medium text-lg">
            <span>
              From: <span className="tracking-widest">{oldestDateString}</span>
            </span>
            <span>
              To: <span className="tracking-widest">{newestDateString}</span>
            </span>
          </div>
          <div className="report-date flex gap-5 font-medium text-lg">
            <span>
              Print Date:{" "}
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
      </div>
    </div>
  );
});

export default Report;
