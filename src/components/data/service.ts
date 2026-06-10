type AssetType = "video" | "image" | "pdf" | "logo";

export type ShowcaseItem = {
  id: string;
  title?: string;
  type: AssetType;
  thumbnail?: string;
  caption?: string;
  description?: string;
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
      "Cinematic motion design and AI-powered visual storytelling for modern digital brands",

    description:
      "We create high-end 3D animations, motion graphics, VFX sequences, AI-powered videos, explainer content, branding films, festival campaigns, and social media visuals designed to deliver immersive storytelling experiences across digital platforms, advertising, and modern marketing campaigns.",

    tech: [
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Animate CC", icon: "/assets/Animate.jpg" },
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },

      // AI Video & Motion Models
      { name: "Kling 3.0", icon: "/assets/kling-color.png" },
      { name: "Google Veo 3.1", icon: "/assets/google-veo.webp" },
      { name: "OpenAI Sora 2", icon: "/assets/OpenAi_Sora.png" },
      { name: "Runway Gen-4", icon: "/assets/runway-ai.webp" },
      { name: "Seedance 2.0", icon: "/assets/seedance.png" },
      { name: "MiniMax Hailuo 2.3", icon: "/assets/minimax.webp" },
      { name: "PixVerse 6.5", icon: "/assets/pixverse.png" },
      { name: "Wan 2.7", icon: "/assets/wan.png" },
      { name: "LTX 2 Pro", icon: "/assets/ltx.png" },
      { name: "Veed Fabric 1.0", icon: "/assets/veed.png" },
      { name: "Grok", icon: "/assets/grok.png" },
    ],

    features: [
      "3D Animation",
      "2D Animation",
      "VFX & Compositing",
      "Motion Graphics",
      "AI Videos",
      "AI Movies",
      "Explainer Videos",
      "Branding Videos",
      "Festival Creative Videos",
      "Social Media Videos",
      "Website Videos",
      "Creative Campaign Videos",
      "Visual Presentations",
      "Video Editing",
      "Audio Editing & Sync",
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
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/1.png",
        videoSrc: "/videos/MOTION-GRAPHICS/Mg1.mp4",
      },
      {
        id: "motion-image-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/2.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg2.mp4",
      },
      {
        id: "motion-pdf-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/3.png",
        fileLabel: "Video",
        videoSrc: "/videos/MOTION-GRAPHICS/mg3.mp4",
      },
      {
        id: "motion-logo-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/4.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg4.mp4",
      },
      {
        id: "motion-video-2",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/5.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg5.mp4",
      },
      {
        id: "motion-video-3",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/6.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg6.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/7.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg7.mp4",
      },
      {
        id: "motion-image-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/8.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg8.mp4",
      },
      {
        id: "motion-pdf-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/9.png",
        fileLabel: "Video",
        videoSrc: "/videos/MOTION-GRAPHICS/mg9.mp4",
      },
      {
        id: "motion-logo-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/10.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg10.mp4",
      },
      {
        id: "motion-video-2",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/11.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg11.mp4",
      },
      {
        id: "motion-video-3",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/12.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg12.mp4",
      },
      {
        id: "motion-video-1",

        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/13.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg13.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/14.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg14.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/15.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg15.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/16.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg16.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/17.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg17.mp4",
      },
      {
        id: "motion-video-1",
        type: "video",
        thumbnail: "/videos/MOTION-GRAPHICS/18.png",
        videoSrc: "/videos/MOTION-GRAPHICS/mg18.mp4",
      },
    ],
  },
  {
    index: 1,
    id: "graphic-design",
    label: "Graphic Design",
    labelImage: "/assets/graphic-design.png",

    title:
      "Creative graphic design systems built for branding, marketing, and digital engagement",

    description:
      "From social media creatives and banner designs to posters, packaging, mockups, brochures, and brand identity systems — we create visually impactful graphic design solutions that strengthen brand presence across digital, print, and promotional platforms.",

    tech: [
      { name: "Adobe Photoshop", icon: "/assets/Photoshop.jpg" },
      { name: "Adobe Premiere Pro", icon: "/assets/pr.jpg" },
      { name: "Adobe After Effects", icon: "/assets/AfterEffect.jpg" },
      { name: "Adobe Illustrator", icon: "/assets/RedirectNotice.jpg" },
      { name: "Canva", icon: "/assets/canva.webp" },
    ],

    features: [
      "Social Media Creatives",
      "Banner Designs",
      "Logo Design",
      "Mockup Designs",
      "Grid & Carousel Designs",
      "Festival Creatives",
      "Poster Designs",
      "Brand Identity Design",
      "Print Design",
      "Packaging Design",
      "Brochure Design",
      "Marketing Creatives",
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
        type: "image",
        thumbnail: "/assets/social-media/posters/1.jpg",
      },
      {
        id: "graphic-image-1",
        type: "image",
        thumbnail: "/assets/social-media/posters/2.jpg",
      },
      {
        id: "graphic-pdf-1",
        type: "image",
        thumbnail: "/assets/social-media/posters/3.jpg",
      },
      {
        id: "graphic-logo-1",
        type: "image",
        thumbnail: "/assets/social-media/posters/4.jpg",
      },
      {
        id: "graphic-video-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/5.jpg",
      },
      {
        id: "graphic-image-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/6.jpg",
      },
      {
        id: "graphic-pdf-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/7.jpg",
      },
      {
        id: "graphic-logo-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/8.jpg",
      },
      {
        id: "graphic-logo-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/9.webp",
      },
      {
        id: "graphic-logo-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/10.webp",
      },
      {
        id: "graphic-logo-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/11.jpg",
      },
      {
        id: "graphic-logo-2",
        type: "image",
        thumbnail: "/assets/social-media/posters/12.webp",
      },
    ],
  },
  {
    index: 2,
    id: "branding",
    label: "Branding",
    labelImage: "/assets/branding.png",

    title:
      "Strategic branding systems designed to build memorable and scalable brand identities",

    description:
      "We build complete branding experiences including logo design, identity systems, outdoor branding, packaging, and menu design crafted to create strong visual recognition, consistent communication, and long-term brand value across digital and physical touchpoints.",

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
      "Outdoor Branding",
      "Packaging Design",
      "Menu Card Design",
    ],

    clients: [
      "Retail Brands",
      "Restaurants",
      "Corporate Businesses",
      "Fashion Labels",
    ],
    assets: [
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/1.png",
        videoSrc: "/assets/branding/1.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/2.png",
        videoSrc: "/assets/branding/2.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/3.png",
        videoSrc: "/assets/branding/3.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/4.png",
        videoSrc: "/assets/branding/4.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/5.png",
        videoSrc: "/assets/branding/5.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/6.png",
        videoSrc: "/assets/branding/6.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/7.png",
        videoSrc: "/assets/branding/7.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/8.png",
        videoSrc: "/assets/branding/8.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/9.png",
        videoSrc: "/assets/branding/9.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/10.png",
        videoSrc: "/assets/branding/10.mp4",
      },
      {
        id: "brand-image-1",
        type: "video",
        thumbnail: "/assets/branding/11.png",
        videoSrc: "/assets/branding/11.mp4",
      },
    ],
  },
  {
    index: 3,
    id: "social-media",
    label: "Social Media",
    labelImage: "/assets/Sociaal.png",

    title:
      "Social-first creative content designed for engagement, reach, and brand growth",

    description:
      "We create platform-ready social media content including reels, stories, ad creatives, grid systems, marketing visuals, and campaign assets tailored to increase engagement, maintain visual consistency, and scale brand visibility across Instagram, Meta, YouTube, WhatsApp, and modern digital platforms.",

    tech: [
      { name: "Instagram", icon: "/assets/insta.jpg" },
      { name: "Meta", icon: "/assets/meta.webp" },
      { name: "Google Ads", icon: "/assets/Google-ads.jpg" },
      { name: "YouTube", icon: "/assets/youtube.jpg" },
      { name: "Whatsapp", icon: "/assets/whatsapp.jpg" },
      { name: "X (Twitter)", icon: "/assets/twitter.png" },
      { name: "Snapchat", icon: "/assets/Snapchat.jpeg" },
    ],

    features: [
      "Logo Design",
      "Social Media Management",
      "Instagram Feed Designs",
      "Reels & Shorts Content",
      "Festival Creatives",
      "Story Creatives",
      "Ad Creatives",
      "Social Media Videos",
      "Print Design",
      "Packaging Design",
      "Brochure Design",
      "Marketing Creatives",
      "Mockup Designs",
      "Grid & Carousel Designs",
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
        type: "image",
        thumbnail: "/assets/social-media/banners/1.jpg",
      },
      {
        id: "social-image-2",
        type: "image",
        thumbnail: "/assets/social-media/grids/1.jpg",
      },
      {
        id: "social-image-3",
        type: "image",
        thumbnail: "/assets/social-media/posters/1.jpg",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/grids/3.jpg",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/social/1.jpg",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/social/2.webp",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/social/3.jpg",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/social/4.jpg",
      },
      {
        id: "social-image-4",
        type: "image",
        thumbnail: "/assets/social-media/social/5.jpg",
      },
      {
        id: "social-image-4",
        type: "video",
        thumbnail: "/assets/social-media/social/6.png",
        videoSrc: "/assets/social-media/social/6.mp4",
      },
      {
        id: "social-image-4",
        type: "video",
        thumbnail: "/assets/social-media/social/7.png",
        videoSrc: "/assets/social-media/social/7.mp4",
      },
      {
        id: "social-image-4",
        type: "video",
        thumbnail: "/assets/social-media/social/8.png",
        videoSrc: "/assets/social-media/social/8.mp4",
      },
      {
        id: "social-image-4",
        type: "video",
        thumbnail: "/assets/social-media/social/9.png",
        videoSrc: "/assets/social-media/social/9.mp4",
      },
    ],
  },
];
