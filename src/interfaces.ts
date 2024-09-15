export interface CV {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    military: Military[];
  }
  export interface Skill{
    title: string;
    description: string
  }
  export interface Military{
      period: string;
      details:string[];
  }
  
  export interface PersonalInfo {
    name: string;
    address: string;
    mobile: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    languages: Language[];
    linkedin:string;
  }
  
  export interface Language {
    language: string;
    level: string;
  }
  
  export interface Experience {
    period: string;
    title: string;
    company: string;
    responsibilities: string[];
  }
  
  export interface Education {
    period: string;
    course: string;
    institution: string;
    details?: string[];
    researchs? : Research[]
  }
  
  export interface Research{
    url : string;
    name : string;
    authors : string;
    date: string;
    
  }