import { atom, useSetRecoilState } from "recoil";
import { SlimeLocation } from "./slimeLocationState";

const slimeLocationsState = atom<SlimeLocation[]>({
  key: "slimeLocationsState",
  default: [{ id: 0, x: 0, y: 0 }]
});
export default slimeLocationsState

export function useCreateLocation() {
  const setSlimeLocationsState = useSetRecoilState(slimeLocationsState);
  return ({ x, y }: { x: number, y: number }) => {
    setSlimeLocationsState((slimeLocations) => {
      return [
        ...slimeLocations,
        {
          id: slimeLocations.length,
          x,
          y
        }
      ]
    })
  }
}
