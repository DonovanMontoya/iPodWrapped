import type { WrappedStats, RankedItem, RankedAlbumItem, RankedTrackItem, StreakInfo, MonthlyTopArtist } from '../stats/types';
import type { ScrobbleEntry } from '../parser/types';

const W = 1080;
const H = 1920;
const FONT = 'Space Grotesk, system-ui, sans-serif';

interface CardDef {
	id: string;
	title: string;
	draw: (ctx: CanvasRenderingContext2D, stats: WrappedStats) => void;
	gradient: [string, string];
}

function drawGradient(ctx: CanvasRenderingContext2D, c1: string, c2: string) {
	const grad = ctx.createLinearGradient(0, 0, W, H);
	grad.addColorStop(0, c1);
	grad.addColorStop(1, c2);
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, W, H);
}

function drawWatermark(ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = 'rgba(255,255,255,0.15)';
	ctx.font = `500 24px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText('iPod Wrapped', W / 2, H - 60);
}

function drawLabel(ctx: CanvasRenderingContext2D, text: string, y: number) {
	ctx.fillStyle = 'rgba(255,255,255,0.35)';
	ctx.font = `500 28px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.letterSpacing = '6px';
	ctx.fillText(text.toUpperCase(), W / 2, y);
	ctx.letterSpacing = '0px';
}

function drawTitle(ctx: CanvasRenderingContext2D, text: string, y: number) {
	ctx.fillStyle = '#ffffff';
	ctx.font = `700 72px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(text, W / 2, y);
}

function drawBarChart(
	ctx: CanvasRenderingContext2D,
	items: { label: string; sublabel?: string; value: number }[],
	startY: number,
	color: string
) {
	const maxVal = Math.max(...items.map((i) => i.value), 1);
	const barH = 28;
	const gap = 72;
	const left = 80;
	const right = W - 80;
	const barWidth = right - left;

	items.forEach((item, i) => {
		const y = startY + i * gap;

		// Label
		ctx.fillStyle = '#ffffff';
		ctx.font = `500 30px ${FONT}`;
		ctx.textAlign = 'left';
		ctx.fillText(item.label, left, y);

		if (item.sublabel) {
			ctx.fillStyle = 'rgba(255,255,255,0.4)';
			ctx.font = `400 24px ${FONT}`;
			ctx.fillText(item.sublabel, left, y + 28);
		}

		// Count
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.font = `400 28px ${FONT}`;
		ctx.textAlign = 'right';
		ctx.fillText(`${item.value} plays`, right, y);

		// Bar background
		const barY = y + (item.sublabel ? 38 : 14);
		ctx.fillStyle = 'rgba(255,255,255,0.1)';
		ctx.beginPath();
		ctx.roundRect(left, barY, barWidth, barH, 14);
		ctx.fill();

		// Bar fill
		ctx.fillStyle = color;
		const fillW = Math.max(20, (item.value / maxVal) * barWidth);
		ctx.beginPath();
		ctx.roundRect(left, barY, fillW, barH, 14);
		ctx.fill();
	});
}

function formatDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	if (h > 0) return `${h}h ${m}m`;
	return `${m}m`;
}

function formatDate(d: Date | string): string {
	const date = d instanceof Date ? d : new Date(d);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// === Card definitions ===

const drawTotalStats = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'By the numbers', 500);
	ctx.fillStyle = '#ffffff';
	ctx.font = `700 140px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(stats.totalPlayed.toLocaleString(), W / 2, 700);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 40px ${FONT}`;
	ctx.fillText('tracks played', W / 2, 760);

	ctx.fillStyle = '#ffffff';
	ctx.font = `700 90px ${FONT}`;
	ctx.fillText(formatDuration(stats.totalListeningSeconds), W / 2, 920);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 40px ${FONT}`;
	ctx.fillText('of listening', W / 2, 980);

	// Two columns
	ctx.fillStyle = '#ffffff';
	ctx.font = `700 64px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(stats.totalSkipped.toLocaleString(), W / 4, 1150);
	ctx.fillText(stats.totalDays.toLocaleString(), (3 * W) / 4, 1150);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 32px ${FONT}`;
	ctx.fillText('skipped', W / 4, 1200);
	ctx.fillText('days tracked', (3 * W) / 4, 1200);
};

