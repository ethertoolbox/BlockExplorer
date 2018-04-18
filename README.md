# BlockExplorer based off github.com/carsenk/explorer

![BlockExplorer Screenshot](https://i.imgur.com/NIBw8KF.png)

## License

The code in this branch is licensed under GPLv3 (see LICENSE file)

Feel free to modify or reuse the code here.

## Donations

ETH Address: 0x9639CB6495d5A71C8958873773B9f57FB4fC86d4

## Installation

`git clone https://github.com/ethertoolbox/BlockExplorer`

`npm install`

`npm start`

Make sure to install geth as well for the ETH explorer to be able to function. Then run:

`geth --rpc --rpcaddr localhost --rpcport 8545 --rpcapi "web3,eth" --rpccorsdomain "http://localhost:8000"`

Then visit http://localhost:8000 in your browser of choice after you npm start the explorer

## Updates since original carsenk/explorer base:

- Added address transaction history
- Added pagination on blocks list
- Added pagination on transactions list
