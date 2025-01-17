const Store = require('electron-store')

const store = new Store({ watch: true })

const setCityCountry = (city, country) => {
  store.set({
    city: city,
    country: country
  })
}

const getCityCountry = store.get('city') + ', ' + store.get('country')
const getCity = store.get('city')
const getCountry = store.get('country')

const setCalcMethod = (method) => store.set({ method: method })

const getCalcMethod = store.get('method')

const setCustomAngle = (fajr, isha) => {
  store.set({
    fajrAngle: fajr,
    ishaAngle: isha
  })
}

const getCustomFajrAngle = store.get('fajrAngle')
const getCustomIshaAngle = store.get('ishaAngle')

const setCheckImsak = (boolean) => store.set({ checkImsak: boolean })
const setCheckSunrise = (boolean) => store.set({ checkSunrise: boolean })
const setCheckMidnight = (boolean) => store.set({ checkMidnight: boolean })

const getCheckImsak = store.get('checkImsak')
const getCheckSunrise = store.get('checkSunrise')
const getCheckMidnight = store.get('checkMidnight')

const setTunes = (array) => {
  store.set({
    tunes: {
      imsak: array[0],
      fajr: array[1],
      sunrise: array[2],
      dhuhr: array[3],
      asr: array[4],
      maghrib: array[5],
      sunset: array[6],
      isha: array[7],
      midnight: array[8]
    }
  })
}

const getTunes = store.get('tunes')

const setMidnightMode = (value) => { store.set({ midnightMode: value }) }
const getMidnightMode = store.get('midnightMode')

const setAladhan = (json) => store.set(json)

const getCode = store.get('code')

const today = new Date()
// See Prayer Times API:
// - month start with 1 for January
// - date start with 0 for 1st day of the month
const month = today.getMonth() + 1
const date = today.getDate() - 1
const jsonPrm = `data.${month}.${date}`

const getHijriDate = () => {
  const hDay = store.get(`${jsonPrm}.date.hijri.day`)
  const hMonth = store.get(`${jsonPrm}.date.hijri.month.en`)
  const hYear = store.get(`${jsonPrm}.date.hijri.year`)
  return hDay + ' ' + hMonth + ' ' + hYear
}

// Get prayer timings.
// TODO: update the time format to correspond with toLocaleTimeString().
const getTableTimings = () => {
  const imsak = store.get('checkImsak') ? store.get(`${jsonPrm}.timings.Imsak`).split(' ')[0] : false
  const fajr = store.get(`${jsonPrm}.timings.Fajr`).split(' ')[0]
  const sunrise = store.get('checkSunrise') ? store.get(`${jsonPrm}.timings.Sunrise`).split(' ')[0] : false
  const dhuhr = store.get(`${jsonPrm}.timings.Dhuhr`).split(' ')[0]
  const asr = store.get(`${jsonPrm}.timings.Asr`).split(' ')[0]
  const maghrib = store.get(`${jsonPrm}.timings.Maghrib`).split(' ')[0]
  const isha = store.get(`${jsonPrm}.timings.Isha`).split(' ')[0]
  const midnight = store.get('checkMidnight') ? store.get(`${jsonPrm}.timings.Midnight`).split(' ')[0] : false

  const tName = []
  // ['Imsak', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight']
  if (imsak) tName.push('Imsak')
  tName.push('Fajr')
  if (sunrise) tName.push('Sunrise')
  tName.push('Dhuhr', 'Asr', 'Maghrib', 'Isha')
  if (midnight) tName.push('Midnight')

  const tTime = []
  // [imsak, fajr, sunrise, dhuhr, asr, maghrib, isha, midnight]
  if (imsak) tTime.push(imsak)
  tTime.push(fajr)
  if (sunrise) tTime.push(sunrise)
  tTime.push(dhuhr, asr, maghrib, isha)
  if (midnight) tTime.push(midnight)

  let tTable = ''
  for (let i = 0; i < tTime.length; i++) {
    tTable += '<div class="row"><div class="p-name column">' + tName[i] + '</div><div class="p-time column">' + tTime[i] + '</div></div>'
  }

  return tTable
}

exports.setCityCountry = setCityCountry
exports.getCityCountry = getCityCountry
exports.getCity = getCity
exports.getCountry = getCountry
exports.setCalcMethod = setCalcMethod
exports.getCalcMethod = getCalcMethod
exports.setCustomAngle = setCustomAngle
exports.getCustomFajrAngle = getCustomFajrAngle
exports.getCustomIshaAngle = getCustomIshaAngle
exports.setCheckImsak = setCheckImsak
exports.setCheckSunrise = setCheckSunrise
exports.setCheckMidnight = setCheckMidnight
exports.getCheckImsak = getCheckImsak
exports.getCheckSunrise = getCheckSunrise
exports.getCheckMidnight = getCheckMidnight
exports.setTunes = setTunes
exports.getTunes = getTunes
exports.setMidnightMode = setMidnightMode
exports.getMidnightMode = getMidnightMode
exports.setAladhan = setAladhan
exports.getCode = getCode
exports.getHijriDate = getHijriDate
exports.getTableTimings = getTableTimings
