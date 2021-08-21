import React from "react";

const StockSymbol = ({ tickerSymbols, setCurrentSymbol }) => {
  return (
    <aside className="side-bar-container">
      <h3>Symbols</h3>
      <ul className="side-bar-list">
        {tickerSymbols.map(({ symbol, id }) => {
          return (
            <li key={id}>
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
