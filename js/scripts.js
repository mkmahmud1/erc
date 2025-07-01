  // Replace with your actual contract address and ABI
  const contractAddress = "0xb87e2cd671932d205fcbb5b9ff077312ad5b3e09"; // TODO: Replace this
  const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTxHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct KhanToken.TxHistory[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenDecimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokenSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

  let provider, signer, contract;

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        const address = await signer.getAddress();
        document.getElementById("wallet-address").innerText = address;
        document.getElementById("walletStatus").classList.remove("hidden");
        getBalance();
        getTxHistory();
        getTokenName();
        getTokenSymbol();
        getDecimals();
      } catch (err) {
        alert("Connection failed: " + err.message);
        console.error(err);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }
 

  // Get Balance
  async function getBalance() {
    try {
      const address = await signer.getAddress();
      const balance = await contract.balanceOf(address);
      document.getElementById("balance").innerText = balance;
    } catch (err) {
      alert("Error getting balance: " + err.message);
      console.error(err);
    }
  }

  // Send Tokens
  async function sendTokens() {
    try {
      const to = document.getElementById("toAddress").value;
      const amount = document.getElementById("amount").value;
      const tx = await contract.transfer(to, amount);
      await tx.wait();
      alert("Transfer complete!");
      getBalance(); // Refresh balance
    } catch (err) {
      alert("Transfer failed: " + err.message);
      console.error(err);
    }
  }

//   Get Transaction History

  async function getTxHistory() {
    try {
      const txHistory = await contract.getTxHistory();
  
      const tableBody = document.getElementById("tx-table-body");
      tableBody.innerHTML = ""; // clear old rows
  
      if (txHistory.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4" class="border px-2 py-1 text-center text-gray-500">No transactions found.</td>`;
        tableBody.appendChild(row);
        return;
      }
  
      txHistory.slice().reverse().forEach(tx => {
        const row = document.createElement("tr");
  
        const time = new Date(Number(tx.timestamp) * 1000).toLocaleString();
  
        row.innerHTML = `
          <td class="border px-2 py-1">${tx.from}</td>
          <td class="border px-2 py-1">${tx.to}</td>
          <td class="border px-2 py-1">${tx.amount}</td>
          <td class="border px-2 py-1">${time}</td>
        `;
  
        tableBody.appendChild(row);
      });
  
    } catch (err) {
      alert("Error getting transaction history: " + err.message);
      console.error(err);
    }
  }
  

//   Get Token Details
 async function getTokenName() {
    try {
        const tokenName = await contract.tokenName();
        document.getElementById("tokenName").innerText = tokenName;
    } catch (err) {
        alert("Error getting token name: " + err.message);
        console.error(err);
    }
}

//   Get Token Symbol    
 async function getTokenSymbol() {
    try {
        const tokenSymbol = await contract.tokenSymbol();
        document.getElementById("tokenSymbol").innerText = tokenSymbol;
    } catch (err) {
        alert("Error getting token symbol: " + err.message);
        console.error(err);
    }
}

// Get Decimals
async function getDecimals() {
    try{
            const tokenDecimal = await contract.tokenDecimals();
            document.getElementById("tokenDecimal").innerText = tokenDecimal;
    }
    catch(err){
        console.log(err)
    }
}
