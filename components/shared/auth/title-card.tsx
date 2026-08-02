import React from 'react'

const TitleCard = ({subtitle}: {subtitle: string}) => {
  return (
       <div className="flex-1 flex items-center justify-center flex-col space-y-2 min-h-30">
        <p className="text-2xl  font-bold text-slate-700">Expense Tracker</p>
        <p className=" text-slate-500">{subtitle}</p>
    </div>
  )
}

export default TitleCard
