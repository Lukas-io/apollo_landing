import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Timer } from 'lucide-react';

interface PhoneScreenProps {
  timeLeft: { days: number; hours: number; minutes: number };
}

export function PhoneScreen({ timeLeft }: PhoneScreenProps) {
  const screenBg = 'from-white to-gray-50';
  const headerBg = 'bg-white';
  const cardBg = 'bg-white';
  const cardBorder = 'border-gray-200';
  const textPrimary = 'text-gray-900';
  const textSecondary = 'text-gray-600';
  const textMuted = 'text-gray-500';
  const borderColor = 'border-gray-100';
  const buttonSecondary = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
  const navigationHint = 'bg-gray-300';
  const batteryBorder = 'border-gray-400';
  const batteryFill = 'bg-gray-900';

  return (
    <div className={`w-full h-full ${headerBg} rounded-[2.2rem] overflow-hidden relative`}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
      
      {/* Status Bar */}
      <div className={`absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-2 text-sm font-medium ${textPrimary} ${headerBg} z-10`}>
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className={`w-4 h-2 border ${batteryBorder} rounded-sm`}>
            <div className={`w-3 h-1 ${batteryFill} rounded-sm m-[1px]`}></div>
          </div>
        </div>
      </div>

      {/* App Content */}
      <div className={`pt-12 h-full bg-gradient-to-b ${screenBg}`}>
        {/* Timer Header */}
        <div className={`px-6 py-6 border-b ${borderColor}`}>
          <div className="text-center">
            <div className={`text-sm ${textMuted} mb-2`} style={{ fontFamily: 'var(--font-display)' }}>
              Day 3 of 7
            </div>
            <div className="flex items-center justify-center gap-2 text-red-500">
              <Timer className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m left
              </span>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-4">
          <div className={`${cardBg} rounded-2xl shadow-lg overflow-hidden border ${cardBorder}`}>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574888121821-1dc5d49eeba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBzbWlsaW5nJTIwbmF0dXJhbHxlbnwxfHx8fDE3NTU1MDIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-full h-72 object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
              
              {/* Profile Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Emma, 24
                </h3>
                <p className="text-white/90 text-sm">2 km away</p>
              </div>

              {/* Match Probability */}
              <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                94% Match
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-4">
              <p className={`${textSecondary} text-sm mb-4 leading-relaxed`}>
                "Looking for something real before my 7 days are up! Coffee lover ☕ and weekend hiker 🥾"
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className={`flex-1 ${buttonSecondary} py-3 rounded-xl font-semibold text-sm transition-colors duration-200`}>
                  Pass
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200">
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Hint */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className={`w-24 h-1 ${navigationHint} rounded-full`}></div>
        </div>
      </div>
    </div>
  );
}