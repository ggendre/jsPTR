Story
=====

This script is a small Pull-To-Refresh script I made to create a pullToRefresh on a native Tizen webview form.

It worked but the webview received the onScroll events not often enought to be acceptable so we let it down. 
Sometimes you just can't remove totally something you made.

**It can still be used for any website with touch abilities**, or some recent ios devices I guess.


Usage
=====

the *enable* function takes a callback parameter. This function will be called each time a pull-to-refresh is done.
This fonction also receive a *release* callback function as first parammeter. This enable you to release the PTR when you are done with updating your page


	//on doc loaded
	ptr.enable(function onPTR(release){
			//do something
			//then release PTR
			release();
	});
	
this script use **Zepto** or **jQuery** to work.


Customise
=========

There is two items in ptr : *css* and *html*. have a look at it and customise it as you wish.


Licence
=======

feel free to do whatever you want to this script.
