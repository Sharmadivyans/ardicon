// ARDICON REALTORS PVT. LTD. - Property Database
// Covering YEIDA, Greater Noida (GNIDA), Noida, and UPSIDC

const INITIAL_PROPERTIES = [
  {
    id: "ard-101",
    title: "Prime Authority Residential Plot in Sector 18 YEIDA",
    slug: "prime-authority-residential-plot-sector-18-yeida",
    category: "plots",
    propertyType: "Residential Plot",
    purpose: "sale",
    locality: "yeida",
    localityName: "YEIDA (Yamuna Expressway)",
    address: "Sector 18, Yamuna Expressway, Near Jewar Airport Corridor",
    city: "Greater Noida / YEIDA",
    authority: "YEIDA Approved",
    reraId: "UPRERA-YEIDA-2024-8891",
    price: 13500000, // 1.35 Cr
    priceDisplay: "₹1.35 Cr",
    pricePerUnit: "₹45,000 / sq.yd",
    area: 300, // 300 sq. yard
    areaUnit: "sq.yd",
    carpetArea: 300,
    bedrooms: 0,
    bathrooms: 0,
    facing: "North-East (Park Facing)",
    possession: "Immediate / Registry Open",
    status: "verified",
    featured: true,
    isNewLaunch: false,
    priceDrop: false,
    viewCount: 342,
    inquiryCount: 28,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Exceptional 300 Sq. Yard North-East park-facing residential plot in Sector 18, YEIDA along the Yamuna Expressway. Direct allottee property with clear title and zero encumbrances. Located just 12 km from the upcoming Noida International Airport (Jewar) and 5 minutes from the proposed Film City. Ideal for luxury villa construction and tremendous long-term capital appreciation.",
    amenities: [
      "24/7 Gated Security",
      "45-Meter Wide Sector Road",
      "Park Facing",
      "Underground Electricity",
      "YEIDA Approved Water Connection",
      "Sewage System Ready",
      "Near Proposed Metro Station",
      "Direct Yamuna Expressway Access"
    ],
    coordinates: { lat: 28.2831, lng: 77.5482 },
    distances: [
      { name: "Noida International Airport (Jewar)", distance: "12 Mins (14 km)" },
      { name: "Yamuna Expressway Toll Plaza", distance: "4 Mins (3.5 km)" },
      { name: "Upcoming International Film City", distance: "6 Mins (5 km)" },
      { name: "F1 Buddh International Circuit", distance: "10 Mins (9 km)" },
      { name: "Pari Chowk Greater Noida", distance: "18 Mins (19 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director & YEIDA Authority Specialist",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-102",
    title: "Heavy Industrial Land Parcel in UPSIDC Ecotech / Site 5",
    slug: "heavy-industrial-land-upsidc-ecotech-site-5",
    category: "industrial",
    propertyType: "Industrial Land",
    purpose: "sale",
    locality: "upsidc",
    localityName: "UPSIDC Industrial Area",
    address: "Ecotech Extension / Site 5, Surajpur Industrial Belt",
    city: "Greater Noida",
    authority: "UPSIDC Approved",
    reraId: "UPSIDC-IND-2023-4512",
    price: 45000000, // 4.50 Cr
    priceDisplay: "₹4.50 Cr",
    pricePerUnit: "₹22,500 / sq.m",
    area: 2000, // 2000 sq.m
    areaUnit: "sq.m",
    carpetArea: 2000,
    bedrooms: 0,
    bathrooms: 0,
    facing: "East (Corner Plot)",
    possession: "Ready for Construction",
    status: "verified",
    featured: true,
    isNewLaunch: false,
    priceDrop: false,
    viewCount: 418,
    inquiryCount: 36,
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sprawling 2,000 Sq. Meter industrial plot in prime UPSIDC Ecotech / Site 5 Greater Noida. Approved for manufacturing units, warehouse, data centers, or electronics assembly. 3-phase high tension power line readily available, heavy vehicle maneuvering internal roads (30 meters width), and seamless freight connectivity to Eastern Peripheral Expressway.",
    amenities: [
      "3-Phase Industrial Power Connection",
      "Heavy Vehicle 30m Wide Road Access",
      "Corner Plot with Double Side Open",
      "Effluent Drainage / Industrial Sewerage",
      "24/7 Security & Fire Hydrant System",
      "Dedicated Truck Loading Bays",
      "Near Eastern Peripheral Expressway",
      "Approved for All Non-Polluting Industries"
    ],
    coordinates: { lat: 28.5124, lng: 77.4912 },
    distances: [
      { name: "Eastern Peripheral Expressway", distance: "8 Mins (7 km)" },
      { name: "Noida-Greater Noida Expressway", distance: "12 Mins (10 km)" },
      { name: "Dadri Inland Container Depot (ICD)", distance: "15 Mins (13 km)" },
      { name: "Noida International Airport (Jewar)", distance: "32 Mins (38 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director & Industrial Investment Head",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-103",
    title: "Premium Commercial Retail Shop in Alpha 1 Commercial Belt",
    slug: "premium-commercial-retail-shop-alpha-1-commercial-belt",
    category: "commercial",
    propertyType: "Commercial Retail",
    purpose: "sale",
    locality: "gnida",
    localityName: "Greater Noida (GNIDA)",
    address: "MSX Tower II / Alpha Commercial Belt, Alpha 1",
    city: "Greater Noida",
    authority: "GNIDA Approved",
    reraId: "UPRERA-GN-2022-7721",
    price: 8500000, // 85 Lakhs
    priceDisplay: "₹85 Lakh",
    pricePerUnit: "₹17,000 / sq.ft",
    area: 500, // 500 sq.ft
    areaUnit: "sq.ft",
    carpetArea: 380,
    bedrooms: 0,
    bathrooms: 1,
    facing: "Main Commercial Belt Road Facing",
    possession: "Ready to Move / High Footfall",
    status: "verified",
    featured: true,
    isNewLaunch: false,
    priceDrop: true,
    viewCount: 612,
    inquiryCount: 52,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-visibility ground floor retail shop in MSX Tower II / Alpha 1 Commercial Belt, Greater Noida. Situated in the heart of the business and financial district, surrounded by top banks, corporate offices, and dense residential sectors. Currently generating steady rental yield of 7.2% p.a. or available for immediate self-operation.",
    amenities: [
      "100% Power Backup",
      "Central Air Conditioning Provision",
      "Multi-Level Basement Parking",
      "High Speed Elevators & Escalators",
      "24/7 CCTV & Security Guard Coverage",
      "Direct Footfall from Alpha 1 Metro Station",
      "Fire Safety & Sprinklers System",
      "Low Maintenance Charges"
    ],
    coordinates: { lat: 28.4735, lng: 77.5089 },
    distances: [
      { name: "Alpha 1 Metro Station (Aqua Line)", distance: "2 Mins Walk (200 m)" },
      { name: "Pari Chowk Crossing", distance: "4 Mins (1.8 km)" },
      { name: "Yamuna Expressway Entry", distance: "6 Mins (3.2 km)" },
      { name: "Gautam Buddha University", distance: "10 Mins (7 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director & Commercial Head",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-104",
    title: "Luxury 4 BHK Golf Course Villa in Jaypee Greens",
    slug: "luxury-4-bhk-golf-course-villa-jaypee-greens",
    category: "residential",
    propertyType: "Luxury Villa",
    purpose: "sale",
    locality: "gnida",
    localityName: "Greater Noida (GNIDA)",
    address: "Jaypee Greens Golf Course Estate, Pari Chowk",
    city: "Greater Noida",
    authority: "GNIDA Approved",
    reraId: "UPRERA-JG-2021-3310",
    price: 38000000, // 3.80 Cr
    priceDisplay: "₹3.80 Cr",
    pricePerUnit: "₹9,500 / sq.ft",
    area: 4000,
    areaUnit: "sq.ft",
    carpetArea: 3400,
    bedrooms: 4,
    bathrooms: 5,
    facing: "South-West (Golf Course View)",
    possession: "Ready to Move",
    status: "verified",
    featured: true,
    isNewLaunch: false,
    priceDrop: false,
    viewCount: 520,
    inquiryCount: 41,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ultra-luxury 4 Bedroom designer villa nestled inside the world-class 18-hole Graham Cooke signature Golf Course at Jaypee Greens, Greater Noida. Boasting private plunge pool, manicured gardens, smart home automation, Italian marble flooring, and private clubhouse access.",
    amenities: [
      "18-Hole Championship Golf Course View",
      "Private Heated Swimming Pool & Deck",
      "World-Class 5-Star Luxury Clubhouse",
      "Spa, Tennis Courts & Fitness Center",
      "3-Tier International Security Protocol",
      "Private Covered Car Parking for 3 Cars",
      "Smart Home Automation & Solar Panels",
      "Concierge & Golf Cart Transportation"
    ],
    coordinates: { lat: 28.4682, lng: 77.5145 },
    distances: [
      { name: "Pari Chowk", distance: "3 Mins (1.2 km)" },
      { name: "Noida-Greater Noida Expressway", distance: "5 Mins (2.5 km)" },
      { name: "Noida International Airport", distance: "28 Mins (34 km)" },
      { name: "Amity University Noida", distance: "18 Mins (22 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director & Luxury Portfolio Head",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-105",
    title: "500 Sq. Meter YEIDA Industrial / MSME Plot Sector 29",
    slug: "500-sq-meter-yeida-industrial-msme-plot-sector-29",
    category: "industrial",
    propertyType: "Industrial Plot",
    purpose: "sale",
    locality: "yeida",
    localityName: "YEIDA (Yamuna Expressway)",
    address: "Sector 29, Apparel Park / Toy City Zone, Yamuna Expressway",
    city: "Greater Noida / YEIDA",
    authority: "YEIDA Approved",
    reraId: "UPRERA-YEIDA-2023-1194",
    price: 18500000, // 1.85 Cr
    priceDisplay: "₹1.85 Cr",
    pricePerUnit: "₹37,000 / sq.m",
    area: 500,
    areaUnit: "sq.m",
    carpetArea: 500,
    bedrooms: 0,
    bathrooms: 0,
    facing: "North-West (30m Road Facing)",
    possession: "Allotment Letter Issued / Ready",
    status: "verified",
    featured: false,
    isNewLaunch: true,
    priceDrop: false,
    viewCount: 290,
    inquiryCount: 22,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Allotted 500 Sq. Meter MSME industrial plot in Sector 29 YEIDA near proposed Toy Park and Medical Device Park. Prime spot just 8 minutes drive from the upcoming Jewar International Airport terminal. Excellent for light manufacturing, packaging, pharma labs, or export garment manufacturing.",
    amenities: [
      "YEIDA Direct Allotment Papers Available",
      "Subsidized Industrial Power & Water",
      "30m Wide Road with Heavy Freight Access",
      "Dedicated Fire Hydrant Connection",
      "Adjacent to Proposed Logistics Hub",
      "Zero Litigation Clear Title"
    ],
    coordinates: { lat: 28.2514, lng: 77.5612 },
    distances: [
      { name: "Jewar International Airport Cargo Gate", distance: "8 Mins (7 km)" },
      { name: "Yamuna Expressway Entry", distance: "3 Mins (2 km)" },
      { name: "Noida Sector 62 / Expressway", distance: "35 Mins (42 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-106",
    title: "Luxury 3 BHK + Servant Apartment in Sector 150 Noida",
    slug: "luxury-3-bhk-servant-apartment-sector-150-noida",
    category: "residential",
    propertyType: "Apartment",
    purpose: "sale",
    locality: "noida",
    localityName: "Noida Expressway",
    address: "Sector 150, Noida Expressway (Sports City Zone)",
    city: "Noida",
    authority: "Noida Authority Approved",
    reraId: "UPRERA-NOIDA-2022-9014",
    price: 21500000, // 2.15 Cr
    priceDisplay: "₹2.15 Cr",
    pricePerUnit: "₹9,800 / sq.ft",
    area: 2195,
    areaUnit: "sq.ft",
    carpetArea: 1750,
    bedrooms: 3,
    bathrooms: 4,
    facing: "North-East (Green Park & 9-Hole Golf View)",
    possession: "Ready to Move",
    status: "verified",
    featured: true,
    isNewLaunch: false,
    priceDrop: false,
    viewCount: 490,
    inquiryCount: 39,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ultra-modern 3 BHK + Servant luxury residence in NCR's greenest sector - Sector 150 Noida. Featuring 80% open green landscapes, active sports infrastructure (9-hole golf course, Olympic swimming pool, tennis academies), EV charging stations, and seamless connectivity to both Noida Expressway and Yamuna Expressway.",
    amenities: [
      "80% Green Open Spaces & Forest Trail",
      "Olympic-Size Swimming Pool",
      "Clubhouse with Squash & Badminton Courts",
      "Basement Dedicated 2 Car Parkings",
      "EV Charging Bays",
      "Direct Access to Noida-Gr Noida Expressway",
      "3-Tier High Tech Security & Biometric Locks"
    ],
    coordinates: { lat: 28.4412, lng: 77.4721 },
    distances: [
      { name: "Sector 148 Metro Station", distance: "4 Mins (2.5 km)" },
      { name: "Pari Chowk", distance: "7 Mins (5 km)" },
      { name: "South Delhi via DND Flyway", distance: "25 Mins (28 km)" },
      { name: "Jewar International Airport", distance: "25 Mins (30 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-107",
    title: "1000 Sq. Yard Commercial Plot on Main Yamuna Expressway",
    slug: "1000-sq-yard-commercial-plot-yamuna-expressway",
    category: "commercial",
    propertyType: "Commercial Plot",
    purpose: "sale",
    locality: "yeida",
    localityName: "YEIDA (Yamuna Expressway)",
    address: "Sector 22D, Commercial Hub, Yamuna Expressway",
    city: "Greater Noida / YEIDA",
    authority: "YEIDA Approved",
    reraId: "UPRERA-YEIDA-2024-5541",
    price: 68000000, // 6.80 Cr
    priceDisplay: "₹6.80 Cr",
    pricePerUnit: "₹68,000 / sq.yd",
    area: 1000,
    areaUnit: "sq.yd",
    carpetArea: 1000,
    bedrooms: 0,
    bathrooms: 0,
    facing: "60-Meter Main Arterial Road Facing",
    possession: "Immediate Registry",
    status: "verified",
    featured: true,
    isNewLaunch: true,
    priceDrop: false,
    viewCount: 388,
    inquiryCount: 44,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Exceptional commercial land parcel facing the 60-meter wide arterial sector corridor in Sector 22D YEIDA. Approved for Hotel, Multiplex, Shopping Plaza, Corporate Headquarters, or Hospital. Strategically located between the Buddh International F1 Circuit and the upcoming Jewar Airport hub.",
    amenities: [
      "60-Meter Wide Frontage Road",
      "FAR Approved for High-Rise Commercial",
      "Dual Water & Power Supply Grid",
      "Direct Metro Corridor Connectivity",
      "Heavy High-Speed Highway Exposure"
    ],
    coordinates: { lat: 28.3211, lng: 77.5312 },
    distances: [
      { name: "Noida International Airport (Jewar)", distance: "10 Mins (11 km)" },
      { name: "F1 Buddh Circuit", distance: "4 Mins (3 km)" },
      { name: "Pari Chowk", distance: "14 Mins (15 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  },
  {
    id: "ard-108",
    title: "Affordable 120 Sq.m Authority Residential Plot Sector 20 YEIDA",
    slug: "120-sq-m-authority-residential-plot-sector-20-yeida",
    category: "plots",
    propertyType: "Residential Plot",
    purpose: "sale",
    locality: "yeida",
    localityName: "YEIDA (Yamuna Expressway)",
    address: "Pocket U, Sector 20, Yamuna Expressway",
    city: "Greater Noida / YEIDA",
    authority: "YEIDA Approved",
    reraId: "UPRERA-YEIDA-2023-4402",
    price: 6800000, // 68 Lakh
    priceDisplay: "₹68 Lakh",
    pricePerUnit: "₹56,600 / sq.m",
    area: 120,
    areaUnit: "sq.m",
    carpetArea: 120,
    bedrooms: 0,
    bathrooms: 0,
    facing: "East Facing",
    possession: "Allotment Ready / Registry Open",
    status: "verified",
    featured: false,
    isNewLaunch: false,
    priceDrop: true,
    viewCount: 710,
    inquiryCount: 65,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Budget-friendly 120 Sq. Meter residential plot in Sector 20 Pocket U, YEIDA. Very high demand compact size with rapid price appreciation potential. Fully planned infrastructure with green belts, community centers, school plots, and 18-meter wide sector roads.",
    amenities: [
      "YEIDA Registered & Transferable",
      "18-Meter Wide Road Frontage",
      "East Facing Vaastu Compliant",
      "Proximity to Upcoming Metro & Airport"
    ],
    coordinates: { lat: 28.2721, lng: 77.5389 },
    distances: [
      { name: "Noida International Airport", distance: "14 Mins (16 km)" },
      { name: "Pari Chowk", distance: "20 Mins (21 km)" }
    ],
    agent: {
      name: "Rohit Jain",
      title: "Managing Director",
      phone: "+91 9810273855",
      whatsapp: "919810273855",
      email: "ardiconrealtors@gmail.com",
      rating: "4.9 ★★★★★ (180+ Reviews)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    }
  }
];

const LOCALITY_DATA = {
  yeida: {
    id: "yeida",
    title: "YEIDA (Yamuna Expressway)",
    subtitle: "India's Fastest Growing Airport City & Global Investment Hotspot",
    avgPricePlot: "₹38,000 - ₹65,000 / sq.yd",
    avgPriceIndustrial: "₹25,000 - ₹42,000 / sq.m",
    growthYOY: "+28.4% in 2025-2026",
    overview: "The Yamuna Expressway Industrial Development Authority (YEIDA) region is North India's crown jewel for real estate appreciation, powered by the upcoming Noida International Airport at Jewar, International Film City, Olympic City, and Asia's largest Data Center hubs.",
    highlights: [
      "Noida International Airport (Jewar) phase-1 operational connectivity",
      "Dedicated Electronics Manufacturing & Medical Device Parks",
      "Direct 165 km Yamuna Expressway to Agra and Eastern Peripheral link",
      "Planned pod taxi and high-speed metro lines to Delhi NCR"
    ],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    hotSectors: ["Sector 18", "Sector 20", "Sector 22D", "Sector 29 MSME", "Sector 32 Industrial"]
  },
  gnida: {
    id: "gnida",
    title: "Greater Noida (GNIDA)",
    subtitle: "Planned Institutional & Commercial Powerhouse with Green Master Plan",
    avgPricePlot: "₹65,000 - ₹1,20,000 / sq.yd",
    avgPriceIndustrial: "₹30,000 - ₹55,000 / sq.m",
    growthYOY: "+19.2% in 2025-2026",
    overview: "Home to Ardicon Realtors' headquarters at MSX Tower II Alpha 1. Greater Noida boasts Asia's finest wide-grid road network, lush golf courses, premier universities (Gautam Buddha University, Sharda, Bennett), and the bustling Alpha Commercial Belt.",
    highlights: [
      "Aqua Line Metro connecting directly to Noida Sector 51 & Delhi Blue Line",
      "Alpha 1 & Pari Chowk premier commercial & corporate nerve centers",
      "Jaypee Greens 18-hole international golf city & luxury villas",
      "Multi-Modal Transport Hub (MMTH) & Logistics Park at Boraki"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    hotSectors: ["Alpha 1 Commercial Belt", "Jaypee Greens", "Delta 1 & 2", "Knowledge Park 2 & 3", "Chi-Phi Sectors"]
  },
  noida: {
    id: "noida",
    title: "Noida Expressway Corridors",
    subtitle: "High-End Residential Parks & Corporate MNC IT Hubs",
    avgPricePlot: "₹1,20,000 - ₹2,50,000 / sq.yd",
    avgPriceIndustrial: "₹45,000 - ₹85,000 / sq.m",
    growthYOY: "+15.8% in 2025-2026",
    overview: "Connecting South Delhi and Central Noida to Greater Noida, the Noida Expressway is home to top Fortune 500 tech campuses, green residential sectors like Sector 150 (Sports City), and premium healthcare institutes.",
    highlights: [
      "Sector 150 - NCR's first low-density 80% green sports sector",
      "Proximity to DND Flyway, Kalindi Kunj, and Mahamaya Flyover",
      "Established MNC hubs: TCS, Infosys, Adobe, Samsung, HCL"
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    hotSectors: ["Sector 150", "Sector 137", "Sector 128 (Wish Town)", "Sector 144 IT SEZ", "Sector 93A"]
  },
  upsidc: {
    id: "upsidc",
    title: "UPSIDC Industrial Corridors",
    subtitle: "Heavy Manufacturing, Warehousing & Export Logistics Hub",
    avgPricePlot: "₹20,000 - ₹38,000 / sq.m",
    avgPriceIndustrial: "₹22,000 - ₹45,000 / sq.m",
    growthYOY: "+22.5% in 2025-2026",
    overview: "The UP State Industrial Development Corporation (UPSIDC) zones in Surajpur, Ecotech, and Kasna offer large-scale land parcels with robust heavy-duty infrastructure, high power allocations, and direct freight corridors.",
    highlights: [
      "Surajpur & Ecotech industrial clusters with dedicated substations",
      "Near Dadri Inland Container Depot (ICD) for worldwide export logistics",
      "Approved for heavy machinery, automotive, packaging, and logistics parks"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    hotSectors: ["Ecotech 1 to 12", "Surajpur Site 5 & B", "Kasna Industrial Area", "Udyog Vihar"]
  }
};

const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "YEIDA Master Plan 2041: Why Real Estate Near Jewar Airport is Skyrocketing",
    slug: "yeida-master-plan-2041-jewar-airport-boom",
    date: "Aug 18, 2026",
    readTime: "5 min read",
    author: "Rohit Jain",
    category: "Investment Insights",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    excerpt: "With the Noida International Airport (Jewar) approaching full commercial readiness, land prices in YEIDA Sectors 18, 20, and 22D have surged by over 40% in two years. Here is what smart investors are buying today.",
    tags: ["YEIDA", "Jewar Airport", "Authority Plots", "ROI"]
  },
  {
    id: "blog-2",
    title: "Step-by-Step Guide to Buying an Authority Allotted Plot in Greater Noida & YEIDA",
    slug: "guide-buying-authority-plot-greater-noida-yeida",
    date: "Aug 10, 2026",
    readTime: "7 min read",
    author: "Rohit Jain",
    category: "Legal & Due Diligence",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    excerpt: "Navigating Transfer of Memorandum (TM), Allotment Letters, Registry verification, and dues clearance. How Ardicon Realtors safeguards your investment from title defects.",
    tags: ["Legal", "Due Diligence", "Registry", "GNIDA"]
  },
  {
    id: "blog-3",
    title: "Commercial vs Industrial Land: Which Generates Higher Rental Yield in 2026?",
    slug: "commercial-vs-industrial-land-rental-yield",
    date: "Jul 28, 2026",
    readTime: "6 min read",
    author: "Rohit Jain",
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Comparing MSX Tower Alpha 1 retail yields with UPSIDC Ecotech warehouse leasing rates to maximize your commercial real estate returns.",
    tags: ["Commercial", "Industrial", "Rental Yield", "MSX Tower"]
  }
];

const TESTIMONIALS = [
  {
    id: "test-1",
    clientName: "Sunil & Shalini Agarwal",
    designation: "Tech Executive, Bangalore",
    rating: 5,
    propertyBought: "300 Sq.yd Plot in Sector 18 YEIDA",
    quote: "Rohit Jain and the Ardicon team made our YEIDA plot purchase completely seamless. Being based out of Bangalore, we were worried about title verification and transfer paperwork, but Ardicon handled everything transparently. The land value has already jumped 35%!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-2",
    clientName: "Vikas Singhania",
    designation: "Director, Precision Electronics Pvt. Ltd.",
    rating: 5,
    propertyBought: "2000 Sq.m Industrial Land, Ecotech",
    quote: "We needed a clear-title industrial plot for our electronics manufacturing unit near Jewar. Rohit ji personally shortlisted prime options and got our UPSIDC leasehold transfer cleared within record time. Highly trustworthy team in Greater Noida.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-3",
    clientName: "Dr. Anirudh Mehta",
    designation: "Surgeon, Fortis Healthcare",
    rating: 5,
    propertyBought: "Luxury Villa in Jaypee Greens",
    quote: "Ardicon Realtors is the gold standard for premium real estate in Greater Noida. Their office at MSX Tower II is always welcoming and their market insights on Jewar Airport and Alpha Commercial Belt are unparalleled.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];
