export interface Property {
  id: string
  name: string
  location: string
  area: string
  price: string
  priceValue: number // For filtering
  image: string
  description: string
  features: string[]
  bedrooms: number
  bathrooms: number
  type: string // Apartment, Villa, etc.
  amenities: string[]
  yearBuilt: number
  furnished: boolean
}

export const properties: Property[] = [
  {
    id: "prop1",
    name: "Luxury 3BHK Apartment",
    location: "Vasant Kunj, South Delhi",
    area: "1850 sq.ft",
    price: "₹1.25 Cr",
    priceValue: 12500000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    description:
      "Elegant 3BHK apartment with premium finishes, spacious living areas, and modern amenities in a gated community. Features include Italian marble flooring, modular kitchen, and a private balcony with garden views.",
    features: ["Gated Community", "Swimming Pool", "Gym", "24/7 Security", "Power Backup"],
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    amenities: ["Club House", "Children's Play Area", "Visitor Parking", "Landscaped Gardens"],
    yearBuilt: 2020,
    furnished: true,
  },
  {
    id: "prop2",
    name: "Modern 2BHK Flat",
    location: "Dwarka, West Delhi",
    area: "1200 sq.ft",
    price: "₹85 Lakh",
    priceValue: 8500000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    description:
      "Contemporary 2BHK flat with open layout, abundant natural light, and convenient access to metro and markets. Perfect for young professionals or small families looking for modern living in a well-connected area.",
    features: ["Metro Proximity", "Modular Kitchen", "Reserved Parking", "Community Hall"],
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    amenities: ["Lift", "Power Backup", "Security", "Park"],
    yearBuilt: 2018,
    furnished: false,
  },
  {
    id: "prop3",
    name: "Premium 4BHK Villa",
    location: "Greater Kailash, South Delhi",
    area: "2800 sq.ft",
    price: "₹2.75 Cr",
    priceValue: 27500000,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    description:
      "Luxurious 4BHK villa with private garden, Italian marble flooring, and premium fixtures in an exclusive neighborhood. This property offers the perfect blend of luxury, comfort, and privacy for discerning buyers.",
    features: ["Private Garden", "Italian Marble", "Modular Kitchen", "Home Theater", "Study Room"],
    bedrooms: 4,
    bathrooms: 3,
    type: "Villa",
    amenities: ["Swimming Pool", "Gym", "Spa", "Tennis Court", "BBQ Area"],
    yearBuilt: 2021,
    furnished: true,
  },
  {
    id: "prop4",
    name: "Budget 1BHK Apartment",
    location: "Rohini, North Delhi",
    area: "650 sq.ft",
    price: "₹45 Lakh",
    priceValue: 4500000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    description:
      "Affordable 1BHK apartment perfect for singles or young couples, with essential amenities and good connectivity. Located in a vibrant neighborhood with easy access to markets, schools, and public transportation.",
    features: ["24/7 Water Supply", "Reserved Parking", "Security", "Park View"],
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
    amenities: ["Lift", "Visitor Parking", "CCTV", "Garden"],
    yearBuilt: 2016,
    furnished: false,
  },
  {
    id: "prop5",
    name: "Spacious 3BHK Penthouse",
    location: "Saket, South Delhi",
    area: "2200 sq.ft",
    price: "₹1.95 Cr",
    priceValue: 19500000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    description:
      "Stunning penthouse with panoramic city views, private terrace, and premium amenities in a prime location. This exclusive property offers luxury living with high ceilings, large windows, and designer interiors.",
    features: ["Terrace Garden", "Premium Fittings", "Club Membership", "Concierge Service", "Smart Home"],
    bedrooms: 3,
    bathrooms: 3,
    type: "Penthouse",
    amenities: ["Infinity Pool", "Gym", "Spa", "Lounge", "Helipad Access"],
    yearBuilt: 2022,
    furnished: true,
  },
  {
    id: "prop6",
    name: "Elegant 2BHK Flat",
    location: "Mayur Vihar, East Delhi",
    area: "1100 sq.ft",
    price: "₹75 Lakh",
    priceValue: 7500000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
    description:
      "Well-designed 2BHK flat with modern amenities, ample parking, and proximity to schools and shopping centers. Features include a spacious living room, modern kitchen, and balcony with pleasant views.",
    features: ["Modular Kitchen", "Balcony", "Children's Play Area", "Visitor Parking"],
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    amenities: ["Gym", "Community Hall", "Garden", "Security"],
    yearBuilt: 2019,
    furnished: false,
  },
]

// Helper function to filter properties based on search query
export function filterProperties(query: string): Property[] {
  if (!query.trim()) return properties

  const lowercaseQuery = query.toLowerCase()

  // Check for BHK mentions
  const bhkMatch = lowercaseQuery.match(/(\d+)\s*bhk/i)
  const bedrooms = bhkMatch ? Number.parseInt(bhkMatch[1]) : null

  // Check for location mentions
  const locations = [
    "south delhi",
    "north delhi",
    "east delhi",
    "west delhi",
    "vasant kunj",
    "dwarka",
    "greater kailash",
    "rohini",
    "saket",
    "mayur vihar",
  ]
  const locationMatches = locations.filter((loc) => lowercaseQuery.includes(loc))

  // Check for price mentions
  const underPrice = lowercaseQuery.includes("under") || lowercaseQuery.includes("less than")
  const priceMatch = lowercaseQuery.match(/(\d+(\.\d+)?)\s*(cr|crore|lakh)/i)
  let maxPrice = null

  if (priceMatch) {
    const amount = Number.parseFloat(priceMatch[1])
    const unit = priceMatch[3].toLowerCase()

    if (unit === "cr" || unit === "crore") {
      maxPrice = amount * 10000000 // Convert crore to rupees
    } else if (unit === "lakh") {
      maxPrice = amount * 100000 // Convert lakh to rupees
    }
  }

  // Check for features/amenities
  const features = ["pool", "gym", "garden", "parking", "security", "balcony", "terrace", "furnished"]
  const featureMatches = features.filter((feature) => lowercaseQuery.includes(feature))

  return properties.filter((property) => {
    // Filter by bedrooms if specified
    if (bedrooms !== null && property.bedrooms !== bedrooms) {
      return false
    }

    // Filter by location if specified
    if (locationMatches.length > 0) {
      const propertyLocationLower = property.location.toLowerCase()
      if (!locationMatches.some((loc) => propertyLocationLower.includes(loc))) {
        return false
      }
    }

    // Filter by price if specified
    if (maxPrice !== null && underPrice && property.priceValue > maxPrice) {
      return false
    }

    // Filter by features/amenities if specified
    if (featureMatches.length > 0) {
      const propertyFeatures = [...property.features, ...property.amenities].map((f) => f.toLowerCase())
      if (
        !featureMatches.some(
          (feature) =>
            propertyFeatures.some((f) => f.includes(feature)) || (feature === "furnished" && property.furnished),
        )
      ) {
        return false
      }
    }

    // If no specific filters or all filters passed
    return true
  })
}
