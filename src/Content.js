import React from "react";
import Chart from "./Chart";
import { useState, useEffect, useReducer } from "react";

// currentTimeframe in months
const initialState = {
  currentTimeframe: 21 * 6,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "1M":
      return { currentTimeframe: 21 };
    case "3M":
      return { currentTimeframe: 21 * 3 };
    case "6M":
      return { currentTimeframe: 21 * 6 };
    case "1Y":
      return { currentTimeframe: 21 * 12 };
    case "3Y":
      return { currentTimeframe: 21 * 12 * 3 };
    default:
      throw new Error("Invalid initial state for timeline!");
  }
};

const Content = ({ currentSymbol }) => {
  const [originalData, setOriginalData] = useState({});
  const [timeFrame, dispatch] = useReducer(reducer, initialState);
  const [stockData, setStockData] = useState([]);
  const [listOfDates, setListOfDates] = useState([]);
  const [movingAverage, setMovingAverage] = useState([]);

  const baseURL = "https://www.alphavantage.co/query?";
  const params = {
    f: "TIME_SERIES_DAILY_ADJUSTED",
    symbol: currentSymbol,
    outputSize: "full",
    apiKey: "IBA86A2CGCBIGGHP",
  };

  const parseData = (data) => {
    data = data["Time Series (Daily)"];

    if (data) {
      let arr = Object.entries(data);

      // Get array of the approriate dates
      const allDates = arr.map((subArr) => subArr[0]);
      const requiredDates = allDates.slice(0, timeFrame.currentTimeframe);

      // API returns dates from newest to oldest
      requiredDates.reverse();
      setListOfDates(requiredDates);

      arr = arr.map((element) => element[1]["5. adjusted close"]);
      arr.reverse();
      let dataFor30Days = arr.slice(
        arr.length - timeFrame.currentTimeframe,
        arr.length
      );
      let dataForMovingAvgCalculation = arr.slice(
        arr.length - timeFrame.currentTimeframe - 19,
        arr.length
      );
      set20DayMovingAvg(dataForMovingAvgCalculation);
      return dataFor30Days;
    }
  };

  const set20DayMovingAvg = (data) => {
    let movingAvg = [];
    let sum = 0;
    for (let i = 0; i < data.length - 19; i++) {
      for (let j = 0; j < 20; j++) {
        sum += parseInt(data[i + j]);
      }
      movingAvg.push(sum / 20.0);
      sum = 0;
    }
    setMovingAverage(movingAvg);
  };

  useEffect(() => {
    fetch(
      `${baseURL}function=${params.f}&symbol=${params.symbol}&outputsize=${params.outputSize}&apikey=${params.apiKey}`
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const stockData = parseData(data);
        setOriginalData(data); // Need original data so we only need to fetch once
        setStockData(stockData); // and not every timeframe change
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (stockData) {
      setStockData(parseData(originalData));
    }
  }, [timeFrame]);

  return (
    <section className="content-container">
      <h3 className="active-ticker-symbol">{currentSymbol}</h3>
      <div className="time-frame-container">
        <h6
          className={timeFrame.currentTimeframe == 21 && "active-timeframe"}
          onClick={() => dispatch({ type: "1M" })}
        >
          1M
        </h6>
        <h6
          className={timeFrame.currentTimeframe == 21 * 3 && "active-timeframe"}
          onClick={() => dispatch({ type: "3M" })}
        >
          3M
        </h6>
        <h6
          className={timeFrame.currentTimeframe == 21 * 6 && "active-timeframe"}
          onClick={() => dispatch({ type: "6M" })}
        >
          6M
        </h6>
        <h6
          className={
            timeFrame.currentTimeframe == 21 * 12 && "active-timeframe"
          }
          onClick={() => dispatch({ type: "1Y" })}
        >
          1Y
        </h6>
        <h6
          className={
            timeFrame.currentTimeframe == 21 * 12 * 3 && "active-timeframe"
          }
          onClick={() => dispatch({ type: "3Y" })}
        >
          3Y
        </h6>
      </div>
      <Chart
        stockData={stockData}
        dates={listOfDates}
        movingAverage={movingAverage}
      />
    </section>
  );
};

export default Content;
