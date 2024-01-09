import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadFile(url: string) {
  const aTag = document.createElement('a');
  aTag.href = url;
  aTag.download = url.split('/').pop() as string;

  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
}
