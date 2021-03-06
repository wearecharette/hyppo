if (window.EventSource) {
  var dataId = '';
	var source = new EventSource("/menuat/_changes?feed=eventsource&limit=2&descending=true"),
  sourceListener = function(e) {
  	var data = JSON.parse(e.data);
		if (data.id.charAt(0) !== '_' && data.id.indexOf('/') == -1) {
			if ( ( hash.indexOf("menu") > -1 || hash.indexOf("screen") > -1 ) && data.id == property ) {
				checkSave(hash);
			}
			dataId = $('#'+data.id);
			if (dataId.length > 0) {
				if (data.deleted) {
					dataId.fadeOut();
				}
				else {
					refreshQuery(dataId.parent());
					if (property === 'staugamp') {
						$('.message, #lean_overlay:first').show();
						$('.message').addClass('animated bounceInDown');
						setTimeout(function() {
							$('.message, #lean_overlay').fadeOut();
							$('.message').removeClass('animated bounceInDown');
							}, duration);
					}
				}
			}
			else {
				$.getJSON('/menuat/' + data.id, function(doc) {
					if ( typeof doc.type !== 'undefined' ) {
						dataId = $( "[data-json*='" + doc.type.replace(',','').replace(' ','').replace(property,'') + "']" );
						if (dataId.length > 0) {
							refreshQuery( dataId );
						}
					}
				});
			}
		}
  };

	// start listening for events
	source.addEventListener('message', sourceListener , false);
}
else {
	if ( hash.indexOf("menu") > -1 || hash.indexOf("screen") > -1 ) {
		if (typeof $.urlParam("random") !== "string") {
			timeout = 10000;
		}
		setInterval(function() {
			checkSave(hash);
		}, timeout);
	}
}
//need to make this scale up to X screens or menus
//need to hide only attribute screen elements that do not contain specific number not including elements where screen attribute not included
$('body').bind('queryDone', function() {
	var slideshow = $('.looper');
	slideshow.looper({
		pause: false,
	  speed: 500,
		interval: slideshow.attr('data-interval') || 5000
	});
	slideshow.looper('loop');
	if (window.location.href.indexOf('/edit/') > 0) {
		//$( '.looper' ).looper('');
		//$( '.cycle-sentinel' ).remove();
		//$( '.cycle-caption, .bottom-slideshow, .fullscreen' ).attr('style', function(i,s) { return 'position: static !important;' });
		if (property !== 'pulp') {
			$('.processing').children().unwrap();
		}
		if (property == 'hungryhowies') {
			$('.slideshow').css('position','relative');
			$('.bg-red').hide();
		}
	}
	else {
		//$( '.cycle-slideshow' ).cycle();
	}
	if (hash.indexOf("menu1") > -1 || hash.indexOf("screen") > -1 ) {
		if (property === 'staugamp') {
			$('.message, #lean_overlay').hide();
		}
		$("[screen*='2'], [screen*='3'], [screen*='4']").hide();
		$("[screen*='1']").show();
		window.scrollTo(0, 0);
	}
	else if (hash.indexOf("menu2") > -1) {
		$("[screen*='1'], [screen*='3'], [screen*='4']").hide();
		$("[screen*='2']").show();
		var pos = parseInt($('#position').text());
		window.scrollTo(pos, 0);
	}
	else if (hash.indexOf("menu3") > -1) {
		$("[screen*='1'], [screen*='2'], [screen*='4']").hide();
		$("[screen*='3']").show();
		var pos = parseInt($('#position').text());
		window.scrollTo(pos * 2, 0);
	}
	else if (hash.indexOf("menu4") > -1) {
		$("[screen*='1'], [screen*='2'], [screen*='3']").hide();
		$("[screen*='4']").show();
		var pos = parseInt($('#position').text());
		window.scrollTo((pos * 3)+5, 0);
	}
});

var checkSave = function(hash) {
	//var h = new Date().getHours();
	//if (h >= 6) {
		$.getJSON('/menuat/' + property + 'poll', function(doc) {
			if (typeof $.urlParam("random") !== "string") {
				window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
			}
			if(doc[hash] === 1) {
				$.ajax({
			    url: '/_update/poll/' + property + 'poll',
					type: 'POST',
					data: JSON.parse('{"'+hash+'": 0}'),
					success: function (data) {
						window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
			    },
			    error: function(status) {
						if (status.statusText == 'Conflict') {
							setTimeout(function() {
								$.ajax({
							    url: '/_update/poll/' + property + 'poll',
									type: 'POST',
									data: JSON.parse('{"'+hash+'": 0}'),
									success: function (data) {
										window.location = '/' + property + '?random=' + random1 + urlVars + '#' + hash;
							    },
							    error: function(status) {
							    }
								});
							}, randomIntFromInterval(1000,5000));
						}
			    }
				});
			}
		}).error(function() {
			//window.location = 'http://menuat.com/' + property + '#' + hash;
		});
	//}
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function refreshQuery(queryElement) {
		var opts = {};
    opts["elem"] = queryElement;
		opts["query"] = $.parseJSON(opts.elem.attr('data-json'));
		opts.req = ( $('.wc_editable:first').length > 0 ) ? "/queryedit" : "/query";
		opts.query["keys"] = JSON.stringify(opts.query["keys"]);
		opts.query["_"] = +new Date().getTime();
		query(opts);
}