#SPENCER
WebApp to test Responsive Websites (JavaScript/HTML Only)
Learning Project for me using **requireJS** with **jQuery**

###Frameworks/Libs###

* jQuery  
* requireJS
* [uikit][1]  
* [qrcode.js][2]
* [jQuery growl (modified for uikit)][3]
* [jQuery Storage API][4]

###Features###

* Choose a Device in the Spawn
    * Change Size, Rotate, Refresh Device
* Sites in Devices will be tested on each Frameload
    * Functions even on Foreign Sites (Same-Origin) just insert a Javascript Snipplet
    * Deviceframe will become red when the Body overflows the Deviceresolution
    * Suspicious Elements are Highlighted and Named


###Todo###

* GUI/CSS
    * Change size/margin of Slider Value Labels
    * Change Font of normal Labels
    * Change Color of "active" Form Elements
    * Better Readable Style for Notifications
    * Textshadow OFF Label CheckSliders
    * Auto Refresh Slider
    * Better URL Input
    * CSS transition on links
    * Error Checker Clipboard Copy Plugin
    * QR Code HTML - Better Selector Names
    * Embed Fonts directly - not with GoogleWebFonts
    * Remove QR Modal, do a nice arrowed overlay    

* Features
    * Auto Refresh Frames
    * "Bug View" for Device Frames

* Code/Refactor
    * Slider jQuery Plugin
    * Autorefresh
    * Devices LocalStorage    
    
  [1]: https://github.com/uikit/uikit
  [2]: https://github.com/davidshimjs/qrcodejs
  [3]: http://ksylvest.github.io/jquery-growl/
  [4]: https://github.com/julien-maurel/jQuery-Storage-API