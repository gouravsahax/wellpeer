'use client';

import React, { useState, useTransition } from 'react';
import { ThumbsUp } from 'lucide-react';
import { toggleLike } from '@/lib/recc-action';

interface LikeButtonProps {
  reccId: string;
  initialLikeCount: number;
  initialHasLiked: boolean;
}

export default function LikeButton({ 
  reccId, 
  initialLikeCount, 
  initialHasLiked 
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialHasLiked);
  const [count, setCount] = useState(initialLikeCount);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    // Optimistic UI updates
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount(prev => nextLiked ? prev + 1 : prev - 1);

    startTransition(async () => {
      try {
        await toggleLike(reccId);
      } catch (error) {
        // Rollback on error
        setLiked(liked);
        setCount(count);
        console.error('Failed to toggle like:', error);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-1.5 cursor-pointer transition-colors duration-200 ${
        liked 
          ? 'text-blue-400' 
          : 'text-zinc-400 hover:text-white'
      }`}
      title={liked ? 'Unlike' : 'Like'}
    >
      <ThumbsUp 
        size={14} 
        className={`${liked ? 'fill-blue-400 text-blue-400' : 'text-current'}`} 
      />
      <span>{count}</span>
    </button>
  );
}
