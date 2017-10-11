//number dropdown to textfield
var easyQnty = 1;
//var mainBuyButtonId = '#sQuantity';
var mainBuyButtonId = '#sQuantity';
var mainDecoyElmId = '#sQuantity_decoy';
var decoyPlusBtnId = '#qPlus';
var decoyMinusBtnId = '#qMinus';

function syncQnty () {
	$(mainDecoyElmId).text(easyQnty);
	$(mainBuyButtonId).val(easyQnty);
	$(mainDecoyElmId).val(easyQnty);
	checkBtnState()
}

function increaseQnty () {
	if (easyQnty == findMaxValue()) {
		return;
	}
	easyQnty++;
	syncQnty()
}
function decreaseQnty () {
	if (easyQnty <= 1) {
		return;
	}
	easyQnty--;
	syncQnty()
}
function initDecoy () {
	checkBtnState()
	$(mainDecoyElmId).on('input', function () {
		easyQnty = $(this).val();
		$(mainBuyButtonId).val($(this).val());
	})
}
function findMaxValue () {
	var maxValue = undefined;
	$('option', $(mainBuyButtonId)).each(function () {
		var val = $(this).attr('value');
		val = parseInt(val, 10);
		if (maxValue === undefined || maxValue < val) {
			maxValue = val;
		}
	});
	return maxValue - 1;
}
function checkBtnState () {
	$(decoyPlusBtnId).toggleClass('disabled', easyQnty == findMaxValue());
	$(decoyMinusBtnId).toggleClass('disabled', easyQnty <= 1);
}

$.subscribe('plugin/noiseEasyQuantity/init', function () {
	easyQnty = 1;
	setTimeout(function () {
		initDecoy();
	}, 250);
})

$.subscribe('plugin/shopsQuickview/onOpenAction', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/shopsQuickview/onCloseAction', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/shopsQuickview/onNavigateAction', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/shopsQuickview/onLoadQuickview', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/shopsQuickview/onChangeAction', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})

$.subscribe('plugin/swModal/onOpen', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/swModal/onClose', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})

$.subscribe('plugin/swQuickview/onShowNext', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
$.subscribe('plugin/swQuickview/onShowPrev', function () {
	$.publish('plugin/noiseEasyQuantity/init');
})
initDecoy();