export type AddComicResponse = Comic[] | { error: string };

export type GetIssuesResponse = Issue[] | { error: string };

export default interface Comic {
  id: number;
  title: string;
  date_published: string;
  link: string;
  writers: string;
  artists: string;
  number_issues: number;
  last_updated: string;
}

export interface Issue {
  id: number;
  title: string;
  link: string;
  comic_id: number;
  pages: number;
}
