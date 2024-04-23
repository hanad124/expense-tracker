import ExcelJS from "exceljs";

const exportExcelFile = (data, startDate, endDate) => {
  const fileName = `Transaction report | ${startDate} - ${endDate}.xlsx`;

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

  // Header style
  const headerStyle = {
    font: { bold: true, color: { argb: "000000" } },
    alignment: { vertical: "middle", horizontal: "center" },
  };

  // Row styles
  const rowStyle = {
    font: { color: { argb: "000000" } },
    alignment: { vertical: "middle", horizontal: "center" },
  };

  // Set column headers
  worksheet.columns = [
    {
      header: "Transaction Type",
      key: "type",
      width: 20,
      style: headerStyle,
    },
    { header: "Category", key: "category", width: 20, style: headerStyle },
    { header: "Amount", key: "amount", width: 20, style: headerStyle },
    {
      header: "Description",
      key: "description",
      width: 40,
      style: headerStyle,
    },
    { header: "date", key: "date", width: 20, style: headerStyle },
  ];

  // Add data rows
  data.forEach((transaction, index) => {
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
  });

  // Add total row
  const totalRow = worksheet.addRow({
    type: "",
    category: "",
    description: "",
    date: "",
    amount: total,
  });

  // Apply a unique and bold style to the total row
  totalRow.eachCell((cell) => {
    cell.style = {
      font: { bold: true, color: { argb: "000000" } },
      alignment: { vertical: "middle", horizontal: "center" },
    };
  });

  // Generate Excel File with given name
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
