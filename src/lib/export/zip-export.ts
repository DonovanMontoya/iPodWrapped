import { downloadZip } from 'client-zip';

function dataUrlToBlob(dataUrl: string): Blob {
	const parts = dataUrl.split(',');
	const mime = parts[0].match(/:(.*?);/)![1];
	const binary = atob(parts[1]);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new Blob([bytes], { type: mime });
}

export async function exportAllCards(
	cards: { name: string; dataUrl: string }[]
): Promise<void> {
	const files = cards.map((card) => ({
		name: `${card.name}.png`,
		input: dataUrlToBlob(card.dataUrl)
	}));

	const blob = await downloadZip(files).blob();
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = 'ipod-wrapped.zip';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
