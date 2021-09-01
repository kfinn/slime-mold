import { selector } from "recoil";
import slimeLocationsBoundingBoxState from "./slimeLocationsBoundingBoxState";

const mapViewBoxState = selector({
  key: "mapViewportState",
  get: ({ get }) => {
    const { minX, maxX, minY, maxY } = get(slimeLocationsBoundingBoxState);
    return `${minX - 1} ${minY - 1} ${maxX - minX + 2} ${maxY - minY + 2}`
  }
});
export default mapViewBoxState;
