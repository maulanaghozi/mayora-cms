import moment from "moment";
import { LogoKestingrum100, DefaultCoverPic } from "../assets/image"

export const formatNumber = num => {
    return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1.");
};

export const formatDate = date => {
    return moment(date).format("ddd, DD MMM YYYY");
};

export const formatDateTable = date => {
    return moment(date).format("DD MMM YYYY");
};

export const formatHttpDate = date => {
    return moment(date).format("YYYY-MM-DD");
};

export const formatDateStats = date => {
    return moment(date).format("DD MMM");
};

export const checkValue = value => {
    if (!value) {
        return "-";
    }
    return value;
};

export const checkStatusChallenge = data => {
    const { start, end, goal, totalStep } = data;
    const now = formatHttpDate(new Date());

    if (now >= start && now <= end) {
        if (totalStep >= goal) {
        return "Completed";
        }
        return "Ongoing";
    } else if (now > end) {
        return "Expired";
    } else if (start > now) {
        return "Upcoming";
    } else return "Expired";
};

const checkSpace = value => {
    const splitValue = value.split(" ");

    // if(splitValue.length > 1){
    //   return [splitValue[0], <span></span> ,splitValue[1]]
    // }
    return value;
};

export const checkContainsEvery = (item, nameField, value) => {
    return item.every(x => x[nameField] === value);
};

/**
 * Change first letter into capital
 * @param {String} word 
 */
export const capitalize = word => (
    word.split(' ').map(str => (
        str.charAt(0).toUpperCase() + str.substring(1)
    )).join(' ')
)

/**
 * Replace certain char with another char and capitalize every split word
 * @param {String} string target
 * @param {String} oldChar character to be replaced
 * @param {String} newChar character to replace the old one
 * @param {Function} modifier function to modify each word
 */

export const replaceAndModify = (string, oldChar, newChar, modifier) => {
    let splitString = string.split(oldChar);
    let newString = '';

    if (splitString.length > 1) {
        splitString.forEach((word, i, arr) => {
        newString += modifier(word);

        if (!(i === arr.length - 1)) {
            newString += newChar;
        }
        });
    } else {
        newString = modifier(splitString[0]);
    }

    return newString
}

/**
 * Split path into array
 * @param {String} path 
 */
export const pathToArray = (path) => {
    const pathArray = path.split('/');
    let newPathArray = [];

    pathArray.forEach(path => {

        if (path) {
        const stringWithSpace = replaceAndModify(path, '-', ' ', capitalize);
        newPathArray.push(stringWithSpace);
        }
    });
    return newPathArray;
}

export const hasToken = () => {
    return !!localStorage.getItem('kestingrum-cms');
}

export const getToken = () => {
    return localStorage.getItem('kestingrum-cms');
}

export const removeToken = () => {
    return localStorage.removeItem('kestingrum-cms');
}

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const phoneNumber = (phone) => {
    let result = ""
    for (let i = 0; i < phone.length; i++) {
        if (i % 4 === 0) {
        result += ` ${phone[i]}`
        } else {
        result += phone[i]
        }
    }
    return result
}

export const replaceString = (target, oldChar, newChar) => {
    let result = target.replace(oldChar, newChar)
    return result
}

export const unshift = (array, newItem) => {
    let cloneResult = array.slice();
    cloneResult.unshift(newItem);

    return cloneResult;
}

export const getAverage = array => {
    let total = 0;
    array.forEach(value => {
        total += value;
    });

    return total / array.length;
}

export const youtubeVideoId = string => {
    let result = string.split('/embed/')
    return result[result.length - 1]
}

export const prettifyMaster = string => {
    const splitted = string.split('_');
    
    const capitalized = splitted.map(split => {
        return capitalize(split);
    });

    return capitalized.join(' ');
}

export const selectAllOption = name => {
    return {
        value: null,
        label: 'All ' + name
    }
}

export const arrayToOptions = array => {
    return array.map(entry => {
        return {
            value: entry,
            label: prettifyMaster(entry)
        }
    })
}

const imageExt = new Set([
    'jpg',
    'jpeg',
    'png',
    'svg',
    'gif'
])

const videoExt = new Set([
    'mp4',
    'webm',
    'ogg'
])

export const getContentType = url => {
    if (typeof url === 'string') {
        const youtubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const matchYoutube = url.match(youtubeRegex);
    
        if (matchYoutube && matchYoutube[1]) {
            return {
                ext: null,
                type: 'youtube'
            }
        } else {
            const splittedUrl = url.split('.');
        
            const fileExt = splittedUrl[splittedUrl.length - 1];
        
            let type;
        
            if (imageExt.has(fileExt)) {
                type = 'image';
            } else if (videoExt.has(fileExt)) {
                type = 'video';
            }
        
            return {ext: fileExt, type};
        }
    } else {
        console.error('url is not a string');
    }
}

export const isTouchDevice = () => {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    
    const mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

export const base64ToBlob = (base64, mime) => {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

export const snakeToPascal = name => {
    let splitted = name.split('_');

    let capitalized = splitted.map((word, index) => {
        return capitalize(word);
    });

    return capitalized.join('');
}

export const getProfilePic = url => {

    let fiveInitialCharacters;
    if(url) {
      fiveInitialCharacters = url.slice(0,5)
    }
  
    if(fiveInitialCharacters === 'https') {
      return url
    } else {
      return LogoKestingrum100
    }
}

export const getCoverPic = url => {

    let fiveInitialCharacters;
    if(url) {
      fiveInitialCharacters = url.slice(0,5)
    }
  
    if(fiveInitialCharacters === 'https') {
      return url
    } else {
      return DefaultCoverPic
    }
}

export const getCastingType = params => {
    const type = params.toLowerCase();
    if(type === "kestingrum" || type === "casting_online") {
      return "Casting Online"
    } else {
      return "Open Casting"
    }
  }