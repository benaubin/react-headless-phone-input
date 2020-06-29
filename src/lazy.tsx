import React, { lazy, Suspense } from "react";
import { PhoneFormatterProps } from "../types/PhoneFormatterProps";

const PhoneFormatter = lazy(async () => import("."));

/**
 * Lazy version of PhoneFormatter, using React.Suspense for progressive enhancement.
 */
export default function LazyPhoneFormatter(props: PhoneFormatterProps) {
  return (
    <Suspense
      fallback={
        <>
          {props.children({
            inputValue: props.value || "",
            onChange(e) {
              props.onChange(e.target.value);
            },
            onBlur() {
              /* no-op */
            },
          })}
        </>
      }>
      <PhoneFormatter {...props} />
    </Suspense>
  );
}
