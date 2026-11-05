export interface ICategory {  
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  descriptionBn ?: string;
}

type category = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: number;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
    markets: category[];
  }