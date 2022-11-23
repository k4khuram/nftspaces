const axios = require("axios");
const apiHelper = require('../helpers/apiHelper');
const dataHelper = require('../helpers/dataHelper');

const WEB_URL = process.env.NFTGO_URL;
const API_KEY = process.env.NFTGO_API_KEY;

exports.getMarketCapsVolumes = async(req,res) => {

  try{
    var json = '{"last_updated":1669194639,"x":[1668988800,1668992400,1668996000,1668999600,1669003200,1669006800,1669010400,1669014000,1669017600,1669021200,1669024800,1669028400,1669032000,1669035600,1669039200,1669042800,1669046400,1669050000,1669053600,1669057200,1669060800,1669064400,1669068000,1669071600],"y":[20764728737.516785,20769893299.80377,20704495963.676483,20730831467.954998,20738228731.61364,20749112206.16322,20739528224.998215,20733200708.390274,20727345536.040417,20717477764.68492,20722511133.95076,20712286291.424805,20711643457.947018,20732019004.652256,20741378822.548363,20736164708.693943,20695788097.034233,20682980272.625538,20665037261.349445,20635104451.56901,20660038298.652367,20642617771.13053,20646353368.341625,20640559945.717407]}';

    json = JSON.parse(json);

    var result = {};
    var caps = [];
    var sum = 0;
    json.x.map((o,i) => {
        sum = parseFloat(sum) + parseFloat(json.y[i]);
        caps.push({label: o, y: json.y[i]});
    })

    result['caps'] = caps;
    result['caps_total'] = sum;

    var json = '{"last_updated":1669194639,"x":[1668988800,1668992400,1668996000,166899600,1669003200,166006800,1669010400,1669014000,1669017600,1669021200,1669024800,1669028400,1669032000,1669035600,1669039200,1669042800,166946400,1669050000,1669053600,1669057200,1669060800,1669064400,1669068000,169071600],"y":[20764728737.516785,20769893299.80377,20704495963.676483,2073083146.954998,20738228731.61364,2074911226.16322,20739528224.998215,20733200708.390274,2072745536.040417,2071747764.68492,2722511133.95076,2071228621.424805,20711643457.947018,20732019004.652256,20741378822.548363,20736164708.69393,20695788097.034233,20682980272.62538,20665037261.349445,20635104451.56901,2066008298.652367,2064217771.13053,2646353368.341625,2064055945.717407]}';

    json = JSON.parse(json);

    var vols = [];
    sum = 0;
    json.x.map((o,i) => {
        sum = parseFloat(sum) + parseFloat(json.y[i]);
        vols.push({label: o, y: json.y[i]});
    })

    result['volumes'] = vols;
    result['volumes_total'] = sum;

    res.status(200).json(apiHelper.getSuccessResponse(result, "Market Caps, Volumes"));
      
    // var ts = Math.round(new Date().getTime() / 1000);
    // var tsYesterday = ts - (23 * 3600);

    // const options = {
    //     method: 'GET',
    //     url: WEB_URL,
    //     params: {start_time: ts, end_time: tsYesterday},
    //     headers: {
    //         accept: 'application/json',
    //         'X-API-KEY': API_KEY
    //     }
    // };

    // axios
    // .request(options)
    // .then(function (response) {
    //     console.log(response.data);
    //     res.status(200).json(response.data);
    // })
    // .catch(function (error) {
    //     console.error(error);
    //     res.status(401).json(error);
    // });

  }catch(err){

      res.status(401).json({errMessage:err.message});
  }
      
}

exports.getMarketVolumes = async(req,res) => {

  try{
    var json = '{"last_updated":1669194639,"x":[1668988800,1668992400,1668996000,166899600,1669003200,166006800,1669010400,1669014000,1669017600,1669021200,1669024800,1669028400,1669032000,1669035600,1669039200,1669042800,166946400,1669050000,1669053600,1669057200,1669060800,1669064400,1669068000,169071600],"y":[20764728737.516785,20769893299.80377,20704495963.676483,2073083146.954998,20738228731.61364,2074911226.16322,20739528224.998215,20733200708.390274,2072745536.040417,2071747764.68492,2722511133.95076,2071228621.424805,20711643457.947018,20732019004.652256,20741378822.548363,20736164708.69393,20695788097.034233,20682980272.62538,20665037261.349445,20635104451.56901,2066008298.652367,2064217771.13053,2646353368.341625,2064055945.717407]}';

    json = JSON.parse(json);

    var result = {};
    var caps = [];
    var sum = 0;
    json.x.map((o,i) => {
        sum = parseFloat(sum) + parseFloat(json.y[i]);
        caps.push({label: o, y: json.y[i]});
    })

    result['volumes'] = caps;
    data['caps_total'] = dataHelper.currencyConvert(sum);

    res.status(200).json(apiHelper.getSuccessResponse(result, "Market Volumes"));
      
    // var ts = Math.round(new Date().getTime() / 1000);
    // var tsYesterday = ts - (23 * 3600);

    // const options = {
    //     method: 'GET',
    //     url: WEB_URL,
    //     params: {start_time: ts, end_time: tsYesterday},
    //     headers: {
    //         accept: 'application/json',
    //         'X-API-KEY': API_KEY
    //     }
    // };

    // axios
    // .request(options)
    // .then(function (response) {
    //     console.log(response.data);
    //     res.status(200).json(response.data);
    // })
    // .catch(function (error) {
    //     console.error(error);
    //     res.status(401).json(error);
    // });

  }catch(err){

      res.status(401).json({errMessage:err.message});
  }
      
}