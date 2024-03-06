require("dotenv").config();
const { VoyageProvider, Wallet, LogicFactory } = require("js-moi-sdk");
const Manifest = require("./coco/samplelogic.json");

// ------- Update with your Mnemonic ------------------ //
const MNEMONIC = process.env.MNEMONIC;
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

// JsonRpcProvider to interact with MOI Network (Here we are using public RPC from Voyage)
const provider = new VoyageProvider("babylon");

const deployLogic = async () => {
  // getting wallet To sign and send the ix to the network
  const wallet = await Wallet.fromMnemonic(MNEMONIC, account);
  wallet.connect(provider);

  // Create logic instance using Logic factory
  const logic = new LogicFactory(Manifest, wallet);

  // Deploy the logic get ixResponse
  const ixResponse = await logic.deploy(
    "Init!",
    "Sample Token",
    "ST",
    0,
    "1000",
    {
      fuelLimit: 5000,
    }
  );
  console.log("------ Deploying Logic ----------");
  console.log(ixResponse);

  // Polling the network for the Interaction Receipt and print it
  const ixReceipt = await ixResponse.wait();
  console.log("------ Deployed Logic Successfully!! ----------");
  console.log(ixReceipt);

  console.log("LOGIC_ID");
  console.log(ixReceipt.extra_data.logic_id);
};

deployLogic();
