type AssetType = "video" | "image" | "pdf" | "logo";

export type ShowcaseItem = {
  id: string;
  title: string;
  type: AssetType;
  thumbnail?: string;
  caption: string;
  description: string;
  videoSrc?: string;
  fileLabel?: string;
};

export type ServiceSection = {
  index: number;
  id: string;
  title: string;
  label: string;
  labelImage?: string;
  description: string;
  tech: { name: string; icon: string }[];
  features: string[];
  clients: string[];
  assets: ShowcaseItem[];
};

export const services: ServiceSection[] = [
  {
    index: 0,
    id: "motion-ai",
    label: "Motion + AI",
    labelImage: "/assets/MotionDesign.png",

    title:
      "Motion graphics and AI-powered videos built for digital storytelling",

    description:
      "We create visually compelling motion graphics, reels, explainers, AI-powered videos, product promos, and launch campaigns designed for ads, social platforms, and scalable digital marketing content.",

    tech: [
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Animate CC", icon: "/assets/Animate.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],

    features: [
      "2D/3D Motion Graphics",
      "AI Videos + Voiceovers",
      "Explainer Videos",
      "Reels & Product Promos",
    ],

    clients: [
      "Hospitality Brands",
      "Fashion Campaigns",
      "F&B Promotions",
      "Tech Startups",
    ],
    assets: [
      {
        id: "motion-video-1",
        title: "Launch animation",
        type: "video",
        // thumbnail: "/header-image-3.webp",
        caption: "Dynamic product film",
        description: "A launch sequence with premium motion detail.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg1.mp4",
      },
      {
        id: "motion-image-1",
        title: "Motion storyboard",
        type: "video",
        // thumbnail: "/header-image-1.webp",
        caption: "Animation concept frames",
        description: "Storyboard visuals for a campaign narrative.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg2.mp4",
      },
      {
        id: "motion-pdf-1",
        title: "Presentation deck",
        type: "video",
        // thumbnail: "/header-image-2.webp",
        caption: "Campaign overview",
        description: "Strategy and motion direction in a branded deck.",
        fileLabel: "Video",
        videoSrc: "/videos/MOTION-GRAPHICS/mg3.mp4",
      },
      {
        id: "motion-logo-1",
        title: "Motion identity",
        type: "video",
        // thumbnail: "/header-image-4.webp",
        caption: "Animated mark set",
        description: "A motion-ready identity system for screen.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg4.mp4",
      },
      {
        id: "motion-video-2",
        title: "Explainer animation",
        type: "video",
        // thumbnail: "/header-image-1.webp",
        caption: "Product explainer",
        description: "A concise animation breaking down product features.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg5.mp4",
      },
      {
        id: "motion-video-3",
        title: "UI motion concept",
        type: "video",
        // thumbnail: "/header-image-2.webp",
        caption: "Interface animation",
        description: "Motion design concepts for a digital product.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg6.mp4",
      },
      {
        id: "motion-video-1",
        title: "Launch animation",
        type: "video",
        thumbnail: "/header-image-3.webp",
        caption: "Dynamic product film",
        description: "A launch sequence with premium motion detail.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg7.mp4",
      },
      {
        id: "motion-image-1",
        title: "Motion storyboard",
        type: "video",
        thumbnail: "/header-image-1.webp",
        caption: "Animation concept frames",
        description: "Storyboard visuals for a campaign narrative.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg8.mp4",
      },
      {
        id: "motion-pdf-1",
        title: "Presentation deck",
        type: "video",
        thumbnail: "/header-image-2.webp",
        caption: "Campaign overview",
        description: "Strategy and motion direction in a branded deck.",
        fileLabel: "Video",
        videoSrc: "/videos/MOTION-GRAPHICS/mg9.mp4",
      },
      {
        id: "motion-logo-1",
        title: "Motion identity",
        type: "video",
        thumbnail: "/header-image-4.webp",
        caption: "Animated mark set",
        description: "A motion-ready identity system for screen.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg10.mp4",
      },
      {
        id: "motion-video-2",
        title: "Explainer animation",
        type: "video",
        thumbnail: "/header-image-1.webp",
        caption: "Product explainer",
        description: "A concise animation breaking down product features.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg11.mp4",
      },
      {
        id: "motion-video-3",
        title: "UI motion concept",
        type: "video",
        thumbnail: "/header-image-2.webp",
        caption: "Interface animation",
        description: "Motion design concepts for a digital product.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg12.mp4",
      },
      {
        id: "motion-video-1",
        title: "Launch animation",
        type: "video",
        thumbnail: "/header-image-3.webp",
        caption: "Dynamic product film",
        description: "A launch sequence with premium motion detail.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg13.mp4",
      },
    ],
  },
  {
    index: 1,
    id: "graphic-design",
    label: "Graphic Design",
    labelImage: "/assets/graphic-design.png",

    title: "Static creatives designed for modern brands and scalable campaigns",

    description:
      "From social media creatives and ad campaigns to festival promotions and product visuals — we create high-quality static content built to maintain brand consistency, engagement, and platform-ready delivery.",

    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],

    features: [
      "Feed Posts",
      "Carousel Creatives",
      "Story Designs",
      "Ad Creatives",
    ],

    clients: [
      "F&B Brands",
      "Hospitality Businesses",
      "Fashion Campaigns",
      "Jewellery Brands",
    ],

    assets: [
      {
        id: "graphic-video-1",
        title: "Brand debut reel",
        type: "video",
        thumbnail: "/header-image-1.webp",
        caption: "Video case study",
        description: "A cinematic reveal for a high-end brand launch.",
        videoSrc: "/videos/AI-VIDEOS/gd1.mp4",
      },
      {
        id: "graphic-image-1",
        title: "Edition cover",
        type: "image",
        thumbnail: "/header-image-2.webp",
        caption: "Premium editorial layout",
        description: "Visual treatment for a limited release campaign.",
      },
      {
        id: "graphic-pdf-1",
        title: "Print brochure",
        type: "pdf",
        thumbnail: "/header-image-3.webp",
        caption: "Brochure concept",
        description: "A tactile print system for launch events.",
        fileLabel: "Brochure PDF",
      },
      {
        id: "graphic-logo-1",
        title: "Logo network",
        type: "logo",
        thumbnail: "/header-image-4.webp",
        caption: "Brand mark suite",
        description: "Flexible logo lockups for digital and print.",
      },
    ],
  },
  {
    index: 2,
    id: "social-media",
    label: "Social Media",
    labelImage: "/assets/Sociaal.png",

    title: "Platform-ready social media creatives designed for engagement",

    description:
      "We create scroll-stopping social media content including feed posts, stories, ad creatives, reels, and campaign visuals tailored for Instagram, Facebook, LinkedIn, and digital advertising platforms.",

    tech: [
      { name: "Instagram", icon: "/assets/insta.jpg" },
      { name: "FaceBook", icon: "/assets/FaceBook.jpg" },
      { name: "Google Ads", icon: "/assets/Google-ads.jpg" },
      { name: "YouTube", icon: "/assets/youtube.jpg" },
    ],

    features: [
      "Social Campaigns",
      "Ad Creatives",
      "Reels Templates",
      "Festival Creatives",
    ],

    clients: [
      "Restaurants",
      "Fashion Stores",
      "Event Brands",
      "Healthcare Clinics",
    ],

    assets: [
      {
        id: "social-image-1",
        title: "Banners",
        type: "image",
        thumbnail: "/assets/social-media/banners/1.jpg",
        caption: "Ad banner set",
        description: "A series of digital banners for a social campaign.",
      },
      {
        id: "social-image-2",
        title: "Grids & carousels",
        type: "image",
        thumbnail: "/assets/social-media/grids/1.jpg",
        caption: "Social carousel",
        description: "Story-led content for a product launch.",
      },
      {
        id: "social-image-3",
        title: "Posters",
        type: "image",
        thumbnail: "/assets/social-media/posters/1.jpg",
        caption: "Event poster",
        description: "A digital poster design for a festival campaign.",
      },
      {
        id: "social-image-4",
        title: "Mark system",
        type: "image",
        thumbnail: "/assets/social-media/grids/3.jpg",
        caption: "Social templates",
        description: "Branded templates for consistent social content.",
      },
    ],
  },
  {
    index: 3,
    id: "branding",
    label: "Branding",
    labelImage: "/assets/branding.png",

    title: "Brand identity and print design systems built for consistency",

    description:
      "From logo creation and identity kits to brochures, packaging, menu cards, and print-ready collateral — we build cohesive branding systems that work seamlessly across digital and offline touchpoints.",

    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
      { name: "Figma", icon: "/assets/figma.jpg" },
      { name: "CorelDRAW", icon: "/assets/coreldraw.jpg" },
    ],

    features: [
      "Logo Design",
      "Identity Systems",
      "Packaging Design",
      "Print Collateral",
    ],

    clients: [
      "Retail Brands",
      "Restaurants",
      "Corporate Businesses",
      "Fashion Labels",
    ],
    assets: [
      {
        id: "brand-video-1",
        title: "Launch signature",
        type: "video",
        thumbnail: "/header-image-4.webp",
        caption: "Identity reveal",
        description: "A brand film introducing a new visual universe.",
        videoSrc: "dQw4w9WgXcQ",
      },
      {
        id: "brand-image-1",
        title: "Brochure spread",
        type: "image",
        thumbnail: "/header-image-1.webp",
        caption: "Premium printed spread",
        description: "A brochure layout made for luxury brands.",
      },
      {
        id: "brand-pdf-1",
        title: "Print guide",
        type: "pdf",
        thumbnail: "/header-image-2.webp",
        caption: "Brand standards",
        description: "A printing-ready PDF with every asset included.",
        fileLabel: "Guide PDF",
      },
      {
        id: "brand-logo-1",
        title: "Mark system",
        type: "logo",
        thumbnail: "/header-image-3.webp",
        caption: "Logo family",
        description: "A complete symbol set for brand consistency.",
      },
    ],
  },
];
