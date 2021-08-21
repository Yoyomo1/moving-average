import "./App.css";
import StockSymbols from "./StocksSymbols";
import Header from "./Header";
import Content from "./Content";
import { useState, useEffect } from "react";
import { tickerSymbols, symbols } from "./data";

const App = () => {
  const [currentSymbol, setCurrentSymbol] = useState(tickerSymbols[0].symbol);
  const [allSymbols, setAllSymbols] = useState([]);

  const fetchSymbols = () => {
    let currentID = 1;
    let currentString = "";
    for (let i = 0; i < symbols.length; i++) {
      if (symbols[i] === "\n") {
        const newObj = { id: currentID, symbol: currentString };
        currentID++;
        setAllSymbols((prev) => [...prev, newObj]);
        currentString = "";
      } else {
        currentString += symbols[i];
      }
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, []);

  return (
    <div className="app">
      <Header />
      <Content currentSymbol={currentSymbol} />
      <StockSymbols
        tickerSymbols={allSymbols}
        setCurrentSymbol={setCurrentSymbol}
      />
    </div>
  );
};

export default App;
