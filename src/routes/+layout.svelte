<script lang="ts">
	import { logout, me } from '$lib/auth.remote';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:boundary>
	<nav>
		<div class="links">
			<a href="/">home</a>
			<a href="/blog">blog</a>
			<a href="/button">button</a>
		</div>

		<div class="controls">
			{#if await me()}
				<form {...logout}>
					<span>logged in as {(await me())!.name}</span>
					<button>logout</button>
				</form>
			{:else}
				<a href="/login">login</a>
			{/if}
		</div>
	</nav>

	{@render children()}

	{#snippet pending()}{/snippet}

	{#snippet failed(error, reset)}
		<p>something went horribly wrong: {(error as Error)?.message ?? error}</p>
		<button onclick={reset}>try again</button>
	{/snippet}
</svelte:boundary>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		height: 2rem;
	}

	form {
		flex-direction: row;
	}

	button {
	}
</style>
