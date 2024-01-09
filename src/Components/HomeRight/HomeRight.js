import React from 'react'
import SearchUsers from '../SearchUsers/SearchUsers'
import PopularUsers from './PopularUsers'
import { Card } from '@mui/material'

const popularuser = [1,1,1,1]
const HomeRight = () => {
  return (
    <div className='pr-5'>
      <SearchUsers />
      <Card className='p-5'>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-semibold opacity-70'>Suggestion for you</p>
          <p className='text-xs font-semibold opacity-95'>Views All</p>
        </div>
        <div className=''>
          {popularuser.map((item) => <PopularUsers />)}
        </div>
      </Card>

    </div>
  )
}

export default HomeRight