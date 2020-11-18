import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Infocard.css";

function Infocard({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infocard ${active && "infocard--selected"} ${
        isRed && "infocard--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infocard__cases ${!isRed && "infocard__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infocard__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infocard;
