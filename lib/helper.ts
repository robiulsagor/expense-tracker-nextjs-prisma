const formatMonth = (currentMonth: Date) => {
  const date = new Date(currentMonth);
  date.setMonth(date.getMonth() - 1);
  // need to minus 1 because the month is zero based 
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export { formatMonth };
