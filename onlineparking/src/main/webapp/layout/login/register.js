var jq=$;
var ajaxPrefix="http://localhost:2020/onlineparking/";

						jq(document).ready(function() {
						jq.get(ajaxPrefix+"mvc/city", function(data) {
							var a = "<option value=' '>Select city</option>";
							jq.each((data), function(k, v) {
								a += "<option value='"+v.cityId+"'>"
										+ v.cityName + "</option>";
							});
							jq("#city").html(a);

						});
					});
				
					
					
			function formSubmit() {
				let error=false;
				let form={};
				let fName=document.getElementById("fname").value;
				let lName=document.getElementById("lname").value;
				let email=document.getElementById("reg-email").value;
				let pass=document.getElementById("reg-pass").value;
				let mobileNumber=document.getElementById("reg-mob").value;
				let dob=document.getElementById("dob").value;
				let male=document.getElementById("male").checked;
				let gender='';
				let fmale=document.getElementById("fmale").checked;
				let cityId=document.getElementById("city").value;
				
				if(male==true && fmale==false || fmale==true && male==false){
					if(male){
						gender="male";
						form.gender=gender;
					}else{
						gender="female";
						form.gender=gender;
					}
					
				}else{
					error=true;
					
				}
				if(!fName=='' || fName.length>0){
					form.fName=fName;
					
				}else{
					error=true;
					
				}	
				if(!lName=='' || lName.length>0){
					form.lName=lName;
					
				}else{
					error=true;
					
				}	
				if(!email=='' || email.length>0){
					form.email=email;
					
				}else{
					error=true;
					
				}	
				if(!pass=='' || pass.length>0){
					form.pass=pass;
					
				}else{
					error=true;
					
				}	
				if(!mobileNumber=='' || mobileNumber.length>0){
					form.mobileNumber=mobileNumber;
					
				}else{
					error=true;
					
				}
				if(!dob=='' || dob.length>0){
					form.dob=dob;
					
				}else{
					error=true;
					
				}	
				if(!cityId=='' || cityId.length>0){
					form.cityId=cityId;
					
				}else{
					error=true;
					
				}	
				
				
				if(error){
					toastr.error("Please all fiels are mandetory.");
					
				}else{
					let currentTime = new Date().toJSON().slice(0,10).replace(/-/g,'/');
					form.currentTime=currentTime;
					console.log(currentTime)
					
					jq.ajax({
			            url:  ajaxPrefix+"mvc/registration",
			            type: "POST",
			            dataType: "json",
			            contentType: 'application/json; charset=utf-8',
			            data: JSON.stringify(form),
			            success: function (response) {
			                if (response) {
			                	
			                	toastr.success("Registration successfully.");
			                	resetReg();
			                	 
			                }else{
			                	toastr.error("Record not insertrd Please contact support team.");
			                	resetReg();
			                }
			            },
			            error: function (xhr, status, err) {
			            	toastr.error("Record not insertrd Please contact support team.");
			            	resetReg();
			            	  console.log("fail...")
			            	  
			            }
			        });
					
				}
					 
		}	
			
			
			function resetReg(){
			
	              jq('input[type="text"],textarea').val('');

			}