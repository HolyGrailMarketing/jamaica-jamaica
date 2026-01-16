import Link from 'next/link';
import { Search, Heart, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TopNav() {
  return (
    <nav className="h-[84px] bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-2xl font-bold text-primary font-script tracking-tight">
          <span className="text-primary">Jamaica</span> 
          <span className="text-black ml-1">Jamaica</span>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <div className="relative flex items-center w-full">
          <Input 
            placeholder="Search for a destination or experience..." 
            className="h-12 pl-4 pr-14 rounded-full border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white transition-all text-base"
          />
          <Button 
            size="icon" 
            className="absolute right-1.5 h-9 w-9 rounded-full bg-primary hover:bg-ocean-600 text-white shadow-none"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50">
          <Heart className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
