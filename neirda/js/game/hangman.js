IMG_BUTTON="images/game/button/";
IMG_PUBLIC="images/game/";
IMG_GAMES="images/game/";
var timeDisplay = false;
var startDisplay = true;
var playDisplay = true;
var levelDisplay = false;

var sourceDir = "images/game/hangman/";

var words = new Array(
	"Salvador Dali", "k�pz�m�v�szet",
	"Boris Vallejo", "k�pz�m�v�szet",
	"Antoni Gaudi", "k�pz�m�v�szet",
	"Munk�csi Mih�ly", "k�pz�m�v�szet",
	"Ecce Homo! (�me az ember!)", "k�pz�m�v�szet",
	"Victor Vasarely", "k�pz�m�v�szet",
	"Carmina Burana", "zenem�v�szet",
	"Carl Orff", "zenem�v�szet",
	"Stephen King", "irodalom :))",
	"Dean R. Koontz", "irodalom :))",
	"J�zsef Attila", "k�lt�szet",
	"Arany J�nos", "k�lt�szet",
	"Pet�fi S�ndor", "k�lt�szet",
	"H. R. Giger", "k�pz�m�v�szet :))"
);

var numRight = 0;
var numWrong = 0;
var wordCount = 0;
var doneAction = '';

var thisAnswer;
var thisHint;
var lastAnswer = '';
var answerIdx;
var blankChar = '*';
var answerDisplay;
var maxAttempts = 7;
var usedLetters = '';
var wrongLetters = '';
var maxLength = 0;

var gameOver = false;
var gameStart = true;
var isHint = false;
var imgWidth;
var imgHeight;
var cellDimension;
var firstRun = true;

tempArray = new Array();
wordArray = new Array();

alphaLower = 'abcdefghijklmnopqrstuvwxyz';

var pictures = new preloadImages(
	IMG_BUTTON+"new.gif", IMG_BUTTON+"new_over.gif", 
	IMG_BUTTON+"play.gif", IMG_BUTTON+"play_over.gif", 
	sourceDir+"hint.gif", sourceDir+"hint_over.gif", 
	sourceDir+"a.gif", sourceDir+"b.gif", sourceDir+"c.gif", sourceDir+"d.gif",
	sourceDir+"e.gif", sourceDir+"f.gif", sourceDir+"g.gif", sourceDir+"h.gif",
	sourceDir+"i.gif", sourceDir+"j.gif", sourceDir+"k.gif", sourceDir+"l.gif",
	sourceDir+"m.gif", sourceDir+"n.gif", sourceDir+"o.gif", sourceDir+"p.gif",
	sourceDir+"q.gif", sourceDir+"r.gif", sourceDir+"s.gif", sourceDir+"t.gif",
	sourceDir+"u.gif", sourceDir+"v.gif", sourceDir+"w.gif", sourceDir+"x.gif",
	sourceDir+"y.gif", sourceDir+"z.gif", 
	sourceDir+"char225.gif", sourceDir+"char233.gif", sourceDir+"char237.gif",
	sourceDir+"char243.gif", sourceDir+"char246.gif", sourceDir+"char245.gif",
	sourceDir+"char250.gif", sourceDir+"char252.gif", sourceDir+"char251.gif",
	sourceDir+"image1.gif", sourceDir+"image2.gif", sourceDir+"image3.gif", sourceDir+"image4.gif",
	sourceDir+"image5.gif", sourceDir+"image6.gif", sourceDir+"lose.gif", sourceDir+"win.gif"
);

function doFunction(aFunction)
{
	if (aFunction.indexOf('(') > -1)
		eval( aFunction );
	else
	eval(aFunction+'()');
}

function endGame()
{
	gameOver = true;
	document.scores.you.value = numRight;
	document.scores.me.value = numWrong;
	if (doneAction != '')
		doFunction(doneAction);
}

function showHint()
{
	if (wrongLetters.indexOf(blankChar) == -1)
		wrongLetters = wrongLetters+blankChar;

	if ( wrongLetters.length < maxAttempts )
		document.hangimage.src=sourceDir+"image"+wrongLetters.length+".gif";

	document.hintForm.hint.value=thisHint;
}

