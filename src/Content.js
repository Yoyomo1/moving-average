import React from "react";
import Chart from "./Chart";
import { useState, useEffect } from "react";

const Content = ({ currentSymbol }) => {
  const [stockData, setStockData] = useState({});
  const baseURL = "https://www.alphavantage.co/query?";
  const params = {
    f: "TIME_SERIES_DAILY_ADJUSTED",
    symbol: currentSymbol,
    apiKey: "IBA86A2CGCBIGGHP",
  };

  useEffect(() => {
    fetch(
      // `${baseURL}function=${params.f}&symbol=${params.symbol}&apikey=${params.apiKey}`
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo"
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setStockData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="content-container">
      <h3>{currentSymbol}</h3>
      <Chart stockData={stockData} />
    </section>
  );
};

export default Content;
