### Block Reward Prediction AI Model

This repository contains code for a basic AI-based blockchain application that fetches block reward data for a range of Ethereum blocks from Etherscan API, stores the data in a CSV file, and then uses a RandomForestRegressor model to predict block rewards for a given timestamp.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js
- Python (with Jupyter Notebook)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository to your local machine:

   git clone https://github.com/Nilesh-Nath/BlockRewardPrediction.git

2. Install the Node.js dependencies by running:

   npm install

3. Install the Python dependencies (for the prediction model) by running:

   pip install pandas matplotlib scikit-learn

4. For fetching data

   node server.js

   Note : "I have used a limited amount of data for training. Using a larger training dataset will provide more precise predictions."
