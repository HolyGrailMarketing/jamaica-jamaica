import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Note: I am not installing radix-ui/react-slot just for this, I will implement a simplified version
// actually, let's keep it simple without Slot for now unless I install it.
// I will just use standard button props.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-ocean-600 shadow-sm hover:shadow-md",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-foreground/20 bg-transparent hover:bg-foreground hover:text-background",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-muted hover:text-foreground",
                link: "text-foreground underline-offset-4 hover:underline",
                dark: "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
            },
            size: {
                default: "h-11 px-5 py-2",
                sm: "h-9 rounded px-4 text-xs",
                lg: "h-12 rounded px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        // simplified without Slot for now to avoid extra deps if not needed, typical chadcn uses Slot
        // but standard HTML button is fine for this mockup
        const Comp = "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
