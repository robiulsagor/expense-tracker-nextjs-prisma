import { auth } from '@/auth'
import HeroCards from '@/components/shared/cards/HeroCards'
import ExpenseCard from '@/components/shared/ExpenseCard'
import IncomeCard from '@/components/shared/IncomeCard'
import Tracker from '@/components/shared/tracker'
import ViewDetails from '@/components/shared/ViewDetails'
// import { TransactionData } from '@/types'
import { redirect } from 'next/navigation'
import { getTransactions, getTransactionSummary } from '@/lib/queries/transaction'
import DeleteModal from '@/components/shared/DeleteModal'
import { Suspense } from 'react'



const Dashboard = async ({searchParams}: { searchParams: { month?: string; year?: string } }) => {
  const params = await searchParams;
  const month = params.month ? Number(params.month) : new Date().getMonth();
  const year = params.year ? Number(params.year) : new Date().getFullYear();
  console.log("Month:", month, "Year:", year);

  const session = await auth()

  if(!session?.user?.id){
    redirect("/login")
  }

  const transactions = await getTransactions(session.user.id, month, year);
  const transactionSummary = await getTransactionSummary(session.user.id, month, year);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-baseline top-1 gap-5 py-2">
      <Tracker />
      <div className="col-span-1 md:col-span-2 flex flex-col gap-1  ">
        <HeroCards summary={transactionSummary} />
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-5 mt-5">
          <Suspense fallback={<div>Loading Income Card...</div>}>
          <IncomeCard data={transactions.filter((item)=> item.type === "income")}/>
          <ExpenseCard data={transactions.filter((item)=> item.type === "expense")}/>
          </Suspense>
        </div>
      </div>

      <ViewDetails />
      <DeleteModal />
    </div>
  )
}

export default Dashboard
