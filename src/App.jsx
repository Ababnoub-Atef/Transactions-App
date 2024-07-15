import "./App.css";
import DisplayTable from "./components/DisplayTable/DisplayTable";
import Chart from "./components/Chart/Chart";
import DataContextProvider from "./context/DataContext";
import Nav from "./components/Navbar/Nav";

function App() {
  return (
    <>
      <Nav />
      <DataContextProvider>
        <Chart />
        <DisplayTable />
      </DataContextProvider>
    </>
  );
}

export default App;
