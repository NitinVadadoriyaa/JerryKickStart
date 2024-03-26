
# JerryKickStart

JerryKickStart is Ethereum based (BlockChain) Crowdfunding platform that help entrepreneur to raise funds for projects, ventures, or causes by collecting small contributions from a large number of people.


## Technolgoy Stack
**Platform:** Ethereum.

**Client:** Next JS.

**Server:** Node JS.

**Database:** Sepolia Ethereum BlockChain.

## Demo

We will update very soon!




## Screenshots

![ScreenShot](https://raw.github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/campaign-detail.png)





## Run Locally

Clone the project

```bash
    git clone https://github.com/NitinVadadoriyaa/JerryKickStart
```

Go to the project directory

```bash
    cd KichStart
```

Install dependencies

```bash
    npm install
```


Start the server

```bash
    npm run dev
```
Start the client

```bash
    //open browser and type url
    http://localhost:3000
```


## NOTE

If you want to interact with your own smart-contract then you can follow follwing step.

1. Modify kickstart/ethereum/contracts/Campaign.sol and test on Remix IDE.

2. Run /kickstart/ethereum/deploy.js for deploy your smart contract on Sepolia-Ethereum-BlockChain (hear you have to give your `12 word mnemonic` for unlock account and `node api`, where you will deploy your contract `[i used infura api in this project]`).
Command For Run :
```base
    node deploy.js
```

3. After deploy you get smart-contract address ,that you have to replace with exiting address in `/kickstart/ethereum/factory.js`.


## Features

- Home Page
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/home.png)

- Campaign Details
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/campaign-detail.png)

- Create New Campaign
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/create-new-campaign.png)

- Campaign Requests List
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/campagin-request-list.png)

- Create New Request
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/create-new-request.png)

- MetaMask Request
![ScreenShot](https://github.com/NitinVadadoriyaa/JerryKickStart/blob/master/screenshort/meta-mask-configuration.png)



## Made By
NitinVadadoriya