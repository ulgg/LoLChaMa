#LoLChaMa
A tweitter bot to tweet your top 3 champion masteries of League of Legends (LoL) on your timeline periodically.

## Demo
[#LoLChaMa](https://twitter.com/hashtag/LoLChaMa?f=tweets&vertical=default&src=hash)

![image](https://cloud.githubusercontent.com/assets/11805940/15087476/eb3e65b0-1423-11e6-86c4-64e2515666bd.png)
## Description
I created this to learn Amazon Web Service(AWS) and Riot API. And I wanted to create a software at no cost. So I uses AWS Lamda to create this. And I use CloudWatdh to run Lamda function periodically. Lamda and CloudWatdh have monthly free tier usage. It's enough to run a simple bot. 

And why Twitter bot? Because I didn't want to use an additional web hosting service at that time. However, AWS has a Simple Storage Service(S3) that can be a web server and has free tier usage for 12 monthes. But I wanted to run the bot long time over 12 monthes. So I chose Twitter for an output page.

Architecture is CloudWatch > Lambda > Twitter.

![Architecture is CloudWatch > Lambda > Twitter](https://cloud.githubusercontent.com/assets/11805940/15088395/e6d4447c-142d-11e6-812b-64dee3d60b17.png "CloudWatch > Lambda > Twitter")

A entry for "[The Riot Games API Challenge 2016 (4/22 - 5/9)] (https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1)" - "3. Creativity/Originality" category.

The name "LoLChama" came from LoL Champion Mastery.

## Requirement
1. [Riot API Key](https://developer.riotgames.com/)
1. [AWS Account and IAM user for Lamda](https://docs.aws.amazon.com/lambda/latest/dg/setting-up.html)
1. [Node.js v4.4.3 (npm 2.15.1)](https://nodejs.org/en/download/)
2. [![async](https://nodei.co/npm/async.png?mini=true)](https://www.npmjs.com/package/async "async")
3. [![twitter](https://nodei.co/npm/twitter.png?mini=true)](https://www.npmjs.com/package/twitter "twitter")
4. [![riot-api-client](https://nodei.co/npm/riot-api-client.png?mini=true)](https://www.npmjs.com/package/riot-api-client "riot-api-client")

## Usage

## Install

## Contribution

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[tcnksm](https://github.com/tcnksm)
