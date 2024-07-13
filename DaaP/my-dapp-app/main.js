import "./style.css";
import { abi, contractAddress } from "./constant";
import { ethers } from "ethers";


document.querySelector("#app").innerHTML = `
  <button class="enableEthereumButton">Enable Ethereum</button>
  
  <button id="balanceButton">getBalance</button>
  <button id="withdrawButton">Withdraw</button>

  <label for="ethAmount">ETH Amount</label>
    <input id="ethAmount" placeholder="0.1" type="number"/>
    <button type="button" id="fundButton" > Fund </button>
  <button id="requestPermissionsButton">Revoke</button>
  <h2>Account: <span class="showAccount"></span></h2>`;

  async function fund(ethAmount) {
    ethAmount = "0.1"
    console.log(`Funding with ${ethAmount}`);
    

    if(typeof window.ethereum !== "undefined"){
     const provider = new ethers.BrowserProvider(window.ethereum)

     const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
   
      const transactionResponse =await contract.fund({
        value: ethers.parseEther(ethAmount),
      });
      await transactionResponse.wait();
    }
        


      }
      
     
      document.getElementById("fundButton").addEventListener("click", fund);
