import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function Infocard({title, cases, total}) {
  return (
    <Card className="infoCard">
      <CardContent >
        <Typography className="infoCard__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoCard__cases">
          {cases}
        </h2>
        <Typography className="infoCard__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Infocard
