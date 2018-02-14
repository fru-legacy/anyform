
<div>
    <img src="/packages/config/readme_resources/header2.png" align="right" height="95px"/>
    <img src="/packages/config/readme_resources/demo1.gif" align="right" width="476px"/>
</div>

# Usage

Install anyform and a [component set](https://www.google.com) you like:

```bash
npm install -s anyform-react
npm install -s anyform-set-default
```

Embed the editor into your app:

```jsx
import Anyform from 'anyform-react';
import set from 'anyform-set-default';

// In your react render method:
<Anyform.Editor components={set} />

```

## Content

* [Common usage](#common-usage)
* [Installation](#installation)
    * [Node projects](#node-projects)
    * [Web projects](#web-projects)
* [Parameters](#parameters)
    * [Aliases](#aliases)
    * [Sequence](#sequence)