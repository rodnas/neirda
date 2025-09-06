var COOL_TREE_FORMAT =
[
//0. left position
	0,
//1. top position
	0,
//2. show +/- buttons
	false,
//3. couple of button images (collapsed/expanded/blank)
	["img/c.gif", "img/e.gif", "img/b.gif"],
//4. size of images (width, height,ident for nodes w/o children)
	[0,0,0],
//5. show folder image
	false,
//6. folder images (closed/opened/document)
	["img/fc.gif", "img/fe.gif", "img/i.gif"],
//7. size of images (width, height)
	[0,0],
//8. identation for each level [0/*first level*/, 16/*second*/, 32/*third*/,...]
	[0,20,40,60],
//9. tree background color ("" - transparent)
	"",
//10. default style for all nodes
	"clsNode",
//11. styles for each level of menu (default style will be used for undefined levels)
	[],//["clsNodeL0","clsNodeL1","clsNodeL2","clsNodeL3","clsNodeL4"],
//12. true if only one branch can be opened at same time
	true,
//13. item pagging and spacing
	[0,0],
];
