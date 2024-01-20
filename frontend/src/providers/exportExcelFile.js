import ExcelJS from "exceljs";

const exportExcelFile = (data, startDate, endDate) => {
  const fileName = `Transaction report | ${startDate} - ${endDate}.xlsx`;

  console.log("data", data);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transaction report");

  const mappedData = data.map((transaction) => {
    return {
      transactionType: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    };
  });

  const total = mappedData.reduce((accumulator, currentTransaction) => {
    return accumulator + currentTransaction.amount;
  }, 0);

  // row styles
  const rowStyle = {
    font: { color: { argb: "000000" } },
    // fill: { type: "pattern", pattern: "solid", fgColor: { argb: "fff" } },
    alignment: { vertical: "middle", horizontal: "center" },
    // height: 30,
  };

  // // Starting row for header and data rows
  let rowIndex = 100;

  // Set column headers
  worksheet.columns = [
    {
      header: "Transaction Type",
      key: "type",
      width: 20,
      style: rowStyle,
    },
    { header: "Category", key: "category", width: 20, style: rowStyle },
    {
      header: "Amount",
      key: "amount",
      width: 20,
      style: rowStyle,
    },
    { header: "Description", key: "description", width: 40, style: rowStyle },
    { header: "date", key: "date", width: 20, style: rowStyle },
  ];

  // // Row styles for data rows
  const evenRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "EDF2F7" } },
    alignment: { vertical: "middle", horizontal: "center" },
    height: 30,
  };

  const oddRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } },
    alignment: { vertical: "middle", horizontal: "center" },
    height: 30,
  };

  // // Add data rows
  data.forEach((transaction, index) => {
    const rowStyle = index % 2 === 0 ? evenRowStyle : oddRowStyle;

    const row = worksheet.addRow({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    });

    row.eachCell((cell) => {
      if (cell.value) {
        // Apply row style to non-empty cells
        cell.style = rowStyle;
      }
    });

    rowIndex++;
  });

  // // Add total row
  const totalRow = worksheet.addRow({
    type: "",
    category: "",
    description: "",
    date: "",
    amount: total,
  });

  // // Apply a unique style to the total row
  totalRow.eachCell((cell) => {
    cell.style = {
      font: { bold: true, color: { argb: "000000" } },
      // fill: { type: "pattern", pattern: "solid", fgColor: { argb: "EDF2F7" } },
      alignment: { vertical: "middle", horizontal: "center" },
    };
  });

  // // Generate Excel File with given name
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  });
};

export default exportExcelFile;
