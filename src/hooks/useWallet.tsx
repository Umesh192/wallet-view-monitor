
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

interface WalletState {
  connected: boolean;
  address: string;
  network: string;
  balance: number;
  isLoading: boolean;
  hasMetaMask: boolean;
}

const networkNames: Record<string, string> = {
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0xaa36a7': 'Sepolia Testnet',
  '0xa': 'Optimism',
  '0xa4b1': 'Arbitrum One',
  '0x89': 'Polygon Mainnet',
  '0x13881': 'Polygon Mumbai',
};

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: '',
    network: '',
    balance: 0,
    isLoading: false,
    hasMetaMask: false,
  });
  const { toast } = useToast();
  
  // Check if MetaMask is installed
  useEffect(() => {
    const ethereum = (window as WindowWithEthereum).ethereum;
    setWalletState(prev => ({ ...prev, hasMetaMask: !!ethereum }));
  }, []);

  // Update network
  const updateNetwork = useCallback(async () => {
    try {
      const ethereum = (window as WindowWithEthereum).ethereum;
      if (!ethereum) return;

      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const networkName = networkNames[chainId] || `Unknown Network (${chainId})`;
      
      setWalletState(prev => ({ ...prev, network: networkName }));
    } catch (error) {
      console.error('Error getting network:', error);
    }
  }, []);

  // Update balance
  const updateBalance = useCallback(async () => {
    try {
      const ethereum = (window as WindowWithEthereum).ethereum;
      if (!ethereum || !walletState.address) return;

      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [walletState.address, 'latest'],
      });
      
      // Convert from wei to ether (1 ether = 10^18 wei)
      const etherBalance = parseInt(balance, 16) / 1e18;
      
      setWalletState(prev => ({ ...prev, balance: etherBalance }));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }, [walletState.address]);

  // Connect wallet
  const connectWallet = async () => {
    const ethereum = (window as WindowWithEthereum).ethereum;
    
    if (!ethereum) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to use this feature",
        variant: "destructive",
      });
      return;
    }
    
    setWalletState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      setWalletState(prev => ({ 
        ...prev, 
        connected: true,
        address,
        isLoading: false
      }));
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected",
      });
      
      // Get network and balance
      await updateNetwork();
      await updateBalance();
    } catch (error: any) {
      setWalletState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      
      console.error('Error connecting wallet:', error);
    }
  };

  // Disconnect wallet (note: MetaMask doesn't have a disconnect method, we just clear state)
  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: '',
      network: '',
      balance: 0,
      isLoading: false,
      hasMetaMask: walletState.hasMetaMask,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  // Listen for account changes
  useEffect(() => {
    const ethereum = (window as WindowWithEthereum).ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (walletState.connected) {
        // Account changed while connected
        setWalletState(prev => ({ ...prev, address: accounts[0] }));
        updateBalance();
        
        toast({
          title: "Account Changed",
          description: "Wallet account has been changed",
        });
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [walletState.connected, updateBalance]);

  // Listen for network changes
  useEffect(() => {
    const ethereum = (window as WindowWithEthereum).ethereum;
    if (!ethereum) return;

    const handleChainChanged = () => {
      // MetaMask recommends reloading the page on chain change
      // But for better UX, we just update the network and balance
      updateNetwork();
      updateBalance();
      
      toast({
        title: "Network Changed",
        description: "Wallet network has been changed",
      });
    };

    ethereum.on('chainChanged', handleChainChanged);
    return () => {
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [updateNetwork, updateBalance]);

  // Update balance periodically
  useEffect(() => {
    if (!walletState.connected) return;

    updateBalance();
    const interval = setInterval(updateBalance, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [walletState.connected, updateBalance]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet
  };
}
