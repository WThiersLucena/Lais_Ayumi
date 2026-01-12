/**
 * Interface para dados da modelo
 */
export interface Model {
  name: string;
  height: string;
  measurements: string;
  age: string;
  description: string;
  heroImage: string;
  portfolioImages: string[];
  makingOfVideos: MakingOfVideo[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
}

/**
 * Interface para vídeos de Making Of
 */
export interface MakingOfVideo {
  title: string;
  description: string;
  videoPath: string;
  thumbnail?: string;
}

