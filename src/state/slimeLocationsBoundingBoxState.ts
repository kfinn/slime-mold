import _ from "lodash";
import { selector } from "recoil";
import slimeLocationsState from "./slimeLocationsState";

const slimeLocationsBoundingBoxState = selector({
  key: 'slimeLocationsXRangeState',
  get: ({ get }) => {
    const slimeLocations = get(slimeLocationsState);

    const slimeXs = _.map(slimeLocations, 'x');
    const slimeYs = _.map(slimeLocations, 'y');
    const minSlimeX = _.min(slimeXs) || 0;
    const maxSlimeX = _.max(slimeXs) || 1;
    const minSlimeY = _.min(slimeYs) || 0;
    const maxSlimeY = _.max(slimeYs) || 1;

    return {
      minX: minSlimeX,
      maxX: maxSlimeX,
      minY: minSlimeY,
      maxY: maxSlimeY,
    }
  }
});
export default slimeLocationsBoundingBoxState;
