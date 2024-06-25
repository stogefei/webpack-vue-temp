// import AutoPlaceModule from 'diagram-js/lib/features/auto-place'
import CustomAutoPlace from './CustomAutoPlace'


export default {
  __depends__: [],
  __init__: ['customAutoPlace'],
  customAutoPlace: ['type', CustomAutoPlace]
}
