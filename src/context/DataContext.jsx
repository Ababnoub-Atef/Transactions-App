import { createContext, useState } from "react";

export let DataContext = createContext();

export default function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [totalAmountOfDay, setTotalAmountOfDay] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactionsAmountOfUser, setTransactionsAmountOfUser] = useState(0);
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
    try {
      const dataResponse = await fetch("./db.json");

      if (!dataResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const { customers, transactions } = await dataResponse.json();

      const mergedData = transactions.map((transaction) => {
        const customer = customers.find(
          (c) => c.id === transaction.customer_id
        );
        return {
          ...transaction,
          customer: customer ? customer.name : "Unknown",
          // amount: `${transaction.amount} $`,
          date: formatDate(transaction.date),
        };
      });

      setData(mergedData);
      return mergedData;
    } catch (error) {
      console.log(error);
    }
  }

  //! ==========> calc total transactions amount of all days <==========
  function calcTotalAmount(data) {
    const totalAmount = data.reduce((acc, data) => {
      return acc + data.amount;
    }, 0);
    setTotalAmount(totalAmount);
  }

  //! ==========> calc total transactions amount of selected day <==========
  function calcTotalAmountOfDay(item) {
    const day = data.filter((t) => t.date === item.date);

    const totalAmountOfDay = day.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    setTotalAmountOfDay(totalAmountOfDay);
  }

  //! ==========> get details of selected transaction <==========
  function getDataOfUser(item) {
    // !==========> calc total transactions amount of selected user <==========
    const user = data.filter((t) => t.customer === item.customer);
    const totalUserAmount = user.reduce((acc, data) => {
      return acc + data.amount;
    }, 0);
    setTotalTransactionsAmountOfUser(totalUserAmount);

    // !==========> calc transactions amount of selected user <==========
    const selectedUser = data.filter(
      (t) => t.customer === item.customer && t.date === item.date
    );

    const transactionsAmountOfUser = selectedUser.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    setTransactionsAmountOfUser(transactionsAmountOfUser);
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
        transactionsAmountOfUser,
        totalTransactionsAmountOfUser,
        user,
        date,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
