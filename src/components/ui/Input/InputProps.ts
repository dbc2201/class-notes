import type { ChangeEvent } from "react";

export interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  value: string | number;
  onChange: (e: ChangeEvent) => void;
  placeholder: string;
  error?: string;
  disabled: boolean;
  required: boolean;
}