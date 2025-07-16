import FengShuiCompassSvg from './components/feng-shui-compass-svg/feng-shui-compass-svg.vue'
import FengShuiCompass from './components/feng-shui-compass/feng-shui-compass.vue'
import themes from './themes'
import { FengShuiCompass as CompassClass, CompassData, CompressUtil } from './components/feng-shui-compass/compass-main'
const CompassCanvasCreateor = {
  FengShuiCompass: CompassClass, CompassData, CompressUtil
}
export {
  FengShuiCompassSvg,
  FengShuiCompass,
  themes,
  CompassCanvasCreateor
}