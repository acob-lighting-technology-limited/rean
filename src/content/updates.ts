/**
 * Campaign updates, newest first. Only real, approved posts go here.
 * The "Strategic Newsletter Series" drafts are deliberately not included: they describe
 * outcomes as already achieved, which would read as false claims before the election.
 */
export type Update = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  body: string[];
};

export const updates: Update[] = [];
