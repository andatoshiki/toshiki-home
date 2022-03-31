// site run time
function show_date_time() {
    window.setTimeout("show_date_time()", 1000);
    BirthDay = new Date("9/5/2021 02:14:49");
    today = new Date();
    timeold = (today.getTime() - BirthDay.getTime());
    sectimeold = timeold / 1000
    secondsold = Math.floor(sectimeold);
    msPerDay = 24 * 60 * 60 * 1000
    e_daysold = timeold / msPerDay
    daysold = Math.floor(e_daysold);
    e_hrsold = (e_daysold - daysold) * 24;
    hrsold = Math.floor(e_hrsold);
    e_minsold = (e_hrsold - hrsold) * 60;
    minsold = Math.floor((e_hrsold - hrsold) * 60);
    seconds = Math.floor((e_minsold - minsold) * 60);
    span_dt_dt.innerHTML = 'This site has been alive for <i class="far fa-clock fa-fw"></i> ' + daysold + " " + "days" + " " + hrsold + " " + "hours" + " " + minsold + " " + "minutes" + " " + seconds + " " + "seconds";
}
show_date_time();

// random mobile view image generator
var mobileBgs = [];
mobileBgs[0] = "img/mobile/m1.jpg";
mobileBgs[1] = "img/mobile/m2.jpg";
mobileBgs[2] = "img/mobile/m3.jpg";
mobileBgs[3] = "img/mobile/m4.jpg";
mobileBgs[4] = "img/mobile/m5.jpg";
var randommobileBgIndex = Math.round(Math.random() * 4);
// random numbers of image, a random number extracted from 0-4, if 0-n -> Math.round(Math.random()*(n-1));
document.write('<style>@media (max-width:600px){.w3l-error-61-404 .error-61-mian{background:url(' + mobileBgs[randommobileBgIndex] + ') no-repeat right;background-size:cover;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;-moz-background-size:cover}}</style>');