function setBrowserInfo(cd, iw, ih)
{
	cellDimension = cd;
	imgWidth = iw;
	imgHeight = ih;
}

function getBrowserInfo()
{
	isOpera = (navigator.userAgent.indexOf('Opera') != -1);

	if (isOpera)
		setBrowserInfo(0, 70, 28);
	else if (navigator.appName == 'Netscape')
		setBrowserInfo(0, 70, 28);
	else
		setBrowserInfo(1, 70, 24);
}

function updateAnswer( str )
{
	for (var i=0; i < str.length; i++)
	{
		if ((lastAnswer.charAt(i) == str.charAt(i)) && (!gameStart))
			continue;
		if (str.charAt(i) == " ")
			eval('document.ans'+i+'.src="'+sourceDir+'space.gif"');
		else if (str.charAt(i) == blankChar)
			eval('document.ans'+i+'.src="'+sourceDir+'blank.gif"');
		else if (str.charAt(i) == "�")
			eval('document.ans'+i+'.src="'+sourceDir+'char225.gif"');
		else
			eval('document.ans'+i+'.src="'+sourceDir+str.charAt(i)+'.gif"');
	}
	lastAnswer = str;

	if (gameStart)
		for (var i=str.length; i < maxLength; i++)
			eval('document.ans'+i+'.src="'+sourceDir+'space.gif"');

	gameStart = false;
}

function arrayDelete( arrayName, delIndex )
{
	var ar = new Array();
	for (var ii = 0; ii < arrayName.length; ii++)
	{
		if (ii != delIndex)
			ar[ar.length] = arrayName[ii];
	}
	return ar;
}

function Word(aWord,aHint)
{
	this.value=aWord;
	this.hint=aHint;
	if (aWord.length > maxLength)
		maxLength = aWord.length;
}

function loadWords( wArray )
{
	var ar = new Array();

	for (var i=0; i < wArray.length; i=i+2)
		ar[ar.length] = new Word(wArray[i], wArray[i+1]);

	wordCount = ar.length;
	return ar;
}

function playGame()
{
	gameOver = false;
	gameStart = true;
	usedLetters = '';
	wrongLetters = '';
	answerDisplay= '';
	lastAnswer = '';

	for (var i=0; i < 26; i++)
		eval('document.img'+alphaLower.charAt(i)+'.src="'+sourceDir+alphaLower.charAt(i)+'.gif"');
		eval('document.img�.src="'+sourceDir+'char225.gif"');
		eval('document.img�.src="'+sourceDir+'char233.gif"');
		eval('document.img�.src="'+sourceDir+'char237.gif"');
		eval('document.img�.src="'+sourceDir+'char243.gif"');
		eval('document.img�.src="'+sourceDir+'char246.gif"');
		eval('document.img�.src="'+sourceDir+'char245.gif"');
		eval('document.img�.src="'+sourceDir+'char250.gif"');
		eval('document.img�.src="'+sourceDir+'char252.gif"');
		eval('document.img�.src="'+sourceDir+'char251.gif"');

	answerIdx = Math.floor(Math.random()*wordArray.length);
	thisAnswer = (wordArray[answerIdx].value).toLowerCase();
	thisHint = wordArray[answerIdx].hint;

	if (wordArray.length > 1)
		wordArray = arrayDelete( wordArray, answerIdx );
	else
		wordArray = loadWords(words);

	for(var i=0; i<thisAnswer.length; i++)
	{
		if ( thisAnswer.charAt(i) == " " )
			answerDisplay = answerDisplay+" ";
		else
			answerDisplay = answerDisplay+blankChar;
	}

	updateAnswer(answerDisplay);

	if (isHint)
		document.hintForm.hint.value=' ';

	document.hangimage.src=sourceDir + "image0.gif";

	if ((firstRun) && (navigator.appName == 'Netscape'))
		setTimeout('netscapeLoad()',1000);

	firstRun = false;
}

function netscapeLoad()
{
	for (var i=0; i < answerDisplay.length; i++)
		if (answerDisplay.charAt(i) == blankChar)
			eval('document.ans'+i+'.src="'+sourceDir+'blank.gif"');
}

