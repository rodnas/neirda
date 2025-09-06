timerOn = false;
timeLeft = 60;
//var message=" ";

doneLoading = false;
imageCount = 0;
var progressBar = '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||';

 // Index of the pictures in document.images[*]
 
var nSeconds        =  0;                      // Duration of the game in seconds
var strDate         = "";                      // Date for highscore
 
/* Count seconds */
function countSeconds()
{
	nSeconds++;
}
 
/* Remove all white spaces */
function strTrim(str)
{
	var strReturn = "";
	for(var stri = 0; stri < str.length; stri++)
	{
		if(str.charAt(stri) != " ")
		{
			strReturn += str.charAt(stri);
		}
	}
	return strReturn;
}
 
/* Insert leading zero */
function addLeadingZero(value, nTotalLength)
{
	value += "";
	while(value.length < nTotalLength) value = "0" + value;
	return value;
}
 
function drawTimer()
{
	var drawhead ="";
	drawhead += '<FORM name="timerForm">'
	+'<TR width="100%">';
	if (startDisplay || timeDisplay || stopDisplay || levelDisplay)
	{
		drawhead += '<td align="center"><table width="100%"><tr>';
		if (startDisplay)
		{
			drawhead += '<td align="left" width="60"><a href="javascript:window.location.reload();" onMouseOver="if (document.newbtn) document.newbtn.src=\''+IMG_BUTTON+'new_over.gif\';" onMouseOut="if (document.newbtn) document.newbtn.src=\''+IMG_BUTTON+'new.gif\';"><img src="'+IMG_BUTTON+'new.gif" border=0 name="newbtn"></a></td>';
		}
		else
		{
		}
		if (levelDisplay)
		{
			drawhead += '<td>'
			+'<table cellspacing="0" cellpadding="0" border="0">'
			+'<tr>'
			+'<td><b>Level:</b></td>'
			+'<td><a href="javascript:setLevel(-1)" onMouseOver="if (document.minus) document.minus.src=\''+IMG_BUTTON+'minus_over.gif\';" onMouseOut="if (document.minus) document.minus.src=\''+IMG_BUTTON+'minus.gif\';"><img src="'+IMG_BUTTON+'minus.gif" border=0 name="minus"></a></td>'
			+'<td><img src="'+IMG_PUBLIC+'4.gif"" width="15" height="17" border="0" alt="" name="actlevel"></td>'
			+'<td></td>'
			+'<td><a href="javascript:setLevel(1)" onMouseOver="if (document.plus) document.plus.src=\''+IMG_BUTTON+'plus_over.gif\';" onMouseOut="if (document.plus) document.plus.src=\''+IMG_BUTTON+'plus.gif\';"><img src="'+IMG_BUTTON+'plus.gif" border=0 name="plus"></a></td>'
			+'</tr>'
			+'</table>'
			+'</td>'; 
		}
		else
		{
		}
		if (timeDisplay)
		{
			drawhead += '<TD align="center"><table><tr><td><IMG border=0 SRC="'+IMG_PUBLIC+'timer.gif"></td><td><a href="#" onMouseOver="if (document.time) document.time.src=\''+IMG_BUTTON+'time_off.gif\';" onMouseOut="if (document.time) document.time.src=\''+IMG_BUTTON+'time_on.gif\';"><img src="'+IMG_BUTTON+'time_on.gif" border=0 name="time"></a></td><td>&nbsp;<b>Time:</b></td><td><input type="text" size="4" name="timeLeft">&nbsp;<b>s</b>&nbsp;</td></tr></table></TD>';
		}
		else
		{
			drawhead += '<TD align="center"></TD>';
		}
		if (playDisplay)
		{
			drawhead += '<td align="right" width="60"><a href="javascript:playGame();" onMouseOver="if (document.play) document.play.src=\''+IMG_BUTTON+'play_over.gif\';" onMouseOut="if (document.play) document.play.src=\''+IMG_BUTTON+'play.gif\';"><img src="'+IMG_BUTTON+'play.gif" border=0 name="play"></a></td>';
		}
		else
		{
		}
		drawhead += '</tr></table></td></tr><tr>';
	}
	else
	{
	}
	drawhead += '<td align="center"><TEXTAREA NAME="message" COLS="40" ROWS="2" READONLY></TEXTAREA></td></tr>'
/*	+'<tr><td align="center">&nbsp;Size: <SELECT NAME="tablesize" onChange=javascript:whichsize();>'
	+'<OPTION SELECTED VALUE="4">4x4'
	+'<OPTION VALUE="6">6x6'
	+'</SELECT>'
	+' Picture: <SELECT NAME="picttype">'
	+'<OPTION SELECTED>politics'
	+'<OPTION>car'
	+'<OPTION>flag'
	+'<OPTION>cartoon'
	+'<OPTION>building'
	+'</SELECT></td></tr>' */
	+'</FORM>';
	document.writeln(drawhead);
}

function updateTime()
{
	if (!timerOn) return;
	if (timeDisplay)
	{
		numSeconds++;
		if ((isTimed) && !(gameOver))
		{
			timeLeft--;
			if (timeLimit)
			{
				document.timerForm.timeLeft.value = timeLeft;
			}
			else
			{
				document.timerForm.timeLeft.value = numSeconds;
			}
			if (timeLeft == 0)
			{
				if (timeLimit)
				{
					gameOver = true;
					stopGame();
				}
			}
		}	
		else
		{
			document.timerForm.timeLeft.value = numSeconds;
		}
	}
//	timeLeft = numSeconds;
}

function stopGame()
{
	if (timeLeft == 0)
	{
		document.timerForm.message.value = 'Sorry timeout! Now have a cup of tea.';
	}
	stopTimer();
}

function startTimer()
{
	numSeconds = 0;
	timerOn = true;
	timer=setInterval('updateTime()',1000);
}

function stopTimer()
{
	timerOn = false;
	clearInterval(timer);
}

function updateProgress(ims)
{
	var cnt=0;

	for(var upi = 0; upi < ims.length; upi++)
		if(ims[upi].complete || ims[upi].errored) cnt++;

	if(ims.length > 0)
		window.status='Loading ['+Math.round((cnt / imageCount)*100)+'%] ' + progressBar.substring(0, cnt);

	if(cnt < ims.length)
	{
		tempArray = ims;
		setTimeout("updateProgress(tempArray)",200);
	}
	else
		onComplete();
	}

function onComplete()
{
	window.status='Done';
	doneLoading = true;
}

function preloadImages()
{
	this.length = preloadImages.arguments.length;
	imageCount = this.length;
	for (var pli = 0; pli < this.length; pli++)
	{
		this[pli] = new Image();
		this[pli].errored=false;
		this[pli].onerror=new Function("this["+pli+"].errored=true");
		this[pli].src = preloadImages.arguments[pli];
	}
	updateProgress(this);
}

