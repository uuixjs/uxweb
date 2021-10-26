# UUIX

UUIX is a front-end library that provides:

- React (and non-react) components
- CSS variables and utilities for theming, color, spacing, and typography
- and, an icon library



**Visit our [Storybook](https://uuixweb.netlify.app/) for more information on designing and building.**

## Quickstart

Starting with a blank new [Create React App](https://github.com/facebook/create-react-app), you can add UUIX with these steps:

1. `yarn add uuixweb react-router-dom`
2. Use UUIX in your `app.js` file like this:

```jsx
// This imports the entire UUIXWEB CSS bundle
import "uuixweb/css/index.css";
import { Button, SVGAsset } from "uuixweb";

class App extends Component {
  render() {
    return <Button icon={SVGAsset.Wrench}>Hello World</Button>;
  }
}
```

For more advanced usage, see below.

## Exports

### JS

This package comes with several different JS exports to adapt to the needs of various applications, with the appropriate keys added to `package.json` so that consumers' tooling/environment can automatically choose the most appropriate version:

- `dist/index.js` is the main ES5 single bundle entrypoint, useful for legacy applications and node environments
- `module/index.js` and its siblings is an ES5 + ES modules entrypoint, enabling tree-shaking when consumed via a compatible bundling tool (webpack, rollup, parcel, etc)

Due to the proper configuration of `package.json`, most consumers don't need to worry about the distinction between these 2 exports and can just use `import { foo } from 'uuixweb'` or `const { foo } = require('uuixweb')`. `dist` and `module` are (and must be) functionally equivalent to allow proper functionality in a isomorphic javascript application.

### CSS

CSS and SCSS exports are available from the `uuix/lib/ui-scss` path.

### Types

This package comes with complete type definitions for all components, and TypeScript will automatically find them due to proper configuration.
