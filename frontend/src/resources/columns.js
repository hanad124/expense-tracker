export const transactionColumns = [
  {
    field: "type",
    headerName: "Transaction Type",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 130,
    // style the amount if it is negative or positive (red or green) with a dollar sign
    renderCell: (params) => {
      return (
        <div>
          {params.row.type === "income" ? (
            <div style={{ color: "green" }}>${params.row.amount}</div>
          ) : (
            <div style={{ color: "red" }}>-${params.row.amount}</div>
          )}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 170,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
];

// {
//   field: "supplier",
//   headerName: "Supplier Name",
//   width: 170,
// },
