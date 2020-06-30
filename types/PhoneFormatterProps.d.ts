export interface PhoneFormatterProps {
  defaultCountry?: string;
  value: string | undefined;
  onChange(v: string | undefined): void;

  children(data: {
    country?: string;
    impossible?: boolean | null;
    onBlur(): void;
    inputValue: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  }): React.ReactNode;
}
