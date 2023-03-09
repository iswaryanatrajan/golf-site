
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
let check = false;
window.mobileCheck = function() {
    
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
$(document).ready(function(){
  /*  var menu_btn = document.querySelector("#menu-btn");
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    var topbarleft = document.querySelector(".topbar-left");
    menu_btn.addEventListener("click", () => {
      sidebar.classList.toggle("active-nav");
      container.classList.toggle("active-cont");
      topbarleft.classList.toggle("active-nav");
    });*/
    var menu_btn = document.querySelector("#menu-btn");
    var wrapper = document.querySelector("#wrapper");
   // var container = document.querySelector(".my-container");
    //var topbarleft = document.querySelector(".topbar-left");
    menu_btn.addEventListener("click", () => {
      wrapper.classList.toggle("enlarged");
      //container.classList.toggle("active-cont");
     // topbarleft.classList.toggle("active-nav");
    });
    console.log(check);
    if(check){
        wrapper.classList.add("enlarged");
    }

    });
  

  

