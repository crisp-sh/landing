"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

// Define the author type used by the card
export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

// Define the props for the card itself
interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string; // Optional link for the card/author
  className?: string;
}

export function TestimonialCard({ 
  author, 
  text, 
  href, 
  className 
}: TestimonialCardProps) {
  // Function to get initials for AvatarFallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const cardContent = (
    <Card
      className={cn(
        "flex h-full w-64 flex-col justify-between rounded-lg p-4 shadow-sm sm:w-72 md:w-80", // Fixed width for marquee
        className
      )}
    >
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={author.avatar} alt={`${author.name}'s avatar`} />
            <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-semibold leading-none text-foreground">
              {author.name}
            </p>
            <p className="text-xs text-muted-foreground">{author.handle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <p className="text-sm font-normal text-foreground/80 text-left">
          {text}
        </p>
      </CardContent>
      {href && (
        <CardFooter className="mt-4 p-0 justify-end">
           {/* No specific element provided, using a simple Link with icon */}
          <Link href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View Post <ExternalLink className="h-3 w-3" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );

  return cardContent;
} 