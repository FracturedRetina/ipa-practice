var key;
var symbol;
var correct = 0;
var total = 0;

function capitalize(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
}

function refreshSymbol() {
	var symbols = Object.keys(key);
	symbol = symbols[Math.floor(Math.random() * symbols.length)];
	$('#symbol-given').html(symbol);
	$('#feedback').slideUp();
	$('#submit').html("Submit");
}

function checkAns() {
	var ipa = key[$('#symbol-given').html()];
	var ansStr = (ipa.voice ? "Voiced " : "Unvoiced ") + capitalize(ipa.place) + " " + capitalize(ipa.manner);

	if (ipa.voice == $('#voiced').is(':checked') && ipa.place == $('#place').val() && ipa.manner == $('#manner').val()) {
		$('#feedback').html("Correct!");
		$('#feedback').css("color", "green");
		correct++;
	} else {
		$('#feedback').html(ansStr);
		$('#feedback').css("color", "red");
	}
	total++;
	$('#score').html(correct + "/" + total);
	$('#feedback').slideDown();
	$('#submit').html("Next");
}

$(document).ready(function() {
	$.getJSON("consonants.json", function(json) {
		key = json;
		refreshSymbol();
	});
	$('#submit').click(function() {
		if ($('#feedback').css("display") == "none") {
			checkAns();
		} else {
			refreshSymbol();
		}
	});
	if ($(window).width() < $('#content').width()) {
		$('#content').width("95%");
	}
});