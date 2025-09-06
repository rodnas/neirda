<html>
<head>
<title>stat progi</title>
<style>
.counter{
background-color:black;
color:yellow;
font-weight:bold;
}
</style>
</head>
<body background="images/public/background/bg1.jpg"> 
<table border=2>
<tr><td><span class="counter">
<?php
$datum_tomb = getdate();
//foreach ( $datum_tomb as $kulcs => $ertek )
//{
//	print "$kulcs = $ertek<br>";
//}
$ev = $datum_tomb["year"];
$ho = $datum_tomb["month"];
$nap = $datum_tomb["mday"];
/*$statday = "data/stat$ev$ho$nap.txt";
if  (is_file( $statday ) )
	{
	if ( $fa = fopen( $statday, "r") )
		{
		flock( $fa, 1) ;
		while ( ! feof( $fa ) )
			{
			$sor = fgets( $fa, 1024 );
			}
		flock( $fa, 3);
		fclose( $fa );
		}

	}
else
	{
	touch($statday);
	}

if ( $fa = fopen( $statday, "w") )
	{
	flock( $fa, 2 );
	$sor=$sor+1;
	fputs( $fa, $sor);
	flock( $fa, 3 );
	fclose ( $fa );
	}
else
	{
	print "a stat.txt sajnos nem megnyitható!<br>";
	}
*/

$whoday = "data/daywho$ev$ho$nap.txt";
if ( $faw = fopen( $whoday, "a") )
	{
	flock( $faw, 2 );
	$korny_valtozok = array( "HTTP_REFERER",
	"HTTP_USER_AGENT", "REMOTE_ADDR", "REMOTE_HOST",
	"QUERY_STRING", "PATH_INFO" );
	foreach ( $korny_valtozok as $valtozo )
	{
		if ( isset( $$valtozo ) )
			print "$valtozo: ${$valtozo}<br>";
			fputs( $faw, "$valtozo: ${$valtozo}\n");
	}
	if ( isset( $REMOTE_HOST ) )
		fputs( $faw, "1.REMOTE_HOST: $REMOTE_HOST\n");
	elseif ( isset ( $REMOTE_ADDR ) )
		fputs( $faw, "2.REMOTE_HOST: ".gethostbyaddr( $REMOTE_ADDR )."\n");
	else
		fputs( $faw, "3.REMOTE_HOST: Don't know!\n");
	fputs( $faw,"**** Next *****\n");
	flock( $faw, 3 );
	fclose ( $faw );
	}
else
	{
//	print "a stat.txt sajnos nem megnyitható!<br>";
	}


$statfull ="data/stat.txt";
if  (is_file( $statfull ) )
	{
	if ( $faf = fopen( $statfull, "r") )
		{
		flock( $faf, 1) ;
		while ( ! feof( $faf ) )
			{
			$sorf = fgets( $faf, 1024 );
			}
		flock( $faf, 3);
		fclose( $faf );
		}

	}
else
	{
	touch($statfull);
	}

if ( $faf = fopen( $statfull, "w") )
	{
	flock( $faf, 2 );
	$sorf=$sorf+1;
	fputs( $faf, $sorf);
	flock( $faf, 3 );
	fclose ( $faf );
	print "Counter: <b>$sorf</b>";
	}
else
	{
//	print "a stat.txt sajnos nem megnyitható!<br>";
	}

?>
</span></td></tr></table>
</body>
</html>