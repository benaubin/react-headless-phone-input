import React, { useState } from "react";
import PhoneFormatter from "../dist";

import TinyFlagReact from "tiny-flag-react/dist/index.js";

export default { title: "PhoneFormatter" };

export const demo = () => {
  const [number, setNumber] = useState("");

  return (
    <div className="App">
      <h1>React Headless Phone Input Demo</h1>

      <p>e164: {number}</p>

      <div>
        <PhoneFormatter defaultCountry="US" value={number} onChange={setNumber}>
          {({ country, impossible, onBlur, onInputChange, inputValue }) => {
            return (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "24px",
                    }}>
                    {country ? (
                      <TinyFlagReact
                        country={country}
                        alt={country + " flag"}
                        fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${country}.svg`}
                      />
                    ) : (
                      <>✆</>
                    )}
                  </span>
                  <input
                    type="tel"
                    value={inputValue}
                    onBlur={onBlur}
                    onChange={(e) => onInputChange(e.target.value)}
                  />
                </div>
                {impossible && (
                  <div style={{ color: "red" }}>Impossible phone number</div>
                )}
              </>
            );
          }}
        </PhoneFormatter>
      </div>

      <p>
        Works like a real input! Just with formatting. This example is set to
        use US phone numbers as a default. To enter an international number, use
        a country code.
      </p>

      <p>Example phone numbers:</p>
      <ul>
        {[
          ["+1 (123) 555-1234", "US"],
          ["512-555-1234", "US"],
          ["+442071838750", "UK"],
          ["+1 604 555 5555", "Canada"],
          ["+123456", "Impossible"],
        ].map(([number, name], i) => (
          <li key={i}>
            <button
              className="unstyled"
              onClick={() => {
                setNumber(number);
              }}>
              {number}
            </button>
            ({name})
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setNumber(null);
        }}>
        Clear phone number
      </button>

      <style>{`
        body {
          font-family: sans-serif;
        }
        .unstyled {
          background: none;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: none;
          font-family: unset;
          font-size: 1em;
          color: #0074d9;
          text-decoration: underline;
          cursor: pointer;
        }

        li {
          padding: 0.5rem 0;
        }

        `}</style>
    </div>
  );
};
