# React Headless Phone Input

A headless phone number input component built for usability.

Uses [libphonenumber-js] under the hood.

Built with React Hooks.

[Demo][demo]

## Why?

[Phone numbers are hard][falsehoods]. Users expect to be able to enter phone numbers in the format they're used to. Here's the problem: most people are used to national - or even local phone number formats. If you offload phone number validation to your backend (or an API), resolving the ambiguity becomes difficult or even impossible.

This component helps you build a UI that gracefully guides your users towards unambigious phone number formats. And you get the result in standard e164 format: ready for use with any telephony service. 

Other libraries are generally heavy (phone number rulesets can be big - 99.1% of this library's [footprint][bundlephobia] is due to [libphonenumber-js]), force you to use their UI, and can't handle copy & paste or edit-in-place. `react-headless-phone-input` is designed for usability-first, and lets you bring your own input components. In fact, your existing input fields will almost certainly work with no modifications.


## Install

```sh
npm i --save react-headless-phone-input
yarn add react-headless-phone-input
```

## Features

- 100% headless: Bring your own UI. You can use almost any input component you already have
- Lets users copy & paste phone numbers of any format
- Typescript support
- Built-in lazy-loading with progressive enhancement (clocks in at 40KB without lazy-loading)
- Detects the associated country, enabling international phone input.
- Lets users copy & paste phone numbers of any format
- Acts like a normal input: Doesn’t glitch if a user edits in-place or deletes template characters
- Validates number plausibility
- External state is standard e164 format

## Example

This library is headless: you bring your own UI, but it's almost as easy as using regular inputs.

Here's an example using [tiny-flag-react] to show the flag associated with the number's country:

```js
import TinyFlagReact from "tiny-flag-react";
import PhoneFormatter from "react-headless-phone-input";
// import PhoneFormatter from "react-headless-phone-input/lazy"; RECOMMENDED

const [e164, setE164] = useState("");

<PhoneFormatter defaultCountry="US" value={e164} onChange={setE164}>
  {({ country, impossible, onBlur, onChange, inputValue }) => (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: "24px",
          }}>
          <TinyFlagReact
            country={country}
            countryName={country}
            fallbackImageURL={`https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${country}.svg`}
          />
        </span>
        <input
          type="tel"
          value={inputValue}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      {impossible && (
        <div style={{ color: "red" }}>Impossible phone number</div>
      )}
    </>
  )}
</PhoneFormatter>;
```

[Demo][demo]

## Performance

Due to this library's dependence on [libphonenumber-js], it clocks in at [38.7KB minified + gzipped][bundlephobia].
To improve your user's experience, react-headless-phone-component supports lazy loading with React Suspense with
progressive auto-enachement. If your bundler supports dynamic imports and are using a compatible version of React,
just swap `react-headless-phone-input` for `react-headless-phone-input/lazy`.

Your UI will render and can be used immediately. Once `react-headless-phone-input` loads, the component will be
automatically upgraded. No other changes are required.

```js
import PhoneFormatter from "react-headless-phone-input/lazy";
```

## License

[MIT](LICENSE)

[falsehoods]: https://github.com/google/libphonenumber/blob/master/FALSEHOODS.md
[libphonenumber-js]: https://www.npmjs.com/package/libphonenumber-js
[tiny-flag-react]: https://github.com/benaubin/tiny-flag-react
[bundlephobia]: https://bundlephobia.com/result?p=react-headless-phone-input
[demo]: https://codesandbox.io/s/react-headless-phone-input-demo-ygow2?file=/src/App.js
