#SPENCER
WebApp to test Responsive Websites (JavaScript/HTML Only)
Learning Project for me using **requireJS** with **jQuery**

###Frameworks/Libs

* jQuery  
* requireJS
* [uikit][1]  
* [qrcode.js][2]
* [jQuery growl (modified for uikit)][3]
* [jQuery Storage API][4]
###Features

* Choose a Device in the Spawn Dropdown
    * Change Size, Rotate, Refresh Device
* Sites in Devices will be tested on each Frameload
    * Functions even on Foreign Sites (Same-Origin) just insert a Javascript Snipplet
    * Deviceframe will become red when the Body overflows the Deviceresolution
    * Suspicious Error Elements are Highlighted and Named


###Todo
* Better Error checker
* Only try to "Test" Sites when allowed (Snipplet or same Domain)
* Auto Refresh Frames
* Devices CRUD
* "Bug View" for Device Frames
* Alternate Shortcuts for Device Frames (rotated)
* Incorporate Growl styles to base uikit CSS


  [1]: https://github.com/uikit/uikit
  [2]: https://github.com/davidshimjs/qrcodejs
  [3]: http://ksylvest.github.io/jquery-growl/
  [4]: https://github.com/julien-maurel/jQuery-Storage-API