var cmuDict = {};
var word;
var equivalencies = "PTKBDGMNSZWRLVF";

function refreshWord() {
	var words = Object.keys(cmuDict);
	word = words[Math.floor(Math.random() * words.length)];
	$('#word-given').html(word.toLowerCase());
	$('#feedback').slideUp();
}

function loadCmu() {
	var raw = undefined;
	var raw = $.ajax({
		url: "../res/cmu5k.txt",
		async: false
	}).responseText;
	var lines = raw.split("\n");
	for (var i = 0; i < lines.length; i++) {
		var kv = lines[i].split("  ");

		if (kv[0].length > 1 && kv[1] != undefined && kv[1].indexOf("ER") == -1) {
			kv[0] = kv[0].replace(/\(\d\)/g, "");

			if (kv[0] in cmuDict) {
				cmuDict[kv[0]].push(kv[1]);
			} else {
				cmuDict[kv[0]] = [kv[1]];
			}
		}
	}
}

function arpaToIpa(arpa) {
	var tokens = arpa.split(" ");
	var ipa = "";
	
	for (var i = 0; i < tokens.length; i++) {
		if (equivalencies.indexOf(tokens[i]) > -1) {
			ipa += tokens[i].toLowerCase();
		} else if (tokens[i] == "NG") {
			ipa += "ŋ";
		} else if (tokens[i] == "TH") {
			ipa += "θ";
		} else if (tokens[i] == "DH") {
			ipa += "ð";
		} else if (tokens[i] == "SH") {
			ipa += "ʃ";
		} else if (tokens[i] == "ZH") {
			ipa += "ʒ";
		} else if (tokens[i] == "Y") {
			ipa += "j";
		} else if (tokens[i] == "HH") {
			ipa += "h";
		} else if (tokens[i] == "CH") {
			ipa += "tʃ";
		} else if (tokens[i] == "JH") {
			ipa += "dʒ";
		} else if (tokens[i] == "IY") {
			ipa += "i";
		} else if (tokens[i] == "IH") {
			ipa += "ɪ";
		} else if (tokens[i] == "EY") {
			ipa += "eɪ";
		} else if (tokens[i] == "EH") {
			ipa += "ɛ";
		} else if (tokens[i] == "AE") {
			ipa += "æ";
		} else if (tokens[i] == "AO") {
			ipa += "ɔ";
		} else if (tokens[i] == "OW") {
			ipa += "oʊ";
		} else if (tokens[i] == "UH") {
			ipa += "ʊ";
		} else if (tokens[i] == "UW") {
			ipa += "u";
		} else if (tokens[i] == "AH") {
			ipa += "ʌ";
		} else if (tokens[i] == "AY") {
			ipa += "aɪ";
		} else if (tokens[i] == "AW") {
			ipa += "aʊ";
		} else if (tokens[i] == "OY") {
			ipa += "ɔɪ";
		} else if (tokens[i] == "AX") {
			ipa += "ə";
		} else if (tokens[i] == "AA") {
			ipa += "ɑ";
		} else {
			ipa += "???ERROR???";
			console.log("Unrecognized token: \"" + tokens[i] + "\"");
		}
	}

	return ipa;
}

function checkAns() {
	var answers = [];
	
	for (var i = 0; i < cmuDict[word].length; i++) {
		answers.push(arpaToIpa(cmuDict[word][i]));
	}

	console.log(answers);

	if (answers.includes($('input').val())) {
		$('#feedback').html("Correct!");
		$('#feedback').css("color", "green");
	} else {
		$('#feedback').html(answers[0]);
		$('#feedback').css("color", "red");
	}
	$('#feedback').slideDown();
}

function onSubmit() {
	if ($('#feedback').css("display") == "none") {
		checkAns();
	} else {
		refreshWord();
		$('input').val("");
	}
}

$(document).ready(function() {
	loadCmu();
	refreshWord();
	$('button').click(function() {
		if (this.id != "submit") {
			$('#type-ipa').val($('#type-ipa').val() + $(this).html());
		}
	});
	$('input').keypress(function(e) {
		if (e.which == 13) {
			onSubmit();
		}
	});
	$('#submit').click(onSubmit);
	if ($(window).width() < $('#content').width()) {
		$('#content').width("95%");
	}
});