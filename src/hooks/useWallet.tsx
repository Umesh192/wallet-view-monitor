
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Simulating the wallet connection since we're not using a real provider
interface WalletState {
  connected: boolean;
  address: string;
  network: string;
  balance: number;
  isLoading: boolean;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: '',
    network: '',
    balance: 0,
    isLoading: false,
  });
  const { toast } = useToast();

  // Simulate connection to wallet
  const connectWallet = async () => {
    setWalletState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random address
    const randomAddress = `0x${Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    // Random networks
    const networks = ['Ethereum Mainnet', 'Ethereum Sepolia', 'Arbitrum One', 'Optimism', 'Polygon'];
    const randomNetwork = networks[Math.floor(Math.random() * networks.length)];
    
    // Random balance between 0.01 and 10
    const randomBalance = parseFloat((Math.random() * 9.99 + 0.01).toFixed(4));
    
    setWalletState({
      connected: true,
      address: randomAddress,
      network: randomNetwork,
      balance: randomBalance,
      isLoading: false,
    });
    
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected.",
    });
  };

  // Simulate disconnect from wallet
  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: '',
      network: '',
      balance: 0,
      isLoading: false,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Simulated periodic balance updates
  useEffect(() => {
    if (!walletState.connected) return;

    const interval = setInterval(() => {
      setWalletState(prev => ({
        ...prev,
        balance: parseFloat((prev.balance + (Math.random() * 0.02 - 0.01)).toFixed(4)),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [walletState.connected]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet
  };
}