const drawTopArtists = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Your top', 360);
	drawTitle(ctx, 'Artists', 440);

	const top = stats.topArtists[0];
	if (top) {
		ctx.fillStyle = '#d8b4fe';
		ctx.font = `700 80px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.fillText(top.name, W / 2, 600);
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.font = `400 34px ${FONT}`;
		ctx.fillText(`${top.count} plays`, W / 2, 660);
	}

	const items = stats.topArtists.slice(0, 5).map((a) => ({ label: a.name, value: a.count }));
	drawBarChart(ctx, items, 780, '#a855f7');
};

const drawTopAlbums = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Your top', 360);
	drawTitle(ctx, 'Albums', 440);

	const top = stats.topAlbums[0];
	if (top) {
		ctx.fillStyle = '#93c5fd';
		ctx.font = `700 64px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.fillText(top.album, W / 2, 590);
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.font = `400 34px ${FONT}`;
		ctx.fillText(`${top.artist} · ${top.count} plays`, W / 2, 650);
	}

	const items = stats.topAlbums.slice(0, 5).map((a) => ({ label: a.album, sublabel: a.artist, value: a.count }));
	drawBarChart(ctx, items, 760, '#3b82f6');
};

const drawTopTracks = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Your top', 360);
	drawTitle(ctx, 'Tracks', 440);

	const top = stats.topTracks[0];
	if (top) {
		ctx.fillStyle = '#f9a8d4';
		ctx.font = `700 64px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.fillText(top.track, W / 2, 590);
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.font = `400 34px ${FONT}`;
		ctx.fillText(`${top.artist} · ${top.count} plays`, W / 2, 650);
	}

	const items = stats.topTracks.slice(0, 5).map((t) => ({ label: t.track, sublabel: t.artist, value: t.count }));
	drawBarChart(ctx, items, 760, '#ec4899');
};

const drawListeningClock = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'When you listen', 360);
	drawTitle(ctx, 'Listening Clock', 440);

	const data = stats.hourlyDistribution;
	const maxVal = Math.max(...data, 1);
	const cx = W / 2;
	const cy = 850;
	const maxR = 280;
	const minR = 60;

	// Draw segments
	for (let i = 0; i < 24; i++) {
		const val = data[i] || 0;
		const r = minR + (maxR - minR) * (val / maxVal);
		const startAngle = (i / 24) * Math.PI * 2 - Math.PI / 2;
		const endAngle = ((i + 1) / 24) * Math.PI * 2 - Math.PI / 2;

		ctx.fillStyle = `rgba(6, 182, 212, ${0.2 + 0.8 * (val / maxVal)})`;
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.arc(cx, cy, r, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();

		ctx.strokeStyle = 'rgba(255,255,255,0.08)';
		ctx.lineWidth = 0.5;
		ctx.stroke();
	}

	// Hour labels
	const labels = ['12a', '', '', '3a', '', '', '6a', '', '', '9a', '', '', '12p', '', '', '3p', '', '', '6p', '', '', '9p', '', ''];
	ctx.fillStyle = 'rgba(255,255,255,0.4)';
	ctx.font = `400 22px ${FONT}`;
	ctx.textAlign = 'center';
	for (let i = 0; i < 24; i++) {
		if (!labels[i]) continue;
		const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
		const lr = maxR + 30;
		const lx = cx + lr * Math.cos(angle);
		const ly = cy + lr * Math.sin(angle);
		ctx.fillText(labels[i], lx, ly + 8);
	}

	// Peak info
	let peakHour = 0;
	for (let i = 0; i < 24; i++) if (data[i] > data[peakHour]) peakHour = i;
	const timeOfDay = peakHour >= 5 && peakHour < 12 ? 'morning' : peakHour >= 12 && peakHour < 17 ? 'afternoon' : peakHour >= 17 && peakHour < 21 ? 'evening' : 'night';
	const fmtHour = peakHour === 0 ? '12 AM' : peakHour < 12 ? `${peakHour} AM` : peakHour === 12 ? '12 PM' : `${peakHour - 12} PM`;

	ctx.fillStyle = 'rgba(255,255,255,0.6)';
	ctx.font = `400 36px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(`You're a ${timeOfDay} listener`, W / 2, 1250);
	ctx.fillStyle = 'rgba(255,255,255,0.3)';
	ctx.font = `400 28px ${FONT}`;
	ctx.fillText(`Peak hour: ${fmtHour}`, W / 2, 1300);
};

