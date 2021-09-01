import { useRecoilValue } from "recoil"
import slimeLocationState from "../state/slimeLocationState"

export default function SlimeLocation({ id }: { id: number; }) {
  const { x, y } = useRecoilValue(slimeLocationState(id));
  return <rect className="slime" x={x} y={y} width="1" height="1"/>
}
