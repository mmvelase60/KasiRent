import { Platform, Share } from 'react-native';

export async function shareReceipt(content: { message: string }) {
  if (Platform.OS !== 'web') return Share.share(content);
  // A download also works on desktop browsers without the Web Share API.
  const blob = new Blob([content.message], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'KasiRent-receipt.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
