module.exports = {
    cars: {
        url: 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=5aacba65-afda-4ad5-88f5-6026934140e6',
        updateInterval: 300000,
        data: []
    },
    constructions: {
        url: 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=201d8ae8-dffc-4d17-ae1f-e58d8a95b162',
        updateInterval: 600000,
        data: []
    },
    uv: {
        url: 'http://opendata.epa.gov.tw/ws/Data/UV/?format=json',
        updateInterval: 300000,
        data: []
    },
    airquality: {
        url: 'http://opendata.epa.gov.tw/ws/Data/AQX/?format=json',
        updateInterval: 300000,
        data: []
    },
}