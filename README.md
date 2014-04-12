interpreter
===========

An Angular service to used for i18n/l10n ( IE9+ right now )

> [WIP] website and API documentation
>
> work in progress : [interpreter site](http://antouank.github.io/interpreter/)
>
> includes live example of interpreter in AngularJS


API
===

####.addLang(langCode, newLangData[, callback])

* langCode `string` will the the code for this language you're adding.
You will use this code for setting this language as the active one.

* newLangData,
can be
   - `object` a JSON dictionary for the language you want to add
   - `string` a URL of the JSON file you want to load as dictionary for this language

* callback
  - `function` to call after task is done

####setLang(langCode[, callback])

* langCode `string` the code of the language you want to load. You must first have loaded this language using `.addLang()`

* callback `function` to call after task is done

####.getCurrentLang()

* returns `string`
(the langCode of the currently active language)

----

----

## LICENSE - "MIT License"

Copyright (c) 2014 Antonis Karamitros

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
