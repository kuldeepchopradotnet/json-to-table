import './style.css';
class JsonToTable {
  data = null;
  constructor(jsonData) {
    this.data = jsonData;
  }

  convert() {
    const emptyCol = '-';
    const jsonData = this.validateData();
    let table = '<table><tr>';
    const tableHeaders = [];
    const tableRows = [];
    jsonData.forEach((e) => {
      for (let key in e) {
        if (!tableHeaders.some((h) => h === key)) {
          tableHeaders.push(key);
        }
      }
      tableRows[0] = tableHeaders;

      const tableRow = [];
      tableHeaders.forEach((h) => {
        const value = e[h] ? e[h] : emptyCol;
        tableRow.push(value);
      });
      tableRows.push(tableRow);
    });
    let headerLength = 0;
    tableRows.forEach((row, i) => {
      if (i === 0) {
        headerLength = row.length;
        table += row.map((r) => `<th>${r}</th>`).join('');
        table += '</tr>';
      } else {
        table += '<tr>';
        for (let i = 0; i < headerLength; i++) {
          const value = row[i] ? row[i] : emptyCol;
          table += `<td>${value}</td>`;
        }
        table += '</tr>';
      }
    });
    table += '<table>';
    return table;
  }

  validateData() {
    try {
      const { data } = this;
      let jsonData = null;
      if (typeof data === 'string') {
        jsonData = JSON.parse(data);
      } else if (typeof data === 'object') {
        jsonData = data;
      }
      if (jsonData) {
        return jsonData;
      } else {
        throw 'invalid data';
      }
    } catch (e) {
      throw e;
    }
  }
}

class Main {
  appEle = document.getElementById('app');

  constructor() {
    const testData = [
      {
        id: '1',
        name: 'kuldeep',
        phone: '98098',
      },
      {
        id: '2',
        email: 'jhon@gmail.com',
        name: 'jhon',
      },
      {
        id: '3',
        email: 'bruce@gmail.com',
        name: 'bruce',
        phone: '98098',
      },
      {
        id: '4',
        email: 'peter@gmail.com',
        name: 'peter',
      },
    ];
    const table = new JsonToTable(testData).convert();
    console.log(table);
    this.appEle.innerHTML = table; //JSON.stringify(table);
  }
}

new Main();
