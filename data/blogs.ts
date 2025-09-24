import { StaticImageData } from "next/image";

import First from "@/public/images/projects/1.jpg";
import Second from "@/public/images/projects/2.jpg";
import Third from "@/public/images/projects/3.jpg";
import Fourth from "@/public/images/projects/4.jpg";
import Fifth from "@/public/images/projects/5.jpg";
import Card from "@/public/images/projects/card.jpg";

import Brandone from "@/public/images/blog/Branding/3.webp";
import Brandtwo from "@/public/images/blog/Branding/4.webp";
import Brandthree from "@/public/images/blog/Branding/5.webp";
import Brandfour from "@/public/images/blog/Branding/6.webp";
import Brandfive from "@/public/images/blog/Branding/7.webp";
import Brandsix from "@/public/images/blog/Branding/8.webp";
import Brandseven from "@/public/images/blog/Branding/9.webp";
import Brandeight from "@/public/images/blog/Branding/10.webp";

import Webone from "@/public/images/blog/Web/1.png";
import Webtwo from "@/public/images/blog/Web/2.png";
import Webthree from "@/public/images/blog/Web/3.png";
import Webfour from "@/public/images/blog/Web/4.png";
import Webfive from "@/public/images/blog/Web/5.png";
import Websix from "@/public/images/blog/Web/6.png";
import Webseven from "@/public/images/blog/Web/7.png";
import Webeight from "@/public/images/blog/Web/8.png";

import Creativeone from "@/public/images/blog/Creative/1.png";
import Creativetwo from "@/public/images/blog/Creative/2.png";
import Creativethree from "@/public/images/blog/Creative/3.png";
import Creativefour from "@/public/images/blog/Creative/4.png";
import Creativefive from "@/public/images/blog/Creative/5.png";
import Creativesix from "@/public/images/blog/Creative/6.png";
import Creativeseven from "@/public/images/blog/Creative/7.png";
import Creativeeight from "@/public/images/blog/Creative/8.png";

import Printone from "@/public/images/blog/Print/1.png";
import Printtwo from "@/public/images/blog/Print/2.png";
import Printthree from "@/public/images/blog/Print/3.png";
import Printfour from "@/public/images/blog/Print/4.png";
import Printfive from "@/public/images/blog/Print/5.png";
import Printsix from "@/public/images/blog/Print/6.png";
import Printseven from "@/public/images/blog/Print/7.png";
import Printeight from "@/public/images/blog/Print/8.png";

import Packagingone from "@/public/images/blog/Packaging/1.png";
import Packagingtwo from "@/public/images/blog/Packaging/2.png";
import Packagingthree from "@/public/images/blog/Packaging/3.png";
import Packagingfour from "@/public/images/blog/Packaging/4.png";
import Packagingfive from "@/public/images/blog/Packaging/5.webp";
import Packagingsix from "@/public/images/blog/Packaging/6.png";
import Packagingseven from "@/public/images/blog/Packaging/7.webp";
import Packagingeight from "@/public/images/blog/Packaging/8.webp";

import Graphicone from "@/public/images/blog/Graphic/1.png";
import Graphictwo from "@/public/images/blog/Graphic/2.webp";
import Graphicthree from "@/public/images/blog/Graphic/3.png";
import Graphicfour from "@/public/images/blog/Graphic/4.png";
import Graphicfive from "@/public/images/blog/Graphic/5.png";
import Graphicsix from "@/public/images/blog/Graphic/6.png";
import Graphicseven from "@/public/images/blog/Graphic/7.png";
import Graphiceight from "@/public/images/blog/Graphic/8.webp";

export type Blog = {
  title: string;
  topic: string;
  slug: string;
  category: string;
  image: StaticImageData;
  date?: Date;
  content: string[];
  contents: string[];
  imageone?: StaticImageData;
  imagetwo?: StaticImageData;
  imagethree?: StaticImageData;
  imagefour?: StaticImageData;
  imagefive?: StaticImageData;
  imagesix?: StaticImageData;
  imageseven?: StaticImageData;
  imageeight?: StaticImageData;
};

