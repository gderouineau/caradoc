![caradoc logo](http://f.cl.ly/items/2v0d202T0D3Y271K431Q/caradoc_logo.png)



```js
var caradoc = require('caradoc');
var server  = caradoc.server;

server.start();
```

## Installation

    $ npm -g install caradoc
    $ caradoc projectName


## Quick Start

 The quickest way to get started with express is to utilize the executable `express(1)` to generate an application as shown below:

 Create a bundle: // this option is not create at this moment

    $ cd /path/to/your/project
    $ caradoc newBundle bundleName

 Install dependencies:

    $ npm install

 Start the server:

    $ node app

## Features

  * Built on [Connect](http://github.com/senchalabs/connect)
  * create bundle
  * easy routing managment
  * Content negotiation

## Philosophy

    Framework to create web application runing on nodejs
    with minimal knowlegde on this.
    create bundle configure your routes in config/routes.js
    and define the actions for those routes in controller file.


```

## License

(The MIT License)

Copyright (c) 2012-2013 g derouineau &lt;admin@caradoc.fr&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
