var resText = "0";
var resultDisplay = "";
var clickedBtn = "";
var prevText = "";
var prevBoo = "";
var clickedBoo = "";
var resEval = "";
var pressed = "";

$('.num-block').on('click', function() {
    clickedBtn = $(this);
    clickedBtn = $(this).text().trim();
    processResult(clickedBtn);
});


$(document).on({
    'keypress': function(e) {
        pressed = String.fromCharCode(e.which);
        pressedBoo = /([0-9\/\+\-\*\%\=\.])/g.test(pressed);

        if (pressedBoo) {
            if (pressed === "*") {
                clickedBtn = "×";
            } else if (pressed === "/") {
                clickedBtn = "÷";
            } else {
                clickedBtn = pressed;
            }
            //clickedBtn = $(clickedBtn).text().trim();
            processResult(clickedBtn);
        } else if (e.which === 13) {
            clickedBtn = "=";
            processResult(clickedBtn);
        }
    },
    'keydown': function(e) {
        keydowned = e.which;
        if ((keydowned === 27) || (keydowned === 8)) {
            if (keydowned === 27) {
                clickedBtn = "AC";
            } else {
                clickedBtn = "C"
            }

            processResult(clickedBtn);
        }
    }
});




function processResult(clickedBtn) {

    prevText = resText.substr(-1, 1);
    prevBoo = /([\÷\×\−\+\%\=])/g.test(prevText);
    clickedBoo = /([\÷\×\−\+\%\=])/g.test(clickedBtn);
    numberBoo = /[0-9]/g.test(clickedBtn);

    if (numberBoo) {
        if (resEval !== "") {
            resEval = "";
        }
    }
    if (prevBoo && clickedBoo) {
        if (resText !== '0') {
            resText = resText.substring(0, resText.length - 1);
        }
    } else if (clickedBoo) {
        if ((resText === '0') || (resText === '')) {
            resText = '0';
        }
        if (resEval !== "") {
            resText = resEval;
            resEval = "";
        }

    } else if (resText === '0') {
        resText = '';
    }




    if (clickedBtn === 'AC') {
        clickedBtn = '';
        resText = '0';
    }


    if (clickedBtn === 'C') {
        clickedBtn = '';
        if (resText.length > 1) {
            resText = resText.substring(0, resText.length - 1);
        } else {
            resText = '0';
        }
    }

    if ((clickedBtn === '=') || (clickedBtn === '%')) {

        if (/\×/g.test(resText)) {
            resText = resText.replace(/\×/g, '*');
        }
        if (/(\÷)/g.test(resText)) {
            resText = resText.replace(/\÷/g, '/');
        }
        if (/(\%)/g.test(resText)) {
            resText = resText.replace(/\%/g, '%');
        }
        if (/(\−)/g.test(resText)) {
            resText = resText.replace(/\−/g, '-');
        }

        if (clickedBtn === '%') {
            resultDisplay = eval(resText) / 100;
        } else {


            resultDisplay = eval(resText);
        }


        prevText = "";
        resEval = resultDisplay.toString();
        resText = "0";
        if (resultDisplay.toString().length > 12) {
            resultDisplay = resultDisplay.toExponential(3);
        }
    } else {
        resText += clickedBtn;
        if (resText.length < 18) {
            resultDisplay = resText;
        } else {
            resultDisplay = resText.substr(-17, 17);
        }
        if (resText === '0') {
            resText = '';
        }

    }



    $('#result').text(resultDisplay);

}
