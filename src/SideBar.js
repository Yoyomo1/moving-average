import React from "react";

const SideBar = ({ tickerSymbols, setCurrentSymbol }) => {
  return (
    <aside className="side-bar-container">
      <h3>Ticker Symbols</h3>
      <ul>
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

export default SideBar;
