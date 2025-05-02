import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(timeString: string) {
  return timeString;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// SEO-related metadata helpers
export function generateSeoMetadata({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords?: string;
}) {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: typeof window !== "undefined" ? window.location.href : "",
      siteName: "AppointEase",
    },
  };
}

// Schema.org structured data for local business
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AppointEase",
    "description": "Online appointment booking system for businesses",
    "url": "https://appointease.com",
    "telephone": "+1-555-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Booking Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94103",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ]
  };
}
