
import React from 'react';
import { QrCode } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WalletQRCodeProps {
  address: string;
}

const WalletQRCode: React.FC<WalletQRCodeProps> = ({ address }) => {
  // Generate QR code URL using an external service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <QrCode className="h-4 w-4 mr-2" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to send funds to this wallet address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <img 
            src={qrCodeUrl} 
            alt="Wallet QR Code"
            className="w-48 h-48 mb-4 border border-gray-200 dark:border-gray-700"
          />
          <p className="text-xs font-mono text-center break-all max-w-full">
            {address}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletQRCode;
