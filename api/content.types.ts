interface WebsiteMeta {
  title: string;
  description: string;
  image: string;
}

interface BaseSection {
  sectionType: string;
  theme: "light" | "light-gray" | "dark";
}

interface Image {
  src: string;
  width: number;
  height: number;
}

interface HeroSection extends BaseSection {
  sectionType: "hero";
  title: string;
  subtitle: string;
  image: Image;
}

interface Company {
  name: string;
  logo: string;
}

interface SocialProofSection extends BaseSection {
  sectionType: "social-proof";
  title: string;
  companies: Company[];
}

interface Testimonial {
  title: string;
  text: string;
  userName: string;
  userRole: string;
  userCompany: string;
  userImage: Image;
}

interface TestimonialsSection extends BaseSection {
  sectionType: "testimonials";
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

type Section = HeroSection | SocialProofSection | TestimonialsSection;

export interface PageData {
  meta: WebsiteMeta;
  sections: Section[];
}
