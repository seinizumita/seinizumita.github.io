/*!
 * Start Bootstrap - Freelancer v6.0.3 (https://startbootstrap.com/themes/freelancer)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */

var pros = [
	{
		name: "ryan",
		days: [2, 3, 4, 5],
	},
	{
		name: "jen",
		days: [3, 5],
	},
	{
		name: "catherine",
		days: [2, 3, 4, 5],
	},
	{
		name: "joshua",
		days: [3, 4, 5],
	},
];

var selectedPro = null;

function validatePhone(phoneNum) {
	var num = document.getElementById(phoneNum).value;

	//Regex taken from RegExr.com
	var filter = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

	if (filter.test(num)) {
		return true;
	} else {
		return false;
	}
}

function validateCreditCard(creditNum) {
	var num = document.getElementById(creditNum).value;

	var filter = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/;

	if(filter.test(num)) {
		return true;
	} else {
		return false;
	}
}

;(function ($) {
	'use strict' // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (
			location.pathname.replace(/^\//, '') ==
				this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash)
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
			if (target.length) {
				$('html, body').animate(
					{
						scrollTop: target.offset().top - 71,
					},
					1000,
					'easeInOutExpo'
				)
				return false
			}
		}
	})

	// Scroll to top button appear
	$(document).scroll(function () {
		var scrollDistance = $(this).scrollTop()
		if (scrollDistance > 100) {
			$('.scroll-to-top').fadeIn()
		} else {
			$('.scroll-to-top').fadeOut()
		}
	})

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide')
	})

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 125,
	})

	// Scrolls to book visit and sets service
	$('.closeModal').click(function () {
		//scrolling effect inspired by https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
		$('html, body').animate(
			{
				scrollTop: $('#contact').offset().top,
			},
			1000
		)
		$('#serviceSelect').val(event.target.id)
	})

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($('#mainNav').offset().top > 100) {
			$('#mainNav').addClass('navbar-shrink')
		} else {
			$('#mainNav').removeClass('navbar-shrink')
		}
	}
	// Collapse now if page is not at top
	navbarCollapse()
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse)

	// Floating label headings for the contact form
	$(function () {
		$('body')
			.on('input propertychange', '.floating-label-form-group', function (e) {
				$(this).toggleClass(
					'floating-label-form-group-with-value',
					!!$(e.target).val()
				)
			})
			.on('focus', '.floating-label-form-group', function () {
				$(this).addClass('floating-label-form-group-with-focus')
			})
			.on('blur', '.floating-label-form-group', function () {
				$(this).removeClass('floating-label-form-group-with-focus')
			})
	})

	$(document).ready(function () {
		$('#datepicker').datepicker({
			dateFormat: 'dd/mm/yy',
			minDate: new Date(),
			onSelect: function () {
				$('#dateSelect').addClass('floating-label-form-group-with-value')
			},
			beforeShowDay: function (date) {
				var day = date.getDay()
				if (selectedPro != null && selectedPro != undefined) {
					return [selectedPro.days.includes(day)]
				} else {
					return [day == 1 || day == 2 || day == 3 || day == 4 || day == 5]
				}
			}
		})

		$("#phone").on("change", function() {
			if(!validatePhone("phone")){
				$("#phone").addClass("error");
				$("#phoneWarning").addClass("error-message");
			} else {
				$("#phone").removeClass("error");
				$("#phoneWarning").removeClass("error-message")
			}
		})

		$("#creditCard").on("change", function() {
			if(!validateCreditCard("creditCard")){
				$("#creditCard").addClass("error");
				$("#creditWarning").addClass("error-message");
			} else {
				$("#creditCard").removeClass("error");
				$("#creditWarning").removeClass("error-message");
			}
		})
	})

	$(function () {
		$('#selectPro').on('change', function () {
			var selection = $('#selectPro option:selected').val()
			if (selection != 'noPref') {
				selectedPro = pros.find(p => 
					p.name == selection
				);
			} else {
				selectedPro = null
			}
			//Refresh calendar
			$("#datepicker").datepicker("refresh");
		})
	})
})(jQuery) // End of use strict