function check(character)
{
	if (gameOver) return;
	if (usedLetters.indexOf(character) == -1)
	{
		usedLetters = usedLetters+character;
		eval('document.img'+character+'.src="'+sourceDir+'space.gif"');
	}
	else
		return;

	var wrongLetter = true;
	for( i = 0; i < thisAnswer.length; i++ )
	{
		if ( thisAnswer.indexOf(character, i) == -1 ) break;

		if ( thisAnswer.charAt(i) == character )
		{
			wrongLetter = false;
			if( i == 0 )
				answerDisplay = character + answerDisplay.substring(i+1,thisAnswer.length);
			else if ( i == thisAnswer.length-1 )
				answerDisplay = answerDisplay.substring(0,i)+character;
			else
				answerDisplay = answerDisplay.substring(0,i)+character+answerDisplay.substring(i+1,thisAnswer.length);
		}
	}

	if (wrongLetter)
	{
		if (wrongLetters.indexOf(character) == -1)
			wrongLetters = wrongLetters+character;

		if ( wrongLetters.length < maxAttempts )
			document.hangimage.src=sourceDir+"image"+wrongLetters.length+".gif";
		else
		{
			updateAnswer(thisAnswer);
			document.hangimage.src = sourceDir+"lose.gif";
			numWrong++;
			endGame();
		}
	}
	else
	{
		updateAnswer(answerDisplay);
		if( answerDisplay.indexOf(blankChar) == -1 )
		{
			document.hangimage.src=sourceDir+"win.gif";
			numRight++;
			endGame();
		}
	}
}

function drawAnswer()
{
	wordArray = loadWords(words);
	var drawhangman="";
	for (var i=0; i < maxLength; i++)
	{
		drawhangman+=
		'<img border=0 SRC=\'' + sourceDir + 'space.gif\' name=\'ans' + i +'\'>';
	}
	document.writeln(drawhangman);
	playGame();
}

function drawControl()
{
	var drawhangman="";
	drawhangman+='<FORM name="hintForm">'
	+'<TABLE border="1" bgcolor="#CCCCCC" cellspacing="'+cellDimension+'" cellpadding="'+cellDimension+'"><TR>'
	+'<TD bgcolor="cecece">'
	+'<TABLE border="0" bgcolor="#CCCCCC" cellspacing="'+cellDimension+'" cellpadding="'+cellDimension+'"><TR>'
	+'<TD><a href="javascript:void(showHint())" onMouseOver="if (document.hint) document.hint.src=\''+sourceDir+'hint_over.gif\';" onMouseOut="if (document.hint) document.hint.src=\''+sourceDir+'hint.gif\';"><img src="'+sourceDir+'hint.gif" border=0 name="hint"></a></TD>'
	+'<TD><input type="text" size="38" name="hint" value=""></TD>'
	+'</TR></TABLE>'
	+'</td>'
	+'</TR><TR><TD colspan=2 bgcolor="#FFFFFF" align="center">'
	+'<table border="0" bgcolor="#FFFFFF" cellpadding="3"><tr>';
	for (var i=0; i < 13; i++)
	{
		drawhangman+='<td align="center">';

		if (navigator.appName == 'Netscape')
			drawhangman+='<A href=\'javascript:void(check("'
			+ alphaLower.charAt(i)
			+ '"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + alphaLower.charAt(i)
		+ '.gif\' onClick=\'check("'
		+ alphaLower.charAt(i)
		+ '")\' name="img'
		+ alphaLower.charAt(i)
		+ '"></A></td>';
	}

	drawhangman+='</tr><tr>';

	for (var i=13; i < 26; i++)
	{
		drawhangman+='<td align="center">';

		if (navigator.appName == 'Netscape')
			drawhangman+='<A href=\'javascript:void(check("'
			+ alphaLower.charAt(i)
			+ '"))\'>';
			drawhangman+='<img border=0 width=16 height=16 SRC=\''
			+ sourceDir + alphaLower.charAt(i)
			+ '.gif\' onClick=\'check("'
			+ alphaLower.charAt(i)
			+ '")\' name="img'
			+ alphaLower.charAt(i)
			+ '"></A></td>';
	}

	drawhangman+='</tr><tr>'
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char225.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char233.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char237.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char243.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char246.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char245.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char250.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char252.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='<td align="center">';
	if (navigator.appName == 'Netscape')
		drawhangman+='<A href=\'javascript:void(check("�"))\'>';
		drawhangman+='<img width=16 height=16 border=0 SRC=\''
		+ sourceDir + 'char251.gif\' onClick=\'check("�")\' name="img�"></A></td>';
	drawhangman+='</tr></table></td></tr></TABLE>';
	drawhangman+='</FORM>';
	document.writeln(drawhangman);
}

