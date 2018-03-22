var i = 0;
var txt = "Hi, I'm Enoch Sowah, And I'm A Developer.";
var speed = 50;
var database = firebase.database();
typeWriter();
new WOW().init();

$(".contact-form").on("submit", function(event) {
    event.preventDefault();

    var userName = $(".contact-form-username").val().trim(),
        userEmail = $(".contact-form-email").val().trim(),
        userMessage = $(".contact-form-message").val().trim();

    if (userName == "") {
        $(".res-msg").html("Please Enter Your Name");
    } else if (userEmail == "") {
        $(".res-msg").html("Please Enter Your Email");
    } else if (userMessage == "") {
        $(".res-msg").html("Please Enter Your Message");
    } else {
        var data = {
            userName: userName,
            userEmail: userEmail,
            userMessage: userMessage,
            dateSent: Date.now()
        };

        var sent = firebase.database().ref('contacts/').push(data);
        $(".res-msg").html("Your Message Has Been Sent. Thank You.")
    }
})

$(document).on("scroll", function() {
    var navbarHeight = $(".custom-navbar").height();
    if ($(this).scrollTop() >= navbarHeight) {
        $(".custom-navbar").addClass('scroll-navbar');
    } else {
        $(".custom-navbar").removeClass('scroll-navbar');
    }
});

$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("intro").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
    	$(".start-button").show();
    }
}