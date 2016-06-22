export class NameList {
	names = [
		'Meeting with Nabindar Singh.',
		'Exercise at 6:pm with Nicholas.',
		'Avengers Age of Ultron.',
		' Henna birthday at Mezbaan.'
	];

	get(): string[] {
		return this.names;
	}
	add(value: string): void {
		this.names.push(value);
	}
}
