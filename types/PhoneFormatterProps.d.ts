/** Props for PhoneFormatter */
export interface PhoneFormatterProps {
  /** Changes will not affect the component after the first render */
  readonly defaultCountry?: string;

  /** The phone number as E164 */
  readonly value: string | undefined;

  /** Called with the E164 version of the phone number. */
  onChange(v: string | undefined): void;

  children(data: {
    /** The formatted input value */
    inputValue: string;
    onInputChange(newValue: string): void;

    /** The detected country of the number */
    country?: string;
    /**
     * Result of a plausibility check: Is the phone number impossible?
     *
     * Prone to false negatives, but not false positives:
     * it may report an invalid phone number as possible
     */
    impossible?: boolean | null;

    onBlur(): void;
  }): React.ReactNode;
}
