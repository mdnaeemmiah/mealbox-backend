export interface IMealProvider {
    id: string; // Unique identifier for the meal provider
    name: string; // Name of the meal provider
    cuisineSpecialties: string[]; // Array of cuisine specialties (e.g., Italian, Chinese, etc.)
    availableMealOptions: string[]; // Array of available meal options (e.g., vegetarian, vegan, gluten-free, etc.)
    pricing:number;
    experience: number; // Years of experience in the food industry
    customerReviews: {
      rating: number; // Average rating out of 5
      reviewsCount: number; // Total number of reviews
      comments: string[]; // Array of customer comments
    };
    location?: string; // Optional field: Location of the meal provider (e.g., city or region)
    contactInfo: {
      phone?: string; // Optional phone number
      email: string; // Email address
      website?: string; // Optional website URL
    };
  }
  