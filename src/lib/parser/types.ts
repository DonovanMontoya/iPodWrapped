export interface ScrobbleEntry {
	artist: string;
	album: string;
	track: string;
	trackNumber: number;
	duration: number;
	rating: 'L' | 'S';
	timestamp: number;
	date: Date;
}

export interface ParseResult {
	entries: ScrobbleEntry[];
	totalLines: number;
	skippedLines: number;
	errors: ParseError[];
	headerVersion: string | null;
}

export interface ParseError {
	line: number;
	content: string;
	reason: string;
}
