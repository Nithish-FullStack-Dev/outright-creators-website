type AssetType = "video" | "image" | "pdf" | "logo";

export type ShowcaseItem = {
  id: string;
  title: string;
  type: AssetType;
  thumbnail: string;
  caption: string;
  description: string;
  videoSrc?: string;
  youtubeId?: string;
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
    id: "graphic-design",
    label: "Graphic Design",
    labelImage: "/assets/graphic-design.png",
    title: "Premium identity systems built for luxury brands",
    description:
      "From packaging to campaign visuals, every asset is designed to feel refined, elevated, and unmistakably yours.",
    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],
    features: [
      "Logo systems",
      "Packaging design",
      "Brand guidelines",
      "Print collateral",
    ],
    clients: ["Luma House", "Nova Collective", "Cerulean Labs", "Aura Studios"],
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
    index: 1,
    id: "motion-design",
    label: "Motion Design",
    labelImage: "/assets/MotionDesign.jpg",
    title: "High-end animation for new product launches",
    description:
      "Motion that feels polished but powerful — built to keep pace with premium storytelling and product momentum.",
    tech: [
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Animate cc", icon: "/assets/Animate.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],
    features: [
      "Launch reels",
      "UI motion",
      "Explainer films",
      "Animated transitions",
    ],
    clients: ["Pulse Media", "Frost Labs", "Rise Digital", "Eclipse Studio"],
    assets: [
      {
        id: "motion-video-1",
        title: "Launch animation",
        type: "video",
        thumbnail: "/header-image-3.webp",
        caption: "Dynamic product film",
        description: "A launch sequence with premium motion detail.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg1.mp4",
      },
      {
        id: "motion-image-1",
        title: "Motion storyboard",
        type: "video",
        thumbnail: "/header-image-1.webp",
        caption: "Animation concept frames",
        description: "Storyboard visuals for a campaign narrative.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg2.mp4",

      },
      {
        id: "motion-pdf-1",
        title: "Presentation deck",
        type: "video",
        thumbnail: "/header-image-2.webp",
        caption: "Campaign overview",
        description: "Strategy and motion direction in a branded deck.",
        fileLabel: "Video",
        videoSrc: "/videos/MOTION-GRAPHICS/mg3.mp4",

      },
      {
        id: "motion-logo-1",
        title: "Motion identity",
        type: "video",
        thumbnail: "/header-image-4.webp",
        caption: "Animated mark set",
        description: "A motion-ready identity system for screen.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg4.mp4",

      },
      {
        id: "motion-video-2",
        title: "Explainer animation",
        type: "video",
        thumbnail: "/header-image-1.webp",
        caption: "Product explainer",
        description: "A concise animation breaking down product features.",
        videoSrc: "/videos/MOTION-GRAPHICS/mg5.mp4",
      },
      {
        id: "motion-video-3",
        title: "UI motion concept",
        type: "video",
        thumbnail: "/header-image-2.webp",
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
    index: 2,
    id: "social-media",
    label: "Social Media",
    labelImage: "/assets/Sociaal.jpg",
    title: "Scroll-stopping content for modern feeds",
    description:
      "We create premium posts, ads, and video content that performs beautifully on every platform.",
    tech: [
      { name: "Instagram", icon: "/assets/insta.jpg" },
      { name: "FaceBook", icon: "/assets/FaceBook.jpg" },
      { name: "Google Ads", icon: "/assets/Google-ads.jpg" },
      { name: "YouTube", icon: "/assets/youtube.jpg" },
    ],
    features: [
      "Feed sets",
      "Reels templates",
      "Ad design",
      "Campaign storytelling",
    ],
    clients: ["Glow Agency", "Vivid Co.", "Canvas Creative", "Aurora Brands"],
    assets: [
      {
        id: "social-video-1",
        title: "Reel spotlight",
        type: "video",
        thumbnail: "/header-image-2.webp",
        caption: "Platform-ready reel",
        description: "A polished vertical video designed for engagement.",
        youtubeId: "dQw4w9WgXcQ",
      },
      {
        id: "social-image-1",
        title: "Carousel concept",
        type: "image",
        thumbnail: "/header-image-4.webp",
        caption: "Social carousel",
        description: "Story-led content for a product launch.",
      },
      {
        id: "social-pdf-1",
        title: "Campaign blueprint",
        type: "pdf",
        thumbnail: "/header-image-1.webp",
        caption: "Media strategy PDF",
        description: "A brand-first social plan for maximum reach.",
        fileLabel: "Campaign PDF",
      },
      {
        id: "social-logo-1",
        title: "Brand badge",
        type: "logo",
        thumbnail: "/header-image-3.webp",
        caption: "Platform-ready marks",
        description: "Social-first brand assets for every format.",
      },
    ],
  },
  {
    index: 3,
    id: "branding",
    label: "Branding",
    labelImage: "/assets/Branding.jpg",
    title: "Logo design, brochures, printing and brand systems",
    description:
      "Every brand moment is built so it looks exceptional across print, packaging, digital, and physical experiences.",
    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
      { name: "Figma", icon: "/assets/figma.jpg" },
      { name: "CorelDRAW", icon: "/assets/coreldraw.jpg" },
    ],
    features: ["Logo design", "Brochures", "Printing", "Collateral systems"],
    clients: ["Atlas Works", "Mint House", "Studio Nine", "Pulse Brands"],
    assets: [
      {
        id: "brand-video-1",
        title: "Launch signature",
        type: "video",
        thumbnail: "/header-image-4.webp",
        caption: "Identity reveal",
        description: "A brand film introducing a new visual universe.",
        youtubeId: "dQw4w9WgXcQ",
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
