
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectButtonProps {
  connected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  connected,
  isLoading,
  onConnect,
  onDisconnect
}) => {
  return (
    <Button 
      className="wallet-button"
      disabled={isLoading}
      onClick={connected ? onDisconnect : onConnect}
      variant={connected ? "destructive" : "default"}
    >
      <Wallet className="mr-2 h-5 w-5" />
      {isLoading 
        ? 'Connecting...' 
        : connected 
          ? 'Disconnect Wallet' 
          : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
