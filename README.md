# ERC20 Token Interface

A clean and simple web-based user interface for interacting with a custom ERC20 token on the Ethereum blockchain. This DApp allows users to connect their wallet, view their token balance, see token information, and transfer tokens to other addresses.



## ✨ Features

-   **Connect Wallet**: Seamlessly connect to an Ethereum wallet (like MetaMask).
-   **Display Wallet Info**: Shows the currently connected wallet address.
-   **Token Information**: Fetches and displays the token's name, symbol, and decimals.
-   **Balance Checker**: Shows the user's real-time balance for the token.
-   **Token Transfer**: A simple form to send tokens to any recipient address.

## 🛠️ Tech Stack

This project is built with a modern web3 technology stack:

-   **Smart Contract**: [Solidity](https://soliditylang.org/)
-   **Blockchain Development Environment**: [Hardhat](https://hardhat.org/)
-   **Frontend**: [React.js](https://reactjs.org/)
-   **Ethereum Web Client**: [Ethers.js](https://ethers.io/)
-   **Styling**: CSS (or specify your library, e.g., Tailwind CSS, Material-UI)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/en/) (v16 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [MetaMask](https://metamask.io/) browser extension

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    This will install all the necessary packages for both the Hardhat environment and the React frontend.
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Now, open the `.env` file and add your own credentials.
    ```
    # Your private RPC URL from a node provider like Alchemy or Infura
    RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

    # The private key of the wallet you want to use for deployment
    # IMPORTANT: Do not use a wallet with real funds for development!
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"

    # (Optional) Your Etherscan API key for contract verification
    ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
    ```

### Smart Contract Deployment

1.  **Customize the Token (Optional):**
    Open `contracts/Token.sol` and you can change the token name, symbol, or initial supply. The current version deploys a token named "Khan" (KHT).

2.  **Compile the contract:**
    ```sh
    npx hardhat compile
    ```

3.  **Deploy the contract to a testnet (e.g., Sepolia):**
    ```sh
    npx hardhat run scripts/deploy.js --network sepolia
    ```
    After a successful deployment, the script will print the deployed contract address to the console. **Copy this address!**

4.  **Update the frontend with the contract address:**
    Open `src/App.js` (or your main frontend component file) and replace the placeholder contract address with the one you just deployed.
    ```javascript
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    ```

### Running the Frontend

1.  **Start the development server:**
    ```sh
    npm start
    ```
    This will open the application in your browser, usually at `http://localhost:3000`.

2.  **Connect and Test:**
    -   Make sure your MetaMask is connected to the same network you deployed to (e.g., Sepolia).
    -   If you deployed with your MetaMask account, you should see the total supply as your balance.
    -   Try sending some `KHT` tokens to another address!

## 📜 Usage

Once the application is running:

1.  Click on the **"Connect Wallet"** button in the top right corner.
2.  Approve the connection request from the MetaMask pop-up.
3.  Once connected, your wallet address, token balance, and token info will be displayed on the dashboard.
4.  To send tokens:
    -   Enter a valid Ethereum address in the **"Recipient Address"** field.
    -   Enter the desired amount in the **"Amount"** field.
    -   Click **"Send Tokens"**.
    -   Confirm the transaction in the MetaMask pop-up.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
_Built by [MkMahmud1](https://github.com/mkmahmud1)_
