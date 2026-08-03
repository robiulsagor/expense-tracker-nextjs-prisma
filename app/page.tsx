import HeroCards from "@/components/shared/cards/HeroCards";
import ExpenseCard from "@/components/shared/ExpenseCard";
import IncomeCard from "@/components/shared/IncomeCard";
import Tracker from "@/components/shared/tracker";
import DetailsWrapper from "./DetailsWrapper";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-5 py-2">
      <Tracker />
      <div className="col-span-2 flex flex-col gap-1  ">
        <HeroCards />
        <div className="grid grid-cols-1 md:grid-cols-2 items-baseline gap-5 mt-5">
          <IncomeCard/>
          <ExpenseCard/>
        </div>
      </div>

      <DetailsWrapper />
    </div>
  );
}
