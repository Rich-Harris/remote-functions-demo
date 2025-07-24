import * as v from 'valibot';
import { form, prerender, query } from '$app/server';
import { error, redirect } from '@sveltejs/kit';

const posts = [
	{
		slug: 'welcome',
		title: 'Welcome to the Aperture Science computer-aided enrichment center',
		content:
			'<p>We hope your brief detention in the relaxation vault has been a pleasant one.</p><p>Your specimen has been processed and we are now ready to begin the test proper.</p>'
	},

	{
		slug: 'safety',
		title: 'Safety notice',
		content:
			'<p>While safety is one of many Enrichment Center Goals, the Aperture Science High Energy Pellet, seen to the left of the chamber, can and has caused permanent disabilities, such as vaporization. Please be careful.</p>'
	},

	{
		slug: 'cake',
		title: 'This was a triumph',
		content: "<p>I'm making a note here: HUGE SUCCESS.</p>"
	}
];

export const getSummaries = prerender(async () => {
	return posts.map((post) => ({
		slug: post.slug,
		title: post.title
	}));
});

export const getPost = prerender(v.string(), async (slug) => {
	return posts.find((post) => post.slug === slug) ?? error(404);
});

export const createPost = form((data) => {
	const title = data.get('title');
	const content = data.get('content');

	if (typeof title !== 'string' || typeof content !== 'string') {
		error(400, 'Title and content are required');
	}

	const slug = title.toLowerCase().replace(/ /g, '-');

	posts.push({
		slug,
		title,
		content
	});

	redirect(303, `/blog/${slug}`);
});
