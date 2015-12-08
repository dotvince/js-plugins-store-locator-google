/**
 * @extends storeLocator.StaticDataFeed
 * @constructor
 */
function DealerDataSource() {
  $.extend(this, new storeLocator.StaticDataFeed);

  var that = this;
  $.get('data.json', function(data) {
    that.setStores(that.parse_(data));
  });
}

/**
 * @const
 * @type {!storeLocator.FeatureSet}
 * @private
 */
DealerDataSource.prototype.FEATURES_ = new storeLocator.FeatureSet(
  // new storeLocator.Feature('Wheelchair-YES', 'Wheelchair access'),
  // new storeLocator.Feature('Audio-YES', 'Audio')
);

/**
 * @return {!storeLocator.FeatureSet}
 */
DealerDataSource.prototype.getFeatures = function() {
  return this.FEATURES_;
};

/**
 * @private
 * @param {string} csv
 * @return {!Array.<!storeLocator.Store>}
 */
DealerDataSource.prototype.parse_ = function(data) {
  var stores = [];
  for (var i = 0, row; row = data.results[i]; i++) {
    var props = row.properties;
    var features = new storeLocator.FeatureSet;
    // features.add(this.FEATURES_.getById('Wheelchair-' + props.Wheelchair));
    // features.add(this.FEATURES_.getById('Audio-' + props.Audio));


        var position = new google.maps.LatLng(row.lat, row.lon);

    var shop = this.join_([row.Shp_num_an, row.Shp_centre], ', ');
    var locality = this.join_([row.city, , row.state, row.zip], ', ');
    var website = '<a href = "http://'+row.website+'" target="blank">Website <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>'
    var store = new storeLocator.Store(row.ID, position, features, {
      title: row.name,
      address: this.join_([shop, row.address1, row.address2, locality, row.phone, website ], '<br>'),
      hours: row.Hrs_of_bus
    });
    stores.push(store);
  }
  return stores;
};


// DealerDataSource.prototype.parse_ = function(csv) {
//   var stores = [];
//   var rows = csv.split('\n');
//   var headings = this.parseRow_(rows[0]);

//   for (var i = 1, row; row = rows[i]; i++) {
//     row = this.toObject_(headings, this.parseRow_(row));
//     var features = new storeLocator.FeatureSet;
//     features.add(this.FEATURES_.getById('Wheelchair-' + row.Wheelchair));
//     features.add(this.FEATURES_.getById('Audio-' + row.Audio));

//     var position = new google.maps.LatLng(row.lat, row.lon);

//     var shop = this.join_([row.Shp_num_an, row.Shp_centre], ', ');
//     var locality = this.join_([row.city, , row.state, row.zip], ', ');

//     var store = new storeLocator.Store(row.ID, position, features, {
//       title: row.name,
//       address: this.join_([shop, row.address1, row.address2, locality ], '<br>'),
//       hours: row.Hrs_of_bus
//     });
//     stores.push(store);
//   }
//   return stores;
// };

/**
 * Joins elements of an array that are non-empty and non-null.
 * @private
 * @param {!Array} arr array of elements to join.
 * @param {string} sep the separator.
 * @return {string}
 */
DealerDataSource.prototype.join_ = function(arr, sep) {
  var parts = [];
  for (var i = 0, ii = arr.length; i < ii; i++) {
    arr[i] && parts.push(arr[i]);
  }
  return parts.join(sep);
};

/**
 * Very rudimentary CSV parsing - we know how this particular CSV is formatted.
 * IMPORTANT: Don't use this for general CSV parsing!
 * @private
 * @param {string} row
 * @return {Array.<string>}
 */
DealerDataSource.prototype.parseRow_ = function(row) {
  // Strip leading quote.
  if (row.charAt(0) == '"') {
    row = row.substring(1);
  }
  // Strip trailing quote. There seems to be a character between the last quote
  // and the line ending, hence 2 instead of 1.
  if (row.charAt(row.length - 2) == '"') {
    row = row.substring(0, row.length - 2);
  }

  row = row.split('","');

  return row;
};

/**
 * Creates an object mapping headings to row elements.
 * @private
 * @param {Array.<string>} headings
 * @param {Array.<string>} row
 * @return {Object}
 */
DealerDataSource.prototype.toObject_ = function(headings, row) {
  var result = {};
  for (var i = 0, ii = row.length; i < ii; i++) {
    result[headings[i]] = row[i];
  }
  return result;
};
