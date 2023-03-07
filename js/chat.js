
//this function can remove a array element.
Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

//this variable represents the total number of popups can be displayed according to the viewport width
var total_popups = 0;

//arrays of popups ids
var popups = [];

//this is used to close a popup
function close_popup(id)
{
    for(var iii = 0; iii < popups.length; iii++)
    {
        if(id == popups[iii])
        {
            Array.remove(popups, iii);
            
            document.getElementById(id).style.display = "none";
            
            calculate_popups();
            
            return;
        }
    }   
}

//displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
function display_popups()
{
    var right = 220;
    
    var iii = 0;
    for(iii; iii < total_popups; iii++)
    {
        if(popups[iii] != undefined)
        {
            var element = document.getElementById(popups[iii]);
            element.style.right = right + "px";
            right = right + 320;
            element.style.display = "block";
        }
    }
    
    for(var jjj = iii; jjj < popups.length; jjj++)
    {
        var element = document.getElementById(popups[jjj]);
        element.style.display = "none";
    }
}

//creates markup for a new popup. Adds the id to popups array.
function register_popup(id, name)
{
    
    for(var iii = 0; iii < popups.length; iii++)
    {   
        //already registered. Bring it to front.
        if(id == popups[iii])
        {
            Array.remove(popups, iii);
        
            popups.unshift(id);
            
            calculate_popups();
            
            
            return;
        }
    }               
    
    var element = '<div class="popup-box chat-popup row bootstrap chat snippets" id="'+ id +'">';
    element = element + '<div class="box box-primary direct-chat direct-chat-primary">';
    element = element + '<div class="box-header with-border">'+
      '<h3 class="box-title">'+ name +'</h3>'+
      '<div class="box-tools pull-right">'+
        '<span data-toggle="tooltip" title="" class="badge bg-light-blue" data-original-title="3 New Messages">3</span>'+
        '<button type="button" class="btn btn-box-tool" data-bs-target="#msgcontent" data-bs-toggle="collapse"  aria-expanded="false" aria-controls="collapseExample"><i class="fa fa-minus"></i></button>'+
        '<a href="javascript:close_popup(\''+ id +'\');">&#10005;</a>'+
        '</div>'+
        '</div>';
    element = element + ' <div class="box-content" id="msgcontent"><div class="box-body"><div class="direct-chat-messages">'+
      '<div class="direct-chat-msg">'+
        '<div class="direct-chat-info clearfix">'+
          '<span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>'+
          '</div>'+
          '<img class="direct-chat-img" src="https://bootdey.com/img/Content/user_1.jpg" alt="Message User Image">'+
          '<div class="direct-chat-text">Is this really true? Thats unbelievable!</div>'+
          '</div>'+
          '<div class="direct-chat-msg right">'+
            '<div class="direct-chat-info clearfix">'+
              '<span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>'+
              '</div>'+

              '<img class="direct-chat-img" src="https://bootdey.com/img/Content/user_2.jpg" alt="Message User Image">'+
              '<div class="direct-chat-text">You better believe it!</div>'+
              '</div>'+
              '</div>'+
                        '</div>';
    element = element + '<div class="box-footer">'+
      '<form action="#" method="post">'+
        '<div class="input-group">'+
          '<input type="text" name="message" placeholder="Type Message ..." class="form-control">'+
          '<span class="input-group-btn">'+
            '<button type="submit" class="btn btn-primary btn-flat">Send</button>'+
            '</span>'+
            '</div>'+
            '</form>'+
            '</div></div></div></div>';
    
    document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  

    popups.unshift(id);
            
    calculate_popups();
    
}

//calculate the total number of popups suitable and then populate the toatal_popups variable.
function calculate_popups()
{
    var width = window.innerWidth;
    if(width < 540)
    {
        total_popups = 0;
    }
    else
    {
        width = width - 200;
        //320 is width of a single popup box
        total_popups = parseInt(width/320);
    }
    
    display_popups();
    
}

//recalculate when window is loaded and also when window is resized.
window.addEventListener("resize", calculate_popups);
window.addEventListener("load", calculate_popups);



//header
$(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $(".navbar").addClass("bgwhite");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".navbar").removeClass("bgwhite");
    }
});
/*
$(document).ready(function(){
$("#menu-btn").on("click", function() {
    $("#sidebar").togglecss(".active-nav");
    $("#my-container").togglecss(".active-cont");
});
});*/
