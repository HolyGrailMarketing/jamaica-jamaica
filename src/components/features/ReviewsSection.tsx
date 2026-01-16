import { ReviewCard } from '@/components/features/ReviewCard';
import { Star } from 'lucide-react';

interface Review {
    id: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

interface ReviewsSectionProps {
    reviews: Review[];
    rating: number;
    reviewsCount: number;
}

export function ReviewsSection({ reviews, rating, reviewsCount }: ReviewsSectionProps) {
    if (reviews.length === 0) return null;

    return (
        <section className="py-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Star className="fill-amber-400 text-amber-400 h-6 w-6" />
                {rating.toFixed(1)} · {reviewsCount} reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {reviewsCount > reviews.length && (
                <div className="mt-8 text-center">
                    <button className="px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                        Show all {reviewsCount} reviews
                    </button>
                </div>
            )}
        </section>
    );
}
