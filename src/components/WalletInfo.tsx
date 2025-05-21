
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import WalletQRCode from './WalletQRCode';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WalletInfoProps {
  address: string;
  network: string;
  balance: number;
  hasMetaMask: boolean;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ 
  address, 
  network, 
  balance,
  hasMetaMask
}) => {
  // Truncate the wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!hasMetaMask) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>MetaMask Not Detected</AlertTitle>
        <AlertDescription>
          Please install MetaMask browser extension to use this wallet dashboard.
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-2 text-blue-500 hover:underline"
          >
            Download MetaMask
          </a>
        </AlertDescription>
      </Alert>
    );
  }

  if (!address) {
    return (
      <div className="py-10 text-center text-crypto-subtle">
        Connect your wallet to view your balance and details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h3 className="text-xl font-semibold mb-2 sm:mb-0">Wallet Details</h3>
        <WalletQRCode address={address} />
      </div>
      
      <Card className="bg-secondary/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="wallet-info-row">
              <div className="wallet-info-label">Wallet Address:</div>
              <div className="wallet-info-value group flex items-center">
                <span className="inline-block sm:hidden">{truncateAddress(address)}</span>
                <span className="hidden sm:inline">{address}</span>
                <button 
                  className="ml-2 text-xs text-crypto-accent hover:text-crypto-accent/80"
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    // You could add a toast notification here
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="wallet-info-row">
              <div className="wallet-info-label">Network:</div>
              <div className="wallet-info-value">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
                  {network}
                </div>
              </div>
            </div>
            
            <div className="wallet-info-row">
              <div className="wallet-info-label">ETH Balance:</div>
              <div className="wallet-info-value">
                <div className="font-bold text-xl">{balance.toFixed(4)} ETH</div>
                <Progress value={Math.min(balance * 10, 100)} className="h-2 mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletInfo;
