'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X, Heart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Explore' },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
            <div className="container relative flex h-20 items-center justify-between w-full">
                {/* Logo - Left */}
                <Link href="/" className="flex items-center z-10 flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Jamaica Jamaica"
                        width={160}
                        height={40}
                        className="h-8 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav - Centered (Nav Links or Search Bar) */}
                <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
                    {isScrolled ? (
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-[500px]">
                            <Input
                                type="text"
                                placeholder="Search for a destination or experience..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 pl-4 pr-12 rounded-full border-border bg-muted/50 shadow-sm focus:bg-background transition-all text-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 h-8 w-8 rounded-full bg-primary hover:bg-ocean-600 text-white shadow-none"
                            >
                                <Search className="h-3.5 w-3.5" strokeWidth={2} />
                            </Button>
                        </form>
                    ) : (
                        <nav className="flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative py-1 transition-colors uppercase font-medium text-xs tracking-widest hover:text-foreground",
                                        pathname === link.href 
                                            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground" 
                                            : "text-foreground/50"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>

                {/* Desktop Actions - Right */}
                <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground" asChild>
                        <Link href="/favorites">
                            <Heart className="h-5 w-5" strokeWidth={1.5} />
                        </Link>
                    </Button>
                    <Button className="uppercase text-xs tracking-widest font-medium px-6 h-10">
                        List your place
                    </Button>
                </div>

                {/* Mobile Menu Toggle - Right */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden ml-auto"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
                </Button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-border/40">
                    <nav className="container py-6 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-2 py-2 transition-colors uppercase text-xs tracking-widest font-medium",
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-foreground/50 hover:text-foreground"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/favorites"
                            className="px-2 py-2 text-foreground/50 hover:text-foreground uppercase text-xs tracking-widest font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Favorites
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
