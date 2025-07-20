import { command, query } from '$app/server';

let clicks = 0;

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const getClicks = query(async () => {
	return clicks;
});

export const incrementClicks = command(async () => {
	await sleep();
	clicks++;
});
