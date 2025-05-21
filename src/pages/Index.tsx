
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from '@/hooks/useWallet';
import WalletConnectButton from '@/components/WalletConnectButton';
import WalletInfo from '@/components/WalletInfo';

const Index = () => {
  const { 
    connected, 
    address, 
    network, 
    balance, 
    isLoading, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="wallet-container">
        <h1 className="text-4xl font-bold text-center mb-12">Wallet Dashboard</h1>
        
        <Card className="wallet-card">
          <CardContent className="pt-6">
            {connected ? (
              <WalletInfo 
                address={address}
                network={network}
                balance={balance}
              />
            ) : (
              <div className="py-10 text-center text-crypto-subtle">
                Connect your wallet to view your balance and details
              </div>
            )}
            
            <div className="mt-8">
              <WalletConnectButton
                connected={connected}
                isLoading={isLoading}
                onConnect={connectWallet}
                onDisconnect={disconnectWallet}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
