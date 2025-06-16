# Email Obfuscator

Fork https://github.com/gremo/email-obfuscator

## Installation

Install the bundle via Composer:

```bash
add to composer

{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/dariox64/email-obfuscator.git"
    }
  ],
  "require": {
    "gremo/email-obfuscator": "dev-master"
  }
}

```

Then include the supplied JavaScript file (`assets/email-obfuscator.js`) somewhere in your template. CND alternative (no uptime guaranteed):


```javascript/app.js

import { Rot13 } from '../js/assets/email-obfuscator';
window.Rot13 = Rot13.decode();

```

### Platform specific steps
- [Work with Laravel 11 ](#laravel)

create middleware

```php

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Support\Renderable;
use Symfony\Component\HttpFoundation\Response;


class ReplaceTagsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Sprawdzenie, czy request pochodzi z Livewire
        if ($request->hasHeader('X-Livewire') || $request->header('Sec-Fetch-Dest') === 'image') {
            // skip middleware Livewire
            return $next($request);
        }

        $response = $next($request);

        if ($response instanceof Response) {

            $content = obfuscateEmail($response->getContent());
            $response->setContent($content);
        }

        return $response;
    }
}

```

bootstrap/app.php [old kernel.php] ADD

```php
    return Application::configure(basePath: dirname(__DIR__))
        ->withMiddleware(function (Middleware $middleware) {
            $middleware->web(append: [
             \App\Http\Middleware\ReplaceTagsMiddleware::class,
            ]);
```


```bash

composer update gremo/email-obfuscator
composer install
```

## Credits

- [Scott Yang](http://scott.yang.id.au/2003/06/obfuscate-email-address-with-JavaScript-rot13) for the JavaScript used in this method.
- [Silvan Mühlemann](http://techblog.tilllate.com/2008/07/20/ten-methods-to-obfuscate-e-mail-addresses-compared/) for the inspiration of the CSS implementation.
