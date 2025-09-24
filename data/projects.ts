"use client";
import Second from "@/public/images/projects/2.jpg";
import Third from "@/public/images/projects/3.jpg";
import Fourth from "@/public/images/projects/4.jpg";
import Fifth from "@/public/images/projects/5.jpg";
import Card from "@/public/images/projects/card.jpg";
import Seventh from "@/public/images/projects/7.jpg";

import ProjectDetail1 from "@/public/images/projects/1.jpg";
import ProjectDetail2 from "@/public/images/projects/2.jpg";
import ProjectDetail3 from "@/public/images/projects/3.jpg";
import ProjectDetail4 from "@/public/images/projects/4.jpg";
import ProjectDetail5 from "@/public/images/projects/5.jpg";
import ProjectDetail6 from "@/public/images/projects/card.jpg";
import ProjectDetail7 from "@/public/images/projects/7.jpg";
import ProjectDetail8 from "@/public/images/projects/1.jpg";

import Brand1 from "@/public/images/projects/Branding/1.png";
import Brand2 from "@/public/images/projects/Branding/2.png";
import Brand3 from "@/public/images/projects/Branding/3.png";
import Brand4 from "@/public/images/projects/Branding/4.png";
import Brand5 from "@/public/images/projects/Branding/5.png";
import Brand6 from "@/public/images/projects/Branding/6.png";
import Brand7 from "@/public/images/projects/Branding/7.png";
import Brand8 from "@/public/images/projects/Branding/8.png";
import Brand9 from "@/public/images/projects/Branding/9.png";
import { StaticImageData } from "next/image";

type ProjectDetail = {
  title: string;
  category: string;
  slug: string;
  image: StaticImageData;
  client?: string;
  year?: string;
  services: string[];
  description: string[];
  details: string[];
  images?: StaticImageData[];
};

