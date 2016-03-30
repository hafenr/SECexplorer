var ComplexFeatureFactory = function($http) {
    /**
     * Constructor function for comple features.
     * @param {number} leftSEC - The SEC fraction that forms the left boundary
     * of this feature.
     * @param {number} rightSEC - The SEC fraction that forms the right
     * boundary of this feature.
     * @param {Array.<string>} subunits - An array of Uniprot Ids of the
     * subunit of this feature.
     * @class
     * @classdesc The representation of a complex/subgroup feature detected
     * server-side using the sliding window clustering algorithm.
     */
    function ComplexFeature(leftSEC, rightSEC, subunits) {
        this.leftSEC = leftSEC;
        this.rightSEC = rightSEC;
        this.subunits = subunits;
    }

    /**
     * Get a list of subgroup features for a list of protein ids.
     * @param {Array<string>} proteinIds - A list of Uniprot identifiers.
     * @returns {Array.<ComplexFeature>} A list of complex features.
     */
    ComplexFeature.query = function(proteinIds) {
        return $http.put('/api/complexfeatures', {
            'uniprot_ids': proteinIds
        })
        .then(function(resp) {
            var features = resp.data.features;
            return features.map(function(f) {
                return new ComplexFeature(
                    f['left_sec'],
                    f['right_sec'],
                    f['subgroup'].split(';')
                );
            });
        }, function() {
            return [];
        });
    };

    return ComplexFeature;
};

angular.module('app').factory('ComplexFeature', ['$http', ComplexFeatureFactory]);

module.exports = ComplexFeatureFactory;
