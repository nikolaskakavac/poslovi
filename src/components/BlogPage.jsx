import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData'; 

const BlogPage = () => {
  return (
    <div className="w-full bg-slate-50 py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">Blog</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display font-semibold text-slate-900">
            Saveti za karijeru i intervjue
          </h2>
          <p className="mt-4 text-slate-600">Kratki, jasni tekstovi koji pomazu da doneses bolju odluku.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-slate-200"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs uppercase tracking-widest text-emerald-600">{post.category}</span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 leading-snug">
                  {post.title}
                </h3>
                <span className="mt-auto text-sm text-slate-500">Procitaj vise →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;