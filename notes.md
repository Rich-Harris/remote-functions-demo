```ts
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { query } from '$app/server';
import { db } from '$lib/server/db';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

export const getUpvotes = query(v.string(), async (id) => {
	const [product] = await db.sql`SELECT * FROM product WHERE id = ${id}`;
	if (!product) error(404);

	const elapsed = Date.now() - product.createdAt;

	// hypothetical code, this API does not exist
	query.cacheFor(
		elapsed < ONE_MINUTE ? ONE_SECOND :
		elapsed < ONE_HOUR ? ONE_MINUTE :
		ONE_HOUR
	);

	return product.upvotes;
});
```

```ts
// unbatched
export const getTodo = query(v.string(), async (id) => {
	const [todo] = await db.sql`SELECT * FROM todo WHERE id = ${id}`;
	return todo ?? error(404);
});

// batched
export const getTodo = query.batch(v.string(), async (ids) => {
	return await db.sql`SELECT * FROM todo WHERE id in ${ids}`;
});
```


```ts
const sleep = (ms: number) => new Promise((f) => setTimeout(f, ms));

export const time = query.stream(async function* () {
	while (true) {
		yield new Date();
		await sleep(1000);
	}
});
```

```ts
for await (const t of time()) {
	console.log(`the time is ${t}`);
}
```

```svelte
<script lang="ts">
	import { time } from '$lib/data.remote.ts';
</script>

<p>the time is {await time()}</p>
```

```svelte
<script>
	import { t } from '$app/translations';

	let { name } = $props();
</script>

<h1>{await t.greet(name)}</h1>

<select bind:value={() => t.$language, (l) => t.$language = l}>
	{#each t.$languages as { code, name }}
		<option value={code}>{name}</option>
	{/each}
</select>
```
