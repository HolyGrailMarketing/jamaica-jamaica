import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-foreground text-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-7xl">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
                    {/* Logo Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Image
                            src="/logo.png"
                            alt="Jamaica Jamaica"
                            width={140}
                            height={35}
                            className="h-7 w-auto object-contain invert brightness-0 invert mb-6"
                        />
                        <p className="text-background/60 text-sm leading-relaxed">
                            Experience the real Jamaica with curated luxury stays and authentic experiences.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-widest mb-5 text-background/80">Discover</h3>
                        <ul className="space-y-3 text-sm text-background/60">
                            <li><Link href="/browse?category=stay" className="hover:text-background transition-colors">Stays</Link></li>
                            <li><Link href="/browse?category=tour" className="hover:text-background transition-colors">Tours</Link></li>
                            <li><Link href="/browse?category=restaurant" className="hover:text-background transition-colors">Restaurants</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-widest mb-5 text-background/80">Company</h3>
                        <ul className="space-y-3 text-sm text-background/60">
                            <li><Link href="/" className="hover:text-background transition-colors">About Us</Link></li>
                            <li><Link href="/" className="hover:text-background transition-colors">Careers</Link></li>
                            <li><Link href="/" className="hover:text-background transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-widest mb-5 text-background/80">Support</h3>
                        <ul className="space-y-3 text-sm text-background/60">
                            <li><Link href="/" className="hover:text-background transition-colors">Help Center</Link></li>
                            <li><Link href="/" className="hover:text-background transition-colors">Safety</Link></li>
                            <li><Link href="/" className="hover:text-background transition-colors">Cancellation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-widest mb-5 text-background/80">Legal</h3>
                        <ul className="space-y-3 text-sm text-background/60">
                            <li><Link href="/" className="hover:text-background transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-background transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-background/10 text-center text-xs text-background/40 tracking-wide">
                    <p>&copy; {new Date().getFullYear()} Jamaica Jamaica. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
