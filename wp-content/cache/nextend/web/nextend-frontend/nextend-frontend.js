window.n2c = (function (origConsole) {
    var isDebug = false,
        logArray = {
            logs: [],
            errors: [],
            warns: [],
            infos: []
        }
    return {
        log: function () {
            logArray.logs.push(arguments)
            isDebug && origConsole.log && origConsole.log.apply(origConsole, arguments);
        },
        warn: function () {
            logArray.warns.push(arguments)
            isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments);
        },
        error: function () {
            logArray.errors.push(arguments)
            isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments);
        },
        info: function (v) {
            logArray.infos.push(arguments)
            isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments);
        },
        debug: function (bool) {
            isDebug = bool;
        },
        logArray: function () {
            return logArray;
        }
    };

}(window.console));

n2c.debug(false);
window.n2const = {
    isIOS: /iPad|iPhone|iPod/.test(navigator.platform),
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};
if (typeof Object.create != 'function') {
    Object.create = (function () {
        var Temp = function () {
        };
        return function (prototype) {
            if (arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if (typeof prototype != 'object') {
                throw TypeError('Argument must be an object');
            }
            Temp.prototype = prototype;
            var result = new Temp();
            Temp.prototype = null;
            return result;
        };
    })();
}


/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};
window.Base64 = Base64;
/*! mobile-detect - v1.3.0 - 2015-11-12
 https://github.com/hgoebl/mobile-detect.js */!function(a,b){a(function(){"use strict";function a(a,b){return null!=a&&null!=b&&a.toLowerCase()===b.toLowerCase()}function c(a,b){var c,d,e=a.length;if(!e||!b)return!1;for(c=b.toLowerCase(),d=0;e>d;++d)if(c===a[d].toLowerCase())return!0;return!1}function d(a){for(var b in a)h.call(a,b)&&(a[b]=new RegExp(a[b],"i"))}function e(a,b){this.ua=a||"",this._cache={},this.maxPhoneWidth=b||600}var f={};f.mobileDetectRules={phones:{iPhone:"\\biPhone\\b|\\biPod\\b",BlackBerry:"BlackBerry|\\bBB10\\b|rim[0-9]+",HTC:"HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",Nexus:"Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",Dell:"Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",Motorola:"Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",Samsung:"Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205",LG:"\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802)",Sony:"SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",Asus:"Asus.*Galaxy|PadFone.*Mobile",Micromax:"Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",Palm:"PalmSource|Palm",Vertu:"Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",Pantech:"PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",Fly:"IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",Wiko:"KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",iMobile:"i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",SimValley:"\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",Wolfgang:"AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",Alcatel:"Alcatel",Nintendo:"Nintendo 3DS",Amoi:"Amoi",INQ:"INQ",GenericPhone:"Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"},tablets:{iPad:"iPad|iPad.*Mobile",NexusTablet:"Android.*Nexus[\\s]+(7|9|10)",SamsungTablet:"SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T360|SM-T533",Kindle:"Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b",SurfaceTablet:"Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",HPTablet:"HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",AsusTablet:"^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C",BlackBerryTablet:"PlayBook|RIM Tablet",HTCtablet:"HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",MotorolaTablet:"xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",NookTablet:"Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",AcerTablet:"Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b",ToshibaTablet:"Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",LGTablet:"\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",FujitsuTablet:"Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",PrestigioTablet:"PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",LenovoTablet:"Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",DellTablet:"Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",YarvikTablet:"Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",MedionTablet:"Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",ArnovaTablet:"AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",IntensoTablet:"INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",IRUTablet:"M702pro",MegafonTablet:"MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",EbodaTablet:"E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",AllViewTablet:"Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",ArchosTablet:"\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",AinolTablet:"NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",SonyTablet:"Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",PhilipsTablet:"\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",CubeTablet:"Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",CobyTablet:"MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",MIDTablet:"M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733",MSITablet:"MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",SMiTTablet:"Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",RockChipTablet:"Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",FlyTablet:"IQ310|Fly Vision",bqTablet:"Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",HuaweiTablet:"MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",NecTablet:"\\bN-06D|\\bN-08D",PantechTablet:"Pantech.*P4100",BronchoTablet:"Broncho.*(N701|N708|N802|a710)",VersusTablet:"TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",ZyncTablet:"z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",PositivoTablet:"TB07STA|TB10STA|TB07FTA|TB10FTA",NabiTablet:"Android.*\\bNabi",KoboTablet:"Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",DanewTablet:"DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",TexetTablet:"NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",PlaystationTablet:"Playstation.*(Portable|Vita)",TrekstorTablet:"ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",PyleAudioTablet:"\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",AdvanTablet:"Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",DanyTechTablet:"Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",GalapadTablet:"Android.*\\bG1\\b",MicromaxTablet:"Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",KarbonnTablet:"Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",AllFineTablet:"Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",PROSCANTablet:"\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",YONESTablet:"BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",ChangJiaTablet:"TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",GUTablet:"TX-A1301|TX-M9002|Q702|kf026",PointOfViewTablet:"TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",OvermaxTablet:"OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",HCLTablet:"HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",DPSTablet:"DPS Dream 9|DPS Dual 7",VistureTablet:"V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",CrestaTablet:"CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",MediatekTablet:"\\bMT8125|MT8389|MT8135|MT8377\\b",ConcordeTablet:"Concorde([ ]+)?Tab|ConCorde ReadMan",GoCleverTablet:"GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",ModecomTablet:"FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",VoninoTablet:"\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",ECSTablet:"V07OT2|TM105A|S10OT1|TR10CS1",StorexTablet:"eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",VodafoneTablet:"SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",EssentielBTablet:"Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",RossMoorTablet:"RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",iMobileTablet:"i-mobile i-note",TolinoTablet:"tolino tab [0-9.]+|tolino shine",AudioSonicTablet:"\\bC-22Q|T7-QC|T-17B|T-17P\\b",AMPETablet:"Android.* A78 ",SkkTablet:"Android.* (SKYPAD|PHOENIX|CYCLOPS)",TecnoTablet:"TECNO P9",JXDTablet:"Android.*\\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",iJoyTablet:"Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",FX2Tablet:"FX2 PAD7|FX2 PAD10",XoroTablet:"KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",ViewsonicTablet:"ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",OdysTablet:"LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",CaptivaTablet:"CAPTIVA PAD",IconbitTablet:"NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",TeclastTablet:"T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",OndaTablet:"\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",JaytechTablet:"TPC-PA762",BlaupunktTablet:"Endeavour 800NG|Endeavour 1010",DigmaTablet:"\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",EvolioTablet:"ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",LavaTablet:"QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",CelkonTablet:"CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",WolderTablet:"miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",MiTablet:"\\bMI PAD\\b|\\bHM NOTE 1W\\b",NibiruTablet:"Nibiru M1|Nibiru Jupiter One",NexoTablet:"NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",LeaderTablet:"TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",UbislateTablet:"UbiSlate[\\s]?7C",PocketBookTablet:"Pocketbook",Hudl:"Hudl HT7S3",TelstraTablet:"T-Hub2",GenericTablet:"Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"},oss:{AndroidOS:"Android",BlackBerryOS:"blackberry|\\bBB10\\b|rim tablet os",PalmOS:"PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",SymbianOS:"Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",WindowsMobileOS:"Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",WindowsPhoneOS:"Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",iOS:"\\biPhone.*Mobile|\\biPod|\\biPad",MeeGoOS:"MeeGo",MaemoOS:"Maemo",JavaOS:"J2ME/|\\bMIDP\\b|\\bCLDC\\b",webOS:"webOS|hpwOS",badaOS:"\\bBada\\b",BREWOS:"BREW"},uas:{Chrome:"\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",Dolfin:"\\bDolfin\\b",Opera:"Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",Skyfire:"Skyfire",IE:"IEMobile|MSIEMobile",Firefox:"fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",Bolt:"bolt",TeaShark:"teashark",Blazer:"Blazer",Safari:"Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",Tizen:"Tizen",UCBrowser:"UC.*Browser|UCWEB",baiduboxapp:"baiduboxapp",baidubrowser:"baidubrowser",DiigoBrowser:"DiigoBrowser",Puffin:"Puffin",Mercury:"\\bMercury\\b",ObigoBrowser:"Obigo",NetFront:"NF-Browser",GenericBrowser:"NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger"},props:{Mobile:"Mobile/[VER]",Build:"Build/[VER]",Version:"Version/[VER]",VendorID:"VendorID/[VER]",iPad:"iPad.*CPU[a-z ]+[VER]",iPhone:"iPhone.*CPU[a-z ]+[VER]",iPod:"iPod.*CPU[a-z ]+[VER]",Kindle:"Kindle/[VER]",Chrome:["Chrome/[VER]","CriOS/[VER]","CrMo/[VER]"],Coast:["Coast/[VER]"],Dolfin:"Dolfin/[VER]",Firefox:"Firefox/[VER]",Fennec:"Fennec/[VER]",IE:["IEMobile/[VER];","IEMobile [VER]","MSIE [VER];","Trident/[0-9.]+;.*rv:[VER]"],NetFront:"NetFront/[VER]",NokiaBrowser:"NokiaBrowser/[VER]",Opera:[" OPR/[VER]","Opera Mini/[VER]","Version/[VER]"],"Opera Mini":"Opera Mini/[VER]","Opera Mobi":"Version/[VER]","UC Browser":"UC Browser[VER]",MQQBrowser:"MQQBrowser/[VER]",MicroMessenger:"MicroMessenger/[VER]",baiduboxapp:"baiduboxapp/[VER]",baidubrowser:"baidubrowser/[VER]",Iron:"Iron/[VER]",Safari:["Version/[VER]","Safari/[VER]"],Skyfire:"Skyfire/[VER]",Tizen:"Tizen/[VER]",Webkit:"webkit[ /][VER]",Gecko:"Gecko/[VER]",Trident:"Trident/[VER]",Presto:"Presto/[VER]",iOS:" \\bi?OS\\b [VER][ ;]{1}",Android:"Android [VER]",BlackBerry:["BlackBerry[\\w]+/[VER]","BlackBerry.*Version/[VER]","Version/[VER]"],BREW:"BREW [VER]",Java:"Java/[VER]","Windows Phone OS":["Windows Phone OS [VER]","Windows Phone [VER]"],"Windows Phone":"Windows Phone [VER]","Windows CE":"Windows CE/[VER]","Windows NT":"Windows NT [VER]",Symbian:["SymbianOS/[VER]","Symbian/[VER]"],webOS:["webOS/[VER]","hpwOS/[VER];"]},utils:{Bot:"Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",MobileBot:"Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",DesktopMode:"WPDesktop",TV:"SonyDTV|HbbTV",WebKit:"(webkit)[ /]([\\w.]+)",Console:"\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",Watch:"SM-V700"}},f.detectMobileBrowsers={fullPattern:/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,shortPattern:/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,tabletPattern:/android|ipad|playbook|silk/i};var g,h=Object.prototype.hasOwnProperty;return f.FALLBACK_PHONE="UnknownPhone",f.FALLBACK_TABLET="UnknownTablet",f.FALLBACK_MOBILE="UnknownMobile",g="isArray"in Array?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},function(){var a,b,c,e,i,j,k=f.mobileDetectRules;for(a in k.props)if(h.call(k.props,a)){for(b=k.props[a],g(b)||(b=[b]),i=b.length,e=0;i>e;++e)c=b[e],j=c.indexOf("[VER]"),j>=0&&(c=c.substring(0,j)+"([\\w._\\+]+)"+c.substring(j+5)),b[e]=new RegExp(c,"i");k.props[a]=b}d(k.oss),d(k.phones),d(k.tablets),d(k.uas),d(k.utils),k.oss0={WindowsPhoneOS:k.oss.WindowsPhoneOS,WindowsMobileOS:k.oss.WindowsMobileOS}}(),f.findMatch=function(a,b){for(var c in a)if(h.call(a,c)&&a[c].test(b))return c;return null},f.findMatches=function(a,b){var c=[];for(var d in a)h.call(a,d)&&a[d].test(b)&&c.push(d);return c},f.getVersionStr=function(a,b){var c,d,e,g,i=f.mobileDetectRules.props;if(h.call(i,a))for(c=i[a],e=c.length,d=0;e>d;++d)if(g=c[d].exec(b),null!==g)return g[1];return null},f.getVersion=function(a,b){var c=f.getVersionStr(a,b);return c?f.prepareVersionNo(c):NaN},f.prepareVersionNo=function(a){
    var b;return b=a.split(/[a-z._ \/\-]/i),1===b.length&&(a=b[0]),b.length>1&&(a=b[0]+".",b.shift(),a+=b.join("")),Number(a)},f.isMobileFallback=function(a){return f.detectMobileBrowsers.fullPattern.test(a)||f.detectMobileBrowsers.shortPattern.test(a.substr(0,4))},f.isTabletFallback=function(a){return f.detectMobileBrowsers.tabletPattern.test(a)},f.prepareDetectionCache=function(a,c,d){if(a.mobile===b){var g,h,i;return(h=f.findMatch(f.mobileDetectRules.tablets,c))?(a.mobile=a.tablet=h,void(a.phone=null)):(g=f.findMatch(f.mobileDetectRules.phones,c))?(a.mobile=a.phone=g,void(a.tablet=null)):void(f.isMobileFallback(c)?(i=e.isPhoneSized(d),i===b?(a.mobile=f.FALLBACK_MOBILE,a.tablet=a.phone=null):i?(a.mobile=a.phone=f.FALLBACK_PHONE,a.tablet=null):(a.mobile=a.tablet=f.FALLBACK_TABLET,a.phone=null)):f.isTabletFallback(c)?(a.mobile=a.tablet=f.FALLBACK_TABLET,a.phone=null):a.mobile=a.tablet=a.phone=null)}},f.mobileGrade=function(a){var b=null!==a.mobile();return a.os("iOS")&&a.version("iPad")>=4.3||a.os("iOS")&&a.version("iPhone")>=3.1||a.os("iOS")&&a.version("iPod")>=3.1||a.version("Android")>2.1&&a.is("Webkit")||a.version("Windows Phone OS")>=7||a.is("BlackBerry")&&a.version("BlackBerry")>=6||a.match("Playbook.*Tablet")||a.version("webOS")>=1.4&&a.match("Palm|Pre|Pixi")||a.match("hp.*TouchPad")||a.is("Firefox")&&a.version("Firefox")>=12||a.is("Chrome")&&a.is("AndroidOS")&&a.version("Android")>=4||a.is("Skyfire")&&a.version("Skyfire")>=4.1&&a.is("AndroidOS")&&a.version("Android")>=2.3||a.is("Opera")&&a.version("Opera Mobi")>11&&a.is("AndroidOS")||a.is("MeeGoOS")||a.is("Tizen")||a.is("Dolfin")&&a.version("Bada")>=2||(a.is("UC Browser")||a.is("Dolfin"))&&a.version("Android")>=2.3||a.match("Kindle Fire")||a.is("Kindle")&&a.version("Kindle")>=3||a.is("AndroidOS")&&a.is("NookTablet")||a.version("Chrome")>=11&&!b||a.version("Safari")>=5&&!b||a.version("Firefox")>=4&&!b||a.version("MSIE")>=7&&!b||a.version("Opera")>=10&&!b?"A":a.os("iOS")&&a.version("iPad")<4.3||a.os("iOS")&&a.version("iPhone")<3.1||a.os("iOS")&&a.version("iPod")<3.1||a.is("Blackberry")&&a.version("BlackBerry")>=5&&a.version("BlackBerry")<6||a.version("Opera Mini")>=5&&a.version("Opera Mini")<=6.5&&(a.version("Android")>=2.3||a.is("iOS"))||a.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3")||a.version("Opera Mobi")>=11&&a.is("SymbianOS")?"B":(a.version("BlackBerry")<5||a.match("MSIEMobile|Windows CE.*Mobile")||a.version("Windows Mobile")<=5.2,"C")},f.detectOS=function(a){return f.findMatch(f.mobileDetectRules.oss0,a)||f.findMatch(f.mobileDetectRules.oss,a)},f.getDeviceSmallerSide=function(){return window.screen.width<window.screen.height?window.screen.width:window.screen.height},e.prototype={constructor:e,mobile:function(){return f.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.mobile},phone:function(){return f.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.phone},tablet:function(){return f.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.tablet},userAgent:function(){return this._cache.userAgent===b&&(this._cache.userAgent=f.findMatch(f.mobileDetectRules.uas,this.ua)),this._cache.userAgent},userAgents:function(){return this._cache.userAgents===b&&(this._cache.userAgents=f.findMatches(f.mobileDetectRules.uas,this.ua)),this._cache.userAgents},os:function(){return this._cache.os===b&&(this._cache.os=f.detectOS(this.ua)),this._cache.os},version:function(a){return f.getVersion(a,this.ua)},versionStr:function(a){return f.getVersionStr(a,this.ua)},is:function(b){return c(this.userAgents(),b)||a(b,this.os())||a(b,this.phone())||a(b,this.tablet())||c(f.findMatches(f.mobileDetectRules.utils,this.ua),b)},match:function(a){return a instanceof RegExp||(a=new RegExp(a,"i")),a.test(this.ua)},isPhoneSized:function(a){return e.isPhoneSized(a||this.maxPhoneWidth)},mobileGrade:function(){return this._cache.grade===b&&(this._cache.grade=f.mobileGrade(this)),this._cache.grade}},"undefined"!=typeof window&&window.screen?e.isPhoneSized=function(a){return 0>a?b:f.getDeviceSmallerSide()<=a}:e.isPhoneSized=function(){},e._impl=f,e})}(function(a){return function(a){window.MobileDetect=a()};}());
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
    var module, define;

    /*!
     * EventEmitter v4.2.6 - git.io/ee
     * Oliver Caldwell
     * MIT license
     * @preserve
     */

    (function () {

        /**
         * Class for managing events.
         * Can be extended to provide event functionality in other classes.
         *
         * @class EventEmitter Manages event registering and emitting.
         */
        function EventEmitter() {
        }

        // Shortcuts to improve speed and size
        var proto = EventEmitter.prototype;
        var exports = this;
        var originalGlobalValue = exports.EventEmitter;

        /**
         * Finds the index of the listener for the event in it's storage array.
         *
         * @param {Function[]} listeners Array of listeners to search through.
         * @param {Function} listener Method to look for.
         * @return {Number} Index of the specified listener, -1 if not found
         * @api private
         */
        function indexOfListener(listeners, listener) {
            var i = listeners.length;
            while (i--) {
                if (listeners[i].listener === listener) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * Alias a method while keeping the context correct, to allow for overwriting of target method.
         *
         * @param {String} name The name of the target method.
         * @return {Function} The aliased method
         * @api private
         */
        function alias(name) {
            return function aliasClosure() {
                return this[name].apply(this, arguments);
            };
        }

        /**
         * Returns the listener array for the specified event.
         * Will initialise the event object and listener arrays if required.
         * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
         * Each property in the object response is an array of listener functions.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Function[]|Object} All listener functions for the event.
         */
        proto.getListeners = function getListeners(evt) {
            var events = this._getEvents();
            var response;
            var key;

            // Return a concatenated array of all matching events if
            // the selector is a regular expression.
            if (typeof evt === 'object') {
                response = {};
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        response[key] = events[key];
                    }
                }
            }
            else {
                response = events[evt] || (events[evt] = []);
            }

            return response;
        };

        /**
         * Takes a list of listener objects and flattens it into a list of listener functions.
         *
         * @param {Object[]} listeners Raw listener objects.
         * @return {Function[]} Just the listener functions.
         */
        proto.flattenListeners = function flattenListeners(listeners) {
            var flatListeners = [];
            var i;

            for (i = 0; i < listeners.length; i += 1) {
                flatListeners.push(listeners[i].listener);
            }

            return flatListeners;
        };

        /**
         * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Object} All listener functions for an event in an object.
         */
        proto.getListenersAsObject = function getListenersAsObject(evt) {
            var listeners = this.getListeners(evt);
            var response;

            if (listeners instanceof Array) {
                response = {};
                response[evt] = listeners;
            }

            return response || listeners;
        };

        /**
         * Adds a listener function to the specified event.
         * The listener will not be added if it is a duplicate.
         * If the listener returns true then it will be removed after it is called.
         * If you pass a regular expression as the event name then the listener will be added to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addListener = function addListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var listenerIsWrapped = typeof listener === 'object';
            var key;

            for (key in listeners) {
                if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                    listeners[key].push(listenerIsWrapped ? listener : {
                        listener: listener,
                        once: false
                    });
                }
            }

            return this;
        };

        /**
         * Alias of addListener
         */
        proto.on = alias('addListener');

        /**
         * Semi-alias of addListener. It will add a listener that will be
         * automatically removed after it's first execution.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addOnceListener = function addOnceListener(evt, listener) {
            return this.addListener(evt, {
                listener: listener,
                once: true
            });
        };

        /**
         * Alias of addOnceListener.
         */
        proto.once = alias('addOnceListener');

        /**
         * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
         * You need to tell it what event names should be matched by a regex.
         *
         * @param {String} evt Name of the event to create.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.defineEvent = function defineEvent(evt) {
            this.getListeners(evt);
            return this;
        };

        /**
         * Uses defineEvent to define multiple events.
         *
         * @param {String[]} evts An array of event names to define.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.defineEvents = function defineEvents(evts) {
            for (var i = 0; i < evts.length; i += 1) {
                this.defineEvent(evts[i]);
            }
            return this;
        };

        /**
         * Removes a listener function from the specified event.
         * When passed a regular expression as the event name, it will remove the listener from all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to remove the listener from.
         * @param {Function} listener Method to remove from the event.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeListener = function removeListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var index;
            var key;

            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    index = indexOfListener(listeners[key], listener);

                    if (index !== -1) {
                        listeners[key].splice(index, 1);
                    }
                }
            }

            return this;
        };

        /**
         * Alias of removeListener
         */
        proto.off = alias('removeListener');

        /**
         * Adds listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
         * You can also pass it a regular expression to add the array of listeners to all events that match it.
         * Yeah, this function does quite a bit. That's probably a bad thing.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addListeners = function addListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(false, evt, listeners);
        };

        /**
         * Removes listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be removed.
         * You can also pass it a regular expression to remove the listeners from all events that match it.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeListeners = function removeListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(true, evt, listeners);
        };

        /**
         * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
         * The first argument will determine if the listeners are removed (true) or added (false).
         * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be added/removed.
         * You can also pass it a regular expression to manipulate the listeners of all events that match it.
         *
         * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
            var i;
            var value;
            var single = remove ? this.removeListener : this.addListener;
            var multiple = remove ? this.removeListeners : this.addListeners;

            // If evt is an object then pass each of it's properties to this method
            if (typeof evt === 'object' && !(evt instanceof RegExp)) {
                for (i in evt) {
                    if (evt.hasOwnProperty(i) && (value = evt[i])) {
                        // Pass the single listener straight through to the singular method
                        if (typeof value === 'function') {
                            single.call(this, i, value);
                        }
                        else {
                            // Otherwise pass back to the multiple function
                            multiple.call(this, i, value);
                        }
                    }
                }
            }
            else {
                // So evt must be a string
                // And listeners must be an array of listeners
                // Loop over it and pass each one to the multiple method
                i = listeners.length;
                while (i--) {
                    single.call(this, evt, listeners[i]);
                }
            }

            return this;
        };

        /**
         * Removes all listeners from a specified event.
         * If you do not specify an event then all listeners will be removed.
         * That means every event will be emptied.
         * You can also pass a regex to remove all events that match it.
         *
         * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeEvent = function removeEvent(evt) {
            var type = typeof evt;
            var events = this._getEvents();
            var key;

            // Remove different things depending on the state of evt
            if (type === 'string') {
                // Remove all listeners for the specified event
                delete events[evt];
            }
            else if (type === 'object') {
                // Remove all events matching the regex.
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        delete events[key];
                    }
                }
            }
            else {
                // Remove all listeners in all events
                delete this._events;
            }

            return this;
        };

        /**
         * Alias of removeEvent.
         *
         * Added to mirror the node API.
         */
        proto.removeAllListeners = alias('removeEvent');

        /**
         * Emits an event of your choice.
         * When emitted, every listener attached to that event will be executed.
         * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
         * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
         * So they will not arrive within the array on the other side, they will be separate.
         * You can also pass a regular expression to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {Array} [args] Optional array of arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.emitEvent = function emitEvent(evt, args) {
            var listeners = this.getListenersAsObject(evt);
            var listener;
            var i;
            var key;
            var response;

            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    i = listeners[key].length;

                    while (i--) {
                        // If the listener returns true then it shall be removed from the event
                        // The function is executed either with a basic call or an apply if there is an args array
                        listener = listeners[key][i];

                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }

                        response = listener.listener.apply(this, args || []);

                        if (response === this._getOnceReturnValue()) {
                            this.removeListener(evt, listener.listener);
                        }
                    }
                }
            }

            return this;
        };

        /**
         * Alias of emitEvent
         */
        proto.trigger = alias('emitEvent');

        /**
         * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
         * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {...*} Optional additional arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.emit = function emit(evt) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(evt, args);
        };

        /**
         * Sets the current value to check against when executing listeners. If a
         * listeners return value matches the one set here then it will be removed
         * after execution. This value defaults to true.
         *
         * @param {*} value The new value to check for when executing listeners.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.setOnceReturnValue = function setOnceReturnValue(value) {
            this._onceReturnValue = value;
            return this;
        };

        /**
         * Fetches the current value to check against when executing listeners. If
         * the listeners return value matches this one then it should be removed
         * automatically. It will return true by default.
         *
         * @return {*|Boolean} The current value to check for or the default, true.
         * @api private
         */
        proto._getOnceReturnValue = function _getOnceReturnValue() {
            if (this.hasOwnProperty('_onceReturnValue')) {
                return this._onceReturnValue;
            }
            else {
                return true;
            }
        };

        /**
         * Fetches the events object and creates one if required.
         *
         * @return {Object} The events storage object.
         * @api private
         */
        proto._getEvents = function _getEvents() {
            return this._events || (this._events = {});
        };

        /**
         * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
         *
         * @return {Function} Non conflicting EventEmitter class.
         */
        EventEmitter.noConflict = function noConflict() {
            exports.EventEmitter = originalGlobalValue;
            return EventEmitter;
        };

        // Expose the class either via AMD, CommonJS or the global object
        if (typeof define === 'function' && define.amd) {
            define('eventEmitter/EventEmitter', [], function () {
                return EventEmitter;
            });
        }
        else if (typeof module === 'object' && module.exports) {
            module.exports = EventEmitter;
        }
        else {
            this.EventEmitter = EventEmitter;
        }
    }.call(this));

    /*!
     * eventie v1.0.4
     * event binding helper
     *   eventie.bind( elem, 'click', myFn )
     *   eventie.unbind( elem, 'click', myFn )
     */

    /*jshint browser: true, undef: true, unused: true */
    /*global define: false */

    (function (window) {


        var docElem = document.documentElement;

        var bind = function () {
        };

        function getIEEvent(obj) {
            var event = window.event;
            // add event.target
            event.target = event.target || event.srcElement || obj;
            return event;
        }

        if (docElem.addEventListener) {
            bind = function (obj, type, fn) {
                obj.addEventListener(type, fn, false);
            };
        } else if (docElem.attachEvent) {
            bind = function (obj, type, fn) {
                obj[type + fn] = fn.handleEvent ?
                    function () {
                        var event = getIEEvent(obj);
                        fn.handleEvent.call(fn, event);
                    } :
                    function () {
                        var event = getIEEvent(obj);
                        fn.call(obj, event);
                    };
                obj.attachEvent("on" + type, obj[type + fn]);
            };
        }

        var unbind = function () {
        };

        if (docElem.removeEventListener) {
            unbind = function (obj, type, fn) {
                obj.removeEventListener(type, fn, false);
            };
        } else if (docElem.detachEvent) {
            unbind = function (obj, type, fn) {
                obj.detachEvent("on" + type, obj[type + fn]);
                try {
                    delete obj[type + fn];
                } catch (err) {
                    // can't delete window object properties
                    obj[type + fn] = undefined;
                }
            };
        }

        var eventie = {
            bind: bind,
            unbind: unbind
        };

// transport
        if (typeof define === 'function' && define.amd) {
            // AMD
            define('eventie/eventie', eventie);
        } else {
            // browser global
            window.eventie = eventie;
        }

    })(this);

    /*!
     * imagesLoaded v3.1.8
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */

    (function (window, factory) {
        // universal module definition

        /*global define: false, module: false, require: false */

        if (typeof define === 'function' && define.amd) {
            // AMD
            define([
                'eventEmitter/EventEmitter',
                'eventie/eventie'
            ], function (EventEmitter, eventie) {
                return factory(window, EventEmitter, eventie);
            });
        } else if (typeof exports === 'object') {
            // CommonJS
            module.exports = factory(
                window,
                require('wolfy87-eventemitter'),
                require('eventie')
            );
        } else {
            // browser global
            window.imagesLoaded = factory(
                window,
                window.EventEmitter,
                window.eventie
            );
        }

    })(window,

// --------------------------  factory -------------------------- //

        function factory(window, EventEmitter, eventie) {


            var $ = window.n2;
            var console = window.console;
            var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
            function extend(a, b) {
                for (var prop in b) {
                    a[prop] = b[prop];
                }
                return a;
            }

            var objToString = Object.prototype.toString;

            function isArray(obj) {
                return objToString.call(obj) === '[object Array]';
            }

// turn element or nodeList into an array
            function makeArray(obj) {
                var ary = [];
                if (isArray(obj)) {
                    // use object if already an array
                    ary = obj;
                } else if (typeof obj.length === 'number') {
                    // convert nodeList to array
                    for (var i = 0, len = obj.length; i < len; i++) {
                        ary.push(obj[i]);
                    }
                } else {
                    // array of single index
                    ary.push(obj);
                }
                return ary;
            }

            // -------------------------- imagesLoaded -------------------------- //

            /**
             * @param {Array, Element, NodeList, String} elem
             * @param {Object or Function} options - if function, use as callback
             * @param {Function} onAlways - callback function
             */
            function ImagesLoaded(elem, options, onAlways) {
                // coerce ImagesLoaded() without new, to be new ImagesLoaded()
                if (!( this instanceof ImagesLoaded )) {
                    return new ImagesLoaded(elem, options);
                }
                // use elem as selector string
                if (typeof elem === 'string') {
                    elem = document.querySelectorAll(elem);
                }
                this.elements = makeArray(elem);
                this.options = extend({}, this.options);

                if (typeof options === 'function') {
                    onAlways = options;
                } else {
                    extend(this.options, options);
                }

                if (onAlways) {
                    this.on('always', onAlways);
                }

                this.getImages();

                if ($) {
                    // add jQuery Deferred object
                    this.jqDeferred = new $.Deferred();
                }

                // HACK check async to allow time to bind listeners
                var _this = this;
                setTimeout(function () {
                    _this.check();
                });
            }

            ImagesLoaded.prototype = new EventEmitter();

            ImagesLoaded.prototype.options = {};

            ImagesLoaded.prototype.getImages = function () {
                this.images = [];

                // filter & find items if we have an item selector
                for (var i = 0, len = this.elements.length; i < len; i++) {
                    var elem = this.elements[i];
                    // filter siblings
                    if (elem.nodeName === 'IMG') {
                        this.addImage(elem);
                    }
                    // find children
                    // no non-element nodes, #143
                    var nodeType = elem.nodeType;
                    if (!nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 )) {
                        continue;
                    }
                    var childElems = elem.querySelectorAll('img');
                    // concat childElems to filterFound array
                    for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                        var img = childElems[j];
                        this.addImage(img);
                    }
                }
            };

            /**
             * @param {Image} img
             */
            ImagesLoaded.prototype.addImage = function (img) {
                var loadingImage = new LoadingImage(img);
                this.images.push(loadingImage);
            };

            ImagesLoaded.prototype.check = function () {
                var _this = this;
                var checkedCount = 0;
                var length = this.images.length;
                this.hasAnyBroken = false;
                // complete if no images
                if (!length) {
                    this.complete();
                    return;
                }

                function onConfirm(image, message) {
                    if (_this.options.debug && hasConsole) {
                        console.log(n2.now(), image.img, image.img.naturalWidth, image.img.naturalHeight);
                    }

                    _this.progress(image);
                    checkedCount++;
                    if (checkedCount === length) {
                        _this.complete();
                    }
                    return true; // bind once
                }

                for (var i = 0; i < length; i++) {
                    var loadingImage = this.images[i];
                    loadingImage.on('confirm', onConfirm);
                    loadingImage.check();
                }
            };

            ImagesLoaded.prototype.progress = function (image) {
                this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
                // HACK - Chrome triggers event before object properties have changed. #83
                var _this = this;
                setTimeout(function () {
                    _this.emit('progress', _this, image);
                    if (_this.jqDeferred && _this.jqDeferred.notify) {
                        _this.jqDeferred.notify(_this, image);
                    }
                });
            };

            ImagesLoaded.prototype.complete = function () {
                var eventName = this.hasAnyBroken ? 'fail' : 'done';
                this.isComplete = true;
                var _this = this;
                // HACK - another setTimeout so that confirm happens after progress
                setTimeout(function () {
                    _this.emit(eventName, _this);
                    _this.emit('always', _this);
                    if (_this.jqDeferred) {
                        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
                        _this.jqDeferred[jqMethod](_this);
                    }
                });
            };

            // -------------------------- jquery -------------------------- //

            if ($) {
                $.fn.imagesLoaded = function (options, callback) {
                    var instance = new ImagesLoaded(this, options, callback);
                    return instance.jqDeferred.promise($(this));
                };
            }


            // --------------------------  -------------------------- //

            function LoadingImage(img) {
                this.img = img;
            }

            LoadingImage.prototype = new EventEmitter();

            LoadingImage.prototype.check = function () {
                // first check cached any previous images that have same src
                var resource = cache[this.img.src] || new Resource(this.img.src);
                if (resource.isConfirmed) {
                    this.confirm(resource.isLoaded, 'cached was confirmed');
                    return;
                }

                // If complete is true and browser supports natural sizes,
                // try to check for image status manually.
                if (this.img.complete && this.img.naturalWidth !== undefined) {
                    // report based on naturalWidth
                    this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
                    return;
                }

                // If none of the checks above matched, simulate loading on detached element.
                var _this = this;
                resource.on('confirm', function (resrc, message) {
                    _this.confirm(resrc.isLoaded, message);
                    return true;
                });

                resource.check();
            };

            LoadingImage.prototype.confirm = function (isLoaded, message) {
                this.isLoaded = isLoaded;
                this.emit('confirm', this, message);
            };

            // -------------------------- Resource -------------------------- //

            // Resource checks each src, only once
            // separate class from LoadingImage to prevent memory leaks. See #115

            var cache = {};

            function Resource(src) {
                this.src = src;
                // add to cache
                cache[src] = this;
            }

            Resource.prototype = new EventEmitter();

            Resource.prototype.check = function () {
                // only trigger checking once
                if (this.isChecked) {
                    return;
                }
                // simulate loading on detached element
                var proxyImage = new Image();
                eventie.bind(proxyImage, 'load', this);
                eventie.bind(proxyImage, 'error', this);
                proxyImage.src = this.src;
                // set flag
                this.isChecked = true;
            };

            // ----- events ----- //

            // trigger specified handler for event type
            Resource.prototype.handleEvent = function (event) {
                var method = 'on' + event.type;
                if (this[method]) {
                    this[method](event);
                }
            };

            Resource.prototype.onload = function (event) {
                this.confirm(true, 'onload');
                this.unbindProxyEvents(event);
            };

            Resource.prototype.onerror = function (event) {
                this.confirm(false, 'onerror');
                this.unbindProxyEvents(event);
            };

            // ----- confirm ----- //

            Resource.prototype.confirm = function (isLoaded, message) {
                this.isConfirmed = true;
                this.isLoaded = isLoaded;
                this.emit('confirm', this, message);

            };

            Resource.prototype.unbindProxyEvents = function (event) {
                eventie.unbind(event.target, 'load', this);
                eventie.unbind(event.target, 'error', this);
            };

            // -----  ----- //

            return ImagesLoaded;

        });
})();
;
(function ($, window, document, undefined) {
//	LiteBox v1.3, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	===============================================================================
    var pluginName = 'liteBox',
        defaults = {
            revealSpeed: 400,
            background: 'rgba(0,0,0,.8)',
            overlayClose: true,
            escKey: true,
            navKey: true,
            closeTip: 'tip-l-fade',
            closeTipText: 'Close',
            prevTip: 'tip-t-fade',
            prevTipText: 'Previous',
            nextTip: 'tip-t-fade',
            nextTipText: 'Next',
            autoplay: false,
            callbackInit: function () {
            },
            callbackBeforeOpen: function () {
            },
            callbackAfterOpen: function () {
            },
            callbackBeforeClose: function () {
            },
            callbackAfterClose: function () {
            },
            callbackError: function () {
            },
            callbackPrev: function () {
            },
            callbackNext: function () {
            },
            errorMessage: 'Error loading content.'
        };

    function liteBox(element, options) {
        this.element = element;
        this.$element = $(this.element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    function winHeight() {
        return window.innerHeight ? window.innerHeight : $(window).height();
    }

    function preloadImageArray(images) {
        $(images).each(function () {
            var image = new Image();

            image.src = this;

            if (image.width > 0)
                $('<img />').attr('src', this).addClass('litebox-preload').appendTo('body').hide();
        });
    }

    liteBox.prototype = {
        init: function () {
            // Variables
            var $this = this;

            // Element click
            this.$element.on('click', function (e) {
                e.preventDefault();
                $this.openLitebox();
            });

            // Callback
            this.options.callbackInit.call(this);
        },

        openLitebox: function () {
            // Variables
            var $this = this;

            // Before callback
            this.options.callbackBeforeOpen.call(this);

            // Build
            $this.buildLitebox();

            // Populate
            var link = this.$element;
            $this.populateLitebox(link);

            // Interactions
            if ($this.options.overlayClose)
                $litebox.on('click', function (e) {
                    if (e.target === this || $(e.target).hasClass('litebox-container') || $(e.target).hasClass('litebox-error'))
                        $this.closeLitebox();
                });

            $close.on('click', function () {
                $this.closeLitebox();
            });

            // Groups
            if (this.$element.attr('data-litebox-group')) {
                var $this = this,
                    groupName = this.$element.attr('data-litebox-group'),
                    group = $('[data-litebox-group="' + this.$element.attr('data-litebox-group') + '"]');

                var imageArray = [];

                $('[data-litebox-group="' + groupName + '"]').each(function () {
                    var src = $(this).attr('href') || $(this).data('href');

                    imageArray.push(src);
                });

                preloadImageArray(imageArray);

                $('.litebox-nav').show();

                $prevNav.off('click').on('click', function () {
                    $this.options.callbackPrev.call(this);

                    var index = group.index(link);

                    link = group.eq(index - 1);

                    if (!$(link).length)
                        link = group.last();

                    $this.populateLitebox(link);
                });

                $nextNav.off('click').on('click', function () {
                    $this.options.callbackNext.call(this);

                    var index = group.index(link);

                    link = group.eq(index + 1);

                    if (!$(link).length)
                        link = group.first();

                    $this.populateLitebox(link);

                    $this.startAutoplay();
                });
            }

            // Interaction
            var keyEsc = 27,
                keyLeft = 37,
                keyRight = 39;

            $('body').on('keydown.litebox', function (e) {
                if ($this.options.escKey && e.keyCode == keyEsc) {
                    e.stopImmediatePropagation();
                    $this.closeLitebox();
                }

                if ($this.options.navKey && e.keyCode == keyLeft) {
                    e.stopImmediatePropagation();
                    $('.litebox-prev').trigger('click');
                }

                if ($this.options.navKey && e.keyCode == keyRight) {
                    e.stopImmediatePropagation();
                    $('.litebox-next').trigger('click');
                }
            });

            this.startAutoplay();
            // After callback
            this.options.callbackAfterOpen.call(this);
        },

        startAutoplay: function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            if (this.options.autoplay) {
                var $this = this;
                this.timeout = setTimeout(function () {
                    $('.litebox-next').trigger('click');
                }, this.options.autoplay);
            }
        },

        buildLitebox: function () {
            // Variables
            var $this = this;

            $litebox = $('<div>', {'class': 'litebox-overlay'}),
                $close = $('<div>', {
                    'class': 'litebox-close ' + this.options.closeTip,
                    'data-tooltip': this.options.closeTipText
                }),
                $text = $('<div>', {'class': 'litebox-text'}),
                $error = $('<div class="litebox-error"><span>' + this.options.errorMessage + '</span></div>'),
                $prevNav = $('<div>', {
                    'class': 'litebox-nav litebox-prev ' + this.options.prevTip,
                    'data-tooltip': this.options.prevTipText
                }),
                $nextNav = $('<div>', {
                    'class': 'litebox-nav litebox-next ' + this.options.nextTip,
                    'data-tooltip': this.options.nextTipText
                }),
                $container = $('<div>', {'class': 'litebox-container'}),
                $loader = $('<div>', {'class': 'litebox-loader'});

            // Insert into document
            $('body').prepend($litebox.css({'background-color': this.options.background}));

            $litebox.append($close, $text, $prevNav, $nextNav, $container);

            $litebox.fadeIn(this.options.revealSpeed);
        },

        populateLitebox: function (link) {
            // Variables
            var $this = this,
                href = link.attr('href') || link.data('href'),
                $currentContent = $('.litebox-content');

            this.options.autoplay = link.data('autoplay') || this.options.autoplay;

            // Show loader
            $litebox.append($loader);

            // Show image description
            var $text = link.attr('data-litebox-text');

            if (typeof $text == 'undefined' || $text == '') {
                $('.litebox-text').removeClass('active');
                $('.litebox-text').html();
            } else {
                $('.litebox-text').html($text);
                $('.litebox-text').addClass('active');
            }

            // Process
            if (href.match(/\.(jpeg|jpg|gif|png|bmp)/i) !== null) {
                var $img = $('<img>', {'src': href, 'class': 'litebox-content'});

                $this.transitionContent('image', $currentContent, $img);

                $('img.litebox-content').imagesLoaded(function () {
                    $loader.remove();
                });

                $img.error(function () {
                    $this.liteboxError();
                    $loader.remove();
                });
            } else if (videoURL = href.match(/(youtube|youtu|vimeo|dailymotion|kickstarter)\.(com|be)\/((watch\?v=([-\w]+))|(video\/([-\w]+))|(projects\/([-\w]+)\/([-\w]+))|([-\w]+))/)) {
                var src = '';

                if (videoURL[1] == 'youtube')
                    src = 'https://www.youtube.com/embed/' + videoURL[5] + '?fs=1&amp;wmode=opaque&amp;autoplay=1';

                if (videoURL[1] == 'youtu')
                    src = 'https://www.youtube.com/embed/' + videoURL[3] + '?fs=1&amp;wmode=opaque&amp;autoplay=1';

                if (videoURL[1] == 'vimeo')
                    src = 'http://player.vimeo.com/video/' + videoURL[3] + '?autoplay=1';

                if (videoURL[1] == 'dailymotion')
                    src = 'https://www.dailymotion.com/embed/video/' + videoURL[7];

                if (videoURL[1] == 'kickstarter')
                    src = 'https://www.kickstarter.com/projects/' + videoURL[9] + '/' + videoURL[10] + '/widget/video.html';

                if (src) {
                    var $iframe = $('<iframe>', {
                        'frameborder': '0',
                        'vspace': '0',
                        'hspace': '0',
                        'scrolling': 'no',
                        'allowfullscreen': '',
                        'class': 'litebox-content',
                        'style': 'background: #000',
                        'seamless': 'seamless'
                    });

                    $this.transitionContent('embed', $currentContent, $iframe);

                    $iframe.attr('src', src);

                    $iframe.load(function () {
                        $loader.remove();
                    });
                }
            } else if (href.substring(0, 1) == '#') {
                if ($(href).length) {
                    $html = $('<div>', {'class': 'litebox-content litebox-inline-html'});

                    $html.append($(href).clone());

                    $this.transitionContent('inline', $currentContent, $html);
                } else {
                    $this.liteboxError();
                }

                $loader.remove();
            } else {
                var $iframe = $('<iframe>', {
                    'src': href,
                    'frameborder': '0',
                    'vspace': '0',
                    'hspace': '0',
                    'scrolling': 'auto',
                    'class': 'litebox-content',
                    'allowfullscreen': ''
                });

                $this.transitionContent('iframe', $currentContent, $iframe);

                $iframe.load(function () {
                    $loader.remove();
                });
            }
        },

        transitionContent: function (type, $currentContent, $newContent) {
            // Variables
            var $this = this;

            if (type != 'inline')
                $container.removeClass('litebox-scroll');

            // Transition
            $currentContent.remove();
            $container.append($newContent);

            if (type == 'inline')
                $container.addClass('litebox-scroll');

            $this.centerContent();

            $(window).on('resize', function () {
                $this.centerContent();
            });
        },

        centerContent: function () {
            // Overlay to viewport
            $litebox.css({'height': winHeight()});

            // Images
            $container.css({'line-height': $container.height() + 'px'});

            // Inline
            if (typeof $html != 'undefined' && $('.litebox-inline-html').outerHeight() < $container.height())
                $('.litebox-inline-html').css({
                    'margin-top': '-' + ($('.litebox-inline-html').outerHeight()) / 2 + 'px',
                    'top': '50%'
                });
        },

        closeLitebox: function () {
            // Before callback
            this.options.callbackBeforeClose.call(this);

            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            // Remove
            $litebox.fadeOut(this.options.revealSpeed, function () {
                $('.litebox-nav').hide();
                $litebox.empty().remove();
                $('.litebox-preload').remove();
            });

            $('.tipsy').fadeOut(this.options.revealSpeed, function () {
                $(this).remove();
            });

            // Remove click handlers
            $('.litebox-prev').off('click');
            $('.litebox-next').off('click');

            $('body').off('.litebox');

            // After callback
            this.options.callbackAfterClose.call(this);
        },

        liteboxError: function () {
            this.options.callbackError.call(this);

            $container.append($error);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName))
                $.data(this, pluginName, new liteBox(this, options));
        });
    };

})(n2, window, document);
(function ($) {
    $.event.special.universalclick = {
        add: function (handleObj) {
            var el = $(this),
                _suppress = false,
                _suppressTimeout = null,
                suppress = function () {
                    _suppress = true;
                    if (_suppressTimeout) {
                        clearTimeout(_suppressTimeout);
                    }
                    _suppressTimeout = setTimeout(function () {
                        _suppress = false;
                    }, 400);
                };

            el.on('touchend.universalclick click.universalclick', function (e) {
                if (!_suppress) {
                    suppress();
                    handleObj.handler.apply(this, arguments);
                }

            });
        },

        remove: function (handleObj) {
            $(this).off('.universalclick');
        }
    };

    var touchElements = [];
    var globalTouchWatched = false;
    var watchGlobalTouch = function () {
            if (!globalTouchWatched) {
                globalTouchWatched = true;
                $('body').on('touchstart.universaltouch', function (e) {
                    var target = $(e.target);
                    for (var i = touchElements.length - 1; i >= 0; i--) {
                        if (!touchElements[i].is(target) && touchElements[i].find(target).length == 0) {
                            touchElements[i].trigger('universal_leave');
                        }
                    }
                });
            }
        }, unWatchGlobalTouch = function () {
            if (globalTouchWatched) {
                $('body').off('.universaltouch');
                globalTouchWatched = false;
            }
        },
        addTouchElement = function (el) {
            if ($.inArray(el, touchElements) == -1) {
                touchElements.push(el);
            }
            if (touchElements.length == 1) {
                watchGlobalTouch();
            }
        },
        removeTouchElement = function (el) {
            var i = $.inArray(el, touchElements)
            if (i >= 0) {
                touchElements.splice(i, 1);
                if (touchElements.length == 0) {
                    unWatchGlobalTouch();
                }
            }
        };

    $.event.special.universalenter = {
        add: function (handleObj) {

            var el = $(this),
                _suppress = false,
                _suppressTimeout = null,
                suppress = function () {
                    _suppress = true;
                    if (_suppressTimeout) {
                        clearTimeout(_suppressTimeout);
                        _suppressTimeout = null;
                    }
                    _suppressTimeout = setTimeout(function () {
                        _suppress = false;
                    }, 400);
                };

            var leaveOnSecond = false;
            if (handleObj.data) {
                leaveOnSecond = handleObj.data.leaveOnSecond;
            }

            var touchTimeout = null;

            el.on('universal_leave.universalenter', function (e) {
                e.stopPropagation();
                clearTimeout(touchTimeout);
                touchTimeout = null;
                removeTouchElement(el);
                el.trigger('universalleave');
            }).on('touchstart.universalenter mouseenter.universalenter', function (e) {
                if (!_suppress) {
                    suppress();
                    if (e.type == 'touchstart') {
                        if (leaveOnSecond) {
                            if (touchTimeout) {
                                el.trigger('universal_leave');
                            } else {
                                addTouchElement(el);
                                handleObj.handler.apply(this, arguments);
                                touchTimeout = setTimeout(function () {
                                    el.trigger('universal_leave');
                                }, 5000);
                            }
                        } else {
                            if (touchTimeout) {
                                clearTimeout(touchTimeout);
                                touchTimeout = null;
                            }

                            addTouchElement(el);

                            handleObj.handler.apply(this, arguments);
                            touchTimeout = setTimeout(function () {
                                el.trigger('universal_leave');
                            }, 5000);

                        }
                    } else {
                        handleObj.handler.apply(this, arguments);
                        el.on('mouseleave.universalleave', function () {
                            el.off('.universalleave')
                                .trigger('universalleave');
                        });
                    }
                }
            });
        },

        remove: function (handleObj) {
            $(this).off('.universalenter .universalleave');
        }
    };
})(n2);
(function (jQuery, $) {
    /*
     * @fileOverview TouchSwipe - jQuery Plugin
     * @version 1.6.12
     *
     * @author Matt Bryson http://www.github.com/mattbryson
     * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
     * @see http://labs.rampinteractive.co.uk/touchSwipe/
     * @see http://plugins.jquery.com/project/touchSwipe
     *
     * Copyright (c) 2010-2015 Matt Bryson
     * Dual licensed under the MIT or GPL Version 2 licenses.
     *
     */

    /*
     *
     * Changelog
     * $Date: 2010-12-12 (Wed, 12 Dec 2010) $
     * $version: 1.0.0
     * $version: 1.0.1 - removed multibyte comments
     *
     * $Date: 2011-21-02 (Mon, 21 Feb 2011) $
     * $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
     *					- changed handler signatures so one handler can be used for multiple events
     * $Date: 2011-23-02 (Wed, 23 Feb 2011) $
     * $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
     *					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
     * $version: 1.2.1 	- removed console log!
     *
     * $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods.
     *
     * $Date: 2011-28-04 (Thurs, 28 April 2011) $
     * $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
     *
     * $Date: 2011-27-09 (Tues, 27 September 2011) $
     * $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
     *
     * $Date: 2012-14-05 (Mon, 14 May 2012) $
     * $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
     *
     * $Date: 2012-05-06 (Tues, 05 June 2012) $
     * $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
     *
     * $Date: 2012-05-06 (Tues, 05 June 2012) $
     * $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
     *
     * $Date: 2012-06-06 (Wed, 06 June 2012) $
     * $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
     *
     * $Date: 2012-05-06 (Fri, 05 June 2012) $
     * $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
     *
     * $Date: 2012-29-07 (Sun, 29 July 2012) $
     * $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
     * 			- Added "all" fingers value to the fingers property, so any combination of fingers triggers the swipe, allowing event handlers to check the finger count
     *
     * $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
     * $version: 1.3.3	- Code tidy prep for minefied version
     *
     * $Date: 2012-04-10 (wed, 4 Oct 2012) $
     * $version: 1.4.0	- Added pinch support, pinchIn and pinchOut
     *
     * $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
     * $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
     *
     * $Date: 2012-22-10 (Mon, 22 Oct 2012) $
     * $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
     *					- Fixed bug with IE and eventPreventDefault()
     * $Date: 2013-01-12 (Fri, 12 Jan 2013) $
     * $version: 1.6.0	- Fixed bugs with pinching, mainly when both pinch and swipe enabled, as well as adding time threshold for multifinger gestures, so releasing one finger beofre the other doesnt trigger as single finger gesture.
     *					- made the demo site all static local HTML pages so they can be run locally by a developer
     *					- added jsDoc comments and added documentation for the plugin
     *					- code tidy
     *					- added triggerOnTouchLeave property that will end the event when the user swipes off the element.
     * $Date: 2013-03-23 (Sat, 23 Mar 2013) $
     * $version: 1.6.1	- Added support for ie8 touch events
     * $version: 1.6.2	- Added support for events binding with on / off / bind in jQ for all callback names.
     *                   - Deprecated the 'click' handler in favour of tap.
     *                   - added cancelThreshold property
     *                   - added option method to update init options at runtime
     * $version 1.6.3    - added doubletap, longtap events and longTapThreshold, doubleTapThreshold property
     *
     * $Date: 2013-04-04 (Thurs, 04 April 2013) $
     * $version 1.6.4    - Fixed bug with cancelThreshold introduced in 1.6.3, where swipe status no longer fired start event, and stopped once swiping back.
     *
     * $Date: 2013-08-24 (Sat, 24 Aug 2013) $
     * $version 1.6.5    - Merged a few pull requests fixing various bugs, added AMD support.
     *
     * $Date: 2014-06-04 (Wed, 04 June 2014) $
     * $version 1.6.6 	- Merge of pull requests.
     *    				- IE10 touch support
     *    				- Only prevent default event handling on valid swipe
     *    				- Separate license/changelog comment
     *    				- Detect if the swipe is valid at the end of the touch event.
     *    				- Pass fingerdata to event handlers.
     *    				- Add 'hold' gesture
     *    				- Be more tolerant about the tap distance
     *    				- Typos and minor fixes
     *
     * $Date: 2015-22-01 (Thurs, 22 Jan 2015) $
     * $version 1.6.7    - Added patch from https://github.com/mattbryson/TouchSwipe-Jquery-Plugin/issues/206 to fix memory leak
     *
     * $Date: 2015-2-2 (Mon, 2 Feb 2015) $
     * $version 1.6.8    - Added preventDefaultEvents option to proxy events regardless.
     *					- Fixed issue with swipe and pinch not triggering at the same time
     *
     * $Date: 2015-9-6 (Tues, 9 June 2015) $
     * $version 1.6.9    - Added PR from jdalton/hybrid to fix pointer events
     *					- Added scrolling demo
     *					- Added version property to plugin
     *
     * $Date: 2015-1-10 (Wed, 1 October 2015) $
     * $version 1.6.10    - Added PR from beatspace to fix tap events
     * $version 1.6.11    - Added PRs from indri-indri ( Doc tidyup), kkirsche ( Bower tidy up ), UziTech (preventDefaultEvents fixes )
     *					 - Allowed setting multiple options via .swipe("options", options_hash) and more simply .swipe(options_hash) or exisitng instances
     * $version 1.6.12    - Fixed bug with multi finger releases above 2 not triggering events
     */

    /**
     * See (http://jquery.com/).
     * @name $
     * @class
     * See the jQuery Library  (http://jquery.com/) for full details.  This just
     * documents the function and classes that are added to jQuery by this plug-in.
     */

    /**
     * See (http://jquery.com/)
     * @name fn
     * @class
     * See the jQuery Library  (http://jquery.com/) for full details.  This just
     * documents the function and classes that are added to jQuery by this plug-in.
     * @memberOf $
     */



    (function (factory) {
        if (typeof define === 'function' && define.amd && define.amd.jQuery) {
            // AMD. Register as anonymous module.
            define(['jquery'], factory);
        } else {
            // Browser globals.
            factory(jQuery);
        }
    }(function ($) {
        "use strict";

        //Constants
        var VERSION = "1.6.12",
            LEFT = "left",
            RIGHT = "right",
            UP = "up",
            DOWN = "down",
            IN = "in",
            OUT = "out",

            NONE = "none",
            AUTO = "auto",

            SWIPE = "swipe",
            PINCH = "pinch",
            TAP = "tap",
            DOUBLE_TAP = "doubletap",
            LONG_TAP = "longtap",
            HOLD = "hold",

            HORIZONTAL = "horizontal",
            VERTICAL = "vertical",

            ALL_FINGERS = "all",

            DOUBLE_TAP_THRESHOLD = 10,

            PHASE_START = "start",
            PHASE_MOVE = "move",
            PHASE_END = "end",
            PHASE_CANCEL = "cancel",

            SUPPORTS_TOUCH = 'ontouchstart' in window,

            SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,

            SUPPORTS_POINTER = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,

            PLUGIN_NS = 'TouchSwipe';


        /**
         * The default configuration, and available options to configure touch swipe with.
         * You can set the default values by updating any of the properties prior to instantiation.
         * @name $.fn.swipe.defaults
         * @namespace
         * @property {int} [fingers=1] The number of fingers to detect in a swipe. Any swipes that do not meet this requirement will NOT trigger swipe handlers.
         * @property {int} [threshold=75] The number of pixels that the user must move their finger by before it is considered a swipe.
         * @property {int} [cancelThreshold=null] The number of pixels that the user must move their finger back from the original swipe direction to cancel the gesture.
         * @property {int} [pinchThreshold=20] The number of pixels that the user must pinch their finger by before it is considered a pinch.
         * @property {int} [maxTimeThreshold=null] Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe.
         * @property {int} [fingerReleaseThreshold=250] Time in milliseconds between releasing multiple fingers.  If 2 fingers are down, and are released one after the other, if they are within this threshold, it counts as a simultaneous release.
         * @property {int} [longTapThreshold=500] Time in milliseconds between tap and release for a long tap
         * @property {int} [doubleTapThreshold=200] Time in milliseconds between 2 taps to count as a double tap
         * @property {function} [swipe=null] A handler to catch all swipes. See {@link $.fn.swipe#event:swipe}
         * @property {function} [swipeLeft=null] A handler that is triggered for "left" swipes. See {@link $.fn.swipe#event:swipeLeft}
         * @property {function} [swipeRight=null] A handler that is triggered for "right" swipes. See {@link $.fn.swipe#event:swipeRight}
         * @property {function} [swipeUp=null] A handler that is triggered for "up" swipes. See {@link $.fn.swipe#event:swipeUp}
         * @property {function} [swipeDown=null] A handler that is triggered for "down" swipes. See {@link $.fn.swipe#event:swipeDown}
         * @property {function} [swipeStatus=null] A handler triggered for every phase of the swipe. See {@link $.fn.swipe#event:swipeStatus}
         * @property {function} [pinchIn=null] A handler triggered for pinch in events. See {@link $.fn.swipe#event:pinchIn}
         * @property {function} [pinchOut=null] A handler triggered for pinch out events. See {@link $.fn.swipe#event:pinchOut}
         * @property {function} [pinchStatus=null] A handler triggered for every phase of a pinch. See {@link $.fn.swipe#event:pinchStatus}
         * @property {function} [tap=null] A handler triggered when a user just taps on the item, rather than swipes it. If they do not move, tap is triggered, if they do move, it is not.
         * @property {function} [doubleTap=null] A handler triggered when a user double taps on the item. The delay between taps can be set with the doubleTapThreshold property. See {@link $.fn.swipe.defaults#doubleTapThreshold}
         * @property {function} [longTap=null] A handler triggered when a user long taps on the item. The delay between start and end can be set with the longTapThreshold property. See {@link $.fn.swipe.defaults#longTapThreshold}
         * @property (function) [hold=null] A handler triggered when a user reaches longTapThreshold on the item. See {@link $.fn.swipe.defaults#longTapThreshold}
         * @property {boolean} [triggerOnTouchEnd=true] If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
         * @property {boolean} [triggerOnTouchLeave=false] If true, then when the user leaves the swipe object, the swipe will end and trigger appropriate handlers.
         * @property {string|undefined} [allowPageScroll='auto'] How the browser handles page scrolls when the user is swiping on a touchSwipe object. See {@link $.fn.swipe.pageScroll}.  <br/><br/>
         <code>"auto"</code> : all undefined swipes will cause the page to scroll in that direction. <br/>
         <code>"none"</code> : the page will not scroll when user swipes. <br/>
         <code>"horizontal"</code> : will force page to scroll on horizontal swipes. <br/>
         <code>"vertical"</code> : will force page to scroll on vertical swipes. <br/>
         * @property {boolean} [fallbackToMouseEvents=true] If true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices.
         * @property {string} [excludedElements="button, input, select, textarea, a, .noSwipe"] A jquery selector that specifies child elements that do NOT trigger swipes. By default this excludes all form, input, select, button, anchor and .noSwipe elements.
         * @property {boolean} [preventDefaultEvents=true] by default default events are cancelled, so the page doesn't move.  You can dissable this so both native events fire as well as your handlers.

         */
        var defaults = {
            fingers: 1,
            threshold: 75,
            cancelThreshold: null,
            pinchThreshold: 20,
            maxTimeThreshold: null,
            fingerReleaseThreshold: 250,
            longTapThreshold: 500,
            doubleTapThreshold: 200,
            swipe: null,
            swipeLeft: null,
            swipeRight: null,
            swipeUp: null,
            swipeDown: null,
            swipeStatus: null,
            pinchIn: null,
            pinchOut: null,
            pinchStatus: null,
            click: null, //Deprecated since 1.6.2
            tap: null,
            doubleTap: null,
            longTap: null,
            hold: null,
            triggerOnTouchEnd: true,
            triggerOnTouchLeave: false,
            allowPageScroll: "auto",
            fallbackToMouseEvents: true,
            excludedElements: "label, button, input, select, textarea, a, .noSwipe",
            preventDefaultEvents: true,
            axis: 'all' // horizontal|vertical|all
        };


        /**
         * Applies TouchSwipe behaviour to one or more jQuery objects.
         * The TouchSwipe plugin can be instantiated via this method, or methods within
         * TouchSwipe can be executed via this method as per jQuery plugin architecture.
         * An existing plugin can have its options changed simply by re calling .swipe(options)
         * @see TouchSwipe
         * @class
         * @param {Mixed} method If the current DOMNode is a TouchSwipe object, and <code>method</code> is a TouchSwipe method, then
         * the <code>method</code> is executed, and any following arguments are passed to the TouchSwipe method.
         * If <code>method</code> is an object, then the TouchSwipe class is instantiated on the current DOMNode, passing the
         * configuration properties defined in the object. See TouchSwipe
         *
         */
        $.fn.swipe = function (method) {
            var $this = $(this),
                plugin = $this.data(PLUGIN_NS);

            //Check if we are already instantiated and trying to execute a method
            if (plugin && typeof method === 'string') {
                if (plugin[method]) {
                    return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    $.error('Method ' + method + ' does not exist on jQuery.swipe');
                }
            }

            //Else update existing plugin with new options hash
            else if (plugin && typeof method === 'object') {
                plugin['option'].apply(this, arguments);
            }

            //Else not instantiated and trying to pass init object (or nothing)
            else if (!plugin && (typeof method === 'object' || !method)) {
                return init.apply(this, arguments);
            }

            return $this;
        };

        /**
         * The version of the plugin
         * @readonly
         */
        $.fn.swipe.version = VERSION;


        //Expose our defaults so a user could override the plugin defaults
        $.fn.swipe.defaults = defaults;

        /**
         * The phases that a touch event goes through.  The <code>phase</code> is passed to the event handlers.
         * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
         * @namespace
         * @readonly
         * @property {string} PHASE_START Constant indicating the start phase of the touch event. Value is <code>"start"</code>.
         * @property {string} PHASE_MOVE Constant indicating the move phase of the touch event. Value is <code>"move"</code>.
         * @property {string} PHASE_END Constant indicating the end phase of the touch event. Value is <code>"end"</code>.
         * @property {string} PHASE_CANCEL Constant indicating the cancel phase of the touch event. Value is <code>"cancel"</code>.
         */
        $.fn.swipe.phases = {
            PHASE_START: PHASE_START,
            PHASE_MOVE: PHASE_MOVE,
            PHASE_END: PHASE_END,
            PHASE_CANCEL: PHASE_CANCEL
        };

        /**
         * The direction constants that are passed to the event handlers.
         * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
         * @namespace
         * @readonly
         * @property {string} LEFT Constant indicating the left direction. Value is <code>"left"</code>.
         * @property {string} RIGHT Constant indicating the right direction. Value is <code>"right"</code>.
         * @property {string} UP Constant indicating the up direction. Value is <code>"up"</code>.
         * @property {string} DOWN Constant indicating the down direction. Value is <code>"cancel"</code>.
         * @property {string} IN Constant indicating the in direction. Value is <code>"in"</code>.
         * @property {string} OUT Constant indicating the out direction. Value is <code>"out"</code>.
         */
        $.fn.swipe.directions = {
            LEFT: LEFT,
            RIGHT: RIGHT,
            UP: UP,
            DOWN: DOWN,
            IN: IN,
            OUT: OUT
        };

        /**
         * The page scroll constants that can be used to set the value of <code>allowPageScroll</code> option
         * These properties are read only
         * @namespace
         * @readonly
         * @see $.fn.swipe.defaults#allowPageScroll
         * @property {string} NONE Constant indicating no page scrolling is allowed. Value is <code>"none"</code>.
         * @property {string} HORIZONTAL Constant indicating horizontal page scrolling is allowed. Value is <code>"horizontal"</code>.
         * @property {string} VERTICAL Constant indicating vertical page scrolling is allowed. Value is <code>"vertical"</code>.
         * @property {string} AUTO Constant indicating either horizontal or vertical will be allowed, depending on the swipe handlers registered. Value is <code>"auto"</code>.
         */
        $.fn.swipe.pageScroll = {
            NONE: NONE,
            HORIZONTAL: HORIZONTAL,
            VERTICAL: VERTICAL,
            AUTO: AUTO
        };

        /**
         * Constants representing the number of fingers used in a swipe.  These are used to set both the value of <code>fingers</code> in the
         * options object, as well as the value of the <code>fingers</code> event property.
         * These properties are read only, attempting to change them will not alter the values passed to the event handlers.
         * @namespace
         * @readonly
         * @see $.fn.swipe.defaults#fingers
         * @property {string} ONE Constant indicating 1 finger is to be detected / was detected. Value is <code>1</code>.
         * @property {string} TWO Constant indicating 2 fingers are to be detected / were detected. Value is <code>2</code>.
         * @property {string} THREE Constant indicating 3 finger are to be detected / were detected. Value is <code>3</code>.
         * @property {string} FOUR Constant indicating 4 finger are to be detected / were detected. Not all devices support this. Value is <code>4</code>.
         * @property {string} FIVE Constant indicating 5 finger are to be detected / were detected. Not all devices support this. Value is <code>5</code>.
         * @property {string} ALL Constant indicating any combination of finger are to be detected.  Value is <code>"all"</code>.
         */
        $.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            FOUR: 4,
            FIVE: 5,
            ALL: ALL_FINGERS
        };

        /**
         * Initialise the plugin for each DOM element matched
         * This creates a new instance of the main TouchSwipe class for each DOM element, and then
         * saves a reference to that instance in the elements data property.
         * @internal
         */
        function init(options) {
            //Prep and extend the options
            if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
                options.allowPageScroll = NONE;
            }

            //Check for deprecated options
            //Ensure that any old click handlers are assigned to the new tap, unless we have a tap
            if (options.click !== undefined && options.tap === undefined) {
                options.tap = options.click;
            }

            if (!options) {
                options = {};
            }

            //pass empty object so we dont modify the defaults
            options = $.extend({}, $.fn.swipe.defaults, options);

            //For each element instantiate the plugin
            return this.each(function () {
                var $this = $(this);

                //Check we havent already initialised the plugin
                var plugin = $this.data(PLUGIN_NS);

                if (!plugin) {
                    plugin = new TouchSwipe(this, options);
                    $this.data(PLUGIN_NS, plugin);
                }
            });
        }

        /**
         * Main TouchSwipe Plugin Class.
         * Do not use this to construct your TouchSwipe object, use the jQuery plugin method $.fn.swipe(); {@link $.fn.swipe}
         * @private
         * @name TouchSwipe
         * @param {DOMNode} element The HTML DOM object to apply to plugin to
         * @param {Object} options The options to configure the plugin with.  @link {$.fn.swipe.defaults}
         * @see $.fh.swipe.defaults
         * @see $.fh.swipe
         * @class
         */
        function TouchSwipe(element, options) {

            //take a local/instacne level copy of the options - should make it this.options really...
            var options = $.extend({}, options);

            var useTouchEvents = (SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents),
                START_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown') : 'touchstart') : 'mousedown',
                MOVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove') : 'touchmove') : 'mousemove',
                END_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup') : 'touchend') : 'mouseup',
                LEAVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? 'mouseleave' : null) : 'mouseleave', //we manually detect leave on touch devices, so null event here
                CANCEL_EV = (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel') : 'touchcancel');


            //touch properties
            var distance = 0,
                direction = null,
                duration = 0,
                startTouchesDistance = 0,
                endTouchesDistance = 0,
                pinchZoom = 1,
                pinchDistance = 0,
                pinchDirection = 0,
                maximumsMap = null;


            //jQuery wrapped element for this instance
            var $element = $(element);

            //Current phase of th touch cycle
            var phase = "start";

            // the current number of fingers being used.
            var fingerCount = 0;

            //track mouse points / delta
            var fingerData = {};

            //track times
            var startTime = 0,
                endTime = 0,
                previousTouchEndTime = 0,
                fingerCountAtRelease = 0,
                doubleTapStartTime = 0;

            //Timeouts
            var singleTapTimeout = null,
                holdTimeout = null;

            // Add gestures to all swipable areas if supported
            try {
                $element.bind(START_EV, touchStart);
                $element.bind(CANCEL_EV, touchCancel);
            }
            catch (e) {
                $.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
            }

            //
            //Public methods
            //

            /**
             * re-enables the swipe plugin with the previous configuration
             * @function
             * @name $.fn.swipe#enable
             * @return {DOMNode} The Dom element that was registered with TouchSwipe
             * @example $("#element").swipe("enable");
             */
            this.enable = function () {
                $element.bind(START_EV, touchStart);
                $element.bind(CANCEL_EV, touchCancel);
                return $element;
            };

            /**
             * disables the swipe plugin
             * @function
             * @name $.fn.swipe#disable
             * @return {DOMNode} The Dom element that is now registered with TouchSwipe
             * @example $("#element").swipe("disable");
             */
            this.disable = function () {
                removeListeners();
                return $element;
            };

            /**
             * Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
             * @function
             * @name $.fn.swipe#destroy
             * @example $("#element").swipe("destroy");
             */
            this.destroy = function () {
                removeListeners();
                $element.data(PLUGIN_NS, null);
                $element = null;
            };


            /**
             * Allows run time updating of the swipe configuration options.
             * @function
             * @name $.fn.swipe#option
             * @param {String} property The option property to get or set, or a has of multiple options to set
             * @param {Object} [value] The value to set the property to
             * @return {Object} If only a property name is passed, then that property value is returned. If nothing is passed the current options hash is returned.
             * @example $("#element").swipe("option", "threshold"); // return the threshold
             * @example $("#element").swipe("option", "threshold", 100); // set the threshold after init
             * @example $("#element").swipe("option", {threshold:100, fingers:3} ); // set multiple properties after init
             * @example $("#element").swipe({threshold:100, fingers:3} ); // set multiple properties after init - the "option" method is optional!
             * @example $("#element").swipe("option"); // Return the current options hash
             * @see $.fn.swipe.defaults
             *
             */
            this.option = function (property, value) {

                if (typeof property === 'object') {
                    options = $.extend(options, property);
                } else if (options[property] !== undefined) {
                    if (value === undefined) {
                        return options[property];
                    } else {
                        options[property] = value;
                    }
                } else if (!property) {
                    return options;
                } else {
                    $.error('Option ' + property + ' does not exist on jQuery.swipe.options');
                }

                return null;
            }


            //
            // Private methods
            //

            //
            // EVENTS
            //
            /**
             * Event handler for a touch start event.
             * Stops the default click event from triggering and stores where we touched
             * @inner
             * @param {object} jqEvent The normalised jQuery event object.
             */
            function touchStart(jqEvent) {

                //If we already in a touch event (a finger already in use) then ignore subsequent ones..
                if (getTouchInProgress())
                    return;

                //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
                if ($(jqEvent.target).closest(options.excludedElements, $element).length > 0)
                    return;

                //As we use Jquery bind for events, we need to target the original event object
                //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

                var ret,
                    touches = event.touches,
                    evt = touches ? touches[0] : event;

                phase = PHASE_START;

                //If we support touches, get the finger count
                if (touches) {
                    // get the total number of fingers touching the screen
                    fingerCount = touches.length;
                }
                //Else this is the desktop, so stop the browser from dragging content
                else if (options.preventDefaultEvents !== false) {
                    jqEvent.preventDefault(); //call this on jq event so we are cross browser
                }

                //clear vars..
                distance = 0;
                direction = null;
                pinchDirection = null;
                duration = 0;
                startTouchesDistance = 0;
                endTouchesDistance = 0;
                pinchZoom = 1;
                pinchDistance = 0;
                maximumsMap = createMaximumsData();
                cancelMultiFingerRelease();

                //Create the default finger data
                createFingerData(0, evt);

                // check the number of fingers is what we are looking for, or we are capturing pinches
                if (!touches || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
                    // get the coordinates of the touch
                    startTime = getTimeStamp();

                    if (fingerCount == 2) {
                        //Keep track of the initial pinch distance, so we can calculate the diff later
                        //Store second finger data as start
                        createFingerData(1, touches[1]);
                        startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
                    }

                    if (options.swipeStatus || options.pinchStatus) {
                        ret = triggerHandler(event, phase);
                    }
                }
                else {
                    //A touch with more or less than the fingers we are looking for, so cancel
                    ret = false;
                }

                //If we have a return value from the users handler, then return and cancel
                if (ret === false) {
                    phase = PHASE_CANCEL;
                    triggerHandler(event, phase);
                    return ret;
                }
                else {
                    if (options.hold) {
                        holdTimeout = setTimeout($.proxy(function () {
                            //Trigger the event
                            $element.trigger('hold', [event.target]);
                            //Fire the callback
                            if (options.hold) {
                                ret = options.hold.call($element, event, event.target);
                            }
                        }, this), options.longTapThreshold);
                    }

                    setTouchInProgress(true);
                }

                return null;
            };


            /**
             * Event handler for a touch move event.
             * If we change fingers during move, then cancel the event
             * @inner
             * @param {object} jqEvent The normalised jQuery event object.
             */
            function touchMove(jqEvent) {

                //As we use Jquery bind for events, we need to target the original event object
                //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

                //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
                if (phase === PHASE_END || phase === PHASE_CANCEL || inMultiFingerRelease())
                    return;

                var ret,
                    touches = event.touches,
                    evt = touches ? touches[0] : event;


                //Update the  finger data
                var currentFinger = updateFingerData(evt);
                endTime = getTimeStamp();

                if (touches) {
                    fingerCount = touches.length;
                }

                if (options.hold)
                    clearTimeout(holdTimeout);

                phase = PHASE_MOVE;

                //If we have 2 fingers get Touches distance as well
                if (fingerCount == 2) {

                    //Keep track of the initial pinch distance, so we can calculate the diff later
                    //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
                    if (startTouchesDistance == 0) {
                        //Create second finger if this is the first time...
                        createFingerData(1, touches[1]);

                        startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
                    } else {
                        //Else just update the second finger
                        updateFingerData(touches[1]);

                        endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
                        pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
                    }


                    pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
                    pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance);
                }


                if ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !touches || hasPinches()) {

                    direction = calculateDirection(currentFinger.start, currentFinger.end);

                    //Check if we need to prevent default event (page scroll / pinch zoom) or not
                    validateDefaultEvent(jqEvent, direction);

                    //Distance and duration are all off the main finger
                    distance = calculateDistance(currentFinger.start, currentFinger.end);
                    duration = calculateDuration();

                    //Cache the maximum distance we made in this direction
                    setMaxDistance(direction, distance);


                    if (options.swipeStatus || options.pinchStatus) {
                        ret = triggerHandler(event, phase);
                    }


                    //If we trigger end events when threshold are met, or trigger events when touch leaves element
                    if (!options.triggerOnTouchEnd || options.triggerOnTouchLeave) {

                        var inBounds = true;

                        //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
                        if (options.triggerOnTouchLeave) {
                            var bounds = getbounds(this);
                            inBounds = isInBounds(currentFinger.end, bounds);
                        }

                        //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
                        if (!options.triggerOnTouchEnd && inBounds) {
                            phase = getNextPhase(PHASE_MOVE);
                        }
                        //We end if out of bounds here, so set current phase to END, and check if its modified
                        else if (options.triggerOnTouchLeave && !inBounds) {
                            phase = getNextPhase(PHASE_END);
                        }

                        if (phase == PHASE_CANCEL || phase == PHASE_END) {
                            triggerHandler(event, phase);
                        }
                    }
                }
                else {
                    phase = PHASE_CANCEL;
                    triggerHandler(event, phase);
                }

                if (ret === false) {
                    phase = PHASE_CANCEL;
                    triggerHandler(event, phase);
                }
            }


            /**
             * Event handler for a touch end event.
             * Calculate the direction and trigger events
             * @inner
             * @param {object} jqEvent The normalised jQuery event object.
             */
            function touchEnd(jqEvent) {
                //As we use Jquery bind for events, we need to target the original event object
                //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
                    touches = event.touches;

                //If we are still in a touch with the device wait a fraction and see if the other finger comes up
                //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
                if (touches) {
                    if (touches.length && !inMultiFingerRelease()) {
                        startMultiFingerRelease();
                        return true;
                    } else if (touches.length && inMultiFingerRelease()) {
                        return true;
                    }
                }

                //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
                //This is used to allow 2 fingers to release fractionally after each other, whilst maintainig the event as containg 2 fingers, not 1
                if (inMultiFingerRelease()) {
                    fingerCount = fingerCountAtRelease;
                }

                //Set end of swipe
                endTime = getTimeStamp();

                //Get duration incase move was never fired
                duration = calculateDuration();

                //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
                if (didSwipeBackToCancel() || !validateSwipeDistance()) {
                    phase = PHASE_CANCEL;
                    triggerHandler(event, phase);
                } else if (options.triggerOnTouchEnd || (options.triggerOnTouchEnd == false && phase === PHASE_MOVE)) {
                    //call this on jq event so we are cross browser
                    if (options.preventDefaultEvents !== false) {
                        jqEvent.preventDefault();
                    }
                    phase = PHASE_END;
                    triggerHandler(event, phase);
                }
                //Special cases - A tap should always fire on touch end regardless,
                //So here we manually trigger the tap end handler by itself
                //We dont run trigger handler as it will re-trigger events that may have fired already
                else if (!options.triggerOnTouchEnd && hasTap()) {
                    //Trigger the pinch events...
                    phase = PHASE_END;
                    triggerHandlerForGesture(event, phase, TAP);
                }
                else if (phase === PHASE_MOVE) {
                    phase = PHASE_CANCEL;
                    triggerHandler(event, phase);
                }

                setTouchInProgress(false);

                return null;
            }


            /**
             * Event handler for a touch cancel event.
             * Clears current vars
             * @inner
             */
            function touchCancel() {
                // reset the variables back to default values
                fingerCount = 0;
                endTime = 0;
                startTime = 0;
                startTouchesDistance = 0;
                endTouchesDistance = 0;
                pinchZoom = 1;

                //If we were in progress of tracking a possible multi touch end, then re set it.
                cancelMultiFingerRelease();

                setTouchInProgress(false);
            }


            /**
             * Event handler for a touch leave event.
             * This is only triggered on desktops, in touch we work this out manually
             * as the touchleave event is not supported in webkit
             * @inner
             */
            function touchLeave(jqEvent) {
                //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;

                //If we have the trigger on leave property set....
                if (options.triggerOnTouchLeave) {
                    phase = getNextPhase(PHASE_END);
                    triggerHandler(event, phase);
                }
            }

            /**
             * Removes all listeners that were associated with the plugin
             * @inner
             */
            function removeListeners() {
                $element.unbind(START_EV, touchStart);
                $element.unbind(CANCEL_EV, touchCancel);
                $element.unbind(MOVE_EV, touchMove);
                $element.unbind(END_EV, touchEnd);

                //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
                if (LEAVE_EV) {
                    $element.unbind(LEAVE_EV, touchLeave);
                }

                setTouchInProgress(false);
            }


            /**
             * Checks if the time and distance thresholds have been met, and if so then the appropriate handlers are fired.
             */
            function getNextPhase(currentPhase) {

                var nextPhase = currentPhase;

                // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
                var validTime = validateSwipeTime();
                var validDistance = validateSwipeDistance();
                var didCancel = didSwipeBackToCancel();

                //If we have exceeded our time, then cancel
                if (!validTime || didCancel) {
                    nextPhase = PHASE_CANCEL;
                }
                //Else if we are moving, and have reached distance then end
                else if (validDistance && currentPhase == PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
                    nextPhase = PHASE_END;
                }
                //Else if we have ended by leaving and didn't reach distance, then cancel
                else if (!validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave) {
                    nextPhase = PHASE_CANCEL;
                }

                return nextPhase;
            }


            /**
             * Trigger the relevant event handler
             * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
             * @param {object} event the original event object
             * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
             * @inner
             */
            function triggerHandler(event, phase) {

                var ret,
                    touches = event.touches;

                //Swipes and pinches are not mutually exclusive - can happend at same time, so need to trigger 2 events potentially
                if ((didSwipe() && hasSwipes()) || (didPinch() && hasPinches())) {
                    // SWIPE GESTURES
                    if (didSwipe() && hasSwipes()) { //hasSwipes as status needs to fire even if swipe is invalid
                        //Trigger the swipe events...
                        ret = triggerHandlerForGesture(event, phase, SWIPE);
                    }

                    // PINCH GESTURES (if the above didn't cancel)
                    if ((didPinch() && hasPinches()) && ret !== false) {
                        //Trigger the pinch events...
                        ret = triggerHandlerForGesture(event, phase, PINCH);
                    }
                }
                else {

                    // CLICK / TAP (if the above didn't cancel)
                    if (didDoubleTap() && ret !== false) {
                        //Trigger the tap events...
                        ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP);
                    }

                    // CLICK / TAP (if the above didn't cancel)
                    else if (didLongTap() && ret !== false) {
                        //Trigger the tap events...
                        ret = triggerHandlerForGesture(event, phase, LONG_TAP);
                    }

                    // CLICK / TAP (if the above didn't cancel)
                    else if (didTap() && ret !== false) {
                        //Trigger the tap event..
                        ret = triggerHandlerForGesture(event, phase, TAP);
                    }
                }

                // If we are cancelling the gesture, then manually trigger the reset handler
                if (phase === PHASE_CANCEL) {
                    if (hasSwipes()) {
                        ret = triggerHandlerForGesture(event, phase, SWIPE);
                    }

                    if (hasPinches()) {
                        ret = triggerHandlerForGesture(event, phase, PINCH);
                    }
                    touchCancel(event);
                }

                // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
                if (phase === PHASE_END) {
                    //If we support touch, then check that all fingers are off before we cancel
                    if (touches) {
                        if (!touches.length) {
                            ret = triggerHandlerForGesture(event, phase, SWIPE);
                            touchCancel(event);
                        }
                    }
                    else {
                        ret = triggerHandlerForGesture(event, phase, SWIPE);
                        touchCancel(event);
                    }
                }

                return ret;
            }


            /**
             * Trigger the relevant event handler
             * The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
             * @param {object} event the original event object
             * @param {string} phase the phase of the swipe (start, end cancel etc) {@link $.fn.swipe.phases}
             * @param {string} gesture the gesture to trigger a handler for : PINCH or SWIPE {@link $.fn.swipe.gestures}
             * @return Boolean False, to indicate that the event should stop propagation, or void.
             * @inner
             */
            function triggerHandlerForGesture(event, phase, gesture) {

                var ret;

                //SWIPES....
                if (gesture == SWIPE) {
                    //Trigger status every time..

                    //Trigger the event...
                    $element.trigger('swipeStatus', [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData]);

                    //Fire the callback
                    if (options.swipeStatus) {
                        ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData);
                        //If the status cancels, then dont run the subsequent event handlers..
                        if (ret === false) return false;
                    }


                    if (phase == PHASE_END && validateSwipe()) {
                        //Fire the catch all event
                        $element.trigger('swipe', [direction, distance, duration, fingerCount, fingerData]);

                        //Fire catch all callback
                        if (options.swipe) {
                            ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData);
                            //If the status cancels, then dont run the subsequent event handlers..
                            if (ret === false) return false;
                        }

                        //trigger direction specific event handlers
                        switch (direction) {
                            case LEFT:
                                //Trigger the event
                                $element.trigger('swipeLeft', [direction, distance, duration, fingerCount, fingerData]);

                                //Fire the callback
                                if (options.swipeLeft) {
                                    ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData);
                                }
                                break;

                            case RIGHT:
                                //Trigger the event
                                $element.trigger('swipeRight', [direction, distance, duration, fingerCount, fingerData]);

                                //Fire the callback
                                if (options.swipeRight) {
                                    ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData);
                                }
                                break;

                            case UP:
                                //Trigger the event
                                $element.trigger('swipeUp', [direction, distance, duration, fingerCount, fingerData]);

                                //Fire the callback
                                if (options.swipeUp) {
                                    ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData);
                                }
                                break;

                            case DOWN:
                                //Trigger the event
                                $element.trigger('swipeDown', [direction, distance, duration, fingerCount, fingerData]);

                                //Fire the callback
                                if (options.swipeDown) {
                                    ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData);
                                }
                                break;
                        }
                    }
                }


                //PINCHES....
                if (gesture == PINCH) {
                    //Trigger the event
                    $element.trigger('pinchStatus', [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

                    //Fire the callback
                    if (options.pinchStatus) {
                        ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
                        //If the status cancels, then dont run the subsequent event handlers..
                        if (ret === false) return false;
                    }

                    if (phase == PHASE_END && validatePinch()) {

                        switch (pinchDirection) {
                            case IN:
                                //Trigger the event
                                $element.trigger('pinchIn', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

                                //Fire the callback
                                if (options.pinchIn) {
                                    ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
                                }
                                break;

                            case OUT:
                                //Trigger the event
                                $element.trigger('pinchOut', [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]);

                                //Fire the callback
                                if (options.pinchOut) {
                                    ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData);
                                }
                                break;
                        }
                    }
                }


                if (gesture == TAP) {
                    if (phase === PHASE_CANCEL || phase === PHASE_END) {


                        //Cancel any existing double tap
                        clearTimeout(singleTapTimeout);
                        //Cancel hold timeout
                        clearTimeout(holdTimeout);

                        //If we are also looking for doubelTaps, wait incase this is one...
                        if (hasDoubleTap() && !inDoubleTap()) {
                            //Cache the time of this tap
                            doubleTapStartTime = getTimeStamp();

                            //Now wait for the double tap timeout, and trigger this single tap
                            //if its not cancelled by a double tap
                            singleTapTimeout = setTimeout($.proxy(function () {
                                doubleTapStartTime = null;
                                //Trigger the event
                                $element.trigger('tap', [event.target]);


                                //Fire the callback
                                if (options.tap) {
                                    ret = options.tap.call($element, event, event.target);
                                }
                            }, this), options.doubleTapThreshold);

                        } else {
                            doubleTapStartTime = null;

                            //Trigger the event
                            $element.trigger('tap', [event.target]);


                            //Fire the callback
                            if (options.tap) {
                                ret = options.tap.call($element, event, event.target);
                            }
                        }
                    }
                }

                else if (gesture == DOUBLE_TAP) {
                    if (phase === PHASE_CANCEL || phase === PHASE_END) {
                        //Cancel any pending singletap
                        clearTimeout(singleTapTimeout);
                        doubleTapStartTime = null;

                        //Trigger the event
                        $element.trigger('doubletap', [event.target]);

                        //Fire the callback
                        if (options.doubleTap) {
                            ret = options.doubleTap.call($element, event, event.target);
                        }
                    }
                }

                else if (gesture == LONG_TAP) {
                    if (phase === PHASE_CANCEL || phase === PHASE_END) {
                        //Cancel any pending singletap (shouldnt be one)
                        clearTimeout(singleTapTimeout);
                        doubleTapStartTime = null;

                        //Trigger the event
                        $element.trigger('longtap', [event.target]);

                        //Fire the callback
                        if (options.longTap) {
                            ret = options.longTap.call($element, event, event.target);
                        }
                    }
                }

                return ret;
            }


            //
            // GESTURE VALIDATION
            //

            /**
             * Checks the user has swipe far enough
             * @return Boolean if <code>threshold</code> has been set, return true if the threshold was met, else false.
             * If no threshold was set, then we return true.
             * @inner
             */
            function validateSwipeDistance() {
                var valid = true;
                //If we made it past the min swipe distance..
                if (options.threshold !== null) {
                    valid = distance >= options.threshold;
                }

                return valid;
            }

            /**
             * Checks the user has swiped back to cancel.
             * @return Boolean if <code>cancelThreshold</code> has been set, return true if the cancelThreshold was met, else false.
             * If no cancelThreshold was set, then we return true.
             * @inner
             */
            function didSwipeBackToCancel() {
                var cancelled = false;
                if (options.cancelThreshold !== null && direction !== null) {
                    cancelled = (getMaxDistance(direction) - distance) >= options.cancelThreshold;
                }

                return cancelled;
            }

            /**
             * Checks the user has pinched far enough
             * @return Boolean if <code>pinchThreshold</code> has been set, return true if the threshold was met, else false.
             * If no threshold was set, then we return true.
             * @inner
             */
            function validatePinchDistance() {
                if (options.pinchThreshold !== null) {
                    return pinchDistance >= options.pinchThreshold;
                }
                return true;
            }

            /**
             * Checks that the time taken to swipe meets the minimum / maximum requirements
             * @return Boolean
             * @inner
             */
            function validateSwipeTime() {
                var result;
                //If no time set, then return true

                if (options.maxTimeThreshold) {
                    if (duration >= options.maxTimeThreshold) {
                        result = false;
                    } else {
                        result = true;
                    }
                }
                else {
                    result = true;
                }

                return result;
            }


            /**
             * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
             * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
             * @param {object} jqEvent The normalised jQuery representation of the event object.
             * @param {string} direction The direction of the event. See {@link $.fn.swipe.directions}
             * @see $.fn.swipe.directions
             * @inner
             */
            function validateDefaultEvent(jqEvent, direction) {

                //If we have no pinches, then do this
                //If we have a pinch, and we we have 2 fingers or more down, then dont allow page scroll.

                //If the option is set, allways allow the event to bubble up (let user handle wiredness)
                if (options.preventDefaultEvents === false) {
                    return;
                }

                if (options.allowPageScroll === NONE) {
                    jqEvent.preventDefault();
                } else {
                    var auto = options.allowPageScroll === AUTO;

                    switch (direction) {
                        case LEFT:
                            if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                                jqEvent.preventDefault();
                            }
                            break;

                        case RIGHT:
                            if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
                                jqEvent.preventDefault();
                            }
                            break;

                        case UP:
                            if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                                jqEvent.preventDefault();
                            }
                            break;

                        case DOWN:
                            if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
                                jqEvent.preventDefault();
                            }
                            break;
                    }
                }

            }


            // PINCHES
            /**
             * Returns true of the current pinch meets the thresholds
             * @return Boolean
             * @inner
             */
            function validatePinch() {
                var hasCorrectFingerCount = validateFingers();
                var hasEndPoint = validateEndPoint();
                var hasCorrectDistance = validatePinchDistance();
                return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;

            }

            /**
             * Returns true if any Pinch events have been registered
             * @return Boolean
             * @inner
             */
            function hasPinches() {
                //Enure we dont return 0 or null for false values
                return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
            }

            /**
             * Returns true if we are detecting pinches, and have one
             * @return Boolean
             * @inner
             */
            function didPinch() {
                //Enure we dont return 0 or null for false values
                return !!(validatePinch() && hasPinches());
            }


            // SWIPES
            /**
             * Returns true if the current swipe meets the thresholds
             * @return Boolean
             * @inner
             */
            function validateSwipe() {
                //Check validity of swipe
                var hasValidTime = validateSwipeTime();
                var hasValidDistance = validateSwipeDistance();
                var hasCorrectFingerCount = validateFingers();
                var hasEndPoint = validateEndPoint();
                var didCancel = didSwipeBackToCancel();

                // if the user swiped more than the minimum length, perform the appropriate action
                // hasValidDistance is null when no distance is set
                var valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;

                return valid;
            }

            /**
             * Returns true if any Swipe events have been registered
             * @return Boolean
             * @inner
             */
            function hasSwipes() {
                //Enure we dont return 0 or null for false values
                return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
            }


            /**
             * Returns true if we are detecting swipes and have one
             * @return Boolean
             * @inner
             */
            function didSwipe() {
                //Enure we dont return 0 or null for false values
                return !!(validateSwipe() && hasSwipes());
            }

            /**
             * Returns true if we have matched the number of fingers we are looking for
             * @return Boolean
             * @inner
             */
            function validateFingers() {
                //The number of fingers we want were matched, or on desktop we ignore
                return ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);
            }

            /**
             * Returns true if we have an end point for the swipe
             * @return Boolean
             * @inner
             */
            function validateEndPoint() {
                //We have an end value for the finger
                return fingerData[0].end.x !== 0;
            }

            // TAP / CLICK
            /**
             * Returns true if a click / tap events have been registered
             * @return Boolean
             * @inner
             */
            function hasTap() {
                //Enure we dont return 0 or null for false values
                return !!(options.tap);
            }

            /**
             * Returns true if a double tap events have been registered
             * @return Boolean
             * @inner
             */
            function hasDoubleTap() {
                //Enure we dont return 0 or null for false values
                return !!(options.doubleTap);
            }

            /**
             * Returns true if any long tap events have been registered
             * @return Boolean
             * @inner
             */
            function hasLongTap() {
                //Enure we dont return 0 or null for false values
                return !!(options.longTap);
            }

            /**
             * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
             * @return Boolean
             * @inner
             */
            function validateDoubleTap() {
                if (doubleTapStartTime == null) {
                    return false;
                }
                var now = getTimeStamp();
                return (hasDoubleTap() && ((now - doubleTapStartTime) <= options.doubleTapThreshold));
            }

            /**
             * Returns true if we could be in the process of a double tap (one tap has occurred, we are listening for double taps, and the threshold hasn't past.
             * @return Boolean
             * @inner
             */
            function inDoubleTap() {
                return validateDoubleTap();
            }


            /**
             * Returns true if we have a valid tap
             * @return Boolean
             * @inner
             */
            function validateTap() {
                return ((fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold));
            }

            /**
             * Returns true if we have a valid long tap
             * @return Boolean
             * @inner
             */
            function validateLongTap() {
                //slight threshold on moving finger
                return ((duration > options.longTapThreshold) && (distance < DOUBLE_TAP_THRESHOLD));
            }

            /**
             * Returns true if we are detecting taps and have one
             * @return Boolean
             * @inner
             */
            function didTap() {
                //Enure we dont return 0 or null for false values
                return !!(validateTap() && hasTap());
            }


            /**
             * Returns true if we are detecting double taps and have one
             * @return Boolean
             * @inner
             */
            function didDoubleTap() {
                //Enure we dont return 0 or null for false values
                return !!(validateDoubleTap() && hasDoubleTap());
            }

            /**
             * Returns true if we are detecting long taps and have one
             * @return Boolean
             * @inner
             */
            function didLongTap() {
                //Enure we dont return 0 or null for false values
                return !!(validateLongTap() && hasLongTap());
            }


            // MULTI FINGER TOUCH
            /**
             * Starts tracking the time between 2 finger releases, and keeps track of how many fingers we initially had up
             * @inner
             */
            function startMultiFingerRelease() {
                previousTouchEndTime = getTimeStamp();
                fingerCountAtRelease = event.touches.length + 1;
            }

            /**
             * Cancels the tracking of time between 2 finger releases, and resets counters
             * @inner
             */
            function cancelMultiFingerRelease() {
                previousTouchEndTime = 0;
                fingerCountAtRelease = 0;
            }

            /**
             * Checks if we are in the threshold between 2 fingers being released
             * @return Boolean
             * @inner
             */
            function inMultiFingerRelease() {

                var withinThreshold = false;

                if (previousTouchEndTime) {
                    var diff = getTimeStamp() - previousTouchEndTime
                    if (diff <= options.fingerReleaseThreshold) {
                        withinThreshold = true;
                    }
                }

                return withinThreshold;
            }


            /**
             * gets a data flag to indicate that a touch is in progress
             * @return Boolean
             * @inner
             */
            function getTouchInProgress() {
                //strict equality to ensure only true and false are returned
                return !!($element.data(PLUGIN_NS + '_intouch') === true);
            }

            /**
             * Sets a data flag to indicate that a touch is in progress
             * @param {boolean} val The value to set the property to
             * @inner
             */
            function setTouchInProgress(val) {

                //Add or remove event listeners depending on touch status
                if (val === true) {
                    $element.bind(MOVE_EV, touchMove);
                    $element.bind(END_EV, touchEnd);

                    //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
                    if (LEAVE_EV) {
                        $element.bind(LEAVE_EV, touchLeave);
                    }
                } else {

                    $element.unbind(MOVE_EV, touchMove, false);
                    $element.unbind(END_EV, touchEnd, false);

                    //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
                    if (LEAVE_EV) {
                        $element.unbind(LEAVE_EV, touchLeave, false);
                    }
                }


                //strict equality to ensure only true and false can update the value
                $element.data(PLUGIN_NS + '_intouch', val === true);
            }


            /**
             * Creates the finger data for the touch/finger in the event object.
             * @param {int} id The id to store the finger data under (usually the order the fingers were pressed)
             * @param {object} evt The event object containing finger data
             * @return finger data object
             * @inner
             */
            function createFingerData(id, evt) {
                var f = {
                    start: {x: 0, y: 0},
                    end: {x: 0, y: 0}
                };
                f.start.x = f.end.x = evt.pageX || evt.clientX;
                f.start.y = f.end.y = evt.pageY || evt.clientY;
                fingerData[id] = f;
                return f;
            }

            /**
             * Updates the finger data for a particular event object
             * @param {object} evt The event object containing the touch/finger data to upadte
             * @return a finger data object.
             * @inner
             */
            function updateFingerData(evt) {
                var id = evt.identifier !== undefined ? evt.identifier : 0;
                var f = getFingerData(id);

                if (f === null) {
                    f = createFingerData(id, evt);
                }

                f.end.x = evt.pageX || evt.clientX;
                f.end.y = evt.pageY || evt.clientY;

                return f;
            }

            /**
             * Returns a finger data object by its event ID.
             * Each touch event has an identifier property, which is used
             * to track repeat touches
             * @param {int} id The unique id of the finger in the sequence of touch events.
             * @return a finger data object.
             * @inner
             */
            function getFingerData(id) {
                return fingerData[id] || null;
            }


            /**
             * Sets the maximum distance swiped in the given direction.
             * If the new value is lower than the current value, the max value is not changed.
             * @param {string}  direction The direction of the swipe
             * @param {int}  distance The distance of the swipe
             * @inner
             */
            function setMaxDistance(direction, distance) {
                distance = Math.max(distance, getMaxDistance(direction));
                maximumsMap[direction].distance = distance;
            }

            /**
             * gets the maximum distance swiped in the given direction.
             * @param {string}  direction The direction of the swipe
             * @return int  The distance of the swipe
             * @inner
             */
            function getMaxDistance(direction) {
                if (maximumsMap[direction]) return maximumsMap[direction].distance;
                return undefined;
            }

            /**
             * Creats a map of directions to maximum swiped values.
             * @return Object A dictionary of maximum values, indexed by direction.
             * @inner
             */
            function createMaximumsData() {
                var maxData = {};
                maxData[LEFT] = createMaximumVO(LEFT);
                maxData[RIGHT] = createMaximumVO(RIGHT);
                maxData[UP] = createMaximumVO(UP);
                maxData[DOWN] = createMaximumVO(DOWN);

                return maxData;
            }

            /**
             * Creates a map maximum swiped values for a given swipe direction
             * @param {string} The direction that these values will be associated with
             * @return Object Maximum values
             * @inner
             */
            function createMaximumVO(dir) {
                return {
                    direction: dir,
                    distance: 0
                }
            }


            //
            // MATHS / UTILS
            //

            /**
             * Calculate the duration of the swipe
             * @return int
             * @inner
             */
            function calculateDuration() {
                return endTime - startTime;
            }

            /**
             * Calculate the distance between 2 touches (pinch)
             * @param {point} startPoint A point object containing x and y co-ordinates
             * @param {point} endPoint A point object containing x and y co-ordinates
             * @return int;
             * @inner
             */
            function calculateTouchesDistance(startPoint, endPoint) {
                var diffX = Math.abs(startPoint.x - endPoint.x);
                var diffY = Math.abs(startPoint.y - endPoint.y);

                return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
            }

            /**
             * Calculate the zoom factor between the start and end distances
             * @param {int} startDistance Distance (between 2 fingers) the user started pinching at
             * @param {int} endDistance Distance (between 2 fingers) the user ended pinching at
             * @return float The zoom value from 0 to 1.
             * @inner
             */
            function calculatePinchZoom(startDistance, endDistance) {
                var percent = (endDistance / startDistance) * 1;
                return percent.toFixed(2);
            }


            /**
             * Returns the pinch direction, either IN or OUT for the given points
             * @return string Either {@link $.fn.swipe.directions.IN} or {@link $.fn.swipe.directions.OUT}
             * @see $.fn.swipe.directions
             * @inner
             */
            function calculatePinchDirection() {
                if (pinchZoom < 1) {
                    return OUT;
                }
                else {
                    return IN;
                }
            }


            /**
             * Calculate the length / distance of the swipe
             * @param {point} startPoint A point object containing x and y co-ordinates
             * @param {point} endPoint A point object containing x and y co-ordinates
             * @return int
             * @inner
             */
            function calculateDistance(startPoint, endPoint) {
                if (options.axis == 'horizontal') {
                    return Math.abs(startPoint.x - endPoint.x);
                } else if (options.axis == 'vertical') {
                    return Math.abs(startPoint.y - endPoint.y);
                }

                return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
            }

            /**
             * Calculate the angle of the swipe
             * @param {point} startPoint A point object containing x and y co-ordinates
             * @param {point} endPoint A point object containing x and y co-ordinates
             * @return int
             * @inner
             */
            function calculateAngle(startPoint, endPoint) {
                if (options.axis == 'horizontal') {
                    if (startPoint.x < endPoint.x) {
                        return 180;
                    }
                    return 0;
                } else if (options.axis == 'vertical') {
                    if (startPoint.y < endPoint.y) {
                        return 90;
                    }
                    return 270;
                }

                var x = startPoint.x - endPoint.x;
                var y = endPoint.y - startPoint.y;
                var r = Math.atan2(y, x); //radians
                var angle = Math.round(r * 180 / Math.PI); //degrees

                //ensure value is positive
                if (angle < 0) {
                    angle = 360 - Math.abs(angle);
                }

                return angle;
            }

            /**
             * Calculate the direction of the swipe
             * This will also call calculateAngle to get the latest angle of swipe
             * @param {point} startPoint A point object containing x and y co-ordinates
             * @param {point} endPoint A point object containing x and y co-ordinates
             * @return string Either {@link $.fn.swipe.directions.LEFT} / {@link $.fn.swipe.directions.RIGHT} / {@link $.fn.swipe.directions.DOWN} / {@link $.fn.swipe.directions.UP}
             * @see $.fn.swipe.directions
             * @inner
             */
            function calculateDirection(startPoint, endPoint) {
                var angle = calculateAngle(startPoint, endPoint);

                if ((angle <= 45) && (angle >= 0)) {
                    return LEFT;
                } else if ((angle <= 360) && (angle >= 315)) {
                    return LEFT;
                } else if ((angle >= 135) && (angle <= 225)) {
                    return RIGHT;
                } else if ((angle > 45) && (angle < 135)) {
                    return DOWN;
                } else {
                    return UP;
                }
            }


            /**
             * Returns a MS time stamp of the current time
             * @return int
             * @inner
             */
            function getTimeStamp() {
                var now = new Date();
                return now.getTime();
            }


            /**
             * Returns a bounds object with left, right, top and bottom properties for the element specified.
             * @param {DomNode} The DOM node to get the bounds for.
             */
            function getbounds(el) {
                el = $(el);
                var offset = el.offset();

                var bounds = {
                    left: offset.left,
                    right: offset.left + el.outerWidth(),
                    top: offset.top,
                    bottom: offset.top + el.outerHeight()
                }

                return bounds;
            }


            /**
             * Checks if the point object is in the bounds object.
             * @param {object} point A point object.
             * @param {int} point.x The x value of the point.
             * @param {int} point.y The x value of the point.
             * @param {object} bounds The bounds object to test
             * @param {int} bounds.left The leftmost value
             * @param {int} bounds.right The righttmost value
             * @param {int} bounds.top The topmost value
             * @param {int} bounds.bottom The bottommost value
             */
            function isInBounds(point, bounds) {
                return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
            };


        }


        /**
         * A catch all handler that is triggered for all swipe directions.
         * @name $.fn.swipe#swipe
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */


        /**
         * A handler that is triggered for "left" swipes.
         * @name $.fn.swipe#swipeLeft
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler that is triggered for "right" swipes.
         * @name $.fn.swipe#swipeRight
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler that is triggered for "up" swipes.
         * @name $.fn.swipe#swipeUp
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler that is triggered for "down" swipes.
         * @name $.fn.swipe#swipeDown
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user swiped in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler triggered for every phase of the swipe. This handler is constantly fired for the duration of the pinch.
         * This is triggered regardless of swipe thresholds.
         * @name $.fn.swipe#swipeStatus
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {string} phase The phase of the swipe event. See {@link $.fn.swipe.phases}
         * @param {string} direction The direction the user swiped in. This is null if the user has yet to move. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user swiped. This is 0 if the user has yet to move.
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler triggered for pinch in events.
         * @name $.fn.swipe#pinchIn
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user pinched
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler triggered for pinch out events.
         * @name $.fn.swipe#pinchOut
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user pinched
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A handler triggered for all pinch events. This handler is constantly fired for the duration of the pinch. This is triggered regardless of thresholds.
         * @name $.fn.swipe#pinchStatus
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {int} direction The direction the user pinched in. See {@link $.fn.swipe.directions}
         * @param {int} distance The distance the user pinched
         * @param {int} duration The duration of the swipe in milliseconds
         * @param {int} fingerCount The number of fingers used. See {@link $.fn.swipe.fingers}
         * @param {int} zoom The zoom/scale level the user pinched too, 0-1.
         * @param {object} fingerData The coordinates of fingers in event
         */

        /**
         * A click handler triggered when a user simply clicks, rather than swipes on an element.
         * This is deprecated since version 1.6.2, any assignment to click will be assigned to the tap handler.
         * You cannot use <code>on</code> to bind to this event as the default jQ <code>click</code> event will be triggered.
         * Use the <code>tap</code> event instead.
         * @name $.fn.swipe#click
         * @event
         * @deprecated since version 1.6.2, please use {@link $.fn.swipe#tap} instead
         * @default null
         * @param {EventObject} event The original event object
         * @param {DomObject} target The element clicked on.
         */

        /**
         * A click / tap handler triggered when a user simply clicks or taps, rather than swipes on an element.
         * @name $.fn.swipe#tap
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {DomObject} target The element clicked on.
         */

        /**
         * A double tap handler triggered when a user double clicks or taps on an element.
         * You can set the time delay for a double tap with the {@link $.fn.swipe.defaults#doubleTapThreshold} property.
         * Note: If you set both <code>doubleTap</code> and <code>tap</code> handlers, the <code>tap</code> event will be delayed by the <code>doubleTapThreshold</code>
         * as the script needs to check if its a double tap.
         * @name $.fn.swipe#doubleTap
         * @see  $.fn.swipe.defaults#doubleTapThreshold
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {DomObject} target The element clicked on.
         */

        /**
         * A long tap handler triggered once a tap has been release if the tap was longer than the longTapThreshold.
         * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
         * @name $.fn.swipe#longTap
         * @see  $.fn.swipe.defaults#longTapThreshold
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {DomObject} target The element clicked on.
         */

        /**
         * A hold tap handler triggered as soon as the longTapThreshold is reached
         * You can set the time delay for a long tap with the {@link $.fn.swipe.defaults#longTapThreshold} property.
         * @name $.fn.swipe#hold
         * @see  $.fn.swipe.defaults#longTapThreshold
         * @event
         * @default null
         * @param {EventObject} event The original event object
         * @param {DomObject} target The element clicked on.
         */

    }));
})(n2, n2);
/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function (factory) {
    factory(n2);
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function () {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function (elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function (elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function (fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail'      in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta'  in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) {
            return;
        }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) {
            clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

var tmpModernizr = null;
if(typeof window.Modernizr !== "undefined" ) tmpModernizr = window.Modernizr;

/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csstransforms3d-addtest-domprefixes-prefixed-prefixes-shiv-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),N.push((o?"":"no-")+s.join("-"))}}function i(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function a(e){var t=w.className,n=Modernizr._config.classPrefix||"";if(j&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),j?w.className.baseVal=t:w.className=t)}function s(e,t){if("object"==typeof e)for(var n in e)b(e,n)&&s(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),a([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function l(e,t){return!!~(""+e).indexOf(t)}function f(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):j?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function u(){var e=t.body;return e||(e=f(j?"svg":"body"),e.fake=!0),e}function c(e,n,r,o){var i,a,s,l,c="modernizr",d=f("div"),p=u();if(parseInt(r,10))for(;r--;)s=f("div"),s.id=o?o[r]:c+(r+1),d.appendChild(s);return i=f("style"),i.type="text/css",i.id="s"+c,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",l=w.style.overflow,w.style.overflow="hidden",w.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),w.style.overflow=l,w.offsetHeight):d.parentNode.removeChild(d),!!a}function d(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?d(o,n||t):o);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(m(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+m(t[o])+":"+r+")");return i=i.join(" or "),c("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function g(e,t,o,a){function s(){c&&(delete M.style,delete M.modElem)}if(a=r(a,"undefined")?!1:a,!r(o,"undefined")){var u=h(e,o);if(!r(u,"undefined"))return u}for(var c,d,p,m,g,v=["modernizr","tspan"];!M.style;)c=!0,M.modElem=f(v.shift()),M.style=M.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],g=M.style[m],l(m,"-")&&(m=i(m)),M.style[m]!==n){if(a||r(o,"undefined"))return s(),"pfx"==t?m:!0;try{M.style[m]=o}catch(y){}if(M.style[m]!=g)return s(),"pfx"==t?m:!0}return s(),!1}function v(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+k.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?g(s,t,o,i):(s=(e+" "+E.join(a+" ")+a).split(" "),p(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var C=[],_={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=_,Modernizr=new Modernizr;var S=_._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];_._prefixes=S;var w=t.documentElement,x="Moz O ms Webkit",E=_._config.usePrefixes?x.toLowerCase().split(" "):[];_._domPrefixes=E;var b;!function(){var e={}.hasOwnProperty;b=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}();var N=[],P="CSS"in e&&"supports"in e.CSS,T="supportsCSS"in e;Modernizr.addTest("supports",P||T);var j="svg"===w.nodeName.toLowerCase();_._l={},_.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},_._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){_.addTest=s});j||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,f(t)}function i(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function a(e,n,r){if(n||(n=t),c)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function f(e){e||(e=t);var r=i(e);return!C.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||l(e,r),e}var u,c,d="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,c=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:f,createElement:a,createDocumentFragment:s,addElements:o};e.html5=C,f(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var k=_._config.usePrefixes?x.split(" "):[];_._cssomPrefixes=k;var z=function(t){var r,o=S.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var a=0;o>a;a++){var s=S[a],l=s.toUpperCase()+"_"+r;if(l in i)return"@-"+s.toLowerCase()+"-"+t}return!1};_.atRule=z;var F=_.testStyles=c,L={elem:f("modernizr")};Modernizr._q.push(function(){delete L.elem});var M={style:L.elem.style};Modernizr._q.unshift(function(){delete M.style});_.testProp=function(e,t,r){return g([e],n,t,r)};_.testAllProps=v;_.prefixed=function(e,t,n){return 0===e.indexOf("@")?z(e):(-1!=e.indexOf("-")&&(e=i(e)),t?v(e,t,n):v(e,"pfx"))};_.testAllProps=y,Modernizr.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in w.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",F(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),o(),a(N),delete _.addTest,delete _.addAsyncTest;for(var O=0;O<Modernizr._q.length;O++)Modernizr._q[O]();e.Modernizr=Modernizr}(window,document);

Modernizr.addTest('csstransformspreserve3d', function () {
    var prop = Modernizr.prefixed('transformStyle');
    var val = 'preserve-3d';
    var computedStyle;
    if(!prop) return false;
    prop = prop.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
    Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
        if(window.getComputedStyle){
            computedStyle = getComputedStyle(el, null);
            if(computedStyle) {
                computedStyle = computedStyle.getPropertyValue(prop);
            }else{
                computedStyle = '';
            }
        }else{
            computedStyle = '';
        }
    });
    return (computedStyle === val);
});