function drawHangman()
{
	document.writeln('<img name="hangimage" src="'+sourceDir+'image0.gif" width=94 height=120>');
}

function drawHint()
{
	isHint = true;
}

getBrowserInfo();

if (navigator.appName == "Netscape" && parseFloat(navigator.appVersion) >= 4) {document.captureEvents(Event.KEYPRESS)};
document.onkeypress=setkeyboard
function setkeyboard(e) 
{
	var thebrowser = navigator.appName;
	var theversion = parseFloat(navigator.appVersion);
	if (thebrowser == "Microsoft Internet Explorer" && theversion >= 4) {thekey = event.keyCode};
	if (thebrowser == "Netscape" && theversion >= 4) {thekey = e.which};
	if (thekey == 97) {check('a')};
	if (thekey == 98) {check('b')};
	if (thekey == 99) {check('c')};
	if (thekey == 100) {check('d')};
	if (thekey == 101) {check('e')};
	if (thekey == 102) {check('f')};
	if (thekey == 103) {check('g')};
	if (thekey == 104) {check('h')};
	if (thekey == 105) {check('i')};
	if (thekey == 106) {check('j')};
	if (thekey == 107) {check('k')};
	if (thekey == 108) {check('l')};
	if (thekey == 109) {check('m')};

	if (thekey == 110) {check('n')};
	if (thekey == 111) {check('o')};
	if (thekey == 112) {check('p')};
	if (thekey == 113) {check('q')};
	if (thekey == 114) {check('r')};
	if (thekey == 115) {check('s')};
	if (thekey == 116) {check('t')};
	if (thekey == 117) {check('u')};
	if (thekey == 118) {check('v')};
	if (thekey == 119) {check('w')};
	if (thekey == 120) {check('x')};
	if (thekey == 121) {check('y')};
	if (thekey == 122) {check('z')};

	if (thekey == 225) {check('�')};
	if (thekey == 233) {check('�')};
	if (thekey == 237) {check('�')};
	if (thekey == 243) {check('�')};
	if (thekey == 246) {check('�')};
	if (thekey == 245) {check('�')};
	if (thekey == 250) {check('�')};
	if (thekey == 252) {check('�')};
	if (thekey == 251) {check('�')};
}

function firstdraw()
{
	document.writeln('<td valign="top"><table width="100%"><tr><td align="center">'
	+'<table bgcolor="#CCCCCC" border=4 cellpadding=0 cellspacing=0 bgcolor=white>'
	+'<tr><td align="center"><span class="all"><font size="4"><B>Akaszt�fa</B></font></span>'
	+'</td></tr>'
	+'<tr><td align="center">');
	drawTimer();
	document.writeln('</td></tr>'
	+'<tr><td align="center">'
	+'<table>'
	+'<tr><td align="center">');
	drawHangman();                                  	
	document.writeln('</td></tr>'
	+'<tr><td align="center">');
	drawControl();
	document.writeln('</td></tr>'
	+'<tr><td align="center">');
	drawAnswer();
	document.writeln('</td></tr>'
	+'<tr><td align="center">');
	drawHint();
	document.writeln('</td></tr>'
	+'</table>'
	+'</td></tr>'
	+'<tr><td align="center">'
	+'<table width="100%">'
	+'<form name=scores>'
	+'<tr>'
	+'<td align="center">Nyert: <input type=text name=you size=3 value=0 onFocus="blur()"></td>'
	+'<td align="center">Vesztett: <input type=text name=me size=3 value=0 onFocus="blur()"></td>'
	+'</tr>'
	+'</form>'
	+'</table>'
	+'</td></tr>'
	+'<tr><td align="center"><table>'
	+'<tr>'
	+'</tr>'
	+'</table></td></tr>'
	+'</table>'
	+'</td></tr>'
	+'</table>'
	+'</td></tr>'
	+'</table>');
}
