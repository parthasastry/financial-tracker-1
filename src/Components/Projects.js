import React, { useState, useContext, useEffect } from "react";
import { Spinner, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import axios from 'axios';
// import projectsData from "../projectsData";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Projects = () => {
  const { projects, setProjects } = useContext(GlobalContext);

  const url = "https://mrsh6w0v48.execute-api.us-east-1.amazonaws.com/dev/fin";

  useEffect(() => {
    axios
    .get(url)
    .then((data) => setProjects({ type: "SET_PROJECTS", payload: data.data }))
    .catch((err) => console.log(err))

    // setProjects({ type: "SET_PROJECTS", payload: projectsData });
  }, []);

  const tableHeader = (
    <thead>
      <tr className="text-center">
        <th>Project Name</th>
        <th>Contract</th>
        <th>Spent</th>
        <th>Investment</th>
        <th>Spent</th>
      </tr>
    </thead>
  );

  const tableData = projects.map((p) => {
    const billable_actuals = Math.max(...p.billable_actual);
    const ai_actuals = Math.max(...p.ai_actual);
    const billable_spent = billable_actuals > 0 ? ((billable_actuals / p.sow)*100).toFixed(2) : 0
    const ai_spent = ai_actuals > 0 ? ((ai_actuals / p.ai)*100).toFixed(2) : 0
    return (
      <tr key={p.project_name}>
        <td><Link to={`/project/${p.project_name}`}>{p.project_name}</Link></td>
        <td className="text-right">{formatter.format(p.sow)}</td>
        <td className="text-right">{billable_spent} %</td>
        <td className="text-right">{formatter.format(p.ai)}</td>
        <td className="text-right">{ai_spent} %</td>
      </tr>
    );
  });

  const T = (
    <Table striped bordered hover>
      {tableHeader}
      <tbody>{tableData}</tbody>
    </Table>
  );

  return (
    <div>
      <h1>Projects</h1>
      {T}
    </div>
  );
};

export default Projects;
