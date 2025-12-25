'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FoodGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch & Dinner' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const recipes = [
    {
      category: 'breakfast',
      name: 'Satvik Breakfast Bowl',
      description: 'Energizing morning meal',
      image: '/images/food/breakfast-bowl.jpg',
      time: '15 min'
    },
    {
      category: 'lunch',
      name: 'Traditional Thali',
      description: 'Complete balanced meal',
      image: '/images/food/thali.jpg',
      time: '30 min'
    },
    {
      category: 'snacks',
      name: 'Healthy Snack Platter',
      description: 'Guilt-free munching',
      image: '/images/food/snacks.jpg',
      time: '10 min'
    },
    {
      category: 'lunch',
      name: 'Vegetable Curry',
      description: 'Aromatic & nutritious',
      image: '/images/food/curry.jpg',
      time: '25 min'
    },
    {
      category: 'desserts',
      name: 'Satvik Sweet Treats',
      description: 'Natural sweetness',
      image: '/images/food/sweets.jpg',
      time: '20 min'
    },
    {
      category: 'breakfast',
      name: 'Fresh Fruit Bowl',
      description: 'Vitamin-packed start',
      image: '/images/food/fruits.jpg',
      time: '5 min'
    }
  ];

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-block bg-gold/20 px-4 py-2 rounded-full mb-4">
          <p className="text-gold font-bold text-sm">DELICIOUS & HEALTHY</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          See What You'll Be Cooking
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          150+ mouth-watering recipes that are as beautiful as they are nutritious
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-lg'
                : 'bg-dark-elevated text-text-secondary hover:bg-dark-card border border-royal-purple/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredRecipes.map((recipe, index) => (
          <div 
            key={index}
            className="group bg-dark-elevated rounded-xl overflow-hidden border border-royal-purple/20 hover:border-gold/50 transition-all hover:transform hover:scale-105 cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-emerald text-white px-3 py-1 rounded-full text-sm font-semibold">
                ⏱️ {recipe.time}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {recipe.name}
              </h3>
              <p className="text-text-muted text-sm">
                {recipe.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-royal-purple/20 to-gold/20 rounded-xl p-8 border border-gold/30">
        <p className="text-text-primary font-bold text-xl mb-2">
          This is just a small preview!
        </p>
        <p className="text-text-secondary mb-4">
          Get access to all 150+ recipes with step-by-step instructions, ingredient lists, and nutritional information
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Beginner-friendly</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Easy ingredients</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-royal-purple" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Delicious results</span>
          </div>
        </div>
      </div>
    </div>
  );
}
