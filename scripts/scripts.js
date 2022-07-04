function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
}

// Show filtered elements
function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function updateNav(id) {
    var lines = document.getElementsByClassName("nav-line");

    for (var i = 0; i < lines.length; i++) {
        lines[i].classList.remove("active");
    }
    var changedBtn = document.getElementById(id);
    changedBtn.classList.add("active");
}

// function openModal(img) {
//     var modalImg = document.getElementById('modal-img');
//     modalImg.src = "images/" + img + ".jpg";
//     currentModalImg = img;


//     $('img#modal-img').load(function(){  
//         var modal = document.getElementById("modal");
//         modal.classList.add("active");

//     });

// }



function closeModal() {
    var modal = document.getElementById("modal");
    modal.classList.remove("active");

    // document.getElementById("modal-img").remove();
}


function modalIncrement(direction){
    var currentModalImg = document.getElementById("modal-img").src;
    var images = document.getElementsByClassName("filterDiv");
    var imgIndex;

    for(i = 0; i < images.length; i++){
        if(images[i].src == currentModalImg){
            imgIndex = i;
            break;
        }
    }

    if(direction == "left" && imgIndex-1 >= 0){
        document.getElementById("modal-img").src = images[imgIndex-1].src;
    } else if(direction =="right" && imgIndex+1 < images.length) {
        document.getElementById("modal-img").src = images[imgIndex+1].src;
    }
}


$(document).ready(function () {
    $("img.filterDiv").click(function () {
        var imgSrc = $(this).attr("src");
        $("img#modal-img").hide();
        $("#modal-nav-btns").hide();
        $("#modal").addClass("active");

        //console.log(imgSrc);
        $("img#modal-img").attr("src", imgSrc).one("load", function () {
            $("img#modal-img").show();
            $("#modal-nav-btns").show();
        });
    })


}); 