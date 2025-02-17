import { defineField, defineType } from 'sanity'
import {
	VscHome,
	VscQuestion,
	VscEyeClosed,
	VscSearch,
	VscEdit,
} from 'react-icons/vsc'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'modules',
			description: 'Page content',
			type: 'array',
			of: [
				{ type: 'accordion-list' },
				{ type: 'blog-frontpage' },
				{ type: 'blog-list' },
				{ type: 'blog-post-content' },
				{ type: 'projects-frontpage' },
				{ type: 'projects-list' },
				{ type: 'projects-project-content' },
				{ type: 'breadcrumbs' },
				{ type: 'callout' },
				{ type: 'card-list' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'flag-list' },
				{ type: 'hero' },
				{ type: 'hero.saas' },
				{ type: 'hero.split' },
				{ type: 'logo-list' },
				{ type: 'person-list' },
				{ type: 'pricing-list' },
				{ type: 'richtext-module' },
				{ type: 'schedule-module' },
				{ type: 'search-module' },
				{ type: 'stat-list' },
				{ type: 'step-list' },
				{ type: 'tabbed-content' },
				{ type: 'testimonial-list' },
				{ type: 'testimonial.featured' },
			],
			options: {
				insertMenu: {
					views: [
						{
							name: 'grid',
							previewImageUrl: (schemaType) =>
								`/admin/thumbnails/${schemaType}.webp`,
						},
						{ name: 'list' },
					],
					groups: [
						{
							name: 'blog',
							of: ['blog-frontpage', 'blog-list', 'blog-post-content'],
						},
						{ name: 'hero', of: ['hero', 'hero.saas', 'hero.split'] },
						{
							name: 'lists',
							of: [
								'accordion-list',
								'blog-list',
								'card-list',
								'flag-list',
								'logo-list',
								'person-list',
								'pricing-list',
								'stat-list',
								'step-list',
								'testimonial-list',
							],
						},
						{
							name: 'testimonials',
							of: ['testimonial-list', 'testimonial.featured'],
						},
					],
				},
			},
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
			noindex: 'metadata.noIndex',
		},
		prepare: ({ title, slug, media, noindex }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
			media:
				media ||
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(['blog', 'blog/*'].includes(slug) && VscEdit) ||
				(noindex && VscEyeClosed),
		}),
	},
})
