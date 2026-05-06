import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
interface CategoryCardProps {
  name: string;
  iconName: string;
  description: string;
}
export function CategoryCard({
  name,
  iconName,
  description
}: CategoryCardProps) {
  // @ts-ignore - Dynamic icon loading for mock data
  const Icon = Icons[iconName] || Icons.HelpCircle;
  return (
    <Link to={`/opportunities?category=${encodeURIComponent(name)}`}>
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        className="card p-6 h-full flex flex-col items-start hover:border-brand-200 hover:shadow-md transition-all group cursor-pointer">
        
        <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </motion.div>
    </Link>);

}