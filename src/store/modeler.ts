import { defineStore } from 'pinia';
import type { Moddle } from 'moddle';
import type Modeler from 'bpmn-js/lib/Modeler';
import type Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import type Canvas from 'diagram-js/lib/core/Canvas';
import type ElementRegistry from 'diagram-js/lib/core/ElementRegistry';
import { toRaw } from 'vue';

type ModelerStore = {
  activeElement: BpmnElement | undefined;
  activeElementId: string | undefined;
  modeler: Modeler | undefined;
  moddle: Moddle | undefined;
  modeling: Modeling | undefined;
  canvas: Canvas | undefined;
  elementRegistry: ElementRegistry | undefined;
};

const defaultState:ModelerStore | any = {
  activeElement: undefined, // 活动节点
  activeElementId: undefined, // 活动节点id
  modeler: undefined,
  moddle: undefined, // BpmnModdle
  modeling: undefined,
  canvas: undefined, // 画布
  elementRegistry: undefined,
};


export default defineStore('modeler', {
  state: () => defaultState,

  getters: {
    getActive: (state) => toRaw(state.activeElement),

    getActiveId: (state) => state.activeElementId,

    getModeler: (state) => toRaw(state.modeler),

    getModdle: (state) => toRaw(state.moddle),

    getModeling: (state): Modeling | undefined => toRaw(state.modeling),

    getCanvas: (state): Canvas | undefined => toRaw(state.canvas),

    getElRegistry: (state) => toRaw(state.elementRegistry),
  },

  actions: {
    setModeler(modeler: Modeler | undefined) {
      this.modeler = modeler;
      if (modeler) {
        this.modeling = modeler.get<Modeling>('modeling');
        this.moddle = modeler.get<Moddle>('moddle');
        this.canvas = modeler.get<Canvas>('canvas');
        this.elementRegistry = modeler.get<ElementRegistry>('elementRegistry');
      } else {
        this.modeling =
          this.moddle =
          this.canvas =
          this.elementRegistry =
            undefined;
      }
    },

    setElement(element: BpmnElement | undefined) {
      this.activeElement = element;
      this.activeElementId = element?.id;
    },
  },
});
