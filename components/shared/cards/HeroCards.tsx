import React from 'react'
import SingleCard from './SingleCard'

const HeroCards = () => {
  return (
    <div className=' bg-slate-50 p-6 rounded-lg shadow-md flex gap-6'>
      <SingleCard amount={1000} type="income" />
      <SingleCard amount={500} type="expense" />
      <SingleCard amount={500} type="balance" />
    </div>
  )
}

export default HeroCards
