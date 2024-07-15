import { createContext, useState } from "react";

export let DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [totalAmountOfDay, setTotalAmountOfDay] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTransactionsAmountOfUser, setTotalTransactionsAmountOfUser] =
    useState(0);
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");

  //! ==========> format date <==========
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  //! ==========> get table data <==========
  async function tableData() {
    const dataResponse = await fetch("./db.json");

    const { customers, transactions } = await dataResponse.json();

    const mergedData = transactions.map((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return {
        ...transaction,
        customer: customer ? customer.name : "Unknown",
        // amount: `${transaction.amount} $`,
        date: formatDate(transaction.date),
      };
    });

    setData(mergedData);

    return mergedData;
  }

  //! ==========> calc total transactions amount of all days <==========
  function calcTotalAmount(data) {
    let totalAmount = data.reduce((acc, data) => {
      return acc + data.amount;
    }, 0);
    setTotalAmount(totalAmount);
  }

  //! ==========> calc total transactions amount of selected day <==========
  function calcTotalAmountOfDay(item) {
    const day = data.filter((t) => t.date === item.date);

    let totalAmountOfDay = day.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    setTotalAmountOfDay(totalAmountOfDay);
  }

  //! ==========> get details of selected transaction <==========
  function getDataOfUser(item) {
    const user = data.filter(
      (t) => t.customer === item.customer && t.date === item.date
    );

    let totalTransactionsAmountOfUser = user.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    setTotalTransactionsAmountOfUser(totalTransactionsAmountOfUser);
    setUser(item.customer);
    setDate(item.date.slice(0, 5));
  }

  return (
    <DataContext.Provider
      value={{
        tableData,
        data,
        calcTotalAmountOfDay,
        totalAmountOfDay,
        totalAmount,
        calcTotalAmount,
        getDataOfUser,
        totalTransactionsAmountOfUser,
        user,
        date,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
