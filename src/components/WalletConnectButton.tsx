
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, Loader } from "lucide-react";

interface WalletConnectButtonProps {
  connected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  hasMetaMask: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  connected,
  isLoading,
  onConnect,
  onDisconnect,
  hasMetaMask
}) => {
  return (
    <Button 
      className="wallet-button"
      disabled={isLoading || !hasMetaMask}
      onClick={connected ? onDisconnect : onConnect}
      variant={connected ? "destructive" : "default"}
    >
      {isLoading ? (
        <Loader className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-5 w-5" />
      )}
      {isLoading 
        ? 'Connecting...' 
        : connected 
          ? 'Disconnect Wallet' 
          : hasMetaMask 
            ? 'Connect MetaMask' 
            : 'MetaMask Not Available'}
    </Button>
  );
};

export default WalletConnectButton;
