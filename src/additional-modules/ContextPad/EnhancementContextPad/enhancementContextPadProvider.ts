import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider'
import { Injector } from 'didi'
import EventBus from 'diagram-js/lib/core/EventBus'
import ContextPad from 'diagram-js/lib/features/context-pad/ContextPad'
import Modeling from 'bpmn-js/lib/features/modeling/Modeling.js'
import ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory'
import Connect from 'diagram-js/lib/features/connect/Connect'
import Create from 'diagram-js/lib/features/create/Create'
import PopupMenu from 'diagram-js/lib/features/popup-menu/PopupMenu'
import Canvas from 'diagram-js/lib/core/Canvas'
import Rules from 'diagram-js/lib/features/rules/Rules'
import { Element, Shape } from 'diagram-js/lib/model/Types'

class EnhancementContextPadProvider extends ContextPadProvider {
  private _contextPad: ContextPad

  private _modeling: Modeling

  private _elementFactory: ElementFactory

  private _autoPlace: any

  private _connect: Connect

  private _create: Create

  private _popupMenu: PopupMenu

  private _canvas: Canvas

  private _rules: Rules

  private _appendPreview: any

  constructor(
    config: any,
    injector: Injector,
    eventBus: EventBus,
    contextPad: ContextPad,
    modeling: Modeling,
    elementFactory: ElementFactory,
    connect: Connect,
    create: Create,
    popupMenu: PopupMenu,
    canvas: any,
    rules: Rules,
    translate: any,
    appendPreview: any
  ) {
    super(
      config,
      injector,
      eventBus,
      contextPad,
      modeling,
      elementFactory,
      connect,
      create,
      popupMenu,
      canvas,
      rules,
      translate,
      // @ts-ignore
      appendPreview,
    )
    this._contextPad = contextPad
    this._modeling = modeling
    this._elementFactory = elementFactory
    this._connect = connect
    this._create = create
    this._popupMenu = popupMenu
    this._canvas = canvas
    this._rules = rules
    this._appendPreview = appendPreview;
    this._autoPlace = injector.get('autoPlace', false)
    console.log(contextPad, 'contextPad');
  }

  getContextPadEntries(element: Element) {
    var appendPreview = this._appendPreview;
    const actions: Record<string, any> = {}

    const appendUserTask = (event: Event, element: Shape) => {
      const shape = this._elementFactory.createShape({ type: 'bpmn:UserTask' })
      this._create.start(event, shape, {
        source: element
      })
    }

    const append = this._autoPlace
      ? (event: Event, element: Shape) => {
          const shape = this._elementFactory.createShape({ type: 'bpmn:UserTask' })
          this._autoPlace.append(element, shape)
        }
      : appendUserTask

    // 添加创建用户任务按钮
    actions['append.append-user-task'] = {
      group: 'model',
      className: 'bpmn-icon-user-task',
      title: '用户任务',
      action: {
        dragstart: appendUserTask,
        click: append
      }
    }

    // 添加一个与edit一组的按钮
    actions['enhancement-op-1'] = {
      group: 'edit',
      className: 'enhancement-op',
      title: '扩展操作1',
      action: {
        click: function (e: Event) {
          alert('点击 扩展操作1')
        }
      }
    }

    // 添加一个新分组的自定义按钮
    actions['enhancement-op'] = {
      group: 'enhancement',
      className: 'enhancement-op',
      title: '扩展操作2',
      action: {
        click: function (e: Event) {
          alert('点击 扩展操作2')
        }
      }
    }

    return actions
  }
}
export default EnhancementContextPadProvider
