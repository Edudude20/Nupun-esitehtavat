import { useState } from "react";
import "./App.css";
import busStopService from "./services/busStopService";

function App() {
  const [data, setData] = useState([]);
  const [stopID, setStopID] = useState("");
  const [isError, setIsError] = useState(false);

  const getData = () => {
    console.log("get data");
    busStopService
      .getAllBuses(stopID)
      .then((initialBuses) => {
        console.log("promise fulfilled, request data:", initialBuses);
        setData(initialBuses);
      })
      .catch((error) => {
        console.log("fail", error);
        setIsError(true);
      });
  };

  const convertToTime = (unixTimestamp) => {
    const myTime = new Date(unixTimestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return <td>{myTime}</td>;
  };

  const calculateTimeDifference = (timestamp1, timestamp2) => {
    const time1 = timestamp1 * 1000;
    const time2 = timestamp2 * 1000;

    const difference = Math.floor((time1 - time2) / (1000 * 60));

    return <td>{difference}</td>;
  };

  const handleStopInputChange = (event) => {
    console.log(event.target.value);
    setStopID(event.target.value);
  };

  return (
    <>
      <h1>Pysäkkiaikataulut</h1>
      <h2>by Eetu Nummelin</h2>
      <div className="card">
      <label htmlFor="stopInput">Pysäkin numero:</label>
        <input id="stopInput" name="stopInput" type="text" value={stopID} onChange={handleStopInputChange} />
        <button onClick={getData}>Päivitä taulukko</button>
      </div>
      <div className="table_component">
        <table>
          <caption>Taulukko</caption>
          <thead>
            <tr>
              <th>Bussi nro</th>
              <th>Päätepysäkki</th>
              <th>Arvioitu Saapumisaika</th>
              <th>Arvioitu Lähtöaika</th>
              <th>Aikataulussa min.(+/-)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bus) => (
              <tr key={bus.__tripref}>
                <td>{bus.lineref}</td>
                <td>{bus.destinationdisplay}</td>
                {convertToTime(bus.expectedarrivaltime)}
                {convertToTime(bus.expecteddeparturetime)}
                {calculateTimeDifference(
                  bus.expectedarrivaltime,
                  bus.aimedarrivaltime
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
