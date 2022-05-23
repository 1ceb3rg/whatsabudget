import { Temporal } from "@js-temporal/polyfill";

export interface Person {
  name: string;
  entries: Entry[];
}
export interface Entry {
  amount: number;
  date: Temporal.PlainDate;
}
// parse the chat file for budget entries for specified dates
export function parseChat(
  chatText: string,
  startDate?: Date,
  endDate?: Date
): Person[] {
  const parseReg = /\[(.*)\]\s([^\:]*)\:\s(\d*\.?\d?\d?)$/;

  const sDate = startDate
    ? Temporal.PlainDateTime.from(startDate.toISOString().replace("Z", ""))
    : Temporal.PlainDate.from("2016-01-01");
  const eDate = endDate
    ? Temporal.PlainDateTime.from(endDate.toISOString().replace("Z", ""))
    : Temporal.PlainDate.from(Temporal.Now.plainDateISO());

  return chatText
    .split(/\r?\n/)
    .map((line) => parseReg.exec(line))
    .filter(
      (result) =>
        result !== null && result.length > 3 && !isNaN(parseFloat(result[3]))
    )
    .reduce((rows, row, index) => {
      const x = Temporal.PlainDate.from(
        new Date(Date.parse(row![1])).toISOString().replace("Z", "")
      );
      // console.log(eDate.valueOf())
      if (
        Temporal.PlainDate.compare(x, sDate) <= 0 ||
        Temporal.PlainDate.compare(x, eDate) >= 0
      )
        return rows;
      const match = rows.findIndex((person) => person.name === row![2]);
      
// if(match!==-1) console.log({test:row![2],match})
     if (match !== -1)
        rows[match] = {
          ...rows[match],
          entries: [
            ...rows[match].entries,
            { date: x, amount: parseFloat(row![3]) },
          ],
        };
      else
      {
        rows[rows.length] = {
          name: row![2],
          entries: [{ date: x, amount: parseFloat(row![3]) }],
        };}
        // console.log(rows)
      return rows;
    }, [] as Array<Person>);
}
// divide the budget into months
export function getMonths(person: Person, startDate?: Date,
  endDate?: Date) {
    const sDate = startDate
    ? Temporal.PlainDateTime.from(startDate.toISOString().replace("Z", ""))
    : Temporal.PlainDate.from("2016-01-01");
  const eDate = endDate
    ? Temporal.PlainDateTime.from(endDate.toISOString().replace("Z", ""))
    : Temporal.PlainDate.from(Temporal.Now.plainDateISO());
 let numMonths = sDate.until(eDate, {largestUnit:'months'});
numMonths.months
let set={}as Record<string, number>
for (let x=0;x<numMonths.months;x++) {

set[sDate.add({months:x}).toPlainYearMonth().toString()]=0 
 
}
  const months = person.entries.reduce((acc, curr) => {
    const month = curr.date.toPlainYearMonth().toString();

    return {
      ...acc,
      [month]: acc[month] ? acc[month] + curr.amount : curr.amount,
    };
  }, set);

  return months;
}
export function getBalance(persons: Person[]) {
  const total=persons.reduce(
    (total, person) => getTotal(person.entries) + total,
    0
  )  


  return {total:total, balances:
    persons.map(person=>{return {name:person.name,balance:getTotal(person.entries)-total/persons.length}})
  
  }
}

// total an array of entries
export function getTotal(entries: Entry[]) {
  return entries.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
}
