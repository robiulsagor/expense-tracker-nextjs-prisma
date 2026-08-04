import HeroCards from '@/components/shared/cards/HeroCards'
import ExpenseCard from '@/components/shared/ExpenseCard'
import IncomeCard from '@/components/shared/IncomeCard'
import Tracker from '@/components/shared/tracker'
import ViewDetails from '@/components/shared/ViewDetails'
import { TransactionData } from '@/types'

const list : TransactionData[] = [
  {
    id: 1,
    type: "income",
    category: "salary",
    specifically: "monthly salary",
    amount: 5000,
    date: new Date("2026-07-01"),
    note: "received on 1st of every month",
  },
  {
    id: 2,
    type: "income",
    category: "Outsourcing",
    specifically: "freelance work",
    amount: 10000,
    date: new Date("2026-07-01"),
    note: "received on 1st of every month",
  },
  {
    id: 3,
    type: "expense",
    category: "medicine",
    specifically: "medication",
    amount: 1000,
    date: new Date("2026-07-01"),
    note: "",
  },
  {
    id: 4,
    type: "income",
    category: "bond",
    specifically: "",
    amount: 5000,
    date: new Date("2026-07-01"),
    note: "received on 1st of every month",
  },
  {
    id: 5,
    type: "expense",
    category: "food",
    specifically: "bought food",
    amount: 2000,
    date: new Date("2026-08-01"),
    note: "bought food for the family",
  },
];

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-baseline top-1 gap-5 py-2">
      <Tracker />
      <div className="col-span-1 md:col-span-2 flex flex-col gap-1  ">
        <HeroCards />
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-5 mt-5">
          <IncomeCard data={list.filter((item)=> item.type === "income")}/>
          <ExpenseCard data={list.filter((item)=> item.type === "expense")}/>
        </div>
      </div>

      <ViewDetails />
    </div>
  )
}

export default page