const drawWeekday = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const data = stats.dayOfWeekDistribution;
	const maxVal = Math.max(...data, 1);
	let peakDay = 0;
	for (let i = 0; i < 7; i++) if (data[i] > data[peakDay]) peakDay = i;

	drawLabel(ctx, 'Your favourite', 400);
	drawTitle(ctx, 'Day to Listen', 480);

	ctx.fillStyle = '#fde68a';
	ctx.font = `700 80px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(days[peakDay], W / 2, 650);

	// Bar chart
	const barW = 100;
	const gap = 20;
	const totalW = 7 * barW + 6 * gap;
	const startX = (W - totalW) / 2;
	const baseY = 1100;
	const maxH = 350;

	for (let i = 0; i < 7; i++) {
		const x = startX + i * (barW + gap);
		const h = Math.max(8, (data[i] / maxVal) * maxH);
		const y = baseY - h;

		ctx.fillStyle = i === peakDay ? '#eab308' : 'rgba(234, 179, 8, 0.3)';
		ctx.beginPath();
		ctx.roundRect(x, y, barW, h, [10, 10, 0, 0]);
		ctx.fill();

		ctx.fillStyle = 'rgba(255,255,255,0.4)';
		ctx.font = `400 24px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.fillText(short[i], x + barW / 2, baseY + 36);
	}
};

const drawStreak = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Longest', 500);
	drawTitle(ctx, 'Listening Streak', 580);

	ctx.fillStyle = '#6ee7b7';
	ctx.font = `700 180px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(String(stats.longestStreak.days), W / 2, 850);

	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 44px ${FONT}`;
	ctx.fillText('consecutive days', W / 2, 920);

	ctx.fillStyle = 'rgba(255,255,255,0.3)';
	ctx.font = `400 30px ${FONT}`;
	ctx.fillText(
		`${formatDate(stats.longestStreak.startDate)} — ${formatDate(stats.longestStreak.endDate)}`,
		W / 2,
		1000
	);
};

const drawSkipped = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'The ones you', 450);
	drawTitle(ctx, 'Skipped', 530);

	ctx.fillStyle = '#f87171';
	ctx.font = `700 120px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(stats.totalSkipped.toLocaleString(), W / 2, 730);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 36px ${FONT}`;
	ctx.fillText('total skips', W / 2, 790);

	if (stats.mostSkippedArtists.length > 0) {
		ctx.fillStyle = 'rgba(255,255,255,0.25)';
		ctx.font = `500 24px ${FONT}`;
		ctx.letterSpacing = '4px';
		ctx.fillText('MOST SKIPPED ARTISTS', W / 2, 900);
		ctx.letterSpacing = '0px';

		stats.mostSkippedArtists.slice(0, 5).forEach((a, i) => {
			const y = 960 + i * 56;
			ctx.fillStyle = 'rgba(255,255,255,0.6)';
			ctx.font = `400 32px ${FONT}`;
			ctx.textAlign = 'left';
			ctx.fillText(`${i + 1}. ${a.name}`, 200, y);
			ctx.fillStyle = 'rgba(248,113,113,0.6)';
			ctx.textAlign = 'right';
			ctx.fillText(String(a.count), W - 200, y);
		});
	}
};

