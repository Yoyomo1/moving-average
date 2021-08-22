import React, { useState } from "react";

const StockSymbol = ({ tickerSymbols, setCurrentSymbol }) => {
  const [input, setInput] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    const filteredArray = tickerSymbols.filter(({ symbol }) => {
      return (
        inputValue.length <= symbol.length &&
        inputValue.toLowerCase() ===
          symbol.substr(0, inputValue.length).toLowerCase()
      );
    });

    setFilteredSymbols(filteredArray);
  };
  return (
    <aside className="stock-symbols-container">
      <div className="stock-symbol-header-container">
        <h3 className="stock-symbol-header">Symbols</h3>
        <form className="query-form">
          <div className="input-container ">
            <input type="text" value={input} onChange={handleChange} />
            <span className="input-arrow"></span>
          </div>
        </form>
      </div>
      <ul className="stock-symbol-list">
        {!input
          ? tickerSymbols.map(({ symbol, id }) => {
              return (
                <li className="stock-symbol-list-item" key={id}>
                  <button
                    className="ticker-symbol"
                    onClick={() => setCurrentSymbol(symbol)}
                  >
                    {symbol}
                  </button>
                </li>
              );
            })
          : filteredSymbols.map(({ symbol, id }) => {
              return (
                <li className="stock-symbol-list-item" key={id}>
                  <button
                    className="ticker-symbol"
                    onClick={() => setCurrentSymbol(symbol)}
                  >
                    {symbol}
                  </button>
                </li>
              );
            })}
      </ul>
    </aside>
  );
};

export default StockSymbol;
