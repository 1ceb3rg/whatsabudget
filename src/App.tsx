import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// import "./App.css";
import {
  getBalance,
  getMonths,
  getTotal,
  parseChat,
  Person,
} from "./utilties/budget";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarOptions,
//   ChartOptions,
//   PluginOptionsByType,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Bar, Chart, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//@ts-ignore
import autocolors from "chartjs-plugin-autocolors";
import ChartWrapper from "./components/ChartWrapper";
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,

  autocolors
);

export const options = {
  responsive: true,

  plugins: {
    // legend: {
    //   position: "top" as const,
    // },
    autocolors: {
      mode: "data",
    },
    title: {
      display: false,
      text: "Budget",
    },
  },
};

const fileText = `[10/6/21, 06:24:28] ‎You created group “Budget”
[10/6/21, 06:24:28] Budget: ‎Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
[11/10/21, 13:54:26] Person 2: 214 
[11/16/21, 11:07:41] Person 2: 138 
[11/16/21, 11:49:08] Person 1: 49 
[11/17/21, 15:31:04] Person 1: 15
[11/17/21, 15:34:16] Person 2: 36
[11/23/21, 11:28:56] Person 2: 85
[11/28/21, 12:56:49] Person 1: 36.71
[11/28/21, 20:03:31] Person 1: 25.92
[11/30/21, 12:22:44] Person 1: 33.42
[12/1/21, 16:22:26] Person 1: 165.99
[12/2/21, 11:23:30] Person 2: 25
[12/4/21, 10:36:30] Person 2: 30
[12/4/21, 11:35:12] Person 1: 50.89
[12/5/21, 09:07:39] Person 2: 24
[12/5/21, 23:01:10] Person 1: 38.76
[12/8/21, 12:07:19] Person 2: 95
[12/8/21, 12:45:36] Person 1: 15
[12/8/21, 12:46:29] Person 2: 80
[12/9/21, 14:31:32] Person 1: 18.07
[12/9/21, 17:24:56] Person 1: 37.45
[12/10/21, 11:59:58] Person 2: 45
[12/10/21, 12:04:15] Person 2: 30
[12/11/21, 11:21:46] Person 2: 20
[12/19/21, 22:08:21] Person 2: 60
[12/21/21, 13:38:24] Person 2: 25 
[12/21/21, 20:36:34] Person 1: 70
[12/21/21, 20:37:06] Person 1: 8.18
[12/21/21, 20:37:30] Person 1: 19.50
[12/23/21, 11:38:26] Person 2: 46.67
[12/27/21, 15:32:10] Person 2: 47.23
[12/27/21, 15:32:35] Person 2: 93.02
[12/30/21, 18:01:24] Person 1: 7.86
[12/30/21, 18:01:28] Person 1: 38.76
[12/31/21, 10:59:52] Person 2: 140.62
[12/31/21, 10:59:57] Person 2: 34.95
[12/31/21, 12:32:11] Person 1: 51.77
[1/2/22, 21:20:20] Person 1: 50.40
[1/2/22, 21:21:54] Person 2: 😟
[1/3/22, 01:15:07] Person 1: 24.99
[1/3/22, 11:24:14] Person 2: 42.51
[1/5/22, 16:31:55] Person 1: 70.92
[1/24/22, 10:19:54] Person 2: 47.20
[1/24/22, 10:20:03] Person 2: 44.10
[1/24/22, 10:20:13] Person 2: 43.18
[1/24/22, 10:20:20] Person 2: 63.99
[1/26/22, 10:20:50] Person 2: 54.25
[1/27/22, 13:52:20] Person 2: 19.83
[1/28/22, 14:33:41] Person 2: 36.13
[1/29/22, 12:59:06] Person 1: 37
[1/29/22, 13:03:11] Person 1: 68
[1/29/22, 13:06:04] Person 1: 3
[1/29/22, 13:06:12] Person 1: 5.18
[1/29/22, 13:06:19] Person 1: 3
[1/29/22, 13:06:49] Person 1: 27.3
[1/29/22, 13:07:37] Person 1: 8.82
[1/29/22, 13:08:42] Person 1: 74
[1/29/22, 13:09:41] Person 1: 27.34
[1/29/22, 13:09:43] Person 1: 77.44
[1/29/22, 13:09:57] Person 1: 60.32
[1/29/22, 13:10:32] Person 1: 8.99
[1/29/22, 20:36:12] Person 2: 14.60
[1/31/22, 15:58:24] Person 1: 64.61
[2/2/22, 14:17:02] Person 2: 57.08
[2/2/22, 16:17:23] Person 1: 51.10
[2/4/22, 10:09:17] Person 2: 62.06
[2/6/22, 10:03:48] Person 2: 38.49
[2/9/22, 16:23:49] Person 1: 67.59
[2/11/22, 16:58:40] Person 2: 19
[2/12/22, 19:54:29] Person 1: 36.02
[2/12/22, 19:54:43] Person 1: 19.30
[2/12/22, 19:55:07] Person 1: 24.75
[2/17/22, 19:04:25] Person 1: 62.41
[2/18/22, 16:52:54] Person 2: 74.63
[2/19/22, 11:46:01] Person 2: 55.46
[2/23/22, 16:18:07] Person 1: 41.91
[2/26/22, 12:39:20] Person 1: 38.60
[2/26/22, 12:39:24] Person 1: 3
[2/27/22, 10:52:42] Person 1: 13.13
[2/27/22, 11:22:26] Person 1: 2.63
[3/1/22, 09:49:27] Person 2: 50.05
[3/2/22, 12:50:33] Person 1: 50.15
[3/2/22, 12:52:37] Person 1: 49.01
[3/2/22, 14:05:48] Person 2: 54.72
[3/14/22, 12:26:04] Person 2: 32.11
[3/18/22, 13:46:18] Person 2: 42.21
[3/23/22, 12:06:01] Person 2: 92.18
[3/27/22, 12:37:35] Person 2: 57.46
[3/28/22, 22:15:17] Person 1: 38.64
[3/29/22, 13:07:30] Person 1: 20.10
[3/30/22, 14:07:40] Person 1: 9.65
[3/31/22, 11:25:39] Person 1: 79.28
[3/31/22, 21:06:38] Person 1: 21.25
[3/31/22, 21:06:49] Person 1: 23.45
[3/31/22, 21:07:37] Person 1: 12.50
[3/31/22, 21:08:32] Person 1: 29.60`;

