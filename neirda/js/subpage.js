IMG_BUTTON="images/public/paging/button/";
var lock = false;
onload=buttoninit;

var which=0

var delay = 4000;
var run;

function backward()
{
	if (which>0)
	{
		which--
	}else
	{
		which=subpage.length-1
	}
	getobject("pagetext").innerHTML = subpage[which];
	getobject("actpage").innerHTML = which+1;
}

function first()
{
	which=0
	getobject("pagetext").innerHTML = subpage[which];
	getobject("actpage").innerHTML = which+1;
}

function forward()
{
	if (which<subpage.length-1)
	{
		which++
	}else
	{
		which=0
	}
	getobject("pagetext").innerHTML = subpage[which];
	getobject("actpage").innerHTML = which+1;
}

function last()
{
	which=subpage.length-1
	getobject("pagetext").innerHTML = subpage[which];
	getobject("actpage").innerHTML = which+1;
}

function auto(do_what) 
{
	window.clearInterval(run);
	lock = true;
	if (do_what == "S")
		lock = false;
	else if (do_what == "F")
		run = setInterval("forward()", delay);
	else if (do_what = "B")
		run = setInterval("backward()", delay);
}

function getobject(obj)
{
	if (document.getElementById)
		return document.getElementById(obj)
	else if (document.all)
		return document.all[obj]
}

function firstdraw(artist,autoplay)
{
	document.writeln('<center><font color="1F1F57" face="Monotype Corsiva"><table border=0 width="610" height="440"><tr><td align="center">'
	+'<table border=4 cellpadding=0 cellspacing=0>'
	+'<tr><td align="center"><span class="all">'
	+'<table width="100%"><tr><td width=100>'
	+'<td align="center"><font size="5"><B>'+artist+'</B></font></span></td>'
	+'<td align="right" width=100><font size=5><b>'+subpage.length+'/<SPAN id=actpage>1</SPAN></b></font></td>'
	+'</table></td></tr>'
	+'<tr><td align="left" valign="top" width="590" height="430">'
	+'<table width="100%" height="100%"><tr><td height="420" valign="top">');
	document.write('<font size=4><SPAN id=pagetext>'+subpage[0]+'</SPAN></font>');
	document.writeln('</td></tr></table></td></tr>'
	+'<tr><td>'
	+'<table width="100%"><tr><td align="center" width="100%">'
	+'<a href="#" onClick="first();return false"><img src="'+IMG_BUTTON+'navmenu_b1.gif" hsrc="'+IMG_BUTTON+'navmenu_b1_over.gif" border="0"></a>'
	+'<a href="#" onClick="backward();return false"><img src="'+IMG_BUTTON+'navmenu_b2.gif" hsrc="'+IMG_BUTTON+'navmenu_b2_over.gif" border="0"></a>');
	if (autoplay=="Y")
	{
		document.writeln('<a href="#" onClick="auto(\'B\'); return true"><img src="'+IMG_BUTTON+'navmenu_b3.gif" hsrc="'+IMG_BUTTON+'navmenu_b3_over.gif" border="0" name="slidestart"></a>'
		+'<a href="#" onClick="auto(\'S\'); return true"><img src="'+IMG_BUTTON+'navmenu_b4.gif" hsrc="'+IMG_BUTTON+'navmenu_b4_over.gif" border="0" name="slidestop"></a>'
		+'<a href="#" onClick="auto(\'F\'); return true"><img src="'+IMG_BUTTON+'navmenu_b5.gif" hsrc="'+IMG_BUTTON+'navmenu_b5_over.gif" border="0" name="slidestart"></a>');
	}
	document.writeln('<a href="#" onClick="forward();return false"><img src="'+IMG_BUTTON+'navmenu_b6.gif" hsrc="'+IMG_BUTTON+'navmenu_b6_over.gif" border="0"></a>'
	+'<a href="#" onClick="last();return false"><img src="'+IMG_BUTTON+'navmenu_b7.gif" hsrc="'+IMG_BUTTON+'navmenu_b7_over.gif" border="0"></a>'
	+'</td></tr></table>'
	+'</td></tr></table>'
	+'</font></center>');
}