const drawDeepCuts = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Exploration vs', 450);
	drawTitle(ctx, 'Heavy Rotation', 530);

	const pct = stats.uniqueTracksCount > 0 ? Math.round((stats.singlePlayTracks / stats.uniqueTracksCount) * 100) : 0;

	// Two stat boxes
	const boxW = 380;
	const boxH = 160;
	const gap = 40;

	[
		{ val: String(stats.singlePlayTracks), label: 'deep cuts', x: W / 2 - boxW - gap / 2 },
		{ val: `${pct}%`, label: 'played once', x: W / 2 + gap / 2 }
	].forEach((box) => {
		ctx.fillStyle = 'rgba(255,255,255,0.05)';
		ctx.beginPath();
		ctx.roundRect(box.x, 650, boxW, boxH, 24);
		ctx.fill();
		ctx.fillStyle = '#c4b5fd';
		ctx.font = `700 64px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.fillText(box.val, box.x + boxW / 2, 720);
		ctx.fillStyle = 'rgba(255,255,255,0.35)';
		ctx.font = `400 24px ${FONT}`;
		ctx.fillText(box.label, box.x + boxW / 2, 770);
	});

	if (stats.heavyRotationTracks.length > 0) {
		ctx.fillStyle = 'rgba(255,255,255,0.25)';
		ctx.font = `500 24px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.letterSpacing = '4px';
		ctx.fillText('ON REPEAT', W / 2, 900);
		ctx.letterSpacing = '0px';

		stats.heavyRotationTracks.slice(0, 3).forEach((t, i) => {
			const y = 970 + i * 72;
			ctx.fillStyle = 'rgba(255,255,255,0.7)';
			ctx.font = `500 30px ${FONT}`;
			ctx.textAlign = 'left';
			ctx.fillText(t.track, 160, y);
			ctx.fillStyle = 'rgba(255,255,255,0.35)';
			ctx.font = `400 24px ${FONT}`;
			ctx.fillText(t.artist, 160, y + 30);
			ctx.fillStyle = '#c4b5fd';
			ctx.font = `500 30px ${FONT}`;
			ctx.textAlign = 'right';
			ctx.fillText(`${t.count}x`, W - 160, y);
		});
	}

	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.font = `400 24px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.fillText(`${stats.uniqueTracksCount} unique tracks across all listens`, W / 2, 1250);
};

const drawMonthly = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawLabel(ctx, 'Your journey', 400);
	drawTitle(ctx, 'Month by Month', 480);

	const months = stats.monthlyTopArtist;
	const startY = 600;
	const gap = 80;

	months.forEach((m, i) => {
		const y = startY + i * gap;
		const [yr, mo] = m.month.split('-');
		const date = new Date(parseInt(yr), parseInt(mo) - 1);
		const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

		ctx.fillStyle = 'rgba(255,255,255,0.35)';
		ctx.font = `400 24px ${FONT}`;
		ctx.textAlign = 'right';
		ctx.fillText(label, 300, y);

		// Line
		ctx.fillStyle = 'rgba(99,102,241,0.3)';
		ctx.fillRect(320, y - 20, 2, 28);

		ctx.fillStyle = '#ffffff';
		ctx.font = `500 30px ${FONT}`;
		ctx.textAlign = 'left';
		ctx.fillText(m.artist, 345, y);
		ctx.fillStyle = 'rgba(255,255,255,0.35)';
		ctx.font = `400 24px ${FONT}`;
		ctx.fillText(`${m.count} plays`, 345, y + 30);
	});
};

const drawFirstLast = (ctx: CanvasRenderingContext2D, stats: WrappedStats) => {
	drawTitle(ctx, 'First & Last', 450);

	// First track
	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.font = `500 24px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.letterSpacing = '4px';
	ctx.fillText('WHERE IT ALL BEGAN', W / 2, 580);
	ctx.letterSpacing = '0px';

	ctx.fillStyle = 'rgba(255,255,255,0.05)';
	ctx.beginPath();
	ctx.roundRect(120, 610, W - 240, 180, 24);
	ctx.fill();

	ctx.fillStyle = '#e879f9';
	ctx.font = `700 38px ${FONT}`;
	ctx.textAlign = 'left';
	ctx.fillText(stats.firstTrack.track, 170, 670);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 30px ${FONT}`;
	ctx.fillText(stats.firstTrack.artist, 170, 715);
	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.font = `400 24px ${FONT}`;
	ctx.fillText(formatDate(stats.firstTrack.date), 170, 760);

	// Arrow
	ctx.strokeStyle = 'rgba(255,255,255,0.15)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(W / 2, 830);
	ctx.lineTo(W / 2, 930);
	ctx.moveTo(W / 2 - 12, 915);
	ctx.lineTo(W / 2, 930);
	ctx.lineTo(W / 2 + 12, 915);
	ctx.stroke();

	// Last track
	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.font = `500 24px ${FONT}`;
	ctx.textAlign = 'center';
	ctx.letterSpacing = '4px';
	ctx.fillText('MOST RECENT PLAY', W / 2, 1010);
	ctx.letterSpacing = '0px';

	ctx.fillStyle = 'rgba(255,255,255,0.05)';
	ctx.beginPath();
	ctx.roundRect(120, 1040, W - 240, 180, 24);
	ctx.fill();

	ctx.fillStyle = '#e879f9';
	ctx.font = `700 38px ${FONT}`;
	ctx.textAlign = 'left';
	ctx.fillText(stats.lastTrack.track, 170, 1100);
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = `400 30px ${FONT}`;
	ctx.fillText(stats.lastTrack.artist, 170, 1145);
	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.font = `400 24px ${FONT}`;
	ctx.fillText(formatDate(stats.lastTrack.date), 170, 1190);
};

export const CARD_DEFS: CardDef[] = [
	{ id: 'total-stats', title: 'By The Numbers', draw: drawTotalStats, gradient: ['#0f3460', '#533483'] },
	{ id: 'top-artists', title: 'Top Artists', draw: drawTopArtists, gradient: ['#1a0a2e', '#a855f7'] },
	{ id: 'top-albums', title: 'Top Albums', draw: drawTopAlbums, gradient: ['#0a1628', '#3b82f6'] },
	{ id: 'top-tracks', title: 'Top Tracks', draw: drawTopTracks, gradient: ['#1a0a1e', '#ec4899'] },
	{ id: 'listening-clock', title: 'Listening Clock', draw: drawListeningClock, gradient: ['#0a1a2e', '#06b6d4'] },
	{ id: 'weekday', title: 'Day of the Week', draw: drawWeekday, gradient: ['#1a1a0a', '#eab308'] },
	{ id: 'streak', title: 'Listening Streak', draw: drawStreak, gradient: ['#0a2e1a', '#10b981'] },
	{ id: 'skipped', title: 'Most Skipped', draw: drawSkipped, gradient: ['#2e0a0a', '#ef4444'] },
	{ id: 'deep-cuts', title: 'Deep Cuts', draw: drawDeepCuts, gradient: ['#1a0a2e', '#8b5cf6'] },
	{ id: 'monthly', title: 'Month by Month', draw: drawMonthly, gradient: ['#0a1a2e', '#6366f1'] },
	{ id: 'first-last', title: 'First & Last', draw: drawFirstLast, gradient: ['#1e0a2e', '#d946ef'] }
];

export function getApplicableCards(stats: WrappedStats): CardDef[] {
	return CARD_DEFS.filter((card) => {
		if (card.id === 'streak' && stats.longestStreak.days <= 1) return false;
		if (card.id === 'skipped' && stats.totalSkipped === 0) return false;
		if (card.id === 'deep-cuts' && stats.uniqueTracksCount < 5) return false;
		if (card.id === 'monthly' && stats.monthlyTopArtist.length < 2) return false;
		if (card.id === 'listening-clock' && stats.totalPlayed < 10) return false;
		if (card.id === 'weekday' && stats.totalPlayed < 10) return false;
		return true;
	});
}

export function renderCard(card: CardDef, stats: WrappedStats): string {
	const canvas = document.createElement('canvas');
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext('2d')!;

	drawGradient(ctx, card.gradient[0], card.gradient[1]);
	card.draw(ctx, stats);
	drawWatermark(ctx);

	return canvas.toDataURL('image/png');
}

export function downloadDataUrl(dataUrl: string, filename: string) {
	const a = document.createElement('a');
	a.href = dataUrl;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
