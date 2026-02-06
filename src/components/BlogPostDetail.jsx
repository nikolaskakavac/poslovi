import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div className="text-center py-20 text-2xl">Post nije pronađen.</div>;
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-[900px] mx-auto">
        
        <Link to="/blog" className="text-emerald-600 font-semibold hover:underline mb-8 inline-block">
          ← Nazad na blog
        </Link>

        <div className="text-center mb-10">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-slate-900 mt-4 mb-4">
            {post.title}
          </h1>
          <p className="text-slate-500">
            Napisano <span className="text-slate-900 font-semibold">{post.author}</span> • {post.date}
          </p>
        </div>

        <div className="w-full h-[420px] mb-10 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-emerald mx-auto text-slate-700">
          <p className="lead text-xl text-slate-600 mb-6 font-light">{post.excerpt}</p>
          <p>{post.fullContent}</p>
        </div>

      </div>
    </div>
  );
};

export default BlogPostDetail;