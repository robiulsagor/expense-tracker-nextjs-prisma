
const formatMonth = (currentMonth: Date)=> {
    return currentMonth.toLocaleDateString("en-US", {month: "long", year: "numeric"});
}

export {formatMonth}