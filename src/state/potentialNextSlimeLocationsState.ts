import _ from "lodash";
import { selector } from "recoil";
import slimeLocationsBoundingBoxState from "./slimeLocationsBoundingBoxState";
import slimeLocationsState from "./slimeLocationsState";

export interface Location {
  x: number;
  y: number;
}

function serializeLocation({ x, y }: Location) {
  return `${x},${y}`
}

function parseLocation(serialized: string): Location {
  const stringCoordinates = _.split(serialized, ",");
  return {
    x: _.parseInt(stringCoordinates[0]),
    y: _.parseInt(stringCoordinates[1])
  }
}

const potentialNextSlimeLocationsState = selector<Location[]>({
  key: 'potentialNextSlimeLocationsState',
  get: ({ get }) => {
    const slimeLocations = get(slimeLocationsState);
    const serializedSlimeLocations = new Set(_.map(slimeLocations, serializeLocation));
    const serializedPotentialNextSlimeLocations = new Set<string>();

    const potentiallyAddNextSlimeLocation = (location: Location) => {
      const serializedLocation = serializeLocation(location);
      if (!serializedSlimeLocations.has(serializedLocation)) {
        serializedPotentialNextSlimeLocations.add(serializedLocation);
      }
    }

    _.each(slimeLocations, ({ x, y }) => {
      potentiallyAddNextSlimeLocation({ x, y: y - 1 });
      potentiallyAddNextSlimeLocation({ x: x + 1, y: y - 1 });
      potentiallyAddNextSlimeLocation({ x: x + 1, y });
      potentiallyAddNextSlimeLocation({ x: x + 1, y: y - 1 });
      potentiallyAddNextSlimeLocation({ x, y: y + 1 });
      potentiallyAddNextSlimeLocation({ x: x - 1, y: y + 1 });
      potentiallyAddNextSlimeLocation({ x: x - 1, y });
      potentiallyAddNextSlimeLocation({ x: x - 1, y: y - 1 });
    });

    const {minX, minY, maxX, maxY} = get(slimeLocationsBoundingBoxState);
    const effectiveOccupiedLocationsCount = slimeLocations.length + 1;
    return _.sortBy(
      _.map(Array.from(serializedPotentialNextSlimeLocations), parseLocation),
      ({ x, y }) => {
        const effectiveMinX = _.min([minX, x]) ?? 0;
        const effectiveMaxX = _.max([maxX, x]) ?? 0;
        const effectiveMinY = _.min([minY, y]) ?? 0;
        const effectiveMaxY = _.max([maxY, y]) ?? 0;

        const effectiveWidth = effectiveMaxX - effectiveMinX;
        const effectiveHeight = effectiveMaxY - effectiveMinY;

        const effectiveArea = effectiveWidth * effectiveHeight;
        const effectiveDensity = effectiveOccupiedLocationsCount / (effectiveArea || 1);

        const densityDifferenceFromTarget = effectiveDensity - 0.25;
        const boundsRatioDifferenceFromTarget = effectiveWidth / effectiveHeight - 1;

        return 0.75 * densityDifferenceFromTarget * densityDifferenceFromTarget + 0.25 * boundsRatioDifferenceFromTarget * boundsRatioDifferenceFromTarget;
      }
    );
  }
})
export default potentialNextSlimeLocationsState;
