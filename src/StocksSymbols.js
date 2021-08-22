import React from "react";

const StockSymbol = ({ tickerSymbols, setCurrentSymbol }) => {
  return (
    <aside className="stock-symbols-container">
      <h3 className="stock-symbol-header">Symbols</h3>
      <ul className="stock-symbol-list">
        {tickerSymbols.map(({ symbol, id }) => {
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
