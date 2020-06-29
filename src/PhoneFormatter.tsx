import { AsYouType, CountryCode } from "libphonenumber-js/min";
import React, { useEffect, useState } from "react";
import { PhoneFormatterProps } from "../types/PhoneFormatterProps";

/**
 * Headless phone number input formatter.
 */
export default function PhoneFormatter({
  onChange,
  ...props
}: PhoneFormatterProps) {
  const [inputValue, setInputValue] = useState("");

  const [formatter] = useState(
    () => new AsYouType(props.defaultCountry as CountryCode)
  );

  const [error, setError] = useState<string | null>(null);

  function setValue(newValue: string) {
    if (inputValue == newValue) return;

    if (
      // check if this is just appending a value
      newValue.length > inputValue.length &&
      newValue.slice(0, inputValue.length) == inputValue
    ) {
      setInputValue(formatter.input(newValue.slice(inputValue.length)));
    } else {
      formatter.reset();
      formatter.input(newValue);
      setInputValue(newValue);
    }
    onChange(formatter.getNumber()?.number as string);
  }

  useEffect(() => {
    const number = formatter.getNumber()?.number;
    if (number) {
      if (number != props.value) {
        // override the phone number if the field has a number and it doesn't match the prop value.
        formatter.reset();
        setInputValue(props.value ? formatter.input(props.value) : "");
      } else {
        // no change, input value matches field value
        return;
      }
    } else if (props.value) {
      // no valid number in the field, but prop value is set
      // treat as input
      formatter.reset();
      setInputValue(formatter.input(props.value));
    } else {
      // No valid number in the field and no prop value - no change.
      return;
    }
    setError(
      formatter.getNumber()?.isPossible() ? null : "Invalid phone number"
    );
    onChange(formatter.getNumber()?.number as string);
  }, [props.value, formatter, inputValue, onChange]);

  const country = formatter.getNumber()?.country || props.defaultCountry;

  return (
    <>
      {props.children({
        country: country,
        error,
        inputValue,
        onChange(e) {
          setValue(e.target.value);
        },
        onBlur() {
          setError(
            inputValue && formatter.getNumber()?.isPossible()
              ? null
              : "Invalid phone number"
          );
          setInputValue(formatter.input(""));
        },
      })}
    </>
  );
}
