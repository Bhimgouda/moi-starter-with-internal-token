import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

// Always keep your LOGIC_ID updated
const LOGIC_ID = "paste your LOGIC_ID";

const provider = new VoyageProvider("babylon");

const constructBaseWallet = async () => {
  const wallet = new Wallet(provider);
  await wallet.fromMnemonic(
    process.env.REACT_APP_BASE_MNEMONIC,
    "m/44'/6174'/7020'/0/0"
  );
  return wallet;
};

// Base wallet should only be used for making read calls when user has not connected his wallet
const baseWallet = await constructBaseWallet();

////////////////////////
// Mutate/Write Calls
///////////////////////

const ClaimToken = async (wallet) => {
  const logicDriver = await getLogicDriver(LOGIC_ID, wallet);
  const ixResponse = await logicDriver.routines.Claim();
  return ixResponse.wait();
};

////////////////////////
// Observe/Read Calls
///////////////////////

const GetTokenName = async () => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.Name();
};
const GetTokenBalanceOf = async (account) => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.BalanceOf(account);
};
const GetTokenClaimAmount = async () => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.ClaimAmount();
};

// returns a unix timestamp in seconds
const GetNextClaim = async (account) => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.NextClaim(account);
};
const GetTokenDecimals = async () => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.Decimals();
};

// get the decimal value / precision of the token
const GetTokenSymbol = async () => {
  const logicDriver = await getLogicDriver(LOGIC_ID, baseWallet);
  return logicDriver.routines.Symbol();
};

const logic = {
  GetTokenName,
  GetTokenBalanceOf,
  GetNextClaim,
  GetTokenClaimAmount,
  GetTokenDecimals,
  GetTokenSymbol,
  ClaimToken,
};

export default logic;
