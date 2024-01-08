import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../components/DefaultLayout";
import { Table, message, Select, DatePicker } from "antd";
import { BiSliderAlt } from "react-icons/bi";
import { FiDownload, FiSearch } from "react-icons/fi";

import AddEditTransactionModal from "../components/AddEditTransactionModal";
import Report from "../components/Report";
import {
  deleteTransaction,
  getAllTransactionsOfUser,
} from "../apicalls/transactions";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

function Home() {
  const [showAddTransactionModal, setShowAddTransactionModel] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [showEditTransactionObject, setShowEditTransactionObject] =
    useState(null);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getTransactionsData = async () => {
    // message.loading("Fetching all your transactions...", 0.5);
    try {
      const response = await getAllTransactionsOfUser({
        frequency: frequency,
        ...(frequency === "custom" && { selectedRange }),
        type,
      });
      if (response.success) {
        setTimeout(() => {
          setTransactionsData(response.data);
          // message.success(response.message);
        }, 500);
      } else {
        setTimeout(() => {
          // message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };

  const handleDeleteConfirmation = async (payload) => {
    setIsOpen(false);
    message.loading("Deleting the selected transaction...", 0.5);
    try {
      const response = await deleteTransaction(payload);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          getTransactionsData();
        }, 500);
      } else {
        setTimeout(() => {
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };

  useEffect(() => {
    getTransactionsData();
  }, [frequency, selectedRange, type]);

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
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <EditOutlined
              onClick={() => {
                setShowEditTransactionObject(record);
                setShowAddTransactionModel(true);
              }}
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <DeleteOutlined
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation!</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this transaction?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteConfirmation(record)}
                    className="-mb-1"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  // Search Functionality as filter
  const searchFilter = () => {
    if (searchText === "") {
      return transactionsData;
    } else {
      return transactionsData.filter((item) => {
        return (
          item.date.toLowerCase().includes(searchText.toLowerCase()) ||
          item.type.toLowerCase().includes(searchText.toLowerCase()) ||
          item.category.toLowerCase().includes(searchText.toLowerCase()) ||
          item.amount
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.reference.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
  };

  return (
    <>
      {" "}
      <DefaultLayout>
        <h1 className="text-slate-700 mb-5 text-3xl font-bold">Transections</h1>

        <div className="border rounded-md">
          <div className=" flex flex-wrap px-2 py-3 gap-3 shadow-none mb-2 flex-col md:flex-row ">
            <div className="flex flex-wrap gap-3 flex-1 items-center ">
              <div className="flex flex-column w-full md:w-64 ">
                {/* <h5>Select Frequency</h5> */}
                <Select
                  onChange={(value) => setFrequency(value)}
                  value={frequency}
                >
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                  <Select.Option value="custom">Custom Range</Select.Option>
                </Select>
                {frequency === "custom" && (
                  <div className="mt-2">
                    <RangePicker
                      value={selectedRange}
                      onChange={(values) => setSelectedRange(values)}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-column min-w-28  w-full md:w-auto">
                {/* <h5>Select Type</h5> */}
                <Select onChange={(value) => setType(value)} value={type}>
                  <Select.Option value="all">All</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </div>
              {/* Search input  */}
              <div className="flex gap-2 p-2 items-center w-full md:w-auto md:min-w-72 border rounded">
                <FiSearch className="text-slate-400" />
                <input
                  className="border-none rounded outline-none text-sm focus:outline-none"
                  placeholder="Search transaction..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 h-full">
              <div className="flex justify-between border rounded mx-2 p-2 px-3 w-full md:w-auto h-full md:min-w-28 ">
                <UnorderedListOutlined
                  className={`pointer ${
                    viewType === "table" ? "active-table-icon" : "table-icon"
                  }`}
                  onClick={() => setViewType("table")}
                />
                <AreaChartOutlined
                  className={`pointer ${
                    viewType === "analytics"
                      ? "active-analytics-icon"
                      : "analytics-icon"
                  }`}
                  onClick={() => setViewType("analytics")}
                />
              </div>
              <button
                className="btn bg-primary text-white w-full md:w-auto h-full"
                onClick={() => setShowAddTransactionModel(true)}
              >
                Add Transaction
              </button>
              <DropdownMenu className="">
                <DropdownMenuTrigger className="">
                  <BiSliderAlt className="w-16 text-xl text-slate-500 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      // <Report ref={componentRef} />;
                      handlePrint();
                    }}
                    className="flex cursor-pointer items-center text-slate-600 gap-1"
                  >
                    <FiDownload className="w-6 font-bold text-lg" />
                    <span>Export as PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    // onClick={() => setShow(true)}
                    className="flex cursor-pointer items-center text-slate-600 gap-1"
                  >
                    <FiDownload className="w-6 font-bold text-lg" />
                    <span>Export as Excel</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* <div className="table-analytics mb-2"></div> */}
          <div className="border-t">
            {viewType === "table" ? (
              <Table
                dataSource={searchFilter()}
                columns={columns}
                scroll={{ x: 992 }}
              />
            ) : (
              <Analytics transactions={searchFilter()} />
            )}
            {showAddTransactionModal && (
              <AddEditTransactionModal
                showAddTransactionModal={showAddTransactionModal}
                setShowAddTransactionModel={setShowAddTransactionModel}
                getTransactionsData={getTransactionsData}
                showEditTransactionObject={showEditTransactionObject}
                setShowEditTransactionObject={setShowEditTransactionObject}
              />
            )}
          </div>
        </div>
        <div
          style={{
            visibility: isVisible ? "visible" : "hidden",
            height: isVisible ? "auto" : 0,
            overflow: isVisible ? "visible" : "hidden",
          }}
        >
          <Report ref={componentRef} transactionsData={transactionsData} />
        </div>
      </DefaultLayout>
    </>
  );
}

export default Home;
