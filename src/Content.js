import React from "react";
import Chart from "./Chart";
import { useState, useEffect } from "react";

const Content = ({ currentSymbol }) => {
  const [stockData, setStockData] = useState([]);
  const [stockData59Days, setStockData59Days] = useState([]);
  const [listOfDates, setListOfDates] = useState([]);
  const [movingAverage, setMovingAverage] = useState([]);

  const baseURL = "https://www.alphavantage.co/query?";
  const params = {
    f: "TIME_SERIES_DAILY_ADJUSTED",
    symbol: currentSymbol,
    apiKey: "IBA86A2CGCBIGGHP",
  };

  const parseData = (data) => {
    data = data["Time Series (Daily)"];

    if (data) {
      let arr = Object.entries(data);
      arr.reverse();

      // Get array of 30 dates
      const dates = arr.map((subArr) => subArr[0]);
      const dates30Days = dates.slice(0, 30);
      setListOfDates(dates30Days);

      arr = arr.map((element) => element[1]["5. adjusted close"]);
      let dataFor30Days = arr.slice(0, 30);
      let dataFor59Days = arr.slice(0, 59);
      setStockData59Days(dataFor59Days);
      set30DayMovingAvg(dataFor59Days);
      return dataFor30Days;
    }
  };

  const set30DayMovingAvg = (data) => {
    let movingAvg = [];
    let sum = 0;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        sum += parseInt(data[i + j]);
      }
      movingAvg.push(sum / 30.0);
      sum = 0;
    }
    setMovingAverage(movingAvg);
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
        const stockData = parseData(data);
        console.log(stockData);
        setStockData(stockData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="content-container">
      <h3>{currentSymbol}</h3>
      <Chart
        stockData={stockData}
        dates={listOfDates}
        closingPricesFor59Days={stockData59Days}
        movingAverage={movingAverage}
      />
    </section>
  );
};

export default Content;
