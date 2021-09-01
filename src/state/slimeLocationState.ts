import _ from "lodash";
import { selectorFamily } from "recoil";
import slimeLocationsState from "./slimeLocationsState";

export interface SlimeLocation {
  id: number;
  x: number;
  y: number;
}

const DEFAULT_SLIME_LOCATION = { id: 0, x: 0, y: 0 };

const slimeLocationState = selectorFamily({
  key: "slimeLocationsState",
  get: (id: number) => ({ get }) => _.find(get(slimeLocationsState), (slimeLocation: SlimeLocation) => slimeLocation.id === id) || DEFAULT_SLIME_LOCATION
});
export default slimeLocationState
