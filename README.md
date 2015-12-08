Store Locator Library for the Google Maps JavaScript API v3
==============

## Update
I changed the core JS file to /dist/store-locator.min.js This has been minified using Grunt. The source files are located in the /js/ folder. You will not need this unless you want to modify the core js. 

I have moved much of the common configuration options into the examples/panel.js file. These configuration options are located in the top of the file and commented accordingly. In reality it would be trivial minify all of the files to reduce load time. 

I have also change the panel.html for basic bootstrap compatibility.

### To Use a Static JSON Data Source
You will need the following files in your html file. 

* store-locator.min.js* This is the core file from the google maps repo. I have branched this heavily as I moved a dozen or so of the configuration options into the panel.js file. I kept the original reference docs in in the repo. You can see these at reference.html.

*examples/dealer-static-json.js* This file is a modified version of the `dealer-static-csv.js` file that was in the original fork. It basically parses the data.son file and set the pins. If your data contains different keys then you will need to edit those in this doc. 

*example/cluster.js* This file was downloaded from google maps repo as well. It adds clusters to maps with lots a' pins. Configuration options are in the `panel.js` file. 

An example is located in `examples/panel.html`. This is how you would call these scripts in your own file. 

    <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="../dist/store-locator.min.js"></script>
    <script src="dealer-static-json.js"></script>
    <script src="cluster.js"></script>
    <script src="panel.js"></script>

### Grunt Compilation
I have included a package.son and a Grunt.js file in the repo. The only main thing that the Grunt File does is compile and minify the code. If you run grunt before you make changes in your local development environment it will run in watch mode and compele if any files in the /js/ directory are updated. 

### Installing Grunt & npm

### Install npm (Node Package Manager)
On a mac you can use home-brew using something like this: https://changelog.com/install-node-js-with-homebrew-on-os-x/. I did find that on El Cap I ran into some errors. You may need to downgrade to 0.12.7 - see sp00ne's comment in this thread: https://github.com/brianmcd/contextify/issues/188#issuecomment-154373964 

### Install Grunt 
You'll want to install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.
`npm install -g grunt-cli`

Next install the latest version of Grunt in the root of the repo:
`npm install grunt --save-dev`

To start developing you can run the `grunt` command and in this case you can start developing away. Any saved changes to /js/*.js files will auto-magically recompile into the /dist/store-locator.min.js file. 

For a complete overview of Grunt please read the friggen docs: http://gruntjs.com/getting-started 

# Original Docs from the Authors
This library enables developers to easily build store locator-type applications using the Google Maps JavaScript API v3.
![Analytics](https://ga-beacon.appspot.com/UA-12846745-20/js-store-locator/readme?pixel)

The library provides the following features:

* Pluggable data source – display stores from a data source of your choosing
* HTML5 Geolocation – determines a good initial viewport for the user
* Info window – shows details about a store
* Street View
* Extensible – customise your own markers, info windows, etc.
* Fully-featured side panel, providing:
  * Feature filtering
  * Autocomplete search
  * List of nearby stores
  * Directions

## Examples/Demos

The best way to become acquainted with the library is to see some of the examples:

1. [panel.html](https://googlemaps.github.io/js-store-locator/examples/panel.html) – A simple store locator, including panel. Data is fetched from a static CSV file.
2. [dynamic.html](https://googlemaps.github.io/js-store-locator/examples/dynamic.html) – Same as above, except stores are fetched dynamically from a JSONP web service.
3. [gme.html](https://googlemaps.github.io/js-store-locator/examples/gme.html) – Same as above, except stores are fetched dynamically from Google Maps Engine.
4. [custom.html](https://googlemaps.github.io/js-store-locator/examples/custom.html) – Various customisations to the default UI including custom markers and info window.
5. [places.html](https://googlemaps.github.io/js-store-locator/examples/places.html) – Places are searched using the Google Places API, and displayed as a store locator.

## Reference documentation

For detailed documentation on the library, including classes, events and sample usage, please see the [reference documentation](https://googlemaps.github.io/js-store-locator/reference.html).

## Quick Start

To get started, include the [store-locator.min.js](https://github.com/googlemaps/js-store-locator/blob/gh-pages/dist/store-locator.min.js) file on your HTML page. A set of [CSS styles](https://github.com/googlemaps/js-store-locator/blob/gh-pages/css/storelocator.css) are also available, which provide styling for store details and side panel.

The library's functions are contained under the `storeLocator` namespace. The main class is called `storeLocator.View`. A `View` has two required parameters, a `google.maps.Map`, and a `storeLocator.DataFeed`.

A `DataFeed` is an object with the function `getStores`. This function is called each time the map needs an update. A simple example of a `DataFeed` can be found in the [reference](https://googlemaps.github.io/js-store-locator/reference.html#storeLocator.DataFeed).

## Contributing

Want to contribute? Check out the [contributing guide](CONTRIBUTING.md)!

## Compiling the project

    $ ./gradlew assemble

    > gradlew.bat assemble

## License

Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
