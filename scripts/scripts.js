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

function closeModal() {
    var modal = document.getElementById("modal");
    modal.classList.remove("active");
}

$(document).ready(function () {
    $("img.filterDiv").click(function () {
        openModal($(this));
    })

    $("img#left-btn").click(function () {
        modalIncrement("left");
    })

    $("img#right-btn").click(function () {
        modalIncrement("right");
    })

    function modalIncrement(direction) {
        var currentImg = $("#modal-img");

        var imgIndex;
        for (i = 0; i < $(".filterDiv").toArray().length; i++) {
            if ($(".filterDiv")[i].src.includes(currentImg.attr("src"))) {
                imgIndex = i;
                console.log(imgIndex);
            }
        }

        if (direction == "left" && imgIndex - 1 >= 0) {
            openModal($($(".filterDiv")[imgIndex - 1]));
        } else if (direction == "right" && imgIndex + 1 < $(".filterDiv").toArray().length) {
            openModal($($(".filterDiv")[imgIndex + 1]));
        }
    }

    function openModal(image) {
        var imgSrc = image.attr("src");
        var imgSrcset = image.attr("srcset");

        $("img#modal-img").hide();
        $("#modal-nav-btns").hide();
        $("#modal").addClass("active");

        $("img#modal-img").attr("src", imgSrc);
        $("img#modal-img").attr("srcset", imgSrcset);

        var aspectRatio = image.height() / image.width();
        var viewportAspectRatio = $(window).height() / $(window).width();

        var imgSizes;

        if (aspectRatio <= viewportAspectRatio) {
            imgSizes = "85vw";

        } else {
            var imgWidth = (85 / aspectRatio) * viewportAspectRatio;
            imgSizes = imgWidth + "vw";
        }

        $("img#modal-img").attr("sizes", imgSizes);

        $("img#modal-img").one("load", function () {
            $("img#modal-img").show();
            $("#modal-nav-btns").show();
        });
    }


}); 