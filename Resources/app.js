var win = Ti.UI.createWindow({
    backgroundColor: 'white'
});

var createUserActivityBtn = Ti.UI.createButton({
    title: 'Create User Activity',
    top: 40
});

createUserActivityBtn.addEventListener('click', function(e) {
    var activity = Ti.App.iOS.createUserActivity({
    	activityType:'com.music.listen',
    	title:'Listen to music',
    	userInfo:{
    		msg:"Listening to music!"
    	},
    	keyWords: ['listen','music'],
    	eligibleForSearch: true,
    	eligibleForPublicIndexing: true,
    	eligibleForHandoff: true
    });
    activity.becomeCurrent();
   alert('Created user activity that can be searched locally and is also public indexed. Press the home button and now search for \'listen\'');
});
win.add(createUserActivityBtn);

var createUserActivityWithContentAttrBtn = Ti.UI.createButton({
    title: 'create User Activity with Content Attr',
    top: 80
});

createUserActivityWithContentAttrBtn.addEventListener('click', function(e) {
    var activity = Ti.App.iOS.createUserActivity({
    	activityType:'com.music.listen.classical',
    	title:'Listen to Classical',
    	userInfo:{
    		msg:"Listening to Classical!"
    	},
    	keyWords: ['listen','music'],
    	eligibleForSearch: true,
    	eligibleForPublicIndexing: true,
    	eligibleForHandoff: true
    });
    var imageBlob = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'bach_shades.jpg');
    var itemAttr = Ti.App.iOS.createSearchableItemAttributeSet({
	    itemContentType:"Ti.App.iOS.UUTYPE_MP3",
	    title:"bach's symphony",
//	    thumbnailURL: 'KS_nav_ui.png',
	    downloadedDate: '2015-12-25T23:30:55.978+0000',
	    copyright: 'Copyright 2015 Titanium Music',
	    duration: 180,
	    thumbnailData: imageBlob.read(),
	    artist: 'bach',	    
	    contentDescription:"we have a nice classical piece from bach!",
	    keywords:["classical", "bach"]
	});
	activity.addContentAttributeSet(itemAttr);
	activity.becomeCurrent();
   alert('Created user activity that can be searched locally and is also public indexed with Search Content Attribute Set. Press the home button and now search for \'classical\'');
});

var createSearchableItemBtn = Ti.UI.createButton({
    title: 'create searchable item',
    top: 120
});

createSearchableItemBtn.addEventListener('click', function(e) {
	var searchItems = [];
	var imageBlob = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'mozart-glasses.jpg');
	var itemAttr = Ti.App.iOS.createSearchableItemAttributeSet({
	    itemContentType:"Ti.App.iOS.UUTYPE_MP3",
	    title:"mozart's symphony",
//	    thumbnailURL: 'KS_nav_ui.png',
	    downloadedDate: '2015-12-23T23:30:55.978+0000',
	    copyright: 'Copyright 2015 Titanium Music',
	    duration: 240,
	    thumbnailData: imageBlob.read(),
	    artist: 'mozart',	    
	    contentDescription:"we have a nice classical piece from mozart!",
	    keywords:["classical", "mozart"]
	});
	 
	var item = Ti.App.iOS.createSearchableItem({
	    identifier:"my-id",
	    domainIdentifier:"com.music",
	    attributeSet:itemAttr
	});
	searchItems.push(item);
	 
	var indexer = Ti.App.iOS.createSearchableIndex();
	 
	indexer.addToDefaultSearchableIndex(searchItems,function(e){
	    if(e.success){
		   alert('Created searchable item that can only be searched locally. Press the home button and now search for \'mozart\'');
	    }else{
	        alert("Errored: " + JSON.stringify(e.error));
	    }
	});
});
Ti.App.iOS.addEventListener('continueactivity', function(e) {
    alert(JSON.stringify(e));
});
win.add(createUserActivityBtn);
win.add(createUserActivityWithContentAttrBtn);
win.add(createSearchableItemBtn);

win.open();