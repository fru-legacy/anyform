
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
import components from 'anyform-set-default';

<Anyform.Editor set={components} />
```



Render an input component dynamically & pass data:

```jsx
import Anyform from 'anyform-react';
import components from 'anyform-set-default';

var data = { msg: 'Hello, World' };
var form = [{ type: 'input', value: 'msg' }];

<Anyform form={form} 
         data={data} 
         set={components} />
```


