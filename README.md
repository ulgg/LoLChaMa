#LoLChaMa
A twitter bot to tweet a summoner's top 3 champion masteries of League of Legends (LoL) on your timeline periodically.

## Demo
[#LoLChaMa](https://twitter.com/hashtag/LoLChaMa?f=tweets&vertical=default&src=hash)

![image](https://cloud.githubusercontent.com/assets/11805940/15088698/69c45b2a-1432-11e6-8013-721468e840d6.png)

## Description
I created this to learn Amazon Web Service(AWS) and Riot API. And I wanted to create a software at no cost. So I uses AWS Lamda to create this. And I use CloudWatdh to run Lamda function periodically. Lamda and CloudWatdh have monthly free tier usage. It's enough to run a simple bot.

And why Twitter bot? Because I didn't want to use an additional web hosting service at that time. However, AWS has a Simple Storage Service(S3) that can be a web server and has free tier usage for 12 monthes. But I wanted to run the bot long time over 12 monthes. So I chose Twitter for an output page.

Architecture is CloudWatch > Lambda > Twitter.

![Architecture is CloudWatch > Lambda > Twitter](https://cloud.githubusercontent.com/assets/11805940/15088395/e6d4447c-142d-11e6-812b-64dee3d60b17.png "CloudWatch > Lambda > Twitter")

An entry for "[The Riot Games API Challenge 2016 (4/22 - 5/9)] (https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1)" - "3. Creativity/Originality" category.

The name "LoLChama" came from LoL Champion Mastery.

## Requirement
1. [Node.js v4.4.3 (npm 2.15.1)](https://nodejs.org/en/download/)
2. [![async](https://nodei.co/npm/async.png?mini=true)](https://www.npmjs.com/package/async "async")
3. [![twitter](https://nodei.co/npm/twitter.png?mini=true)](https://www.npmjs.com/package/twitter "twitter")
4. [![riot-api-client](https://nodei.co/npm/riot-api-client.png?mini=true)](https://www.npmjs.com/package/riot-api-client "riot-api-client")
5. [Summoner Name of League of Legends](https://signup.na.leagueoflegends.com)
5. [Riot API Key](https://developer.riotgames.com/)
6. [Twitter Consumer Key (API Key)](https://apps.twitter.com/)
7. Twitter Consumer Secret (API Secret)
8. Twitter Access Token
9. Twitter Access Token Secret
10. [AWS Account](https://docs.aws.amazon.com/lambda/latest/dg/setting-up.html)
11. [AWS IAM user for Lamda](https://docs.aws.amazon.com/lambda/latest/dg/setting-up.html#setting-up-iam)

## Usage
### 1. Download LoLChaMa source

(Download folder example.) D:\ulg\Downloads\LoLChaMa-master  
![image](https://cloud.githubusercontent.com/assets/11805940/15089172/ec789c9c-1438-11e6-87df-a969bc419c66.png)

### 2. Setting

Unzip and open "autotweet.js".  
Tips : You need to save the file as UTF-8 encode.   
![image](https://cloud.githubusercontent.com/assets/11805940/15089266/d118b8d6-143a-11e6-99b0-85c56c24d4be.png)

Set summoner name and keys.  
 ![image](https://cloud.githubusercontent.com/assets/11805940/15089352/7784346a-143c-11e6-8e41-22c417dbbd6a.png)

### 3. Install Node packages

Open Command Prompt and Type these.  
Move to the download folder. (D:\ulg\Downloads\LoLChaMa-master)  

    d:
    cd D:\ulg\Downloads\LoLChaMa-master

Install Node packages.  

    npm install async
    npm install twitter
    npm install riot-api-client

![image](https://cloud.githubusercontent.com/assets/11805940/15089490/1397e8a4-143f-11e6-8f14-b7a83d4c3555.png)

### 4. Create a zip

Select only "node_modules" and "autotweet.js".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089535/0e7de9d0-1440-11e6-8cda-e84fe9727dd6.png)

And right click > send > zip.  
![image](https://cloud.githubusercontent.com/assets/11805940/15089539/20e9b2c0-1440-11e6-9164-d26a02268bfe.png)

### 5. Create a Lambda function

Go to [AWS Lambda](https://console.aws.amazon.com/lambda/) page.  
Click "Create  a Lambda function".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089561/9224b3b8-1440-11e6-9b6f-e377b66135d7.png)  

Click "Skip" at the bottom right.  
![image](https://cloud.githubusercontent.com/assets/11805940/15089652/fa00ce34-1442-11e6-9cd8-a9a63bb44ab4.png)  

Configure function.  
Name : LoLChaMa  
Description : Tweet LoL Champion Mastery Top 3  
Code entry type: Upload a .ZIP file  
Fanction package : autotweet.zip  
![image](https://cloud.githubusercontent.com/assets/11805940/15089615/f22c5cd8-1441-11e6-9e02-9f8a2105a42e.png)

Handler : autotweet.handler  
Role : lambda_basic_execution  
![image](https://cloud.githubusercontent.com/assets/11805940/15089677/0c07618c-1444-11e6-9cba-c1e986f0e05d.png)

Click "Allow".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089641/7d0abdb8-1442-11e6-8a2d-45f03c85b44b.png)

Timeout : 0 min 10 sec  
Click "Next".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089649/c5df47e8-1442-11e6-9903-83444d531bf3.png)

Click "Create function".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089688/7a68cd5a-1444-11e6-900a-30d0f3a4ec2f.png)

### 6. Test

Click "Test".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089703/ec4b1d24-1444-11e6-9e44-9f6f8c319695.png)

Click "Save and test".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089718/3d2e2e48-1445-11e6-9f1f-1206281fb9da.png)

Check Execution result: succeeded "done".  
Tips1 : You can't tweet "same message" at short times.  
Tips2 : You can tweet a hidden tweet as using "@home " at the beginning of tweet.  
![image](https://cloud.githubusercontent.com/assets/11805940/15089839/82464c9c-1448-11e6-923b-0bcf41c0dec5.png)

### 7. Add event source

Click "Event sources" tag and click "Add event source"  
![image](https://cloud.githubusercontent.com/assets/11805940/15089788/04bd51c2-1447-11e6-83d4-c89ddc1f9d5a.png)

Event source type : CloudWatch Event - Schedule  
Rule name : LoLChaMa  
Schedule expression : cron(0 6 ? * * *)  
exp.) Run at 6:00 am (UTC).  
Click "Submit".  
![image](https://cloud.githubusercontent.com/assets/11805940/15089804/ae270ffa-1447-11e6-8113-00cffd34e037.png)
![image](https://cloud.githubusercontent.com/assets/11805940/15089829/5b9e8d3e-1448-11e6-86d6-5e1fe3fefcb9.png)

### 8. See [your timeline](https://twitter.com/) or [#LoLChaMa](https://twitter.com/hashtag/LoLChaMa?f=tweets&vertical=default&src=hash)

![image](https://cloud.githubusercontent.com/assets/11805940/15088698/69c45b2a-1432-11e6-8013-721468e840d6.png)

## Licence

[MIT](http://choosealicense.com/licenses/mit/)

## Author

[ulg](https://twitter.com/ulg_)

## Copyright
(c) 2016. LoLChaMa isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
