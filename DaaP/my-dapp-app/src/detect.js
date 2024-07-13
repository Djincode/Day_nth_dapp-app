import detectEthereumProvider from "@metamask/detect-provider";

async function setup(){
    const provider = await detectEthereumProvider();
    if(provider && provider === window.ethereum){
        alert("MetaMask is available, Good 👌");
        startApp(provider);
    } else {
        alert("Please install MetaMask");
    }
}

function startApp(provider){
    if(provider !== window.ethereum){
        console.error("Do you have multiple wallets installed?");
    }
}

window.addEventListener("load", async () => {
    await setup();
    const chainId = await window.ethereum.request({method: "eth_chainId"});
    console.log(chainId);
});

const ethereumButton = document.querySelector(".enableEthereumButton");
const showAccount = document.querySelector(".showAccount");

ethereumButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    });
  if (accounts) {
    const account = accounts[0];
    showAccount.innerHTML = account;
  }
}

window.ethereum.on("chainChanged", handleChainChanged);

function handleChainChanged(){
    window.location.reload();
}

document.getElementById("requestPermissionsButton").addEventListener("click", revoke);

function requestPermissions() {
  const provider = window.ethereum;
  provider
    .request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
    .then((permissions) => {
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === "eth_accounts"
      );
      if (accountsPermission) {
        console.log("eth_accounts permission successfully requested!");
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        console.log("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    });
}

async function revoke(){
    const provider = window.ethereum;
    await provider.request({
        method: "wallet_revokePermissions",
        params: [
            {
                eth_accounts: {},
            },
        ],
    });
}
