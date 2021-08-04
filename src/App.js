import "./App.css";
import SideBar from "./SideBar";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";
import { tickerSymbols } from "./data";

const App = () => {
  const [currentSymbol, setCurrentSymbol] = useState(tickerSymbols[0].symbol);
  return (
    <div className="app">
      <Header />
      <SideBar tickerSymbols={tickerSymbols} />
      <Content currentSymbol={currentSymbol} />
    </div>
  );
};

export default App;
