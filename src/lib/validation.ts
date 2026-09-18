export type QuoteFormData = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  foodPreference: string;
  services: string[];
  details: string;
};

export const eventTypeOptions = [
  "Wedding",
  "Birthday",
  "Corporate event",
  "Family function",
  "Housewarming",
  "Outdoor event",
  "Other",
];

export const serviceOptions = [
  "Food & beverage service",
  "Live counters",
  "Decor & tablescape",
  "Service staff",
  "Crockery & rentals",
  "Dessert bar",
  "Beverage / mocktails",
];

export const foodPreferenceOptions = [
  "Pure vegetarian",
  "Vegetarian + non-vegetarian",
  "Vegan options needed",
  "Jain / no onion-garlic",
  "Halal",
  "No preference",
];

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

export function validateQuote(data: QuoteFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) errors.name = "Please tell us your name.";
  else if (data.name.trim().length < 2) errors.name = "That name looks a little short.";

  if (!data.phone.trim()) errors.phone = "A phone number helps us reach you quickly.";
  else if (!/^[+\d][\d\s-]{6,17}$/.test(data.phone.trim()))
    errors.phone = "Please enter a valid phone number.";

  if (!data.email.trim()) errors.email = "We need an email to send your quote.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "That email doesn't look right.";

  if (!data.eventType) errors.eventType = "Choose the occasion you're planning.";

  if (!data.eventDate) errors.eventDate = "Pick an event date (approximate is fine).";
  else if (!dateRe.test(data.eventDate)) errors.eventDate = "Use the date picker to choose a date.";
  else {
    const d = new Date(data.eventDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) errors.eventDate = "That date couldn't be read.";
    else if (d < today) errors.eventDate = "Please choose a date that hasn't passed.";
  }

  if (!data.location.trim()) errors.location = "Where is the event happening?";

  if (!data.guests) errors.guests = "Roughly how many guests?";
  else {
    const n = Number(data.guests);
    if (!Number.isFinite(n) || n < 1 || n > 100000)
      errors.guests = "Enter a guest count between 1 and 100,000.";
  }

  if (!data.foodPreference) errors.foodPreference = "Pick the closest food preference.";

  if (data.services.length === 0)
    errors.services = "Select at least one service — food service is a good start.";

  return errors;
}
