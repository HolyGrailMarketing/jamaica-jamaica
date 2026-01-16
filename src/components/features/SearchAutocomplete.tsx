"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


// Minimal debounce hook implementation if not exists, but better to check if use-debounce lib exists or implement inside.
// I'll implement a custom debounce hook inside or assuming I shouldn't depend on external lib if not installed.
// The plan didn't mention installing use-debounce. I'll implement standard useEffect debounce.

interface Suggestion {
    id: string;
    title: string;
    category: string;
    parish: string;
    images: string[];
}

export function SearchAutocomplete() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setSuggestions(data);
                        setIsOpen(true);
                    }
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-[500px]">
            <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                <Input
                    type="text"
                    placeholder="Search for a destination or experience..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) setIsOpen(true);
                    }}
                    className="h-10 pl-4 pr-12 rounded-full border-border bg-muted/50 shadow-sm focus:bg-background transition-all text-sm"
                />
                <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 h-8 w-8 rounded-full bg-primary hover:bg-ocean-600 text-white shadow-none"
                >
                    {isLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Search className="h-3.5 w-3.5" strokeWidth={2} />
                    )}
                </Button>
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <ul className="py-1">
                        {suggestions.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={`/listing/${item.id}`}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted/50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-muted">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.title}</p>
                                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                                            <span className="capitalize">{item.category.toLowerCase()}</span>
                                            <span>•</span>
                                            <span className="flex items-center">
                                                <MapPin className="w-3 h-3 mr-0.5" />
                                                {item.parish}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li className="border-t">
                            <button
                                onClick={handleSubmit}
                                className="w-full text-left px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                            >
                                View all results for &quot;{query}&quot;
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
