// types.ts
export interface Colleague {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  status: string;
  roles: string[];
  image?: string; // Optional
  num?: number; 
  
}
