'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blog() {
  const posts = [
    {
      id: '1',
      title: '5 Natural Ingredients That Transform Your Skin',
      excerpt: 'Discover the power of nature\'s best-kept skincare secrets...',
      date: 'March 15, 2024',
      category: 'Ingredients',
      emoji: '🌿'
    },
    {
      id: '2',
      title: 'The Ultimate Guide to Skincare Routine',
      excerpt: 'Learn the perfect order to apply your skincare products...',
      date: 'March 10, 2024',
      category: 'Tips & Tricks',
      emoji: '✨'
    },
    {
      id: '3',
      title: 'Acne-Prone Skin? Here\'s What You Need',
      excerpt: 'Targeted solutions for those struggling with acne...',
      date: 'March 5, 2024',
      category: 'Skin Types',
      emoji: '💚'
    },
    {
      id: '4',
      title: 'Why Organic Skincare Matters',
      excerpt: 'Understanding the benefits of natural, organic products...',
      date: 'February 28, 2024',
      category: 'Education',
      emoji: '🌱'
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              SkinCake Blog
            </h1>
            <p className="text-lg opacity-95">
              Tips, tricks, and skincare secrets from our experts
            </p>
          </div>
        </section>

        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-br from-sage-green/10 to-terracotta/10 h-40 flex items-center justify-center">
                  <div className="text-6xl">{post.emoji}</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-terracotta bg-terracotta/10 px-3 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-dark-charcoal/50">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-poppins font-bold mb-2 text-dark-charcoal line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-dark-charcoal/70 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <button className="btn-primary w-full text-sm">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
