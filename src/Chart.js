import { Line } from "react-chartjs-2";
import React from "react";

// Const values for chart
const pointRadiusVal = 1;
const pointHoverRadiusVal = 1;

const Chart = React.memo(({ stockData, dates, movingAverage }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Price",
        data: stockData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        pointRadius: pointHoverRadiusVal,
        pointHoverRadius: pointHoverRadiusVal,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        autoSkip: true,
      },
      {
        label: "Moving Average",
        data: movingAverage,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        pointRadius: pointRadiusVal,
        pointHoverRadius: pointHoverRadiusVal,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        autoSkip: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line
        data={data}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
});

export default Chart;
