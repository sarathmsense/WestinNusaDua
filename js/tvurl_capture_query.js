   /* This Function has been used for getting the user name password from the URL*/
   function PageQuery(q)
   {
		   if(q.length > 1) this.q = q.substring(1, q.length);
		   else this.q = null;
		   this.keyValuePairs = new Array();
		   if(q) 
			   {
				   for(var i=0; i < this.q.split("&").length; i++)
			   {
				   this.keyValuePairs[i] = this.q.split("&")[i];
			   }
	   }
		this.getKeyValuePairs = function() 
			   { 
				   return this.keyValuePairs; 
			   }       
		this.getValue = function(s)
			   {
				   for(var j=0; j < this.keyValuePairs.length; j++)
			   {       
				   if(this.keyValuePairs[j].split("=")[0] == s)
				   return this.keyValuePairs[j].split("=")[1];
			   }
				   return 'false';
	   }
	   this.getParameters = function() 
	  {
		   var a = new Array(this.getLength());
		  for(var j=0; j < this.keyValuePairs.length; j++) 
		 {
		   a[j] = this.keyValuePairs[j].split("=")[0];
		 }
		 return a;
	   }
	   this.getLength = function() 
	   {
		return this.keyValuePairs.length; 
	   }
   }
   /* USer name and Password capturing function has finished*/
   function queryString(key)
   {
		   var page = new PageQuery(window.location.search);
		   return unescape(page.getValue(key));
   }

   var last_insert_id=0;
   var tv_last_insert_id=0;
   function fnch_logwriter(logtowrite,room,isch){
	   room = room || 0;
	   isch = isch || 0;
	   $.ajax({
		   type: "GET",
		   url: "http://" + middleware_ip + "/"+Projctfldr+"/api_logwritter.php?strlog="+logtowrite+"&tvroom="+room+"&isch="+isch+"&js_last_insid="+last_insert_id,
		   success: function(data)
		   {
			   last_insert_id=data;
			   //console.log(data);
				//document.getElementById("logtext").innerHTML+= "<br>log success: " +last_insert_id;
		   }
	   });
	   
   }

   function fnch_numandname(logtowrite,room,isch,chname,chnum){
	   room = room || 0;
	   isch = isch || 0;
	  
	   //debugger;
	   $.ajax({
		   type: "GET",
		   url: "http://" + middleware_ip + "/"+Projctfldr+"/api_logwritter.php?strlog="+logtowrite+"&tvroom="+room+"&isch="+isch+"&js_last_insid="+tv_last_insert_id+"&chname="+chname+"&chnum="+chnum,
		   success: function(data)
		   {
				tv_last_insert_id=data;
			 
		   }
	   });
	   
   }