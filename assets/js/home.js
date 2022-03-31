// main js embed features
var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

$(document).ready(function () {
	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});
	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});

$('.btn-mobile-menu__icon').click(function () {
	if ($('.navigation-wrapper').css('display') == "block") {
		$('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
			$('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});
		$('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	} else {
		$('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	}
	$('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});
// main js features ends

// alert html renderer
function toUnicodeVariant(str, variant, flags) {
    const offsets = {
        m: [0x1d670, 0x1d7f6],
        b: [0x1d400, 0x1d7ce],
        i: [0x1d434, 0x00030],
        bi: [0x1d468, 0x00030],
        c: [0x1d49c, 0x00030],
        bc: [0x1d4d0, 0x00030],
        g: [0x1d504, 0x00030],
        d: [0x1d538, 0x1d7d8],
        bg: [0x1d56c, 0x00030],
        s: [0x1d5a0, 0x1d7e2],
        bs: [0x1d5d4, 0x1d7ec],
        is: [0x1d608, 0x00030],
        bis: [0x1d63c, 0x00030],
        o: [0x24B6, 0x2460],
        p: [0x249C, 0x2474],
        w: [0xff21, 0xff10],
        u: [0x2090, 0xff10]
    }

    const variantOffsets = {
        'monospace': 'm',
        'bold': 'b',
        'italic': 'i',
        'bold italic': 'bi',
        'script': 'c',
        'bold script': 'bc',
        'gothic': 'g',
        'gothic bold': 'bg',
        'doublestruck': 'd',
        'sans': 's',
        'bold sans': 'bs',
        'italic sans': 'is',
        'bold italic sans': 'bis',
        'parenthesis': 'p',
        'circled': 'o',
        'fullwidth': 'w'
    }

// alert rendering ends


// special characters (absolute values)
var special = {
    m: {
        ' ': 0x2000,
        '-': 0x2013
    },
    i: {
        'h': 0x210e
    },
    g: {
        'C': 0x212d,
        'H': 0x210c,
        'I': 0x2111,
        'R': 0x211c,
        'Z': 0x2128
    },
    o: {
        '0': 0x24EA,
        '1': 0x2460,
        '2': 0x2461,
        '3': 0x2462,
        '4': 0x2463,
        '5': 0x2464,
        '6': 0x2465,
        '7': 0x2466,
        '8': 0x2467,
        '9': 0x2468,
    },
    p: {},
    w: {}
}
//support for parenthesized latin letters small cases 
for (var i = 97; i <= 122; i++) {
    special.p[String.fromCharCode(i)] = 0x249C + (i - 97)
}
//support for full width latin letters small cases 
for (var i = 97; i <= 122; i++) {
    special.w[String.fromCharCode(i)] = 0xff41 + (i - 97)
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';

var getType = function(variant) {
    if (variantOffsets[variant]) return variantOffsets[variant]
    if (offsets[variant]) return variant;
    return 'm'; //monospace as default
}
var getFlag = function(flag, flags) {
    if (!flags) return false
    return flags.split(',').indexOf(flag) > -1
}

var type = getType(variant);
var underline = getFlag('underline', flags);
var strike = getFlag('strike', flags);
var result = '';

for (var k of str) {
    let index
    let c = k
    if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c])
    if (type && (index = chars.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + offsets[type][0])
    } else if (type && (index = numbers.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + offsets[type][1])
    } else {
        result += c
    }
    if (underline) result += '\u0332' // add combining underline
    if (strike) result += '\u0336' // add combining strike
}
return result
}
// special characters ends

// title switching via visibilitychange event listener, if switched tab, site title changes
window.onload = function() {
    var OriginTitile = document.title;
    var titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            $('[rel="icon"]').attr('href', "/failure.ico");
            $('[rel="shortcut icon"]').attr('href', "/failure.ico");
            document.title = 'Ah, site crashed！';
            clearTimeout(titleTime);
        } else {
            $('[rel="icon"]').attr('href', "/favicon.ico");
            $('[rel="shortcut icon"]').attr('href', "/favicon.ico");
            document.title = 'Oh, site fixed！';
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            }, 2000);
        }
    });
}
// title switching ends

// block f12, ctrl+shift+i, ctrl+shit+j, right click.
window.oncontextmenu = function() {
    return false;
}
$(document).keydown(function(event) {
    if (event.keyCode == 123) {
        return false;
    } else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
        return false;
    }
});
// block f12 ends


// site run time
function siteTime(){
    window.setTimeout("siteTime()", 1000);
    var seconds = 1000;
    var minutes = seconds * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth()+1;
    var todayDate = today.getDate();
    var todayHour = today.getHours();
    var todayMinute = today.getMinutes();
    var todaySecond = today.getSeconds();
    /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
    year - 作为date对象的年份，为4位年份值
    month - 0-11之间的整数，做为date对象的月份
    day - 1-31之间的整数，做为date对象的天数
    hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
    minutes - 0-59之间的整数，做为date对象的分钟数
    seconds - 0-59之间的整数，做为date对象的秒数
    microseconds - 0-999之间的整数，做为date对象的毫秒数 */
    var t1 = Date.UTC(2017,11,11,16,16,16); //北京时间2016-12-1 00:00:00
    var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
    var diff = t2-t1;
    var diffYears = Math.floor(diff/years);
    var diffDays = Math.floor((diff/days)-diffYears*365);
    var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
    var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
    var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
    document.getElementById("sitetime").innerHTML='This site has been alive for <i class="far fa-clock fa-fw"></i> '+diffYears+" 年 "+diffDays+" 天 "+diffHours+" 小时 "+diffMinutes+" 分钟 "+diffSeconds+" 秒";
}
siteTime();

// console.log printing
// console.log("\n %c 俊樹のHomepage %c https://www.toshiki.top/ \n", "color: #ffffff; background: #f44336; padding:5px 0;", "background: #030303; padding:5px 0;");
// console.log printing ends


document.getElementById("cat").onclick = function() {
    Swal.fire({
        title: 'Custom width, padding, color, background.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://cdn.toshiki.top/img/nyan-cat.gif")
          left top
          no-repeat
        `
      })
};