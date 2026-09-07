import type { SpendingCategory } from "@/lib/cards/types";

/**
 * Rules the cardholder has to opt into: a category they pick, or a quarter that
 * rotates. They can apply to any category, but only if the holder selected or
 * activated it, so they always carry a caveat.
 */
export const pickRuleCategories = new Set([
  "choice_category",
  "one_everyday_category",
  "top_eligible_category",
  "two_chosen_categories"
]);

/** Rotating bonuses the issuer changes every quarter, so they run a quarter. */
export const rotatingRuleCategories = new Set(["quarterly_bonus"]);

export const conditionalRuleCategories = new Set([
  ...pickRuleCategories,
  ...rotatingRuleCategories
]);

export const categories: SpendingCategory[] = [
  {
    id: "dining",
    label: "Dining",
    matchingRules: [
      "dining",
      "restaurants",
      "gas_restaurants",
      "gas_dining_transit",
      "travel_dining"
    ]
  },
  {
    id: "groceries",
    label: "Groceries",
    matchingRules: [
      "grocery",
      "grocery_stores",
      "grocery_wholesale",
      "online_grocery",
      "supermarkets",
      "us_supermarkets",
      "whole_foods"
    ]
  },
  {
    id: "amazon",
    label: "Amazon",
    matchingRules: ["amazon"]
  },
  {
    id: "travel",
    label: "Travel",
    matchingRules: [
      "air_travel_hotels",
      "amex_travel_hotels",
      "capital_one_flights_vacation_rentals",
      "capital_one_hotels_rental_cars",
      "chase_travel",
      "citi_travel_hotels_cars_attractions",
      "direct_flights_hotels",
      "flights",
      "travel",
      "travel_dining",
      "travel_other"
    ]
  },
  {
    id: "gas",
    label: "Gas",
    matchingRules: ["gas", "us_gas", "gas_ev", "gas_restaurants", "gas_dining_transit"]
  },
  {
    id: "ev",
    label: "EV charging",
    matchingRules: ["gas_ev"]
  },
  {
    id: "transit",
    label: "Transit",
    matchingRules: ["transit", "gas_dining_transit"]
  },
  {
    id: "streaming",
    label: "Streaming",
    matchingRules: ["streaming"]
  },
  {
    id: "phone",
    label: "Phone bill",
    matchingRules: ["phone_plans"]
  },
  {
    id: "drugstores",
    label: "Drugstores",
    matchingRules: ["drugstores"]
  },
  {
    id: "entertainment",
    label: "Entertainment",
    matchingRules: ["entertainment", "sports_recreation_entertainment"]
  },
  {
    id: "wellness",
    label: "Wellness",
    matchingRules: ["self_care", "sports_recreation_entertainment"]
  },
  {
    id: "general",
    label: "Everything else",
    matchingRules: ["all_other"]
  }
];
