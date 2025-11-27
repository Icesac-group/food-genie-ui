import api from "../api.ts/api";
export interface Meal {
  name: string;
  price: number;
  category: string;
  description: string;
  ingredients: string[] ;           
  _id:string;
  availability: boolean;
  nutritionPerServing: string[],
  instructions: string[];
  // tags: string[];
  // dietary: string[];
  // subtitle?: string;
  // image?: string;
  // preferences?: string[];
  // prepInstructions?: {
  //   microwave: {
  //     time: string;
  //     steps: string[];
  //   };
  //   oven: {
  //     time: string;
  //     steps: string[];
  //   };
  // };
  
}

export async function getMeals(){
  const getData = await api.get("/meals")
  //console.log(getData)
  return getData?.data
}

// export const MEALS_DATA: Meal[] = [
//   {
//     id: 1,
//     name: "Jollof Rice with Suya",
//     subtitle: "Classic Nigerian party jollof — smoky, spicy, unforgettable",
//     price: 4800,
//     category: "Rice",
//     description:
//       "Premium jollof rice topped with tender, spiced suya beef skewers and fresh vegetables",
//     tags: ["Subscriber Special", "Top Rated", "Spicy"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Dairy-free preparation.",
//       "Extra vegetables.",
//       "Grilled protein.",
//       "Mild spice level.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Remove meal sleeve, pierce clear plastic film",
//           "Microwave on HIGH for 3-4 minutes",
//           "Let cool, peel off film, plate and enjoy!",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Remove film, place tray on oven-safe sheet",
//           "Heat for 12-15 minutes",
//           "Remove, let cool, plate and enjoy smoky perfection",
//         ],
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Egusi Soup with Pounded Yam",
//     subtitle: "Rich, nutty melon seed soup — authentic Nigerian comfort food",
//     price: 5200,
//     category: "Soups",
//     description:
//       "Rich melon seed soup with assorted meat, served with smooth pounded yam",
//     tags: ["Top Rated", "Traditional"],
//     dietary: ["Gluten-Free", "High Protein"],
//     preferences: [
//       "Extra meat.",
//       "Less oil preparation.",
//       "Traditional spices.",
//       "Medium spice level.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Remove protective film and pierce",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir halfway through for even heating",
//           "Let stand for 1 minute, then serve",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Remove film, cover with foil",
//           "Heat for 15-18 minutes",
//           "Remove foil for last 3 minutes for authentic texture",
//         ],
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Fried Rice & Chicken",
//     subtitle: "Colorful, flavorful rice with perfectly seasoned chicken",
//     price: 4500,
//     category: "Rice",
//     description:
//       "Colorful Nigerian-style fried rice with tender grilled chicken pieces",
//     tags: ["Popular", "Kid-Friendly"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Extra vegetables.",
//       "Grilled chicken breast.",
//       "Light seasoning.",
//       "No peppers.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film in several places",
//           "Microwave on HIGH for 3-4 minutes",
//           "Let cool for 30 seconds",
//           "Mix and enjoy",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Remove film and cover with foil",
//           "Heat for 12-15 minutes",
//           "Uncover and serve hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Edikang Ikong Soup",
//     subtitle: "Nutrient-rich vegetable soup — healthy Nigerian tradition",
//     price: 5500,
//     category: "Soups",
//     description:
//       "Nutritious vegetable soup with fluted pumpkin leaves and waterleaf",
//     tags: ["Subscriber Special", "Healthy"],
//     dietary: ["Gluten-Free", "Low Carb", "High Protein"],
//     preferences: [
//       "Extra vegetables.",
//       "Lean protein.",
//       "Less palm oil.",
//       "Fresh herbs.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Pierce film and remove sleeve",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir gently halfway",
//           "Serve with your choice of swallow",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe dish",
//           "Cover and heat for 15-18 minutes",
//           "Garnish with fresh vegetables before serving",
//         ],
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Amala with Ewedu",
//     subtitle: "Traditional Yoruba meal — smooth, earthy, satisfying",
//     price: 4300,
//     category: "Swallows",
//     description: "Dark yam flour swallow with smooth jute leaf soup",
//     tags: ["Traditional", "Vegan Option"],
//     dietary: ["Vegan", "Gluten-Free"],
//     preferences: [
//       "Vegan preparation.",
//       "Extra ewedu soup.",
//       "Traditional preparation.",
//       "Mild spice.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "2-3 minutes",
//         steps: [
//           "Remove film from soup only",
//           "Microwave soup for 2-3 minutes",
//           "Serve amala at room temperature",
//           "Pour hot soup over amala",
//         ],
//       },
//       oven: {
//         time: "10-12 minutes",
//         steps: [
//           "Preheat oven to 350°F (175°C)",
//           "Heat soup only in oven-safe dish",
//           "Warm for 10-12 minutes",
//           "Serve soup with room temperature amala",
//         ],
//       },
//     },
//   },
//   {
//     id: 6,
//     name: "Pepper Soup",
//     subtitle: "Spicy, aromatic broth — Nigerian soul food at its finest",
//     price: 3800,
//     category: "Soups",
//     description: "Spicy goat meat pepper soup with native spices",
//     tags: ["Spicy", "Light Meal"],
//     dietary: ["Gluten-Free", "Low Carb", "High Protein"],
//     preferences: [
//       "Extra spicy.",
//       "Tender meat cuts.",
//       "Extra herbs.",
//       "Light broth.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film and vent",
//           "Microwave on HIGH for 3-4 minutes",
//           "Stir to distribute heat",
//           "Enjoy piping hot",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Serve immediately for best flavor",
//         ],
//       },
//     },
//   },
//   {
//     id: 7,
//     name: "Grilled Tilapia",
//     subtitle: "Fresh whole fish — grilled to smoky perfection",
//     price: 6200,
//     category: "Grill",
//     description: "Whole tilapia fish grilled to perfection with pepper sauce",
//     tags: ["Top Rated", "Grilled"],
//     dietary: ["Gluten-Free", "High Protein", "Low Carb"],
//     preferences: [
//       "Well-done grilling.",
//       "Extra pepper sauce.",
//       "Lemon wedges.",
//       "Grilled vegetables on side.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "2-3 minutes",
//         steps: [
//           "Remove from packaging",
//           "Microwave on MEDIUM for 2-3 minutes",
//           "Check temperature and add 30 seconds if needed",
//           "Serve with pepper sauce",
//         ],
//       },
//       oven: {
//         time: "8-10 minutes",
//         steps: [
//           "Preheat oven to 400°F (200°C)",
//           "Place on oven-safe tray",
//           "Heat for 8-10 minutes",
//           "Broil for last 2 minutes for crispy skin",
//         ],
//       },
//     },
//   },
//   {
//     id: 8,
//     name: "Moi Moi",
//     subtitle: "Steamed bean pudding — protein-rich Nigerian delicacy",
//     price: 2500,
//     category: "Light Meals",
//     description: "Steamed bean pudding with egg and fish",
//     tags: ["Healthy", "Light Meal"],
//     dietary: ["Gluten-Free", "Vegetarian"],
//     preferences: [
//       "Extra eggs.",
//       "Fish filling.",
//       "Mild spice level.",
//       "Traditional preparation.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "1-2 minutes",
//         steps: [
//           "Remove from container",
//           "Microwave on MEDIUM for 1-2 minutes",
//           "Let cool slightly",
//           "Serve warm with sauce",
//         ],
//       },
//       oven: {
//         time: "8-10 minutes",
//         steps: [
//           "Preheat oven to 350°F (175°C)",
//           "Place on oven-safe dish",
//           "Cover with foil and heat for 8-10 minutes",
//           "Serve warm",
//         ],
//       },
//     },
//   },
//   {
//     id: 9,
//     name: "Ofada Rice with Ayamase",
//     subtitle: "Unpolished local rice with legendary green pepper stew",
//     price: 5000,
//     category: "Rice",
//     description: "Unpolished rice served with spicy green pepper stew",
//     tags: ["Subscriber Special", "Spicy"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Extra spicy stew.",
//       "Assorted meat.",
//       "Traditional preparation.",
//       "Extra sauce.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film on both rice and stew",
//           "Microwave on HIGH for 3-4 minutes",
//           "Stir and combine",
//           "Enjoy authentic flavors",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Heat rice and stew separately",
//           "Warm for 12-15 minutes",
//           "Combine and serve hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 10,
//     name: "Afang Soup",
//     subtitle: "Wild vegetable soup — rich, hearty, deeply satisfying",
//     price: 5300,
//     category: "Soups",
//     description: "Wild vegetable soup with waterleaf and assorted meat",
//     tags: ["Traditional", "Top Rated"],
//     dietary: ["Gluten-Free", "High Protein"],
//     preferences: [
//       "Extra meat.",
//       "Rich preparation.",
//       "Traditional spices.",
//       "Extra vegetables.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Remove film and pierce",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir halfway through",
//           "Serve with swallow of choice",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Stir and serve hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 11,
//     name: "Fufu with Okra Soup",
//     subtitle: "Stretchy cassava swallow with draw okra soup",
//     price: 4700,
//     category: "Swallows",
//     description: "Cassava fufu served with draw okra soup",
//     tags: ["Traditional"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Fresh okra.",
//       "Assorted meat.",
//       "Traditional preparation.",
//       "Medium spice.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Heat soup only",
//           "Microwave on HIGH for 3-4 minutes",
//           "Serve fufu at room temperature",
//           "Pour hot soup over fufu",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Heat soup in oven-safe dish",
//           "Warm for 12-15 minutes",
//           "Serve with room temperature fufu",
//         ],
//       },
//     },
//   },
//   {
//     id: 12,
//     name: "Suya Platter",
//     subtitle: "Mixed grilled meat skewers — street food excellence",
//     price: 6500,
//     category: "Grill",
//     description: "Mixed meat suya skewers with onions and pepper",
//     tags: ["Top Rated", "Spicy", "Grilled"],
//     dietary: ["Gluten-Free", "High Protein"],
//     preferences: [
//       "Extra spicy rub.",
//       "Well-done grilling.",
//       "Extra suya spice.",
//       "Onions and peppers.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "2-3 minutes",
//         steps: [
//           "Remove from packaging",
//           "Microwave on MEDIUM for 2-3 minutes",
//           "Do not overheat to maintain tenderness",
//           "Serve with suya spice on side",
//         ],
//       },
//       oven: {
//         time: "8-10 minutes",
//         steps: [
//           "Preheat oven to 400°F (200°C)",
//           "Place on baking sheet",
//           "Heat for 8-10 minutes",
//           "Broil for 2 minutes for char marks",
//         ],
//       },
//     },
//   },
//   {
//     id: 13,
//     name: "Coconut Rice",
//     subtitle: "Fragrant rice cooked in creamy coconut milk",
//     price: 4200,
//     category: "Rice",
//     description: "Fragrant rice cooked in coconut milk with vegetables",
//     tags: ["Popular", "Mild"],
//     dietary: ["Gluten-Free", "Vegan Option"],
//     preferences: [
//       "Extra vegetables.",
//       "Vegan preparation.",
//       "Mild flavoring.",
//       "Fresh coconut.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film",
//           "Microwave on HIGH for 3-4 minutes",
//           "Fluff with fork",
//           "Serve warm",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Cover with foil",
//           "Heat for 12-15 minutes",
//           "Fluff and serve",
//         ],
//       },
//     },
//   },
//   {
//     id: 14,
//     name: "Banga Soup",
//     subtitle: "Palm fruit soup — rich, aromatic Niger Delta specialty",
//     price: 5100,
//     category: "Soups",
//     description: "Palm fruit soup with fresh fish and spices",
//     tags: ["Traditional", "Subscriber Special"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Fresh fish.",
//       "Traditional spices.",
//       "Rich palm extract.",
//       "Medium spice level.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Remove film and vent",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir gently",
//           "Serve with swallow",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Serve piping hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 15,
//     name: "Eba with Ogbono",
//     subtitle: "Garri swallow with thick, draw ogbono soup",
//     price: 4400,
//     category: "Swallows",
//     description: "Garri swallow with draw ogbono soup",
//     tags: ["Traditional", "Popular"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Extra soup.",
//       "Assorted meat.",
//       "Traditional preparation.",
//       "Medium consistency.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Heat soup only",
//           "Microwave on HIGH for 3-4 minutes",
//           "Serve eba at room temperature",
//           "Pour hot soup over eba",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Heat soup in oven-safe dish",
//           "Warm for 12-15 minutes",
//           "Serve with room temperature eba",
//         ],
//       },
//     },
//   },
//   {
//     id: 16,
//     name: "Grilled Chicken Wings",
//     subtitle: "Spicy, smoky chicken wings — finger-licking good",
//     price: 4000,
//     category: "Grill",
//     description: "Spicy grilled chicken wings with pepper sauce",
//     tags: ["Kid-Friendly", "Grilled"],
//     dietary: ["Gluten-Free", "High Protein"],
//     preferences: [
//       "Extra crispy.",
//       "Mild spice level.",
//       "Extra sauce.",
//       "Well-done.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "2-3 minutes",
//         steps: [
//           "Place on microwave-safe plate",
//           "Microwave on HIGH for 2-3 minutes",
//           "Let rest for 1 minute",
//           "Serve with dipping sauce",
//         ],
//       },
//       oven: {
//         time: "10-12 minutes",
//         steps: [
//           "Preheat oven to 400°F (200°C)",
//           "Place on baking sheet",
//           "Heat for 10-12 minutes",
//           "Broil for 2 minutes for crispiness",
//         ],
//       },
//     },
//   },
//   {
//     id: 17,
//     name: "Plantain Porridge",
//     subtitle: "Savory plantain cooked with vegetables and spices",
//     price: 3500,
//     category: "Light Meals",
//     description: "Savory plantain cooked with vegetables and spices",
//     tags: ["Vegan Option", "Healthy"],
//     dietary: ["Vegan", "Gluten-Free"],
//     preferences: [
//       "Extra vegetables.",
//       "Vegan preparation.",
//       "Mild spice.",
//       "Ripe plantains.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film",
//           "Microwave on HIGH for 3-4 minutes",
//           "Stir and let rest",
//           "Serve warm",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Cover with foil",
//           "Heat for 12-15 minutes",
//           "Serve immediately",
//         ],
//       },
//     },
//   },
//   {
//     id: 18,
//     name: "White Rice & Stew",
//     subtitle: "Classic combo — fluffy rice with rich tomato stew",
//     price: 4000,
//     category: "Rice",
//     description: "Plain white rice with rich tomato stew and chicken",
//     tags: ["Kid-Friendly", "Popular"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Extra stew.",
//       "Tender chicken.",
//       "Mild spice level.",
//       "Fresh vegetables.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film on both containers",
//           "Microwave on HIGH for 3-4 minutes",
//           "Combine rice and stew",
//           "Mix and enjoy",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Heat rice and stew separately",
//           "Warm for 12-15 minutes",
//           "Combine and serve hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 19,
//     name: "Bitter Leaf Soup",
//     subtitle: "Traditional soup — acquired taste, unforgettable flavor",
//     price: 5400,
//     category: "Soups",
//     description: "Traditional bitter leaf soup with assorted meat",
//     tags: ["Traditional", "Healthy"],
//     dietary: ["Gluten-Free", "High Protein"],
//     preferences: [
//       "Less bitter.",
//       "Assorted meat.",
//       "Traditional preparation.",
//       "Extra vegetables.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Remove film and pierce",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir halfway",
//           "Serve with swallow",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Serve piping hot",
//         ],
//       },
//     },
//   },
//   {
//     id: 20,
//     name: "Asun (Spicy Goat Meat)",
//     subtitle: "Spicy chopped goat meat — bold, fiery, addictive",
//     price: 6800,
//     category: "Grill",
//     description: "Spicy chopped and grilled goat meat with peppers",
//     tags: ["Top Rated", "Spicy", "Grilled"],
//     dietary: ["Gluten-Free", "High Protein", "Low Carb"],
//     preferences: [
//       "Extra spicy.",
//       "Well-done meat.",
//       "Extra peppers.",
//       "Smoked preparation.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "2-3 minutes",
//         steps: [
//           "Remove from packaging",
//           "Microwave on MEDIUM for 2-3 minutes",
//           "Do not overheat",
//           "Serve with extra peppers",
//         ],
//       },
//       oven: {
//         time: "8-10 minutes",
//         steps: [
//           "Preheat oven to 400°F (200°C)",
//           "Spread on baking sheet",
//           "Heat for 8-10 minutes",
//           "Serve hot with onions",
//         ],
//       },
//     },
//   },
//   {
//     id: 21,
//     name: "Tuwo Shinkafa",
//     subtitle: "Soft rice swallow — Northern Nigerian staple",
//     price: 4600,
//     category: "Swallows",
//     description: "Soft rice swallow with miyan kuka soup",
//     tags: ["Traditional", "Northern Special"],
//     dietary: ["Gluten-Free"],
//     preferences: [
//       "Extra soup.",
//       "Traditional preparation.",
//       "Soft consistency.",
//       "Mild spice.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Heat soup only",
//           "Microwave on HIGH for 3-4 minutes",
//           "Serve tuwo at room temperature",
//           "Pour hot soup over tuwo",
//         ],
//       },
//       oven: {
//         time: "12-15 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Heat soup in oven-safe dish",
//           "Warm for 12-15 minutes",
//           "Serve with room temperature tuwo",
//         ],
//       },
//     },
//   },
//   {
//     id: 22,
//     name: "Fisherman Soup",
//     subtitle: "Fresh seafood soup — coastal Nigerian treasure",
//     price: 6000,
//     category: "Soups",
//     description: "Fresh fish soup with assorted seafood",
//     tags: ["Top Rated", "Seafood"],
//     dietary: ["Gluten-Free", "High Protein", "Low Carb"],
//     preferences: [
//       "Extra seafood.",
//       "Fresh fish.",
//       "Light broth.",
//       "Mild spice.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "3-4 minutes",
//         steps: [
//           "Pierce film and vent",
//           "Microwave on MEDIUM for 3-4 minutes",
//           "Stir gently",
//           "Serve immediately",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 350°F (175°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Serve hot with care",
//         ],
//       },
//     },
//   },
//   {
//     id: 23,
//     name: "Akara & Pap",
//     subtitle: "Bean cakes with corn pap — classic Nigerian breakfast",
//     price: 2800,
//     category: "Light Meals",
//     description: "Bean cakes with corn pap breakfast combo",
//     tags: ["Breakfast", "Traditional"],
//     dietary: ["Vegetarian", "Gluten-Free"],
//     preferences: [
//       "Crispy akara.",
//       "Smooth pap.",
//       "Extra sugar.",
//       "Hot serving.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "1-2 minutes",
//         steps: [
//           "Heat pap for 1-2 minutes",
//           "Warm akara for 30 seconds",
//           "Serve immediately",
//           "Add sugar to taste",
//         ],
//       },
//       oven: {
//         time: "5-8 minutes",
//         steps: [
//           "Preheat oven to 350°F (175°C)",
//           "Warm akara on tray for 5 minutes",
//           "Heat pap separately",
//           "Serve hot together",
//         ],
//       },
//     },
//   },
//   {
//     id: 24,
//     name: "Ofe Nsala (White Soup)",
//     subtitle: "Light catfish soup — delicate, aromatic, special occasion meal",
//     price: 5600,
//     category: "Soups",
//     description: "Light catfish soup without palm oil",
//     tags: ["Traditional", "Healthy"],
//     dietary: ["Gluten-Free", "Low Carb", "High Protein"],
//     preferences: [
//       "Fresh catfish.",
//       "Extra yam.",
//       "Traditional spices.",
//       "Light preparation.",
//     ],
//     prepInstructions: {
//       microwave: {
//         time: "4-5 minutes",
//         steps: [
//           "Remove film and pierce",
//           "Microwave on HIGH for 4-5 minutes",
//           "Stir gently to preserve fish",
//           "Serve with swallow",
//         ],
//       },
//       oven: {
//         time: "15-18 minutes",
//         steps: [
//           "Preheat oven to 375°F (190°C)",
//           "Transfer to oven-safe pot",
//           "Cover and heat for 15-18 minutes",
//           "Serve carefully to keep fish intact",
//         ],
//       },
//     },
//   },
// ];

// // Helper functions
// export const getMealById = (id: number): Meal | undefined => {
//   return MEALS_DATA.find((meal) => meal.id === id);
// };

// export const getMealsByCategory = (category: string): Meal[] => {
//   if (category === "All") return MEALS_DATA;
//   return MEALS_DATA.filter((meal) => meal.category === category);
// };

// export const getRecommendedMeals = (
//   currentMealId: number,
//   limit: number = 8
// ): Meal[] => {
//   return MEALS_DATA.filter((meal) => meal.id !== currentMealId).slice(0, limit);
// };

// export const searchMeals = (query: string): Meal[] => {
//   const lowercaseQuery = query.toLowerCase();
//   return MEALS_DATA.filter(
//     (meal) =>
//       meal.name.toLowerCase().includes(lowercaseQuery) ||
//       meal.description.toLowerCase().includes(lowercaseQuery)
//   );
// };