const reader = new FileReader();
function App() {
  const [startDate, setStartDate] = useState(new Date("04/04/2021"));
  const [endDate, setEndDate] = useState(new Date());
  const [chatText, setChatText] = useState<string>("");
  const [chatData, setChatData] = useState<Person[] | null>(
    parseChat(fileText, startDate, endDate)
  );
  useEffect(() => {
    if (chatText !== "") setChatData(parseChat(chatText, startDate, endDate));
  }, [chatText, startDate, endDate]);

  const { isFocused, isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      accept: "text/plain",
      onDrop: (files) => {
        files[0] && files[0].text().then((text) => setChatText(text));
      },
    });

  // useEffect(() => {
  //   // console.log(getTotals(chatText, startDate));
  //   setBudget(getMonthData(startDate, endDate, chatText));
  // }, [startDate]);
  // useEffect(() => {
  //   setBudget(getMonthData(startDate, endDate, chatText));
  //   console.log(getTotals(chatText));
  // }, [endDate]);

  return (
    <div className="">
      <header className="w-full bg-[#008069] py-4 px-4 text-white">
        <h1 className="text-bold text-3xl">Whats-A-Budget</h1>
      </header>
      <main className="mx-auto mt-2  px-4">
        <div className="flex justify-center">
          <div
            className={` dropzone h-40 w-40 rounded-lg border-4 border-dashed border-gray-200 bg-white p-4  text-black hover:bg-blue-50 ${
              isDragAccept && "bg-blue-50"
            } ${isDragReject && "bg-red-100"} `}
            {...getRootProps({})}
          >
            <input {...getInputProps()} />
            <p>
              Export your chat and drop the `_chat.txt` file here, or click here
              to select it
            </p>
          </div>
        </div>
        {chatData && (
          <div className="">
            <div className="flex w-full justify-center">
              <div className="flex  flex-col justify-items-center gap-2  py-2  lg:flex-row">
                <ReactDatePicker
                  className="w-mint"
                  calendarClassName="w-min"
                  selected={new Date(startDate)}
                  onChange={(date) => date && setStartDate(date)}
                />
                <ReactDatePicker
                  className="w-fit"
                  selected={new Date(endDate)}
                  onChange={(date) => date && setEndDate(date)}
                />
              </div>
            </div>
            <div className="">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className=" flex justify-center py-5 ">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Budget Balance
                  </h3>
                  {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    {getBalance(chatData).balances.map((person) => (
                      <div
                        key={person.name}
                        className="bg-white px-4 py-5 odd:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          {person.name}
                        </dt>
                        <dd
                          className={`mt-1 text-sm text-gray-900 ${
                            person.balance < 0 && "text-red-500"
                          }  sm:col-span-2 sm:mt-0`}
                        >
                          {person.balance.toFixed(2)}{" "}
                        </dd>
                      </div>
                    ))}
                    <div className="bg-white px-4 py-5 odd:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {getBalance(chatData).total}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-x-2">
              <ChartWrapper title="Total Spent">
                <Bar
                  options={options}
                  data={{
                    labels: chatData.map((item) => item.name),

                    datasets: [
                      {
                        label: "total",
                        data: chatData.map((person) =>
                          getTotal(person.entries)
                        ),
                      },
                    ],
                  }}
                />
              </ChartWrapper>
              <ChartWrapper title="Total by month">
                <Line
                  options={options}
                  data={{
                    labels: Object.keys(getMonths(chatData[0])),

                    datasets: [
                      ...chatData.map((person) => {
                        return {
                          label: person.name,
                          data: Object.keys(getMonths(person)).map(
                            (month) => getMonths(person)[month]
                          ),
                        };
                      }),
                      {
                        label: "total",
                        data: chatData
                          .map((person) => {
                            return {
                              label: person.name,
                              data: Object.keys(getMonths(person)).map(
                                (month) => getMonths(person)[month]
                              ),
                            };
                          })
                          .reduce((acc, curr) => {
                            if (acc.length > 0)
                              return acc.map(
                                (num, index) => num + curr.data[index]
                              );
                            else return curr.data;
                          }, [] as Array<number>),
                      },
                    ],
                  }}
                />
              </ChartWrapper>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
