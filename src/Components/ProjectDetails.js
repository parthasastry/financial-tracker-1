import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Row, Col, Card } from "react-bootstrap";
import { GlobalContext } from "../Context/GlobalState";

import ProjectSummary from "./ProjectSummary";
import Burndown from "./Burndown";

const getLastSaturday = () => {
  var today = new Date();
  var lastSaturday = new Date();
  let today_day = new Date().getDay();

  switch (today_day) {
    case 0:
      lastSaturday = lastSaturday.setDate(today.getDate() - 1);
      break;
    case 1:
      lastSaturday = lastSaturday.setDate(today.getDate() - 2);
      break;
    case 2:
      lastSaturday = lastSaturday.setDate(today.getDate() - 3);
      break;
    case 3:
      lastSaturday = lastSaturday.setDate(today.getDate() - 4);
      break;
    case 4:
      lastSaturday = lastSaturday.setDate(today.getDate() - 5);
      break;
    case 5:
      lastSaturday = lastSaturday.setDate(today.getDate() - 6);
      break;
    case 6:
      lastSaturday = lastSaturday.setDate(today.getDate() - 0);
  }
  return new Date(lastSaturday);
};

const ProjectDetails = (route) => {
  const currentProject = route.match.params.id;
  const lastSaturday = getLastSaturday();
  var lastSaturdayFormat = new Date(lastSaturday).toISOString().slice(0, 10);

  const { projects } = useContext(GlobalContext);

  const projectDetails = projects.filter((p) => p.project_name === currentProject);
  const details = projectDetails[0]

  const billable_actuals = Math.max(...details.billable_actual);
  const ai_actuals = Math.max(...details.ai_actual);

  
  const index = details.end_date.indexOf(lastSaturdayFormat);
  const b_actuals_truncated = details.billable_actual.slice(0,index);
  const ai_actuals_truncated = details.ai_actual.slice(0, index);

  const sow = details.sow
  const ai = details.ai
  const end_date = details.end_date
  const billable_plan = details.billable_plan
  const ai_plan = details.ai_plan

  return (
    <div>
       <h1>
        Details for Project{" "}
        <span className="text-primary">{currentProject}</span>
      </h1>
      <Link to="/" className="btn btn-dark my-3">
        Go back
      </Link>

      <div>
          <h3 className="text-center text-info">Billable</h3>
          <div>
            {sow > 0 ? (
               <Row>
               <Col md={3}>
                 <Card>
                   <ProjectSummary
                     contract={sow}
                     actuals={billable_actuals}
                   />
                 </Card>
               </Col>
               <Col>
                 <Card>
                   <Burndown
                     end_date={end_date}
                     actual_amount={b_actuals_truncated}
                     plan_amount={billable_plan}
                   />
                 </Card>
               </Col>
             </Row>
            ) : (<Alert variant="warning">Customer is not billed for this engagement</Alert>)}
           
          </div>
          <hr />
          <h3 className="text-center text-success">Adoption Incentive</h3>
          <div>
            {ai > 0 ? (
                          <Row>
                          <Col md={3}>
                            <Card>
                              <ProjectSummary
                                contract={ai}
                                actuals={ai_actuals}
                              />
                            </Card>
                          </Col>
                          <Col>
                            <Card>
                              <Burndown
                                end_date={end_date}
                                actual_amount={ai_actuals_truncated}
                                plan_amount={ai_plan}
                              />
                            </Card>
                          </Col>
                        </Row>
            ) : (<Alert variant="warning">No investment for this engagement</Alert>)}

          </div>
        </div>

    </div>
  );
};

export default ProjectDetails;
