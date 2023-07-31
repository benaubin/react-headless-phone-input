import { AsYouType } from "libphonenumber-js/min";
import type { CountryCode } from "libphonenumber-js/min";
import React from "react";

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


/**
 * Headless phone number input formatter.
 */
export default function PhoneFormatter({
  onChange,
  defaultCountry,
  ...props
}: PhoneFormatterProps) {
  const [inputValue, setInputValue] = React.useState("");

  const [formatter] = React.useState(
    () => new AsYouType(defaultCountry as CountryCode | undefined)
  );

  const [impossible, setImpossible] = React.useState<boolean | null>(null);

  const onInputChange = (newValue: string) => {
    if (inputValue == newValue) return;

    // The as-you-type formatter only works with append-only inputs.
    // Changes other than append require a reset.
    const isAppend =
      newValue.length > inputValue.length &&
      newValue.slice(0, inputValue.length) == inputValue;

    if (isAppend) {
      const appended = newValue.slice(inputValue.length);
      setInputValue(formatter.input(appended));
    } else {
      // Reset the formatter, but do not reformat.
      // Doing so now will cause the user to loose their cursor position
      // Wait until blur or append to reformat.
      formatter.reset();
      formatter.input(newValue);
      setInputValue(newValue);
    }

    const number = formatter.getNumber();

    const e164 = number?.number as string | undefined;
    onChange(e164);

    if (impossible && number && number.isPossible()) setImpossible(false);
  };

  React.useLayoutEffect(() => {
    const number = formatter.getNumber()?.number;

    if (number != props.value) {
      // override the phone number if the field has a number and its e164 representation doesn't match the prop value.
      formatter.reset();
      setInputValue(props.value ? formatter.input(props.value) : "");

      const number = formatter.getNumber();
      setImpossible(number == null ? null : !number.isPossible());

      const e164 = number?.number as string | undefined;
      onChange(e164);
    }
  }, [props.value, formatter, inputValue, onChange]);

  const country = formatter.getNumber()?.country;

  return (
    <>
      {props.children({
        country,
        impossible,
        inputValue,
        onInputChange,
        onBlur() {
          const number = formatter.getNumber();

          onChange(number?.number as string);

          if (!number) return setImpossible(null);

          // Check and update possibility
          const possible = number.isPossible();
          setImpossible(!possible);

          if (possible) {
            // Reformat the phone number as international
            formatter.reset();
            setInputValue(formatter.input(number.number as string));
          } else {
            // Format the phone number
            setInputValue(formatter.input(""));
          }
        },
      })}
    </>
  );
}
