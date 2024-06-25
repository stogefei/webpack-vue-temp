import Modeler from "bpmn-js/lib/Modeler";
import EventEmitter from "../../utils/EventEmitter";
import { catchError } from "../../utils/printCatch";
import { unObserver } from "../../utils/tool";
import EnhancementContextmenu from '../../additional-functions/EnhancementContextmenu'

export default function (designerDom, moduleAndExtensions, context) {
  const options = {
    container: designerDom,
    additionalModules: moduleAndExtensions[0] || [],
    moddleExtensions: moduleAndExtensions[1] || {},
    ...moduleAndExtensions[2]
  };

  // 清除旧 modeler
  context.getModeler && context.getModeler.destroy();
  // context.$store.commit("clearBpmnState");
  // console.log(options, 'options===');
  const modeler = new Modeler(options);

  // context.$store.commit("setModeler", modeler);

  EventEmitter.emit("modeler-init", modeler);
  EnhancementContextmenu(modeler)
  context.events?.forEach((event) => {
    modeler.on(event, function (eventObj:any) {
      let eventName = event.replace(/\./g, "-");
      let element = eventObj ? eventObj.element : null;
      context.$emit(eventName, unObserver({ element, eventObj }));
    });
  });

  modeler.on("commandStack.changed", async (event) => {
    try {
      const { xml } = await modeler.saveXML({ format: true });

      context.$emit("update:xml", xml);
      context.$emit("command-stack-changed", event);
    } catch (error) {
      catchError(error);
    }
  });

  // 右键菜单
  // EnhancementContextmenu(modeler, context.getEditor);

  console.log(modeler, 'modeler');

  return modeler;
}
