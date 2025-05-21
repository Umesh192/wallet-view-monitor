
import React from 'react';

interface WalletInfoProps {
  address: string;
  network: string;
  balance: number;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ address, network, balance }) => {
  // Truncate the wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="space-y-4">
      <div className="wallet-info-row">
        <div className="wallet-info-label">Wallet:</div>
        <div className="wallet-info-value group">
          <span className="inline-block sm:hidden">{truncateAddress(address)}</span>
          <span className="hidden sm:inline">{address}</span>
          <span className="ml-2 text-xs text-crypto-accent cursor-pointer"
            onClick={() => navigator.clipboard.writeText(address)}>
            Copy
          </span>
        </div>
      </div>
      
      <div className="wallet-info-row">
        <div className="wallet-info-label">Network:</div>
        <div className="wallet-info-value">{network}</div>
      </div>
      
      <div className="wallet-info-row">
        <div className="wallet-info-label">ETH Balance:</div>
        <div className="wallet-info-value animate-pulse-subtle">
          <span className="font-bold">{balance.toFixed(4)}</span> ETH
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
