//Setting
var summonerName = '<Summoner Name>';
var riotApiKey = '<Your Riot Api Key>';
var riotApiUrlSummonerID_beforeSumnNM = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
var riotApiUrlTopchampions_beforeSumnID = 'https://na.api.pvp.net/championmastery/location/NA1/player/';
var riotApiUrlStaticChampionInfo_beforeChmpId = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
var twitter_consumer_key = '<Your Twitter Consumer Key>';
var twitter_consumer_secret = '<Your Twitter Consumer Secret Key>';
var twitter_access_token_key = '<Your Twitter Access Token Key>';
var twitter_access_token_secret = '<Your Twitter Access Token Secret Key>';

//async
var async = require('async');

//Twitter
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: twitter_consumer_key,
  consumer_secret: twitter_consumer_secret,
  access_token_key: twitter_access_token_key,
  access_token_secret: twitter_access_token_secret
});

//riot-api-client
var config = {
  apiKey: riotApiKey,
  requestLimit: '10'
}
var riotApi = require('riot-api-client')(config);

//After Riot APi Url
var apiUrlTopchampions_afterSumnID = '/topchampions';
var apiUrlStaticChampionInfo_afterChmpId = '?champData=info';

//Lambda
exports.handler = function(event, context) {
  async.waterfall([
    function getSummonerId(callback2) {
      var riotApiUrlSummonerID = riotApiUrlSummonerID_beforeSumnNM + summonerName;
      var summonerId = null;
      riotApi.get(riotApiUrlSummonerID, function callback(err, data){
        console.log('getSummonerId data : ' + JSON.stringify(data));
        for(key in data){
          summonerId = data[key].id;
          break;
        }
        console.log('summonerId : ' + summonerId);
        callback2(null, summonerId);
      });
    },
    function getTopchampions(summonerId, callback2) {
      var apiUrlTopchampions = riotApiUrlTopchampions_beforeSumnID
                             + summonerId
                             + apiUrlTopchampions_afterSumnID;
      riotApi.get(apiUrlTopchampions, function callback(err, data){
        console.log('getTopchampions data : ' + JSON.stringify(data));
        var champMasteriyInfos = [];
        for(var i  = 0; i < data.length; i++) {
          champMasteriyInfos[i] = {
              'championId' : data[i].championId,
              'championPoints' : data[i].championPoints 
          };
        };
        console.log('champMasteriyInfos[0].championId : ' + champMasteriyInfos[0].championId);
        console.log('champMasteriyInfos[0].championPoints : ' + champMasteriyInfos[0].championPoints);
        callback2(null, champMasteriyInfos);
      });
    },
    function getChampionName_001(champMasteriyInfos, callback2) {
      var championName = null;
      var apiUrlStaticChampionInfo = riotApiUrlStaticChampionInfo_beforeChmpId
                                   + champMasteriyInfos[0].championId
                                   + apiUrlStaticChampionInfo_afterChmpId;
      riotApi.static(apiUrlStaticChampionInfo, function callback(err, data){
        champMasteriyInfos[0].championName = data.name;
        console.log('champMasteriyInfos[0].championName : ' + champMasteriyInfos[0].championName);
        callback2(null, champMasteriyInfos);
      });
    },
    function getChampionName_002(champMasteriyInfos, callback2) {
      var championName = null;
      var apiUrlStaticChampionInfo = riotApiUrlStaticChampionInfo_beforeChmpId
                                   + champMasteriyInfos[1].championId
                                   + apiUrlStaticChampionInfo_afterChmpId;
      riotApi.static(apiUrlStaticChampionInfo, function callback(err, data){
        champMasteriyInfos[1].championName = data.name;
        console.log('champMasteriyInfos[1].championName : ' + champMasteriyInfos[1].championName);
        callback2(null, champMasteriyInfos);
      });
    },
    function getChampionName_003(champMasteriyInfos, callback2) {
      var championName = null;
      var apiUrlStaticChampionInfo = riotApiUrlStaticChampionInfo_beforeChmpId
                                   + champMasteriyInfos[2].championId
                                   + apiUrlStaticChampionInfo_afterChmpId;
      riotApi.static(apiUrlStaticChampionInfo, function callback(err, data){
        champMasteriyInfos[2].championName = data.name;
        console.log('champMasteriyInfos[2].championName : ' + champMasteriyInfos[2].championName);
        callback2(null, champMasteriyInfos);
      });
    },
    function tweetTopchampions(champMasteriyInfos, callback2) {
      var data = '<3<3<3 ' + champMasteriyInfos[0].championName
                 + ' (' + champMasteriyInfos[0].championPoints + ' Points)'
               + ' \n<3<3     ' + champMasteriyInfos[1].championName
                  + ' (' + champMasteriyInfos[1].championPoints + ' Points)'
               + ' \n<3         ' + champMasteriyInfos[2].championName
                 + ' (' + champMasteriyInfos[2].championPoints + ' Points)'
               + ' \n#LoLChaMa';
      var params = {status: data};
      client.post('statuses/update', params, function(error, tweet, response){
        if(error) return context.fail('failed : ' + error);
        callback2(null, 'done');
      });
    }
  ], function (err, result) {
      if(err) { console.log('Error:' + err); }
      context.succeed('done');
      console.log('waterfall all done. ', result);
  });
};