const Projects: ProjectDetail[] = [
  {
    slug: "perfectly-wild",
    title: "Perfectly Wild",
    category: "Kin —",
    client: "Kin Pty Ltd",
    year: "2023",
    services: ["Brand Identity", "Packaging Design", "Web Design"],
    image: Brand1,
    description: [
      "Perfectly Wild is a premium skincare brand that harnesses the power of native Indian botanicals. The brand needed an identity that reflected its commitment to purity, sustainability, and the wild beauty of the Indian landscape.",
      "We developed a visual language that balances sophistication with organic textures, creating a brand world that feels both luxurious and grounded in nature. The packaging system uses sustainable materials and a distinctive color palette inspired by the Indian outback.",
      "The result is a brand that stands out in the competitive skincare market while staying true to its wild origins. Perfectly Wild has seen a 40% increase in shelf appeal and a 25% boost in online sales since the rebrand.",
    ],
    details: [
      "The logo incorporates custom typography with organic, flowing lines that mimic native flora. The brand mark features an abstract representation of the Indian landscape, creating instant recognition.",
      "Color plays a crucial role in the brand's identity. We developed a palette of earthy tones combined with vibrant accents that reflect the diversity of Indian ecosystems. Each product line uses a specific color to indicate its primary botanical ingredient.",
      "Photography direction focuses on raw, untouched landscapes contrasted with clean product shots. This duality reinforces the brand's promise of wild ingredients in sophisticated formulations.",
    ],
    images: [
      Brand2,
      Brand3,
      Brand4,
      Brand5,
      Brand6,
      Brand7,
      Brand8,
      Brand9,
    ],
  },
  {
    slug: "dare-to-become",
    title: "Dare to Become",
    category: "Annesley Junior School —",
    client: "Annesley Education Group",
    year: "2022",
    services: ["Brand Strategy", "Visual Identity", "Environmental Graphics"],
    image: Second,
    description: [
      "Annesley Junior School approached us to create a bold new identity that would reflect their progressive approach to education. The 'Dare to Become' campaign needed to inspire both students and parents while differentiating the school in a competitive market.",
      "We developed a dynamic visual system based on the concept of transformation and growth. The identity incorporates fluid shapes that evolve across applications, representing each student's unique journey.",
      "The rebrand has been instrumental in increasing enrollment by 18% and has received recognition in educational design circles for its innovative approach to school branding.",
    ],
    details: [
      "The core of the identity is a custom wordmark that suggests upward movement and aspiration. The 'A' in Annesley subtly incorporates a rising arrow motif that appears throughout the visual system.",
      "We created a series of abstract illustrations representing different learning pathways. These 'growth patterns' are used across print and digital materials, with color coding to indicate different age groups and learning stages.",
      "Environmental graphics transform the school's physical spaces into immersive learning environments. Wall murals, wayfinding, and interactive displays all reinforce the 'Dare to Become' philosophy.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
  {
    slug: "long-live-love",
    title: "Long Live Love",
    category: "Becks —",
    client: "Becks Brewery",
    year: "2023",
    services: ["Campaign Design", "Packaging", "Digital Advertising"],
    image: Third,
    description: [
      "Becks approached us to create a limited edition packaging series celebrating love in all its forms. The 'Long Live Love' campaign needed to appeal to a younger demographic while maintaining the brand's premium positioning.",
      "We developed a vibrant visual language inspired by vintage love letters and modern street art. Each can in the series features a different love story submitted by real couples, creating an emotional connection with consumers.",
      "The campaign generated significant social media engagement, with user-generated content increasing by 300% during the campaign period. It also drove a 22% increase in sales compared to previous limited editions.",
    ],
    details: [
      "The packaging design uses a distinctive collage approach, combining handwritten elements with bold typography. Each can tells a unique story while maintaining clear brand recognition.",
      "We created a series of animated social media assets that brought the love stories to life. These were optimized for various platforms, with Instagram Reels driving particularly strong engagement.",
      "The campaign included experiential elements, with pop-up installations in key cities where couples could have their love stories professionally photographed and potentially featured on future packaging.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
  {
    slug: "future-forward",
    title: "Future Forward",
    category: "Technical Colleges —",
    client: "National Technical Education Board",
    year: "2021",
    services: ["Brand Architecture", "Wayfinding", "Digital Platform"],
    image: Fourth,
    description: [
      "The National Technical Education Board needed a unified brand system for their network of colleges across the country. The 'Future Forward' initiative aimed to modernize technical education's perception and create consistency across diverse institutions.",
      "We developed a flexible identity system that allows each college to maintain its local character while benefiting from national recognition. The system includes comprehensive guidelines for everything from stationery to campus signage.",
      "Since implementation, the system has been adopted by 87% of member colleges, with surveys showing a 35% improvement in public perception of technical education quality.",
    ],
    details: [
      "The modular logo system combines a consistent wordmark with customizable iconography representing each college's specialization. This approach creates visual cohesion while allowing for local differentiation.",
      "We designed a comprehensive wayfinding system for campuses, using color coding and clear typography to help students navigate often complex technical environments. The system has significantly reduced late arrivals to classes.",
      "The digital platform provides templates for college websites and learning management systems, ensuring consistent user experience across institutions while accommodating different technical programs and resources.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
  {
    slug: "realising-new-possibilities",
    title: "Realising New Possibilities. Wurru-walun paldangk.",
    category: "Goolwa Secondary College —",
    client: "Goolwa Education Department",
    year: "2022",
    services: [
      "Brand Strategy",
      "Indigenous Collaboration",
      "Environmental Design",
    ],
    image: Card,
    description: [
      "Goolwa Secondary College needed an identity that reflected its commitment to indigenous education and its location on traditional Ngarrindjeri land. The project required sensitive collaboration with local elders to create something authentic and meaningful.",
      "We worked closely with Ngarrindjeri artists and community leaders to develop a visual language that honors traditional knowledge while looking to the future. The bilingual tagline 'Realising New Possibilities. Wurru-walun paldangk.' (Ngarrindjeri for 'new beginnings') encapsulates this vision.",
      "The identity has been embraced by both indigenous and non-indigenous communities, becoming a model for culturally sensitive design in educational contexts.",
    ],
    details: [
      "The logo incorporates traditional Ngarrindjeri weaving patterns interpreted in a contemporary style. These patterns extend throughout the visual system, creating connections between different elements of school life.",
      "Color choices reflect the local landscape - blues from the Coorong waterways, ochres from the earth, and greens from native vegetation. These are combined with a modern secondary palette for versatility.",
      "Environmental graphics throughout the school tell Ngarrindjeri stories and teach language concepts. These were co-designed with indigenous students and elders, creating a genuine sense of ownership and pride.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
  {
    slug: "heart-of-the-yarra-valley",
    title: "The Heart of the Yarra Valley",
    category: "Oakridge Wines —",
    client: "Oakridge Wines",
    year: "2023",
    services: ["Brand Refresh", "Packaging", "Hospitality Collateral"],
    image: Fifth,
    description: [
      "Oakridge Wines wanted to elevate their premium positioning while maintaining their reputation for approachability. The 'Heart of the Yarra Valley' concept celebrates both the winery's geographic roots and its central role in the local community.",
      "We developed a sophisticated yet warm visual language that reflects the balance between Oakridge's winemaking excellence and its welcoming cellar door experience. The new packaging system clearly differentiates product tiers while maintaining family resemblance.",
      "The rebrand has contributed to a 30% increase in cellar door sales and has been credited with helping secure listings in several premium international markets.",
    ],
    details: [
      "The updated logo maintains recognition while adding refinement. A subtle heart motif appears in negative space within the 'O' of Oakridge, reinforcing the brand concept without overt symbolism.",
      "Label designs vary by product tier - from minimalist black and white for the premium range to more expressive watercolor-inspired designs for the approachable 'Local' series. All share consistent typography and structural elements.",
      "Collateral for the cellar door and restaurant uses rich textures and materials that reflect the winery's connection to land and craft. Menu designs incorporate seasonal ingredients from the kitchen garden, changing throughout the year.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
  {
    slug: "seek-beyond",
    title: "Seek Beyond.",
    category: "Aldinga Payinthi College —",
    client: "Aldinga Education Trust",
    year: "2021",
    services: ["Brand Identity", "Digital Strategy", "Student Recruitment"],
    image: Seventh,
    description: [
      "Aldinga Payinthi College needed to establish its identity as a new progressive school in a competitive education market. The 'Seek Beyond' positioning challenges conventional education models and appeals to forward-thinking families.",
      "We created an identity system based on the concept of exploration and discovery. Dynamic graphic elements suggest movement beyond boundaries, while a warm color palette maintains approachability for younger students.",
      "The school reached full enrollment six months ahead of projections, with particular success in attracting families from outside the immediate catchment area.",
    ],
    details: [
      "The logo's custom typography features subtle gaps and extensions that suggest looking beyond the obvious. This concept extends to supporting graphics that play with positive and negative space.",
      "Illustrations use a distinctive line style that evolves as students progress through year levels - starting simple in junior years and becoming more complex in senior years, mirroring educational development.",
      "Digital platforms were designed to showcase student work and innovative teaching methods. The website structure allows easy updating by staff while maintaining strong visual consistency.",
    ],
    images: [
      ProjectDetail1,
      ProjectDetail2,
      ProjectDetail3,
      ProjectDetail4,
      ProjectDetail5,
      ProjectDetail6,
      ProjectDetail7,
      ProjectDetail8,
    ],
  },
];

export default Projects;