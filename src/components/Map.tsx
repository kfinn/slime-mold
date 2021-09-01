import _ from "lodash";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import useInterval from "../hooks/useInterval";
import mapViewBoxState from "../state/mapViewBoxState";
import potentialNextSlimeLocationsState from "../state/potentialNextSlimeLocationsState";
import slimeLocationsState, { useCreateLocation } from "../state/slimeLocationsState";
import SlimeLocation from "./SlimeLocation";

export default function Map() {
  const potentialNextSlimeLocations = useRecoilValue(potentialNextSlimeLocationsState);
  const slimeLocations = useRecoilValue(slimeLocationsState);
  const mapViewport = useRecoilValue(mapViewBoxState);
  const createLocation = useCreateLocation();

  const update = useCallback(() => {
    createLocation(
      _.sample(
        _.slice(
          potentialNextSlimeLocations,
          0,
          Math.ceil(potentialNextSlimeLocations.length * 0.25)
        )
      )!
    );
  }, [potentialNextSlimeLocations, createLocation]);

  useInterval(update, 12);

  return <svg className="map-svg" viewBox={mapViewport}>
    {
      _.map(slimeLocations, ({ id }) => <SlimeLocation id={id} key={id} />)
    }
  </svg>
}
