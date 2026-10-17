import { Category, Reel } from '../types/content';
import { buildExportPayload } from './collectionExport';

// Web: build the JSON in memory and trigger a normal browser file download —
// no native module needed on this platform.
export async function downloadCollectionJson(category: Category, reels: Reel[]): Promise<void> {
  const json = JSON.stringify(buildExportPayload(category, reels), null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${category.id}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