const Blogs: Blog[] = [
  {
    slug: "brand-identity-design",
    title: "Brand Identity Design & Strategy",
    topic:
      "We build authentic brand identities that reflect your values and connect with your audience.",
    category: "Brand Identity Design & Strategy",
    date: new Date("2025-07-14"),
    image: First,
    imageone: Brandone,
    imagetwo: Brandtwo,
    imagethree: Brandthree,
    imagefour: Brandfour,
    imagefive: Brandfive,
    imagesix: Brandsix,
    imageseven: Brandseven,
    imageeight: Brandeight,
    content: [
      "Brand identity is the foundation of how your audience perceives your business. It’s not just your logo or color scheme—it’s the emotional and visual language of your company. From typography and tone of voice to imagery and layout systems, a cohesive brand identity sets the tone for how customers relate to you. A well-crafted identity builds trust, loyalty, and familiarity. It should reflect your mission, values, and personality consistently across all platforms—from websites to packaging and social media.",
      "Our process begins with deep research and discovery. We work closely with you to understand your brand’s purpose, target audience, market position, and long-term goals. Based on these insights, we develop a comprehensive visual identity system that supports clarity and scalability. Every element—from logo variations to color ratios and iconography—is carefully considered. We create detailed brand guidelines to ensure consistency, whether you're building a billboard or designing a business card.",
      "In today’s saturated marketplace, it’s not enough to look good—you need to communicate clearly and meaningfully. Our brand identity solutions are rooted in strategy and storytelling. We focus on how your audience will interact with and remember your brand. By establishing distinct visual assets and design patterns, we help your business cut through the noise. Whether you’re launching a new brand or refreshing an existing one, we craft identities that are not just visually strong but emotionally compelling and timeless.",
    ],
    contents: [
      "A brand’s identity is more than just visual appeal—it’s how the world perceives your business. Every color, typeface, and layout choice contributes to your brand's narrative. A strong identity communicates your values, personality, and tone without speaking a word. It builds trust, familiarity, and emotional connection with your audience. From digital platforms to packaging, a consistent and well-crafted identity is critical in today’s competitive marketplace. It should tell your story visually and leave a lasting impression on anyone who comes in contact with your brand.",
      "At the core of every great brand is clarity. We begin each brand identity project with research—learning about your goals, customers, competition, and vision. This allows us to build a visual system that not only looks beautiful but works strategically. We design brand marks, color systems, typography standards, iconography, and other visual assets that scale effortlessly across every channel. These aren’t just graphics—they’re tools to enhance recognition and guide your audience through every touchpoint.",
      "Consistency and coherence are vital when communicating with your audience. Our goal is to create a branding system that works as hard as you do—one that grows with your business and feels timeless. With strong guidelines and a clear creative direction, you can confidently extend your brand across all platforms and mediums. Whether you're a startup or an established brand seeking a refresh, our approach ensures you stand out while staying true to your core.",
    ],
  },
  {
    slug: "digital-design",
    title: "Digital Design",
    topic:
      "Designing digital experiences that are visually striking, user-friendly, and responsive.",
    category: "Digital Design —",
    date: new Date("2025-07-14"),
    image: Second,
    imageone: Graphictwo,
    imagetwo: Graphicone,
    imagethree: Graphicthree,
    imagefour: Graphicfour,
    imagefive: Graphicfive,
    imagesix: Graphicsix,
    imageseven: Graphicseven,
    imageeight: Graphiceight,
    content: [
      "Digital design is the bridge between your brand and your audience in the online world. It’s how your company is perceived across websites, apps, email campaigns, and social media. A successful digital experience must be visually appealing, intuitive to use, and optimized for engagement. Today’s users expect seamless, responsive, and beautiful interactions across all devices—and that's where great design plays a vital role. Good digital design enhances trust, reduces friction, and drives action through intentional visuals and smart UX.",
      "We approach every digital project with a strategic mindset. Whether you're building a landing page, mobile app, or digital product, we start with user behavior in mind. Wireframes, design systems, button hierarchies, micro-interactions—all are carefully considered to ensure a streamlined experience. Our designs are not only pixel-perfect but also adaptive to different screen sizes and devices. By aligning design choices with brand voice and user needs, we ensure functionality and beauty live side by side.",
      "Great digital design doesn’t just look good—it performs. We track user journeys, analyze engagement points, and refine interfaces to maximize conversion. Our process includes feedback loops and testing, ensuring each decision supports your business goals. Whether you need full digital branding or support for a specific campaign, we create experiences that are modern, accessible, and goal-driven. Every detail matters in digital, and we make sure it works to your advantage.",
    ],
    contents: [
      "Digital design connects your brand with your audience in the digital space. It encompasses web interfaces, mobile apps, social media graphics, and email visuals. A strong digital design system doesn’t just look great—it enhances usability and elevates user interaction. Today, users expect seamless digital experiences that are fast, responsive, and on-brand. A poorly designed digital presence can lead to confusion or distrust, while a thoughtfully designed experience encourages action and loyalty.",
      "Our design process starts with understanding your digital goals—who your audience is, what problems you’re solving, and where users interact most. We combine user research, UI/UX principles, and creative execution to design systems that are as functional as they are beautiful. Whether it’s call-to-action placements, layout hierarchies, or motion transitions, every design decision is made with purpose and tested for real-world performance.",
      "We ensure that your digital identity is cohesive across all platforms, devices, and screen sizes. Our team designs adaptable, scalable systems that grow with your brand and keep users engaged. From landing pages to full web platforms and digital ad campaigns, we deliver digital design that aligns with your goals and speaks your brand’s language in the online world.",
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    topic:
      "Creative designs that communicate clearly and elevate your brand presence.",
    category: "Graphic Design —",
    date: new Date("2025-07-14"),
    image: Third,
    imageone: Graphictwo,
    imagetwo: Graphicone,
    imagethree: Graphicthree,
    imagefour: Graphicfour,
    imagefive: Graphicfive,
    imagesix: Graphicsix,
    imageseven: Graphicseven,
    imageeight: Graphiceight,
    content: [
      "Graphic design is at the heart of visual communication. It gives shape to ideas and turns abstract concepts into tangible visuals. From business cards and social media creatives to posters, brochures, and infographics—graphic design is everywhere your brand appears. Strong graphic design is more than decoration—it’s a tool to organize information, draw attention, and influence decisions. In a noisy world, clarity and creativity in your visuals help you stand out and make your message stick.",
      "We take a holistic approach to graphic design, considering both aesthetic and functional aspects. Our team blends design theory, color psychology, and brand strategy to create assets that are not only eye-catching but aligned with your brand goals. We ensure every element—layout, font, contrast, balance—works in harmony to elevate the overall message. Each design is created to suit your brand voice while maintaining visual consistency across formats and campaigns.",
      "No matter the medium—digital, print, or large-format displays—our designs communicate with purpose. We pay attention to hierarchy, spacing, and visual flow to guide your viewer through the content. Whether you're launching a product, promoting a service, or educating your audience, we help deliver your message through stunning visuals. Graphic design is your brand’s first impression—and we make sure it's a lasting one.",
    ],
    contents: [
      "Graphic design is the foundation of visual storytelling. It combines imagery, layout, color, and typography to communicate ideas clearly and powerfully. In a world of fast scrolling and short attention spans, your graphic design needs to stop people in their tracks and communicate instantly. From promotional posters to branded social media assets, graphic design turns strategy into communication and emotion into connection.",
      "We approach each graphic design project with clarity and creativity. Our team focuses on layouts that guide the eye, visuals that support the message, and typography that sets the right tone. Whether you're launching a product, announcing an event, or running a campaign, our design work ensures your brand is perceived as sharp, modern, and reliable. We blend aesthetic appeal with strategic impact in every creative piece.",
      "Print or digital, small scale or large—our graphic design solutions are customized to suit your needs. We understand that good design must also be practical: ready for production, optimized for platforms, and accessible to your audience. From social media carousels to corporate decks, our goal is to craft designs that speak clearly, inspire action, and represent your brand at its best.",
    ],
  },
  {
    slug: "packaging-design",
    title: "Packaging Design",
    topic:
      "Packaging solutions that combine functionality, emotion, and standout shelf appeal.",
    category: "Packaging Design —",
    date: new Date("2025-07-14"),
    image: Fourth,
    imageone: Packagingtwo,
    imagetwo: Packagingone,
    imagethree: Packagingthree,
    imagefour: Packagingfour,
    imagefive: Packagingfive,
    imagesix: Packagingsix,
    imageseven: Packagingseven,
    imageeight: Packagingeight,
    content: [
      "Packaging design is often the first physical experience someone has with your product—and it matters. Great packaging combines function and emotion: it protects the product, provides information, and evokes a feeling. In crowded markets, thoughtful design is what makes people pick your product over another. It should tell a story, reflect your values, and be memorable enough to be shared. Packaging is more than a container—it’s an opportunity to build loyalty and brand love.",
      "We craft packaging solutions that are visually impactful and structurally sound. Our process includes competitor analysis, material suggestions, dieline design, and production support. From luxury products to eco-conscious goods, we tailor each package to align with your product positioning. Colors, finishes, and textures are chosen carefully to influence perception and match your target audience. Every detail is intentional—from the unboxing experience to retail shelf presence.",
      "Today’s consumers care about sustainability, usability, and aesthetics. Our packaging designs strike the right balance—bold when needed, subtle when required, always on-brand. Whether you’re selling in stores or shipping globally, we ensure your product arrives looking premium and aligned with your story. Through innovative structures and thoughtful design, we help elevate your product to premium shelf status.",
    ],
    contents: [
      "Packaging is the first physical interaction a customer has with your product—and first impressions are everything. A well-designed package communicates your brand’s quality, story, and values without saying a word. In a competitive retail space, your packaging needs to stand out on the shelf, feel premium in hand, and reflect the lifestyle of your audience. Whether minimal or expressive, it should evoke curiosity and trust.",
      "Our packaging process begins with strategy: we evaluate your target market, study competitors, and consider how the product will be displayed or shipped. We then explore structure, typography, color palettes, material choices, and production finishes. Every decision is made to create packaging that’s functional, beautiful, and cost-efficient. We build dielines, prepare production-ready files, and ensure that the final package works across sizes and variations.",
      "From FMCG to luxury items, we help brands make the most of their physical presence. Our team integrates storytelling, clarity, and shelf impact to create packaging that not only protects but sells. We also consider sustainability and modern consumer expectations, ensuring your product is as responsible as it is recognizable. Your package is a brand ambassador—we design it to leave a lasting mark.",
    ],
  },
  {
    slug: "ui-design",
    title: "User Interface Design",
    topic:
      "Designing modern interfaces that blend usability, consistency, and visual harmony.",
    category: "User Interface Design —",
    date: new Date("2025-07-14"),
    image: Fifth,
    content: [
      "User Interface (UI) design is where functionality meets aesthetics. It's about how your product looks and feels as users interact with it. Every button, icon, and screen layout should guide users seamlessly toward their goals. A well-designed interface not only delights users but reduces frustration and increases efficiency. Great UI makes technology feel human—and that’s where we focus our energy.",
      "We begin by understanding the product’s purpose and audience. From wireframes and design systems to final layouts, we prioritize clarity and usability. Visual hierarchy, typography choices, spacing, and interactive elements are tailored to enhance user experience. Whether it’s a mobile app or a SaaS dashboard, we design interfaces that are responsive, accessible, and consistent across devices.",
      "Our UI designs don’t just look good—they’re built to perform. We craft scalable design systems that can grow with your product over time. We work with developers to ensure smooth handoff and functionality across platforms. With a strong focus on usability, every screen we design is intuitive, elegant, and built to support business goals while delighting your users.",
    ],
    contents: [
      "User Interface (UI) Design is the art and science of creating digital environments that are intuitive, beautiful, and engaging. UI is not just about looks—it’s how users interact with your website, product, or application. A clear, well-structured interface reduces friction and enhances usability, while also creating a visual tone that represents your brand. The goal is to make every interaction seamless and satisfying.",
      "We start every UI project by understanding your user’s journey. What are they trying to do? Where might they get stuck? Based on this, we design components like buttons, inputs, layouts, and dashboards that guide users with confidence. We focus on clarity, spacing, color accessibility, and responsiveness—ensuring that your digital product works perfectly across devices and screen sizes.",
      "Our UI systems are scalable and developer-friendly, using reusable components, design tokens, and detailed handoff tools like Figma libraries. Whether you're building a new product or redesigning an existing one, our UI work is grounded in purpose and polish. We ensure your interface feels modern, responsive, and designed with real people in mind.",
    ],
  },
  {
    slug: "web-design",
    title: "Web Design",
    topic:
      "Crafting responsive websites that engage visitors and drive meaningful action.",
    category: "Web Design —",
    date: new Date("2025-07-14"),
    image: First,
    imageone: Webone,
    imagetwo: Webtwo,
    imagethree: Webthree,
    imagefour: Webfour,
    imagefive: Webfive,
    imagesix: Websix,
    imageseven: Webseven,
    imageeight: Webeight,
    content: [
      "Your website is your digital storefront—and first impressions count. A well-designed website builds trust, informs users, and converts visitors into customers. It should load fast, work on every device, and reflect your brand personality at every scroll. Web design is more than layout—it's how users experience your story online.",
      "We create websites that are responsive, accessible, and strategically structured. From content hierarchy to call-to-actions, we ensure each page has purpose. Our design process includes wireframes, mockups, UI components, and responsive testing. We integrate visual consistency, modern aesthetics, and best practices to ensure engagement and conversion.",
      "Whether you're a small brand or an enterprise, we tailor your website design to your business goals. We blend creative storytelling with technical precision, delivering a site that’s visually impressive and user-friendly. Your website is your brand's home online—and we make it feel welcoming, effective, and unforgettable.",
    ],
    contents: [
      "Your website is more than a collection of pages—it’s your digital home and brand experience hub. A well-designed website tells your story, drives conversions, and builds credibility. In today’s digital world, users expect fast, responsive, and engaging web experiences that reflect the professionalism of your brand. Design plays a critical role in how long they stay, what they explore, and whether they take action.",
      "Our web design process combines storytelling, UX strategy, and visual design. We map the user journey, structure content hierarchies, and create layouts that prioritize both form and function. Whether it’s a single-page portfolio, multi-page corporate site, or full eCommerce platform, we build designs that scale and serve your business goals. Every component—from headers to footers—is crafted with clarity and brand alignment.",
      "We emphasize responsive design, accessibility, and performance optimization. Your site should not only look good but load fast and work smoothly across all devices. We collaborate closely with developers or provide full front-end handoff using tools like Figma and Webflow. Our goal is simple: to create websites that are not only beautiful but impactful and easy to use.",
    ],
  },
  {
    slug: "motion-design",
    title: "Motion Design",
    topic:
      "Adding life to your brand with thoughtful, purposeful animation and movement.",
    category: "Motion Design —",
    date: new Date("2025-07-14"),
    image: Card,
    content: [
      "Motion design breathes life into static content. From animated logos to explainer videos, motion captures attention and adds storytelling depth. It’s a powerful tool that simplifies complex ideas, emphasizes brand personality, and enhances digital experiences. With the right animation, a brand becomes more dynamic, memorable, and engaging.",
      "We specialize in designing smooth, purposeful motion that aligns with your brand identity. Whether it’s micro-interactions in apps or full-scale animation for marketing, every movement has a reason. We focus on timing, rhythm, and clarity to ensure the animations enhance rather than distract. From subtle fades to bold kinetic typography, our motion work adds energy and emotion to your brand.",
      "Motion is no longer optional—users expect it. Our animations are crafted to be fast-loading, responsive, and compatible across devices. We provide Lottie files, MP4s, or full video packages based on your platform. With motion, your brand feels alive—and that energy is what helps drive deeper engagement.",
    ],
    contents: [
      "Motion design brings your brand to life through animation, transitions, and kinetic storytelling. It makes digital experiences feel dynamic, immersive, and memorable. Whether it's a logo animation, product video, scroll-triggered effect, or animated explainer, motion helps express your brand personality and guide user attention. It’s one of the most powerful ways to communicate in today’s visual-first world.",
      "We plan every motion element carefully to avoid distraction and deliver clarity. Our motion process starts with storyboarding and continues through frame design, keyframing, and animation export. We work in tools like After Effects, Lottie, and Rive to deliver scalable formats optimized for web, apps, or video. Each animation is tailored to support UX or storytelling—not just decorate.",
      "Whether you need micro-interactions for a mobile app or full-scale animated content for social platforms, we ensure that motion enhances usability, emotion, and engagement. Our motion designs are subtle, intentional, and always on-brand. In the era of short-form content and visual overload, motion design gives your brand an edge by turning moments into magic.",
    ],
  },
  {
    slug: "creative-direction",
    title: "Creative Direction",
    topic:
      "Leading your brand’s creative vision with clarity, consistency, and impact.",
    category: "Creative Direction —",
    date: new Date("2025-07-14"),
    image: First,
    imageone: Creativeone,
    imagetwo: Creativetwo,
    imagethree: Creativethree,
    imagefour: Creativefour,
    imagefive: Creativefive,
    imagesix: Creativesix,
    imageseven: Creativeseven,
    imageeight: Creativeeight,
    content: [
      "Creative direction ensures that every piece of visual communication aligns with your brand’s strategy. It’s the big-picture thinking that guides photoshoots, campaigns, visuals, and storytelling. Without strong direction, your brand becomes inconsistent and diluted. Creative direction is what makes your brand feel cohesive, confident, and clear.",
      "We lead creative projects from concept to execution—developing moodboards, visual themes, tone guidelines, and narrative structure. Whether it’s a single campaign or full rebrand, we set the visual tone and oversee alignment across all touchpoints. From typography to styling, every detail is reviewed under the creative lens.",
      "Our direction ensures quality, alignment, and originality. We collaborate with designers, writers, marketers, and developers to make sure every creative output speaks with one voice. Whether you're launching a new service or building a brand from scratch, our creative direction brings clarity, cohesion, and a powerful visual impact.",
    ],
    contents: [
      "Creative direction ensures your visual identity stays consistent, meaningful, and memorable across every platform and project. It’s the big-picture thinking that aligns campaigns, content, and design elements under one unified vision. Without clear direction, brand visuals feel scattered or confusing. Creative direction connects strategy with execution and gives your brand a recognizable and lasting voice.",
      "We guide brands through creative decision-making—from setting moodboards and messaging tone to curating imagery, layout standards, and art direction. Whether it’s a product launch, a social media campaign, or a full rebrand, our creative direction keeps everything aligned to your values and business goals. We collaborate with designers, marketers, photographers, and developers to ensure all outputs reflect your brand personality.",
      "A strong creative direction builds confidence within your team and trust within your audience. It reduces wasted effort, speeds up creative production, and makes sure your brand is always telling the right story. We work with both new and established brands to develop a design language that is modern, clear, and effective—turning ideas into consistent, scalable, and memorable creative work.",
    ],
  },
  {
    slug: "print-design",
    title: "Print Design",
    topic:
      "Designing professional print materials that leave a lasting, real-world impression.",
    category: "Print Design —",
    date: new Date("2025-07-14"),
    image: Second,
    imageone: Printone,
    imagetwo: Printtwo,
    imagethree: Printthree,
    imagefour: Printfour,
    imagefive: Printeight,
    imagesix: Printsix,
    imageseven: Printseven,
    imageeight: Printfive,
    content: [
      "Print design is a tangible extension of your brand. In a digital age, print still plays a powerful role in creating memorable, real-world experiences. From business cards and brochures to banners and packaging inserts, print materials communicate professionalism and attention to detail. They make lasting impressions when crafted with care.",
      "We handle every aspect of print design—from layout and typesetting to file preparation and production specs. We understand color profiles, bleed lines, print resolutions, and material finishes. Our goal is to make your print look just as stunning in-hand as it does on screen. Whether you’re attending a trade show or mailing a direct campaign, we design assets that make you proud.",
      "Our print designs are clean, modern, and consistent with your digital brand identity. We ensure everything is easy to read, visually balanced, and optimized for cost-effective printing. In a world flooded with digital noise, a beautiful print piece still captures attention. We help you make it count.",
    ],
    contents: [
      "Even in the digital age, print design holds a unique value—it’s tactile, personal, and memorable. From business cards and brochures to packaging inserts and billboards, print offers a lasting brand impression that users can touch, hold, and keep. Effective print design requires more than aesthetics—it requires understanding the medium, audience, and production process to ensure your message is clear and professional.",
      "We handle the entire print process—from layout design and typography selection to bleed setup, color calibration, and production-ready files. We create elegant, on-brand materials that make an impression in meetings, mailers, and displays. We work with trusted print vendors and know the ins and outs of paper stock, finishes, folds, and die cuts to ensure your final product is both beautiful and functional.",
      "Whether you’re launching a product, attending a trade show, or preparing corporate materials, our print designs are crafted for quality and impact. We ensure every element is legible, visually aligned, and optimized for real-world presentation. Print still matters—and with the right design, it can set your brand apart in a powerful way.",
    ],
  },
];

export default Blogs;