window.nModernizr = window.Modernizr;

if(tmpModernizr) window.Modernizr = tmpModernizr;
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj)
                return i;
        }
        return -1;
    };
}
;

// http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value
if (!Array.prototype.remove) {
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}
(function () {
    function RAF() {
        this._isTicking = false;
        this._isMobile = false;
        this._lastTick = 0;
        this._ticks = [];
        this._postTickCallbacks = [];


        /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
        var rAFShim = (function () {
            var timeLast = 0;

            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                    var timeCurrent = (new Date()).getTime(),
                        timeDelta;

                    /* Dynamically set delay on a per-tick basis to match 60fps. */
                    /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
                    timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                    timeLast = timeCurrent + timeDelta;

                    return setTimeout(function () {
                        callback(timeCurrent + timeDelta);
                    }, timeDelta);
                };
        })();

        /* Ticker function. */
        this._raf = window.requestAnimationFrame || rAFShim;

        var _this = this;
        /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
         To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
         devices to avoid wasting battery power on inactive tabs. */
        /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
        if (!this._isMobile && document.hidden !== undefined) {
            document.addEventListener("visibilitychange", function () {
                /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
                if (document.hidden) {
                    this._raf = function (callback) {
                        /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
                        return setTimeout(function () {
                            callback(_this.now());
                        }, 16);
                    };

                    /* The rAF loop has been paused by the browser, so we manually restart the tick. */
                    _this._tick(_this.now());
                } else {
                    _this._raf = window.requestAnimationFrame || rAFShim;
                }
            });
        }
    }

    RAF.prototype.addTick = function (callback) {
        if (this._ticks.indexOf(callback) == -1) {
            this._ticks.push(callback);
        }
        if (!this._isTicking) {
            this._isTicking = true;
            this._raf.call(null, this.getTickStart());
        }
    }

    RAF.prototype.removeTick = function (callback) {

        this._ticks.remove(callback);

        if (this._ticks.length === 0 && this._isTicking) {
            this._lastTick = 0;
            this._isTicking = false;
        }
    }

    RAF.prototype._tickStart = function (time) {
        this._lastTick = time;
        //this._tick(time);

        if (this._isTicking) {
            this._lastTick = time;
            this._raf.call(null, this.getTick());
        }
    }


    RAF.prototype._tick = function (time) {
        var delta = (time - this._lastTick) / 1000;
        if (delta != 0) {
            for (var i = 0; i < this._ticks.length; i++) {
                this._ticks[i].call(null, delta);
            }

            this.postTick();
        }
        this._continueTick(time);
    };

    RAF.prototype._continueTick = function (time) {

        if (this._isTicking) {
            this._lastTick = time;
            this._raf.call(null, this.getTick());
        }
    };

    RAF.prototype.getTick = function () {
        var that = this;
        return function () {
            that._tick.apply(that, arguments);
        };
    }

    RAF.prototype.getTickStart = function () {
        var that = this;
        return function () {
            that._tickStart.apply(that, arguments);
        };
    }

    RAF.prototype.now = function () {
        return performance.now();
    }

    RAF.prototype.postTick = function () {
        for (var i = 0; i < this._postTickCallbacks.length; i++) {
            this._postTickCallbacks[i]();
        }
        this._postTickCallbacks = [];
    }

    RAF.prototype.addPostTick = function (callback) {
        this._postTickCallbacks.push(callback);
    };

    window.N2A = {
        RAF: new RAF(),
        isArray: function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        },
        isFunction: function (arg) {
            return typeof arg === 'function';
        },
        isString: function (arg) {
            return typeof arg === 'string';
        }
    };
})();
(function () {
    function Animation(toParams) {
        this._tickCallback = null;
        this._progress = 0;
        this._delayTimeout = false;
        this._delay = 0;
        this._duration = 4;
        this._timeScale = 1.0;
        this._isPlaying = false;
        this._startTime = 0;
        this._eventCallbacks = {};
        this._immediateRender = true;
        this._timeline = null;
        this._isCompleted = false;
        this._isStarted = false;

        this.toParams = toParams;

        this.initParameters()
    };

    Animation.prototype.initParameters = function () {
        this.parseParameters(this.toParams);

        if (typeof this.toParams !== 'object') {
            this.paused(false);
        }
    };

    Animation.prototype.parseParameters = function (params) {
        if (params) {
            if (params.delay) {
                this.delay(params.delay);
                delete params.delay;
            }
            if (typeof params.duration !== 'undefined') {
                this.duration(params.duration);
                delete params.duration;
            }
            if (params.onComplete) {
                this.eventCallback('onComplete', params.onComplete);
                delete params.onComplete;
            }
            if (params.onStart) {
                this.eventCallback('onStart', params.onStart);
                delete params.onStart;
            }
            if (params.onUpdate) {
                this.eventCallback('onUpdate', params.onUpdate);
                delete params.onUpdate;
            }
            if (params.immediateRender) {
                this._immediateRender = params.immediateRender;
                delete params.immediateRender;
            }
            if (params.paused) {
                this.paused(true);
            }
        }
    };

    Animation.prototype.setTimeline = function (timeline) {
        this._timeline = timeline;
    }

    Animation.prototype._tick = function (delta) {
        var pr = this._progress;
        this._progress += delta / this._duration * this._timeScale;
        if (pr == 0 || !this._isStarted) {
            this._onStart();
        } else {
            if (this._progress >= 1) {
                this._progress = 1;
                this._isPlaying = false;
                N2A.RAF.removeTick(this.getTickCallback());
                this._onUpdate();
                this._onComplete();
            } else {
                this._onUpdate();
            }
        }
    };

    Animation.prototype._onStart = function () {
        this._isStarted = true;
        this._isPlaying = false;
        this._isCompleted = false;
        this.trigger('onStart');
        this._onUpdate();
    };

    Animation.prototype._onUpdate = function () {

        this.trigger('onUpdate');
    };

    Animation.prototype._onComplete = function () {
        this._isCompleted = true;
        this._onUpdate();
        this.trigger('onComplete');
    };

    Animation.prototype.getTickCallback = function () {
        if (!this._tickCallback) {
            var that = this;
            this._tickCallback = function () {
                that._tick.apply(that, arguments);
            };
        }
        return this._tickCallback;
    };

    Animation.prototype._clearDelayTimeout = function () {
        if (this._delayTimeout) {
            clearTimeout(this._delayTimeout);
            this._delayTimeout = false;
        }
    };

    Animation.prototype._timeToProgress = function (time) {
        return time / this._duration * this._timeScale;
    };


    Animation.prototype.delay = function () {
        if (arguments.length > 0) {
            var delay = parseFloat(arguments[0]);
            if (isNaN(delay) || delay == Infinity || !delay) {
                delay = 0;
            }
            this._delay = Math.max(0, delay);
            return this;
        }
        return this._delay;
    };

    Animation.prototype.duration = function () {
        if (arguments.length > 0) {
            var duration = parseFloat(arguments[0]);
            if (isNaN(duration) || duration == Infinity || !duration) {
                duration = 0;
            }
            this._duration = Math.max(0, duration);
            return this;
        }
        return this._duration;
    };

    Animation.prototype.eventCallback = function (type) {
        if (arguments.length > 3) {
            this._eventCallbacks[type] = [arguments[1], arguments[2], arguments[3]];
        } else if (arguments.length > 2) {
            this._eventCallbacks[type] = [arguments[1], arguments[2], this];
        } else if (arguments.length > 1) {
            this._eventCallbacks[type] = [arguments[1], [], this];
        }
        return this._eventCallbacks[type];
    };

    Animation.prototype.pause = function () {
        this._isPlaying = false;
        N2A.RAF.removeTick(this.getTickCallback());
        if (arguments.length > 0) {
            if (arguments[0] != null) {
                this.progress(this._timeToProgress(arguments[0]));
            }
        }
        return this;
    };

    Animation.prototype.paused = function () {
        if (arguments.length > 0) {
            if (arguments[0]) {
                if (this._isPlaying) {
                    this.pause();
                }
            } else {
                if (!this._isPlaying) {
                    this.play();
                }
            }
            return this;
        }
        return !this._isPlaying;
    };

    Animation.prototype.play = function () {
        var startDelay = true;
        if (arguments.length > 0) {
            if (arguments[0] != null) {
                startDelay = false;
                this._progress = this._timeToProgress(arguments[0]);
            }
        }

        this._play(startDelay);
    };

    Animation.prototype._play = function (startDelay) {

        if (this._progress < 1) {
            if (this._progress == 0 && startDelay && this._delay > 0) {
                if (!this._delayTimeout) {
                    var that = this;
                    this._delayTimeout = setTimeout(function () {
                        that.__play.apply(that, arguments);
                    }, this._delay * 1000);
                }
            } else {
                this.__play();
            }
        }
    };

    Animation.prototype.__play = function () {
        this._clearDelayTimeout();
        if (!this._isPlaying) {
            //this.getTickCallback().call(this, 0);
            N2A.RAF.addTick(this.getTickCallback());
            this._isPlaying = true;
        }
    };

    Animation.prototype.progress = function () {
        if (arguments.length > 0) {
            var progress = parseFloat(arguments[0]);
            if (isNaN(progress)) {
                progress = 0;
            }
            progress = Math.min(1, Math.max(0, progress));

            if (1 || this._progress != progress) {
                this._progress = progress;
                if (!this._isPlaying) {
                    this._onUpdate();
                }
            }
            return this;
        }
        return this._progress;
    };

    Animation.prototype.restart = function () {
        if (arguments.length > 0) {
            if (arguments[0]) {
                // restart with delay
                this.pause(0);
                this.play();
                return this;
            }
        }
        this.play(0);
        return this;
    };

    Animation.prototype.seek = function (time) {
        if (time != null) {
            this._progress = this._timeToProgress(arguments[0]);
            if (!this._isPlaying) {
                this._onUpdate();
            }
        }
    };

    Animation.prototype.startTime = function () {
        if (arguments.length > 0) {
            var startTime = parseFloat(arguments[0]);
            if (isNaN(startTime)) {
                startTime = 0;
            }
            this._startTime = Math.max(0, startTime);
            return this;
        }
        return this._startTime;
    };

    Animation.prototype.timeScale = function () {
        if (arguments.length > 0) {
            var timeScale = parseFloat(arguments[0]);
            if (isNaN(timeScale)) {
                timeScale = 1;
            }
            timeScale = Math.max(0.01, timeScale);

            if (this._timeScale != timeScale) {
                this._timeScale = timeScale;
            }
            return this;
        }
        return this._timeScale;
    };

    Animation.prototype.trigger = function (type) {
        if (typeof this._eventCallbacks[type] == 'object') {
            this._eventCallbacks[type][0].apply(this._eventCallbacks[type][2], this._eventCallbacks[type][1]);
        }
    };

    Animation.prototype.totalDuration = function () {
        if (arguments.length > 0) {
            var totalDuration = parseFloat(arguments[0]);
            if (isNaN(totalDuration)) {
                totalDuration = 0;
            }
            totalDuration = Math.max(0, totalDuration);

            this.timeScale(this._duration / totalDuration);
            return this;
        }

        return this._duration * this._timeScale;
    };

    Animation.prototype.reset = function () {
        this._isCompleted = false;
        this._isStarted = false;
        this.progress(0);
    };

    N2A.Animation = Animation;
})();
(function ($) {

    var hookProperties = {};

    function CSS() {
        this.clearStack();
    }

    CSS.prototype.set = function (elements, property, value, unit) {

        if (!elements.length) {
            elements = [elements];
        }
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            var index = $.inArray(element, this.elements);
            if (index == -1) {
                index = this.elements.push(element) - 1;
                this.stack[index] = {};
            }
            if (unit != '') {
                value += unit;
            }
            this.stack[index][property] = value;
        }
        if (!this.registeredToTick) {
            var that = this;
            N2A.RAF.addPostTick(function () {
                that.flush();
            });
            this.registeredToTick = true;
        }
    };

    CSS.prototype.flush = function () {
        //Flush the CSS modifications to the elements
        for (var j = 0; j < this.elements.length; j++) {
            var element = this.elements[j];
            for (var property in this.prepareStack(element, this.stack[j])) {
                var prefixed = nModernizr.prefixed(property);
                if (prefixed) {
                    element.style[prefixed] = this.stack[j][property];
                }
            }
        }

        this.clearStack();
    };

    CSS.prototype.prepareStack = function (element, styles) {
        for (var property in styles) {
            if (typeof hookProperties[property] !== 'undefined') {
                hookProperties[property](element).prepare(styles);
            }
        }
        return styles;
    };

    CSS.prototype.clearStack = function () {
        this.registeredToTick = false;
        this.elements = [];
        this.stack = [];
    };

    var cache = [];

    CSS.prototype.makeTransitionData = function (element, property, startValue, endValue) {
        var unit, unitFrom, unitTo, separatedStartValue, separatedEndValue;
        if (property.match(/transformOrigin|perspective/)) {
            if (endValue) {
                return {
                    startValue: endValue,
                    endValue: endValue,
                    unit: '',
                    range: 0
                }
            } else if (startValue) {
                return {
                    startValue: startValue,
                    endValue: startValue,
                    unit: '',
                    range: 0
                }
            }
        }

        if (typeof startValue === 'undefined') {
            startValue = this.getProperty(element, property);
        }
        separatedStartValue = this.separateValue(property, startValue);
        startValue = separatedStartValue[0];
        unitFrom = separatedStartValue[1];


        if (typeof endValue === 'undefined') {
            endValue = this.getProperty(element, property);
        }
        separatedEndValue = this.separateValue(property, endValue);
        endValue = separatedEndValue[0];
        unitTo = separatedEndValue[1];

        unit = unitTo || unitFrom;

        if (unitTo != unit) {
            endValue = this.transformUnit(element, property, endValue, unitTo, unit);
        }

        if (unitFrom != unit) {
            startValue = this.transformUnit(element, property, startValue, unitFrom, unit);
        }

        return {
            startValue: startValue,
            endValue: endValue,
            unit: unit,
            range: endValue - startValue
        }
    };

    CSS.prototype.getProperty = function (element, property) {
        if (typeof hookProperties[property] !== 'undefined') {
            return hookProperties[property](element).get(property);
        }
        var prefixed = nModernizr.prefixed(property);
        if (prefixed) {
            var value = $(element).css(property);
            if (value == 'auto') {
                return 0;
            }
            return value;
        }

    }

    CSS.prototype.transformUnit = function (element, property, value, startUnit, endUnit) {
        if (value == 0) {
            return 0;
        }
        var parentProperty = '';
        switch (property) {
            case 'left':
            case 'right':
                parentProperty = 'width';
                break;
            case 'top':
            case 'bottom':
                parentProperty = 'height';
                break;
            default:
                parentProperty = property;
        }
        if (startUnit == 'px' && endUnit == '%') {
            var parentValue = this.getProperty(element.parent(), parentProperty),
                separatedParentValue = this.separateValue(parentProperty, parentValue);
            return value / separatedParentValue[0] * 100;
        } else if (startUnit == '%' && endUnit == 'px') {
            var parentValue = this.getProperty(element.parent(), parentProperty),
                separatedParentValue = this.separateValue(parentProperty, parentValue);
            return value / 100 * separatedParentValue[0];
        }
        return value;
    }

    CSS.prototype.parsePropertyValue = function (element, valueData) {
        var endValue = undefined,
            startValue = undefined;

        /* Handle the array format, which can be structured as one of three potential overloads:
         A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
        if (N2A.isArray(valueData)) {
            /* endValue is always the first item in the array. Don't bother validating endValue's value now
             since the ensuing property cycling logic does that. */
            endValue = valueData[0];
            startValue = valueData[1];
            /* Handle the single-value format. */
        } else {
            endValue = valueData;
        }

        /* If functions were passed in as values, pass the function the current element as its context,
         plus the element's index and the element set's size as arguments. Then, assign the returned value. */
        if (N2A.isFunction(endValue)) {
            endValue = endValue.call(element);
        }

        if (N2A.isFunction(startValue)) {
            startValue = startValue.call(element);
        }
        /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
        return [endValue || 0, startValue];
    };

    CSS.prototype.separateValue = function (property, value) {
        var unitType,
            numericValue;

        numericValue = (value || "0")
            .toString()
            .toLowerCase()
            /* Match the unit type at the end of the value. */
            .replace(/[%A-z]+$/, function (match) {
                /* Grab the unit type. */
                unitType = match;

                /* Strip the unit type off of value. */
                return "";
            });
        /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
        if (!unitType) {
            unitType = this.getUnitType(property);
        }

        return [parseFloat(numericValue), unitType];
    };

    CSS.prototype.getUnitType = function (property) {
        if (/(^(x|y|z|rotationX|rotationY|rotationZ|scale|scaleX|scaleY|opacity)$)/i.test(property)) {
            /* The above properties are unitless. */
            return "";
        } else {
            /* Default to px for all other properties. */
            return "px";
        }
    };

    N2A.CSS = CSS;


    function getTransformObject(element) {
        if (!element.n2Transform) {
            element.n2Transform = new transform();
        }
        return element.n2Transform;
    }

    hookProperties['x'] = getTransformObject;
    hookProperties['y'] = getTransformObject;
    hookProperties['z'] = getTransformObject;
    hookProperties['rotationX'] = getTransformObject;
    hookProperties['rotationY'] = getTransformObject;
    hookProperties['rotationZ'] = getTransformObject;
    hookProperties['scale'] = getTransformObject;
    hookProperties['scaleX'] = getTransformObject;
    hookProperties['scaleY'] = getTransformObject;
    hookProperties['scaleZ'] = getTransformObject;

    function transform(element) {
        this.data = {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            scale: 1
        };
    };

    transform.prototype.get = function (property) {
        return this.data[property];
    };


    var rad = Math.PI / 180;
    transform.prototype.prepare = function (styles) {

        if (typeof styles['scale'] !== 'undefined') {
            styles['scaleX'] = styles['scale'];
            styles['scaleY'] = styles['scale'];
            delete styles['scale'];
        }

        for (var k in this.data) {
            if (typeof styles[k] !== 'undefined') {
                this.data[k] = styles[k];
                delete styles[k];
            }
        }

        this.data['scale'] = this.data['scaleX'];

        styles['transform'] = this.matrix3d(this.data.x, this.data.y, this.data.z, this.data.scaleX, this.data.scaleY, this.data.rotationX, this.data.rotationY, this.data.rotationZ);

        return styles;
    };


    transform.prototype.matrix3d = function (x, y, z, scaleX, scaleY, rotateX, rotateY, rotateZ) {
        var Y = Math.cos(rotateX * rad),
            Z = Math.sin(rotateX * rad),
            b = Math.cos(rotateY * rad),
            F = Math.sin(rotateY * rad),
            I = Math.cos(rotateZ * rad),
            P = Math.sin(rotateZ * rad);

        var a = new Array(16);

        a[0] = b * I * scaleX;
        a[1] = -1 * P;
        a[2] = F;
        a[3] = 0;
        a[4] = P;
        a[5] = Y * I * scaleY;
        a[6] = Z;
        a[7] = 0;
        a[8] = -1 * F;
        a[9] = -1 * Z;
        a[10] = b * Y;
        a[11] = 0;
        a[12] = x;
        a[13] = y;
        a[14] = z;
        a[15] = 1;
        return "matrix3d(" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + "," + a[7] + "," + a[8] + "," + a[9] + "," + a[10] + "," + a[11] + "," + a[12] + "," + a[13] + "," + a[14] + "," + a[15] + ")";
    };
})
(n2);
(function ($) {
    var css = new N2A.CSS(),
        MODE = {
            FROM: 1,
            FROMTO: 2,
            TO: 3
        };

    function Tween(target, duration) {
        this.ease = 'linear';
        this._tweenContainer = null;
        this._setContainer = null;
        var fromParams = null, toParams;
        switch (arguments.length) {
            case 4:
                fromParams = $.extend(true, {}, arguments[2]);
                toParams = arguments[3];
                if (!toParams) {
                    this._mode = MODE.FROM;
                } else {
                    this._mode = MODE.FROMTO;
                    toParams = $.extend(true, {}, toParams);
                }
                break;
            default:
                this._mode = MODE.TO;
                fromParams = {};
                toParams = $.extend(true, {}, arguments[2]);
        }

        this._target = $(target);

        this.fromParams = fromParams;

        N2A.Animation.call(this, toParams);

        this.parseParameters({
            duration: duration
        });

        if ((this._mode == MODE.FROM || this._mode == MODE.FROMTO) && this._immediateRender) {
            if (this._tweenContainer === null) {
                this._makeTweenContainer(this.fromParams, this.toParams);
            }
            for (var k in this._tweenContainer) {
                var tween = this._tweenContainer[k];
                css.set(this._target, k, tween.startValue, tween.unit);
            }
            for (var k in this._setContainer) {
                var tween = this._setContainer[k];
                css.set(this._target, k, tween.endValue, tween.unit);
            }
        }
    }

    Tween.prototype = Object.create(N2A.Animation.prototype);
    Tween.prototype.constructor = Tween;

    Tween.prototype.initParameters = function () {

        this.parseParameters(this.fromParams);

        N2A.Animation.prototype.initParameters.apply(this, arguments);
    };

    Tween.prototype.parseParameters = function (params) {
        if (params) {
            if (params.ease) {
                this.ease = params.ease;
                delete params.ease;
            }

            N2A.Animation.prototype.parseParameters.apply(this, arguments);
        }
    }

    Tween.prototype._onStart = function () {
        if (this._tweenContainer === null) {
            this._makeTweenContainer(this.fromParams, this.toParams);
        }

        for (var k in this._setContainer) {
            var tween = this._setContainer[k];
            css.set(this._target, k, tween.endValue, tween.unit);
        }

        N2A.Animation.prototype._onStart.call(this);
    };

    Tween.prototype._onUpdate = function () {
        for (var k in this._tweenContainer) {
            var tween = this._tweenContainer[k];
            css.set(this._target, k, N2A.easings[this.ease](this._progress, tween.startValue, tween.range * this._progress, 1), tween.unit);
        }
        //this._target.css(this._property, this._range * this._progress);
        N2A.Animation.prototype._onUpdate.call(this);
    };

    Tween.prototype._makeTweenContainer = function (from, to) {
        this._setContainer = {};
        this._tweenContainer = {};
        if (to) {
            for (var k  in to) {
                var container = css.makeTransitionData(this._target, k, from[k], to[k]);
                if (container.range == 0) {
                    this._setContainer[k] = container;
                } else {
                    this._tweenContainer[k] = container;
                }
            }
        } else {
            for (var k  in from) {
                var container = css.makeTransitionData(this._target, k, from[k]);
                if (container.range == 0) {
                    this._setContainer[k] = container;
                } else {
                    this._tweenContainer[k] = container;
                }
            }
        }
    };

    Tween.set = function (element, to) {
        for (var k in to) {
            css.set($(element), k, to[k], '');
        }
    };

    Tween.to = function (element, duration, to) {
        return new Tween(element, duration, to);
    };

    Tween.fromTo = function (element, duration, from, to) {
        return new Tween(element, duration, from, to);
    };

    Tween.from = function (element, duration, from) {
        return new Tween(element, duration, from, null);
    };

    window.NextendTween = Tween;

})(n2);
(function ($) {

    function Timeline(params) {
        this.originalParams = $.extend(true, {}, params);
        this._tweens = [];
        N2A.Animation.call(this, params);
        this._duration = 0;
    }

    Timeline.prototype = Object.create(N2A.Animation.prototype);
    Timeline.prototype.constructor = Timeline;

    Timeline.prototype._onUpdate = function () {
        if (this.tweensContainer) {

            for (var i = 0; i < this.tweensContainer.length; i++) {
                var tweenContainer = this.tweensContainer[i];
                var currentProgress = (this._progress - tweenContainer.startProgress) / (tweenContainer.endProgress - tweenContainer.startProgress);
                if (tweenContainer.tween._isCompleted && currentProgress <= tweenContainer.endProgress) {
                    tweenContainer.tween.reset();
                }

                if (!tweenContainer.tween._isStarted && currentProgress >= 0 && tweenContainer.tween.progress() == 0) {
                    tweenContainer.tween._onStart();
                }
                if (tweenContainer.tween._isStarted) {
                    if (currentProgress >= 1 && !tweenContainer.tween._isCompleted) {
                        currentProgress = 1;
                        tweenContainer.tween.progress(currentProgress);
                        tweenContainer.tween._onComplete();
                    } else if (currentProgress >= 0 && currentProgress < 1) {
                        tweenContainer.tween.progress(currentProgress);
                    }
                }
            }
        }
        N2A.Animation.prototype._onUpdate.call(this);
        if (!N2A.RAF._isTicking) {
            N2A.RAF.postTick();
        }
    };

    Timeline.prototype.addTween = function (tween) {
        tween.pause();
        tween.setTimeline(this);
        var position = 0;
        if (arguments.length > 1) {
            position = this._parsePosition(arguments[1]);
        } else {
            position = this._parsePosition();
        }

        var delay = tween.delay();
        if (delay > 0) {
            position += delay;
            tween.delay(0);
        }

        tween.startTime(position);
        this._tweens.push(tween);
        var duration = tween.totalDuration() + position;
        if (duration > this._duration) {
            this._duration = duration;
        }
        this.makeCache();
    };

    Timeline.prototype.clear = function () {
        if (!this.paused()) {
            this.pause();
        }
        Timeline.call(this, this.originalParams);
    };

    Timeline.prototype.add = function (tween, position) {
        this.addTween(tween, position);
    };

    Timeline.prototype.set = function (element, to, position) {
        this.addTween(NextendTween.to(element, 0.05, to), position);
    };

    Timeline.prototype.to = function (element, duration, to, position) {
        this.addTween(NextendTween.to(element, duration, to), position);
    };

    Timeline.prototype.fromTo = function (element, duration, from, to, position) {
        this.addTween(NextendTween.fromTo(element, duration, from, to), position);
    };

    Timeline.prototype.from = function (element, duration, from, position) {
        this.addTween(NextendTween.from(element, duration, from), position);
    };

    Timeline.prototype._play = function () {
        if (this._progress == 0) {

            for (var i = 0; i < this._tweens.length; i++) {
                this._tweens[i].pause(0);

            }
        }
        N2A.Animation.prototype._play.apply(this, arguments);
    };

    Timeline.prototype._parsePosition = function () {
        var positionString = '+=0';
        if (arguments.length > 0 && typeof arguments[0] !== 'undefined' && !isNaN(arguments[0])) {
            positionString = arguments[0];
        }
        var position = 0;

        switch (typeof positionString) {
            case 'string':
                switch (positionString.substr(0, 2)) {
                    case'+=':
                        position = this.duration() + parseFloat(positionString.substr(2));
                        break;
                    case'-=':
                        position = this.duration() - parseFloat(positionString.substr(2));
                        break;
                }
                break;
            default:
                position = parseFloat(positionString);
        }

        return Math.max(0, position);
    };

    Timeline.prototype.makeCache = function () {
        var totalDuration = this.totalDuration();
        this.tweensContainer = [];
        for (var i = 0; i < this._tweens.length; i++) {
            var tween = this._tweens[i];

            var startProgress = tween.startTime() / totalDuration,
                endProgress = (tween.startTime() + tween.totalDuration()) / totalDuration;
            this.tweensContainer.push({
                tween: tween,
                startProgress: startProgress,
                endProgress: endProgress,
                range: endProgress - startProgress
            });
        }
    };

    window.NextendTimeline = Timeline;
})
(n2);
/*
 * jQuery Easing v1.3.2 - http://gsgd.co.uk/sandbox/jquery/easing/
 * Open source under the BSD License.
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
(function () {
    N2A.easings = {
        linear: function (t, b, c, d) {
            return c + b;
        },
        easeInQuad: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function (t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function (t, b, c, d) {
            return c - N2A.easing.easeOutBounce(d - t, 0, c, d) + b;
        },
        easeOutBounce: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function (t, b, c, d) {
            if (t < d / 2) return N2A.easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
            return N2A.easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
})(n2);

