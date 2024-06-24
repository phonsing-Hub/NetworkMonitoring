import React from "react";
import { Chart } from "react-google-charts";
import { useTheme } from "../theme/ThemeProvider";

export const data = [
  [
    "Month",
    "Bolivia",
    "Ecuador",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
    "Average",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  ["2007/08", 139, 1110, 615, 968, 215, 609.4],
  ["2008/09", 136, 691, 629, 1026, 366, 569.6],
];

export function ComboChart() {
  const { isDarkMode } = useTheme();

  const options = {
    title: "Monthly Coffee Production by Country",
    titleTextStyle: { color: isDarkMode ? "#ffffff" : "#000000" },
    vAxis: {
      title: "Cups",
      textStyle: { color: isDarkMode ? "#ffffff" : "#000000" },
      titleTextStyle: { color: isDarkMode ? "#ffffff" : "#000000" },
    },
    hAxis: {
      title: "Month",
      textStyle: { color: isDarkMode ? "#ffffff" : "#000000" },
      titleTextStyle: { color: isDarkMode ? "#ffffff" : "#000000" },
    },
    seriesType: "bars",
    series: { 5: { type: "line" } },
    backgroundColor: isDarkMode ? "#111111" : "#ffffff",
    legend: { textStyle: { color: isDarkMode ? "#ffffff" : "#000000" } },
  };

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
