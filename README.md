
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

Render an input component dynamically & pass data:

```jsx
import Anyform from 'anyform-react';
import components from 'anyform-set-default';

var data = { msg: 'Hello, World Input' };
var form = [{ type: 'input', value: 'msg' }];

<Anyform form={form} data={data} set={components} />
```

Embed the editor into your app:

```jsx
<Anyform.Editor set={components} />
```
