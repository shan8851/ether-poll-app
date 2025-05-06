export type LinkItem = { name: string; url: string };

export interface FormValues {
  title: string;
  description: string;
  duration: number;
  links: LinkItem[];
}
