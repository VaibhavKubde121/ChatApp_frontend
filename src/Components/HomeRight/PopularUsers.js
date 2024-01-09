import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'


const PopularUsers = () => {
  return (
    <div>
          <CardHeader
              avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                  </Avatar>
              }
              action={
                  <Button size='small'>
                    Follow
                  </Button>
              }
              title="Vaibhav Kubde"
              subheader="@vaibhavkubde"
          />
    </div>
  )
}

export default PopularUsers