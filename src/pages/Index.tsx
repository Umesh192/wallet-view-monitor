
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from '@/hooks/useWallet';
import WalletConnectButton from '@/components/WalletConnectButton';
import WalletInfo from '@/components/WalletInfo';
import Header from '@/components/Header';

const Index = () => {
  const { 
    connected, 
    address, 
    network, 
    balance, 
    isLoading, 
    hasMetaMask,
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="wallet-container">
          <h1 className="text-3xl font-bold text-center mb-8">Wallet Dashboard</h1>
          
          <Card className="wallet-card">
            <CardContent className="pt-6">
              <WalletInfo 
                address={address}
                network={network}
                balance={balance}
                hasMetaMask={hasMetaMask}
              />
              
              <div className="mt-8">
                <WalletConnectButton
                  connected={connected}
                  isLoading={isLoading}
                  onConnect={connectWallet}
                  onDisconnect={disconnectWallet}
                  hasMetaMask={hasMetaMask}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-4 px-4 border-t border-gray-800 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Crypto Wallet Dashboard
        </p>
      </footer>
    </div>
  );
};

export default Index;
