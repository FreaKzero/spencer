#SPENCER
WebApp to test Responsive Websites (JavaScript/HTML Only)
Learning Project for me using **requireJS** with **jQuery**

###Used Frameworks

* jQuery  
* requireJS
* [uikit][1]  
* [qrcode.js][2]

###Features

* Choose a Device in the Spawn Dropdown
    * Change Size, Rotate, Refresh Device
* Sites in Devices will be tested on each Frameload
    * Functions even on Foreign Sites (Same-Origin) just insert a Javascript Snipplet
    * Deviceframe will become red when the Body overflows the Deviceresolution
* Customizability
    * Need a new Device/Resolution ? All devices are configured in a JSON File


###Todo
* Different ErrorCheckers for Foreign Sites and SameDomain sites
* Only try to "Test" Sites when allowed (Snipplet or same Domain)
* Auto Refresh Frames


  [1]: https://github.com/uikit/uikit
  [2]: https://github.com/davidshimjs/qrcodejs