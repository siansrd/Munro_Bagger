var mountainSearch = function(mtnsView, mountainId) {
  var mId = Number(mountainId);

  var binarySearch = function(first, last) {
    var mid = first + Math.floor((last - first) / 2);
    var mountain = mtnsView[mid];
    var numberId = Number(mountain.id);
    if (mId === numberId) return mtnsView[mid];
    if (first === last) return undefined;
    if (mId < numberId)
      return binarySearch(first, mid - 1);
    else
      return binarySearch(mid + 1, last);
  };

  return binarySearch(0, mtnsView.length-1);
};

module.exports = {
  mountainSearch: mountainSearch
}