// Core types for the healthcare platform

export type ProviderType = 'doctor' | 'clinic' | 'pharmacy';

export type UserRole = 'user' | 'provider' | 'admin';

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  specialty?: string;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  avatar?: string;
  coverImage?: string;
  isVerified: boolean;
  isAvailable: boolean;
  availableTime?: string;
  services?: string[];
  experience?: string;
  patients?: number;
  about?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Symptom {
  id: string;
  name: string;
  description?: string;
}

export interface DrugCategory {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
}
