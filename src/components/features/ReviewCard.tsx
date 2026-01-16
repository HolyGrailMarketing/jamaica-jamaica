import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
    id: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="border border-border/10 rounded-xl p-6 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-10 w-10 border border-border/20">
                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${review.authorName}`} alt={review.authorName} />
                    <AvatarFallback><User className="h-5 w-5 text-muted-foreground" /></AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-semibold text-sm">{review.authorName}</h4>
                    <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
                {review.comment}
            </p>
        </div>
    );
}
