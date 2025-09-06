IMG_PUBLIC="images/public/";
IMG_MENU="images/public/menu/";
IMG_BUTTON="images/public/button/";
var browser_type=navigator.appName
var browser_version=parseInt(navigator.appVersion)

function mainmenu(menuborder)
{
	var mmenulinks = new Array(
	"index.html",
	"zene.html",
	"art.html",
	"game.html",
	"inte.html",
	"mailto:neirda@freeweb.hu"
	);
	var drawmain="";
	drawmain+='<tr><td align="center"><table width="100%" border=0><tr><td align="center" valign="top">';
	if (menuborder)
	{	
		drawmain+='<img src="'+IMG_MENU+'main/mainmenu_left.gif" border="0">';
	}
	for (var mmp=1; mmp < 7; mmp++)
	{
		drawmain+=
		'<a href="'+mmenulinks[mmp-1]+'" onMouseOver="if (document.mmenu'+mmp+') document.mmenu'+mmp+'.src=\''+IMG_MENU+'main/mainmenu_b'+mmp+'_over.gif\';" onMouseOut="if (document.mmenu'+mmp+') document.mmenu'+mmp+'.src=\''+IMG_MENU+'main/mainmenu_b'+mmp+'.gif\';"><img src="'+IMG_MENU+'main/mainmenu_b'+mmp+'.gif" border=0 name="mmenu'+mmp+'"></a>';
	}
	if (menuborder)
	{
		drawmain+='<img src="'+IMG_MENU+'main/mainmenu_right.gif" border="0">';
	}
	drawmain+='</td></tr></table></td></tr>';
	document.writeln(drawmain);
}

function toptop(logoleft, headname, logoright)
{
	var drawtop="";
	drawtop += '<center><table><tr><td align="center">'
	+'<table>'
	+'<tr><td><img src="images/public/line.gif" border="0"></td></tr>'
	+'<tr><td>'
	+'<table width="100%"><tr>'
	+'<td align="left"><img src="images/public/'+logoleft+'" border="0"></td>'
	if (logoright !="")
	{
		drawtop += '<td align="center"><img src="images/public/'+headname+'" border="0"></td>'
		+'<td align="right"><img src="images/public/'+logoright+'" border="0"></td>'
	}
	else
	{
		drawtop += '<td align="right"><img src="images/public/'+headname+'" border="0"></td>'
	}
	drawtop += '</tr></table>'
	+'</td></tr>'
	+'<tr><td>'
	+'</td></tr>'
	+'</table>';
	document.writeln(drawtop);
}

function bottombottom()
{
	var drawbottom="";
	drawbottom += '<table>'
	+'<tr><td height="10">'
	+'</td></tr>'
	+'</table>'
	+'</td></tr></table>'
	+'</center>';
	document.writeln(drawbottom);
}

function buttoninit() 
{
	if (!document.getElementById) return
	var imgOriginSrc;
	var imgTemp = new Array();
	var imgarr = document.getElementsByTagName('img');
	for (var buttoni = 0; buttoni < imgarr.length; buttoni++) 
	{
		if (imgarr[buttoni].getAttribute('hsrc'))
		{
			imgTemp[buttoni] = new Image();
			imgTemp[buttoni].src = imgarr[buttoni].getAttribute('hsrc');
			imgarr[buttoni].onmouseover = function() 
			{
				imgOriginSrc = this.getAttribute('src');
				this.setAttribute('src',this.getAttribute('hsrc'))
			}
			imgarr[buttoni].onmouseout = function() 
			{
				this.setAttribute('src',imgOriginSrc)
			}
		}
	}
}
