export interface IOrder {
    id: string; // Unique identifier for the order
    mealSelection: string[]; // Array of selected meals (e.g., "Pizza", "Pasta", etc.)
    dietaryPreferences: string[]; // Array of dietary preferences (e.g., "Vegan", "Gluten-Free", "No Dairy")
    customerId: string; // Unique identifier for the customer placing the order
    status: 'pending' | 'in progress' | 'delivered'; // The current status of the order
    orderDate: Date; // The date when the order was placed
    deliveryDate?: Date; // Optional: The date when the order was delivered (if applicable)
  }