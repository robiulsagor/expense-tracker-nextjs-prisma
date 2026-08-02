import HeroCards from "@/components/shared/cards/HeroCards";
import Tracker from "@/components/shared/tracker";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-2">
      <Tracker />
      <div className="col-span-2">
        <HeroCards />
      </div>
    </div>
  );
}
