(function( $ ){
	/**
	 * jQuery changed()
	 *
	 * This extends the functionality of resize() by checking whether $(window)
	 * actually changed size. This essentially debounces resize() in all browsers.
	 *
	 * https://github.com/jamespegg/jQuery-Changed
	 * 
	 * @param  {object} func The function handler to be initiated.
	 */
	$.fn.changed = function( func ) {

		/* Store Objects */
		var $this = $(this);

		/* Starting width & height */
		var width = $this.width();
		var height = $this.height();

		/* If the window has actually changed size, then fire the function */
		$this.resize(function(){
			if($this.width() != width || $this.height() != height){
				func();
				width = $this.width();
				height = $this.height()
			}
		});
	}
})( jQuery );

(function( $ ){
	/**
	 * jQuery containText()
	 *
	 * ContainText.js is a lightweight jQuery plug-in which responsively inflates 
	 * or deflates text so that it fits neatly into your design. 
	 *
	 * @author James Pegg
	 * @copyright 2013 James Pegg
	 * @license [url] [description]
	 * @link https://github.com/jamespegg/ContainText
	 *
	 * 
	 */
	$.fn.containText = function( options ) {
		var settings = $.extend( {
			'minSize' :   12,     //  Minimum size before wrapping texting
			'maxSize' :   50,     //  Maximum allowed size
			'shrink'  :   true,   //  Allow text to shrink
			'grow'    :   false   //  Allow text to grow
		}, options);

		return this.each(function() {        

			/* Store Objects */
			var $this = $(this);
			var $parent = $this.parent();

			/* Default selector to nowrap */
			$this.css({'white-space':'nowrap'});

			/* Store initial font-size and width */
			var baseFont = $this.css('font-size').replace('px','');
			var baseWidth = $this.width();
			var baseParent = $parent.width();

			/* Calculate max size and min size as a percentage */
			var maxPercent = Math.floor((1/(baseFont/settings.maxSize))*100);
			var minPercent = Math.floor((1/(baseFont/settings.minSize))*100);

			/* If selector has a font-size independent of the parent, calculate a multiplier*/
			if(baseFont+'px' != $parent.css('font-size')){
				var multiplier = baseFont / $parent.css('font-size').replace('px','');
			} else {
				var multiplier = 1;
			}

			var contain = function(){
				var parentWidth = $parent.width();
				var newFont = Math.floor((1/(baseWidth/parentWidth))*100) * multiplier;

				/*  Work out what the font size should be */
				if (settings.shrink == true && newFont < minPercent) {    
					$this.css({'font-size' : minPercent+'%', 'white-space' : 'normal'});
				} else if (settings.grow == true && newFont > maxPercent){
					$this.css({'font-size' : maxPercent+'%', 'white-space' : 'normal'});
				} else if ( (settings.shrink == true && newFont < baseFont) || (settings.grow == true && newFont > baseFont)){
					$this.css({'font-size' : newFont+'%', 'white-space' : 'nowrap'});

					/* Check if the new font size fits inside parent element. If not, increment the font size down.*/
					while($this.width() > parentWidth){
						newFont = newFont - 5;
						$this.css({'font-size' : newFont+'%', 'white-space' : 'nowrap'});
					}

				} else {
					$this.css({'font-size' : baseFont+'%', 'white-space' : 'normal'});
				}
			}

			/* Checks if the parent width actually changed */
			var checkWidth = function(){
				if($parent.width() != baseParent){
					contain();
					baseParent = $parent.width();
				}
			}

			/* Run on page load */
			contain();

			/* On window resize fire contain function */
			$(window).changed(checkWidth);

		});
	};
})( jQuery );