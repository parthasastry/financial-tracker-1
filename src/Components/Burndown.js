import React, { Component } from "react";
import Chart from "react-apexcharts";

export class Burndown extends Component {
  state = {
    options: {},
    series: [
      {
        data: [],
      },
    ],
  };

  componentDidMount() {

  const max_yaxis = Math.max(...this.props.plan_amount)
    var options = {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#545454", "#77B6EA"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Financials Burnup",
        align: "center",
      },
      xaxis: {
        categories: this.props.end_date,
        title: {
          text: "End Date",
        },
      },
      yaxis: {
        title: {
          text: "Amount (USD)",
        },
        min: 0,
        max: max_yaxis,
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return "$ "+ value;
          }
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
    var series = [
      {
        name: "Plan",
        data: this.props.plan_amount,
      },
      {
        name: "Actual",
        data: this.props.actual_amount,
      },
    ];

    this.setState({
      options: options,
      series: series,
    });
  }

  render() {

    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
        />
      </div>
    );
  }
}

export default Burndown;
