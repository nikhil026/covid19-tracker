// Incache time in ms
export const inCacheTime = 1800000;

const getAPI = async url => fetch(url).then(data => data.json());

export const fetchSummaryData = async (sort = null) => {

  try {
    if (JSON.parse(window.localStorage['summaryData']).timeStamp + inCacheTime > new Date().getTime()) {
      return JSON.parse(window.localStorage['summaryData']);
    } else {
      throw new Error('Old')
    }
  } catch (e) {
    let result = await getAPI(`https://api.covid19api.com/summary`);
    window.localStorage.setItem('summaryData', JSON.stringify({ ...result, timeStamp: new Date().getTime() }));
    return result;
  }

}

export const fetchCountryAllData = async (countryName) => {
  try {
    if (JSON.parse(window.localStorage[`countryAllData__${countryName}`]).timeStamp + inCacheTime > new Date().getTime()) {
      return JSON.parse(window.localStorage[`countryAllData__${countryName}`])['data'];
    } else {
      throw new Error('Old')
    }
  } catch (e) {
    let result = await getAPI(`https://api.covid19api.com/total/dayone/country/${countryName}`);
    let countryData = { data: result, timeStamp: new Date().getTime() };
    window.localStorage.setItem(`countryAllData__${countryName}`, JSON.stringify(countryData));
    return result;
  }
}

export const fetchIndianData = async () => {
  try {
    if (JSON.parse(window.localStorage["IndianData"]).timeStamp + inCacheTime > new Date().getTime()) {
      return JSON.parse(window.localStorage["IndianData"])['data'];
    } else {
      throw new Error('Old')
    }
  } catch (e) {
    let result = await getAPI(`/api/covid19/india/`);
    let countryData = { data: result, timeStamp: new Date().getTime() };
    window.localStorage.setItem("IndianData", JSON.stringify(countryData));
    return result;
  }
}