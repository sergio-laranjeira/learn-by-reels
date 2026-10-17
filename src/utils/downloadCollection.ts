import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Category, Reel } from '../types/content';
import { buildExportPayload } from './collectionExport';

// Native: write the JSON to a temp file and hand it to the system share
// sheet, so the user can save it to Files, send it on, or back it up.
export async function downloadCollectionJson(category: Category, reels: Reel[]): Promise<void> {
  const json = JSON.stringify(buildExportPayload(category, reels), null, 2);
  const fileUri = `${FileSystem.cacheDirectory}${category.id}.json`;
  await FileSystem.writeAsStringAsync(fileUri, json);

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(fileUri, {
      mimeType: 'application/json',
      dialogTitle: `${category.name} — collection export`,
    });
  }
}
