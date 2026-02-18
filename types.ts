
export interface Skill {
  title: string;
  description: string;
  imageUrl: string;
}

export interface SocialImage {
  id: number;
  imageUrl: string;
  category: 'student' | 'result' | 'interior';
}
