import moment from "moment";

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

/**
 * Change first letter into capital
 * @param {String} word
 */
export const capitalize = word =>
  word
    .split(" ")
    .map(str => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

export const hasToken = () => {
  return !!localStorage.getItem("kestingrum-cms");
};

export const getToken = () => {
  return localStorage.getItem("kestingrum-cms");
};

export const removeToken = () => {
  return localStorage.removeItem("kestingrum-cms");
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const replaceString = (target, oldChar, newChar) => {
  let result = target.replace(oldChar, newChar);
  return result;
};

export const prettifyMaster = string => {
  const splitted = string.split("_");

  const capitalized = splitted.map(split => {
    return capitalize(split);
  });

  return capitalized.join(" ");
};

export const selectAllOption = name => {
  return {
    value: null,
    label: "All " + name,
  };
};

export const arrayToOptions = array => {
  return array.map(entry => {
    return {
      value: entry,
      label: prettifyMaster(entry),
    };
  });
};
