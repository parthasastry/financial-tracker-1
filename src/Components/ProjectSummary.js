import React from "react";
import { ListGroup } from "react-bootstrap";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

const ProjectSummary = ({ contract, actuals }) => {
    const spent_percentage =  ((actuals / contract ) * 100).toFixed(2);
  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <p>Contract</p>
          <h3>{formatter.format(contract)}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>Spent</p>
          <h3>{formatter.format(actuals)}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>Percentage Spent</p>
          <h3>{spent_percentage} %</h3>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ProjectSummary;
