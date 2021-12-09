const timestamp = () => {
  function parseDate(e) {
    return e < 10 ? '0' + e : e;
  }
  var _date = new Date();
  var currentTime = new Date(
    _date.toLocaleString('en-us', { timeZone: 'Africa/Nairobi' })
  );
  var month = parseDate(currentTime.getMonth() + 1);
  var date = parseDate(currentTime.getDate());
  var hour = parseDate(currentTime.getHours());
  var minutes = parseDate(currentTime.getMinutes());
  var seconds = parseDate(currentTime.getSeconds());
  return (
    currentTime.getFullYear() +
    '' +
    month +
    '' +
    date +
    '' +
    hour +
    '' +
    minutes +
    '' +
    seconds
  );
};

module.exports = timestamp;
