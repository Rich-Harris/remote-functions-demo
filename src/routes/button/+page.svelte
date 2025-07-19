<script>
	import { getClicks, incrementClicks } from './clicks.remote';
	import horn from './horn.mp3';

	const audio = new Audio();
	audio.src = horn;

	function honk() {
		audio.load();
		audio.play();

		incrementClicks().updates(getClicks().withOverride((clicks) => clicks + 1));
	}
</script>

<main>
	<button onclick={honk}>{await getClicks()}</button>
</main>

<style>
	main {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}

	button {
		--bg: radial-gradient(circle at 25% 25%, hsl(0, 100%, 50%) 0, hsl(0, 100%, 40%) 100%);
		--offset: 0.3em;
		pointer-events: all;
		font-size: min(10vmin, 4em);
		width: 6em;
		height: 6em;
		border-radius: 50%;
		background: var(--bg);
		box-shadow:
			0 var(--offset) 0 hsl(0, 100%, 30%),
			2px 12px 10px rgba(0, 0, 0, 0.35);
		color: hsl(0, 100%, 30%);
		text-shadow:
			-1px -1px 2px rgba(0, 0, 0, 0.3),
			1px 1px 2px rgba(255, 255, 255, 0.4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transform: translate(0, calc(-1 * var(--offset)));
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	button:hover {
		background: var(--bg);
		--offset: 0.35em;
	}

	button:active {
		--offset: 0.1em;
	}
</style>
