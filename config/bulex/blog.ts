import data from './blog-posts.json';
import type {BulexLocale} from './routes';
export type BlogPost=typeof data[number];
export const blogPosts:BlogPost[]=data;
export function isBlogPostPublished(post:BlogPost,now:Date=new Date()){return Date.parse(post.publishAt)<=now.getTime()}
export function getPublishedBlogPosts(now:Date=new Date()){return blogPosts.filter(p=>isBlogPostPublished(p,now)).sort((a,b)=>Date.parse(b.publishAt)-Date.parse(a.publishAt))}
export function getScheduledBlogPosts(now:Date=new Date()){return blogPosts.filter(p=>!isBlogPostPublished(p,now)).sort((a,b)=>Date.parse(a.publishAt)-Date.parse(b.publishAt))}
export {blogCategoryLabels,blogDate,blogReadTime} from './blog-format';
