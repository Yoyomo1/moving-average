import React from "react";

const SideBar = ({ tickerSymbols }) => {
  return (
    <aside className="side-bar-container">
      <h3>Ticker Symbols</h3>
      <ul>
        {tickerSymbols.map(({ symbol, id }) => {
          return (
            <li key={id}>
              <a href="#">{symbol}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
