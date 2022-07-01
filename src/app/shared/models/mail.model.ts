export interface IMail{
    id: string;
    from: string;
    read: boolean;
    content: string;
    date: string;
    star: boolean;
    color?: string;
    category?: string;
    important?: boolean;
  }