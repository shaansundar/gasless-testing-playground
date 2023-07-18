import { LocalWallet } from "@thirdweb-dev/wallets"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { Mumbai } from "@thirdweb-dev/chains"

export default async function handler(req, res) {
  const nftId = "1";
  const userPrivateKey = "0x90cafe97eb452ee0b8acbb7402b672dabf12383590a615526fa2719a2c010abc"

  const wallet = new LocalWallet({
    chain: Mumbai,
  })

  await wallet.import({
    privateKey: userPrivateKey,
    encryption: false
  })

  const walletAddress = await wallet.connect()

  const sdk = await ThirdwebSDK.fromWallet(
    wallet,
    "mumbai",
    {
      gasless: {
        biconomy: {
          // apiId: "e109e469-732b-4705-b8a0-f9d1c4db4ec9",
          apiId: "mum9ad7b-6f99-4a01-a030-94b07892cf1f",
          // apiKey: "dCpT06gLq.bd5a5ed6-d527-46b6-a4cb-26680a55fdf0",
          apiKey: "MUM3O6t-6.35244616-695f-4dd4-8f23-26414450b9d3",
        },
        // openzeppelin: {
        //   relayerUrl: "https://api.defender.openzeppelin.com/autotasks/d9211707-81a0-4fae-8fba-9797943e0860/runs/webhook/cab61aff-3c78-46ed-9e8e-b3376393823b/WRquSSEeucqLLZtqPWzmaW",
        // },
      },
    }
  )

  const contract = await sdk.getContract("0xaDc9f6135004022A29D4Db21EF7f651b2aaA498b")

  const tx = await contract.erc1155.claim(nftId, 1);

  console.log(tx);

  res.status(200).json({ message: "success" })
}

handler()
