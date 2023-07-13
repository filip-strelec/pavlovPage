let dataAPI = {};
let dataServerInfo = [];
let dataServerList = [];

let fakedDataServerList = [
  {
    PlayerName: "eeeilip",
    UniqueId: "12345678901234567",
    KDA: "33/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filreheip",
    UniqueId: "12345678901234567",
    KDA: "73/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filgeip",
    UniqueId: "12345678901234567",
    KDA: "3/1/24",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filip",
    UniqueId: "12345678901234567",
    KDA: "3/81/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filip",
    UniqueId: "12345678901234567",
    KDA: "3/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filip",
    UniqueId: "12345678901234567",
    KDA: "3/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filip",
    UniqueId: "12345678901234567",
    KDA: "3/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "0",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Filip",
    UniqueId: "12345678901234567",
    KDA: "3/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "0",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Patka",
    UniqueId: "1567856767",
    KDA: "2/11/22",
    Score: "1265",
    Dead: true,
    Cash: "3450",
    TeamId: "0",
    Ping: 55.857143402099609,
    Gag: true,
  },
  {
    PlayerName: "Slatka",
    UniqueId: "12345678901234567",
    KDA: "3/1/2",
    Score: "50",
    Dead: false,
    Cash: "3450",
    TeamId: "1",
    Ping: 39.857143402099609,
    Gag: false,
  },
  {
    PlayerName: "Macka",
    UniqueId: "12354342767",
    KDA: "6/14/32",
    Score: "120",
    Dead: true,
    Cash: "5430",
    TeamId: "0",
    Ping: 0.84257143402099609,
    Gag: false,
  },
];


const populateHTMLWithData = (serverInfoArray, serverListArray) => {
  let htmlString = "";
  let tableString = "";
  for (let i = 0; i < serverInfoArray.length; i++) {
    tableString = "";
    // serverListArray[i].InspectList = fakedDataServerList;

    for (
      let pIndex = 0;
      pIndex < serverListArray[i].InspectList.length;
      pIndex++
    ) {
      tableString =
        tableString +
        `
      <tr class="${
        serverListArray[i].InspectList[pIndex].TeamId == "0"
          ? "team-0"
          : "team-1"
      }">
        <td>${serverListArray[i].InspectList[pIndex].PlayerName}</td>
        <td>${serverListArray[i].InspectList[pIndex].KDA}</td>
        <td>${!serverListArray[i].InspectList[pIndex].Dead}</td>
        <td>${serverListArray[i].InspectList[pIndex].Score}</td>
        <td>${serverListArray[i].InspectList[pIndex].TeamId}</td>
        <td>${Math.floor(serverListArray[i].InspectList[pIndex].Ping)}</td>
        <td>${serverListArray[i].InspectList[pIndex].Gag}</td>
      </tr>
      
    `;
    }

    let individualServerHTMLString = `
    <div class="individualServer server${i}">
    
    <h4 class="map-name">
    CURRENT MAP: ${serverInfoArray[i].mapName}
    
    </h4>
    <img class="map-img" src="${serverInfoArray[i].imgUrl}"/>
    
    <p class="round-status">
    Round Status: ${serverInfoArray[i].RoundState}
    </p>
    <p class="player-count">
    Player Count: ${serverInfoArray[i].PlayerCount}
    </p>

    <div class="flex-score">
    <p class="team-score">
    Team 0 - Score: ${serverInfoArray[i].Team0Score}
    </p>
    <p class="team-score">
    Team 1 - Score: ${serverInfoArray[i].Team1Score}
    </p>
    </div>

<div class="table-wrapper">
    <table  class="sortable">
    <thead>
      <tr>
        <th>Player Name</th>
        <th>KDA</th>
        <th>Alive</th>
        <th>Score</th>
        <th>Team ID</th>
        <th>Ping</th>
        <th>Muted</th>
      </tr>
    </thead>
    <tbody id="table-players${i}">
      
${tableString}
    </tbody>
    </table>
    </div>
    
    </div>
    `;
    htmlString = htmlString + individualServerHTMLString;
  }

  document.getElementById("server-info").innerHTML = htmlString;
};

const getData = () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://pavlov.jazbina.xyz/data/all-data/all-data.json",
    true
  );

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText);
      dataAPI = data;
      dataServerInfo=[];
      dataServerList=[];

      for (let index = 0; index < 3; index++) {
        const elementInfo = dataAPI[`server${index + 1}_info`];
        dataServerInfo.push(elementInfo);

        const elementList = dataAPI[`server${index + 1}_list`];
        dataServerList.push(elementList);
      }

      populateHTMLWithData(dataServerInfo, dataServerList);
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
  };

  request.send();
};

// 2 objekta -> server info i server list
// iteracija po svakom elementu u objektu i za svaki napravi html elemenet

getData();

setInterval(()=>{getData()},10000)