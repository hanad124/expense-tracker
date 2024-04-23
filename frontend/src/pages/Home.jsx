import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../components/DefaultLayout";
import { Table, message, Select, DatePicker } from "antd";
import { BiSliderAlt } from "react-icons/bi";
import { FiDownload, FiSearch, FiPlus } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";

import AddEditTransactionModal from "../components/AddEditTransactionModal";
import Report from "../components/Report";
import {
  deleteTransaction,
  getAllTransactionsOfUser,
} from "../apicalls/transactions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";
import { transactionColumns } from "../resources/columns";
import { useTheme } from "next-themes";
import exportExcelFile from "../providers/exportExcelFile";

const { RangePicker } = DatePicker;

function Home() {
  const { theme } = useTheme();
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

  const isDarkMode = theme === "dark" ? true : false;

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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <div className="flex gap-3">
              <EditOutlined
                onClick={() => {
                  setShowEditTransactionObject(params.row);
                  setShowAddTransactionModel(true);
                }}
              />
              <AlertDialog className="border-none">
                <AlertDialogTrigger>
                  <DeleteOutlined
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-slate-300">
                      Confirmation!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this transaction?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel className="dark:text-slate-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteConfirmation(params.row)}
                      className="-mb-1 dark:text-slate-300"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        );
      },
    },
  ];

  const searchFilter = () => {
    if (searchText === "") {
      return transactionsData.map((item, index) => ({
        ...item,
        id: index,
        date: new Date(item.date).toLocaleDateString(),
      }));
    } else {
      return transactionsData
        .filter((item) => {
          return (
            new Date(item.date)
              .toLocaleDateString()
              .slice(4, 16)
              .includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase()) ||
            item.amount
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
          );
        })
        .map((item, index) => ({ ...item, id: index }));
    }
  };
  const newestDate = searchFilter()[0]?.date;
  const oldestDate = searchFilter()[searchFilter().length - 1]?.date;
  const handleExportExcel = () => {
    exportExcelFile(searchFilter(), oldestDate, newestDate);
  };

  useEffect(() => {
    searchFilter();
  }, [searchText, transactionsData]);
  return (
    <>
      {" "}
      <DefaultLayout>
        <div className="flex justify-between  ">
          <h1 className="text-slate-700 dark:text-slate-400 mb-5 text-3xl font-bold">
            Transactions
          </h1>
          <button
            className="  bg-primary text-white  h-full w-auto flex items-center gap-2 px-3 py-2 rounded-md"
            onClick={() => setShowAddTransactionModel(true)}
          >
            <div>
              <FiPlus className="" />
            </div>
            <span> Add Transaction</span>
          </button>
        </div>
        <div
          className={` rounded-md
        ${
          isDarkMode
            ? "bg-background  border-slate-600"
            : " border overflow-hidden bg-white"
        }
        `}
        >
          <div className="border-b flex flex-wrap px-2 py-3 gap-3 shadow-none mb-2 flex-col md:flex-row ">
            <div className="flex flex-wrap gap-3 flex-1 items-center ">
              <div className="flex flex-column w-full md:w-64 bg-none bg-transparent">
                {/* <h5>Select Frequency</h5> */}
                <Select
                  onChange={(value) => setFrequency(value)}
                  value={frequency}
                  className=" bg-none bg-transparent"
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
              <div
                className="flex gap-2 p-2 items-center w-full md:w-auto md:min-w-72  rounded"
                style={
                  isDarkMode
                    ? {
                        border: "1px solid #263052",
                      }
                    : {
                        border: "1px solid #d1d5db",
                      }
                }
              >
                <FiSearch className="text-slate-400" />
                <input
                  className="border-none w-full rounded outline-none text-sm focus:outline-none bg-none bg-transparent"
                  placeholder="Search transaction..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 h-full">
              <div
                className="flex justify-between rounded mx-2 p-2 px-3 w-full md:w-auto h-full md:min-w-28 "
                style={
                  isDarkMode
                    ? {
                        border: "1px solid #263052",
                      }
                    : {
                        border: "1px solid #d1d5db",
                      }
                }
              >
                <UnorderedListOutlined
                  className={`pointer ${
                    viewType === "table"
                      ? "active-table-icon text-primary"
                      : "table-icon"
                  }`}
                  onClick={() => setViewType("table")}
                />
                <AreaChartOutlined
                  className={`pointer ${
                    viewType === "analytics"
                      ? "active-analytics-icon text-primary"
                      : "analytics-icon"
                  }`}
                  onClick={() => setViewType("analytics")}
                />
              </div>

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
                    onClick={() => {
                      handleExportExcel();
                    }}
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
          <div className={` ${isDarkMode ? "bg-background" : "bg-white"}`}>
            {viewType === "table" ? (
              <DataGrid
                className=" dark:bg-background border-none"
                rows={searchFilter()}
                columns={transactionColumns.concat(actionColumn)}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={
                  isDarkMode
                    ? {
                        border: "none",
                        "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                          color: "#939ab5",

                          borderColor: "#939ab5",
                        },
                        "& .MuiDataGrid-columnHeader": {
                          // borderColor: "#1f2937",
                          border: "none",
                        },
                        // change the border color
                        // borderColor: "#1f2937",
                      }
                    : {
                        border: "none",
                        "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                          color: "black",
                        },
                      }
                }
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
