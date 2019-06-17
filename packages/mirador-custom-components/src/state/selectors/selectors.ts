import {IDiscovery, IState} from "mirador-core-model"
import {useSelector} from "react-redux"

export const getDiscovery = (): IDiscovery => {
  return useSelector((state: IState) => state.config.discovery)
}
