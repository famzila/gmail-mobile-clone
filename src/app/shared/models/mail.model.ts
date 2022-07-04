export interface IMail{
    id: string;
    title: string;
    from: string;
    read: boolean;
    content: string;
    date: string;
    star: boolean;
    color?: string;
    category?: string;
    important?: boolean;
  }