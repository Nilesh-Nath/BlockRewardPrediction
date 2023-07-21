const { ethers } = require("ethers");
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const app = express();

class Block {
  constructor(timeStamp, blockReward) {
    this.timeStamp = timeStamp;
    this.blockReward = blockReward;
  }
}

const fetchData = async () => {
  try {
    const listOfBlocks = [];
    for (let blockNumber = 16544854; blockNumber < 16545054; blockNumber++) {
      const apiURL = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${ETHERSCAN_API_KEY}`;
      const response = await axios.get(apiURL);
      const blockRewardInEth = ethers.utils.formatEther(
        response.data.result.blockReward
      );
      const fetchedTimeStamp = response.data.result.timeStamp;
      const block = new Block(fetchedTimeStamp, blockRewardInEth);
      listOfBlocks.push(block);
    }
    exportToCsv(listOfBlocks);
  } catch (e) {
    console.error(e);
  }
};

const exportToCsv = (data) => {
  const csvWriter = createCsvWriter({
    path: "block_data.csv",
    header: [
      { id: "timeStamp", title: "timestamp" },
      { id: "blockReward", title: "blockReward" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => {
      console.log("CSV file created successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

(async () => {
  try {
    await fetchData();
    app.listen(3000, () => {
      console.log("Server running....");
    });
  } catch (e) {
    console.error(e);
  }
})();
