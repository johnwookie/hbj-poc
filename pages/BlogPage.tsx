import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const MOCK_POSTS = [
    {
        id: 1,
        title: 'The Science Behind Glass Skin: A Deep Dive into Korean Formulations',
        excerpt: 'Understanding the active ingredients that produce the coveted radiant look, and why molecular size matters in absorption.',
        date: 'Oct 15, 2026',
        category: 'Skincare Insight',
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80'
    },
    {
        id: 2,
        title: 'Navigating New FDA Guidelines for Aesthetic Devices',
        excerpt: 'What clinic owners need to know about the updated compliance landscape for Class II medical lasers in 2026.',
        date: 'Oct 02, 2026',
        category: 'Industry News',
        image: null
    },
    {
        id: 3,
        title: 'Top 5 Mistakes Beginners Make with Gua Sha',
        excerpt: 'Are you tugging at your skin instead of lifting it? Let’s correct the most common technique errors we see in students.',
        date: 'Sep 28, 2026',
        category: 'Technique',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80'
    }
];

const BlogPage: React.FC = () => {
    return (
        <div className="bg-neutral-50 min-h-screen pb-24">

            {/* Header */}
            <section className="bg-white py-20 px-4 text-center border-b border-neutral-200">
                <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-6">The Academy Journal</h1>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    Insights, industry updates, and advanced clinical protocols straight from our educators.
                </p>
            </section>

            {/* Blog Grid */}
            <main className="max-w-7xl mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {MOCK_POSTS.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="h-56 bg-neutral-100 overflow-hidden relative">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-300 font-serif text-2xl">
                                        HBJ
                                    </div>
                                )}

                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-900 tracking-wide uppercase">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wide">
                                    <Calendar size={14} className="mr-2" />
                                    {post.date}
                                </div>

                                <h3 className="text-xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-rose-600 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-neutral-600 mb-6 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-4 border-t border-neutral-100">
                                    <button className="text-sm font-semibold text-neutral-900 flex items-center hover:text-rose-600 transition-colors">
                                        Read more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                </div>
            </main>

        </div>
    );
};

export default BlogPage;
