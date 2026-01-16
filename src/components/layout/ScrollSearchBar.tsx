'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ScrollSearchBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            // Show search bar when scrolled past 100px
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-20 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm transition-all duration-300">
            <div className="container py-4">
                <form onSubmit={handleSubmit} className="relative flex items-center max-w-2xl mx-auto">
                    <Input
                        type="text"
                        placeholder="Search for a destination or experience..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 pl-4 pr-14 rounded-full border-border bg-muted/50 shadow-sm focus:bg-background transition-all text-sm"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-1.5 h-9 w-9 rounded-full bg-primary hover:bg-ocean-600 text-white shadow-none"
                    >
                        <Search className="h-4 w-4" strokeWidth={2} />
                    </Button>
                </form>
            </div>
        </div>
    );
}
