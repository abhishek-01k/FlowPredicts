# FlowPredicts

FlowPredicts is a decentralized prediction marketplace built on Ethereum that allows users to create and participate in prediction markets. Users can bet on the outcome of various events using USDC, creating a fair and transparent platform for predictions. This project is a submission for the [Flow Asia Hackathon](https://www.hackquest.io/en/hackathon/explore/Flow-Asia-Hackathon).

## Features

### Core Functionalities

- **Create Predictions:**
  - Users can create predictions with detailed questions, image URIs, and predefined betting and resolution durations.
  - Validation ensures the betting and resolution durations fall within allowed time ranges.

- **Place Bets:**
  - Users can place bets on active predictions, choosing between "Yes" and "No" options.
  - Bets are secured using user-deposited USDC balances.

- **Resolve Predictions:**
  - Prediction creators can resolve predictions after the betting period ends but within the resolution timeframe.
  - Outcomes are finalized with a boolean value, enabling users to claim their winnings.

- **Claim Winnings:**
  - Users who placed correct bets can claim their winnings post-resolution.
  - Winnings are calculated proportionally based on the total pool and platform fees.

- **User Balance Management:**
  - Users can deposit and withdraw USDC balances securely.
  - All transactions are tracked transparently on the blockchain.

### Administrative Features

- **Platform Fee:**
  - A 2% platform fee is deducted from the total betting pool to support platform operations.
  - Fees can be withdrawn by the contract owner.

- **Pause and Unpause:**
  - Contract functionalities can be paused and resumed by the owner for security and maintenance purposes.

### Query Functionalities

- **Get All Predictions:**
  - Fetch all predictions created on the platform, including their details.

- **Get Active Predictions:**
  - Retrieve predictions that are currently open for betting.

- **Get User Predictions:**
  - View all predictions created by a specific user.

- **Get User Bets:**
  - Fetch all bets placed by a user, along with corresponding prediction details.

- **Get Individual Details:**
  - Fetch detailed information about specific predictions or bets.

## Features To Be Added

1. **Integration with Flow Blockchain:**
   - Transition from Ethereum to Flow blockchain for better scalability and lower transaction fees.

2. **Customizable Prediction Parameters:**
   - Allow users to customize platform fee percentages and betting conditions for their predictions.

3. **Leaderboard and Gamification:**
   - Introduce a leaderboard to showcase top predictors and their performance.
   - Add gamification features like badges and rewards for participation.

4. **Social Features:**
   - Enable users to share predictions on social media to increase engagement.

5. **Mobile-Friendly Interface:**
   - Develop a mobile-first UI/UX for better accessibility on smartphones.

6. **Multi-Chain Support:**
   - Extend support to other EVM-compatible chains for broader user adoption.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Hardhat
- Ethereum wallet (e.g., MetaMask)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhishek-01k/FlowPredicts.git
   cd FlowPredicts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add your private key and USDC token address.

4. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```

5. Deploy the contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

### Run Tests

Execute the tests to ensure the contracts are functioning correctly:
```bash
npx hardhat test
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to suggest improvements.

---

FlowPredicts aims to democratize prediction markets while ensuring transparency, security, and user engagement. Be a part of this journey and help us create a revolutionary platform for the future of decentralized predictions!
