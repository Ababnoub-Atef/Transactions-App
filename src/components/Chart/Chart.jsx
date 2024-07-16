import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function Chart() {
  //! ==========> context <==========
  const {
    totalAmountOfDay,
    totalAmount,
    transactionsAmountOfUser,
    totalTransactionsAmountOfUser,
    user,
    date,
  } = useContext(DataContext);

  //! ==========> chart data <==========
  const data = {
    labels: [!user ? "user" : user, "Total"],
    datasets: [
      {
        // label: "Amount",
        data: [
          !transactionsAmountOfUser ? 0 : transactionsAmountOfUser,
          !totalAmountOfDay ? totalAmount : totalAmountOfDay,
        ],
        backgroundColor: ["#38bdf8", "#8b5cf6"],
        borderColor: ["#0c4a6e", "#4c1d95"],
        hoverOffset: 12,
        borderWidth: 1.5,
        spacing: 0,
        cutout: "80%",
        circumference: 180,
        rotation: -90,
        borderRadius: 6,
        // radius: 140,
        hoverBackgroundColor: ["#14b8a6", "#4f46e5"],
        hoverBorderColor: ["#134e4a", "#3730a3"],
        hoverBorderWidth: 2.5,
        hoverBorderRadius: 20,
      },
    ],
  };

  //! ==========> chart options <==========
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          usePointStyle: true,
        },

        title: {
          display: true,
          text: date
            ? `Total Transaction Amount on ${date}`
            : "Total Transaction Amount",
          color: "white",
          font: {
            size: 20,
          },
        },
      },
    },
  };

  return (
    <section className="container mx-auto mb-2 pt-2">
      <div className="bg-zinc-700 bg-opacity-50 p-4 rounded-2xl">
        <div>
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-3 flex flex-row gap-4 items-center text-sm justify-center *:bg-zinc-700 *:px-3 *:py-1 *:rounded-lg">
          {/* Total transactions amount */}
          <p className="text-center text-white hover:bg-violet-500 *:hover:text-white hover:scale-105 hover:cursor-pointer transition">
            Total Transactions Amount:{" "}
            <span className="text-violet-500 font-bold">{totalAmount}$</span>
          </p>

          {user && (
            <>
              {/* Total transactions amount on date */}
              {/* <p className="text-center text-white hover:bg-violet-500 *:hover:text-white hover:scale-105 hover:cursor-pointer transition">
                Total Transactions Amount on {date}:{" "}
                <span className="text-violet-500 font-bold">
                  {totalAmountOfDay}$
                </span>
              </p> */}

              {/* Transactions amount of user */}
              {/* <p className="text-center text-white hover:bg-violet-500 *:hover:text-white hover:scale-105 hover:cursor-pointer transition">
                Transactions Amount of {user}:{" "}
                <span className="text-violet-500 font-bold">
                  {transactionsAmountOfUser}$
                </span>
              </p>  */}

              {/* Total transactions amount of user */}
              <p className="text-center text-white hover:bg-violet-500 *:hover:text-white hover:scale-105 hover:cursor-pointer transition">
                Total Transactions Amount of {user}:{" "}
                <span className="text-violet-500 font-bold">
                  {totalTransactionsAmountOfUser}$
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
