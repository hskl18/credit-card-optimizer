import {
  Car,
  Dumbbell,
  Fuel,
  Home,
  MoreHorizontal,
  Pill,
  Plane,
  Popcorn,
  ShoppingBag,
  ShoppingCart,
  Train,
  Utensils,
  Wifi
} from "lucide-react";
import type { SpendingCategory } from "@/lib/cards/types";

export const categories: SpendingCategory[] = [
  {
    id: "dining",
    label: "Dining",
    icon: Utensils,
    matchingRules: ["dining", "restaurants", "gas_dining_transit"]
  },
  {
    id: "groceries",
    label: "Groceries",
    icon: ShoppingCart,
    matchingRules: ["grocery_stores", "us_supermarkets", "supermarkets", "grocery_wholesale", "grocery"]
  },
  {
    id: "amazon",
    label: "Amazon",
    icon: ShoppingBag,
    matchingRules: ["amazon", "quarterly_bonus", "choice_category", "top_eligible_category"]
  },
  {
    id: "gas",
    label: "Gas",
    icon: Fuel,
    matchingRules: ["gas", "us_gas", "gas_ev", "gas_restaurants", "gas_dining_transit"]
  },
  {
    id: "ev",
    label: "EV charging",
    icon: Car,
    matchingRules: ["gas_ev"]
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    matchingRules: [
      "chase_travel",
      "travel_other",
      "capital_one_hotels_rental_cars",
      "capital_one_flights_vacation_rentals",
      "citi_travel_hotels_cars_attractions",
      "travel",
      "air_travel_hotels",
      "travel_dining"
    ]
  },
  {
    id: "streaming",
    label: "Streaming",
    icon: Wifi,
    matchingRules: ["streaming"]
  },
  {
    id: "transit",
    label: "Transit",
    icon: Train,
    matchingRules: ["transit", "gas_dining_transit"]
  },
  {
    id: "drugstores",
    label: "Drugstores",
    icon: Pill,
    matchingRules: ["drugstores"]
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: Popcorn,
    matchingRules: ["entertainment", "sports_recreation_entertainment"]
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: Dumbbell,
    matchingRules: ["self_care", "sports_recreation_entertainment"]
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Home,
    matchingRules: ["two_chosen_categories"]
  },
  {
    id: "general",
    label: "Other",
    icon: MoreHorizontal,
    matchingRules: ["all_other"]
  }
];
