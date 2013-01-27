# ContainText.js

Weighing in under 2KB, ContainText.js is a lightweight jQuery plug-in which responsively inflates or deflates text so that it fits neatly into your design. 

## The Basics
ContainText only works on elements where the CSS *'display'* property is set to either *'inline'* or *'inline-block'*. Also, don't try using it on text which is naturally meant to wrap to multiple lines (i.e. paragraphs).

### Default Usage
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="jquery.containtext.js"></script>

<script>
	$(function() {
		$('span').containText();
	});	
</script>
```
### Inflate & Deflate Text
Using the same default usage as above, simply set **grow** to *'true'* to inflate text.  
```javascript
$('span').containText({
	'grow'	: 	true
});
```

### Only Inflate Text
This time, just set **shrink** to *'false'* and **grow** to *'true'*.  
```javascript
$('span').containText({
	'shrink': 	false,
	'grow'	: 	true
});
```

## Settings
There are only four settings that you can play with:

- 	**minSize**  
	*Default : 12*  
	This is the minimum font-size in pixels before the text is wrapped to a second line.

- 	**maxSize**  
	*Default : 50*  
	This is the maximum font-size in pixels.

- 	**shrink**  
	*Default : true*  
	If this is set to *true*, then ContainText will shrink text to fit within the parent element.

- 	**grow**  
	*Default : false*  
	If this is set to *true*, then ContainText will inflate text so that it fills up to the parent element's width.

## Browser Support
I've briefly tested the plug-in on the following browsers:

- 	Google Chrome
- 	Firefox
- 	Safari
- 	Internet Explorer 9

In theory this should work on any browser than supports font sizes as percentages.

## Known Issues
There are sometimes issues with some Google Web Fonts if they're particularly wide. The plug-in *does* check whether the new font-size is too big to fit within the parent-selector, but this doesn't seem to work on page load (only on resize).

## Inspiration
I was somewhat inspired by text inflation plug-in [FitText.js](http://fittextjs.com/), however my main aim was to make text smaller rather than bigger. Once the code was in the make text shrink to fit into a certain width, it was easy enough to make it inflate and take up all the available space. If all you're wanting to do is make text really big, I would suggest using FitText.