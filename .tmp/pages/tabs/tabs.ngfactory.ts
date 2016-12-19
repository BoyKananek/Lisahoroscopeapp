/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from './tabs';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/element';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from 'ionic-angular/navigation/nav-params';
import * as import10 from 'ionic-angular/components/alert/alert';
import * as import11 from '@angular/http/src/http';
import * as import12 from 'ionic-angular/components/loading/loading';
import * as import13 from '@angular/core/src/metadata/view';
import * as import14 from '@angular/core/src/linker/component_factory';
import * as import15 from '../../node_modules/ionic-angular/components/tabs/tabs.ngfactory';
import * as import16 from '../../node_modules/ionic-angular/components/tabs/tab.ngfactory';
import * as import17 from 'ionic-angular/navigation/view-controller';
import * as import18 from 'ionic-angular/components/app/app';
import * as import19 from 'ionic-angular/config/config';
import * as import20 from '@angular/core/src/linker/element_ref';
import * as import21 from 'ionic-angular/platform/platform';
import * as import22 from 'ionic-angular/navigation/deep-linker';
import * as import23 from 'ionic-angular/util/keyboard';
import * as import24 from '@angular/core/src/zone/ng_zone';
import * as import25 from '@angular/core/src/linker/component_factory_resolver';
import * as import26 from 'ionic-angular/gestures/gesture-controller';
import * as import27 from 'ionic-angular/transitions/transition-controller';
import * as import28 from 'ionic-angular/components/tabs/tab';
import * as import29 from 'ionic-angular/components/tabs/tabs';
export class Wrapper_TabsPage {
  context:import0.TabsPage;
  changed:boolean;
  constructor(p0:any,p1:any,p2:any,p3:any,p4:any) {
    this.changed = false;
    this.context = new import0.TabsPage(p0,p1,p2,p3,p4);
  }
  detectChangesInternal(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this.changed;
    this.changed = false;
    return changed;
  }
}
var renderType_TabsPage_Host:import2.RenderComponentType = (null as any);
class _View_TabsPage_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _TabsPage_0_4:Wrapper_TabsPage;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_TabsPage_Host0,renderType_TabsPage_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    this._el_0 = this.selectOrCreateHostElement('ng-component',rootSelector,(null as any));
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_TabsPage0(this.viewUtils,this.injector(0),this._appEl_0);
    this._TabsPage_0_4 = new Wrapper_TabsPage(this.parentInjector.get(import8.NavController),this.parentInjector.get(import9.NavParams),this.parentInjector.get(import10.AlertController),this.parentInjector.get(import11.Http),this.parentInjector.get(import12.LoadingController));
    this._appEl_0.initComponent(this._TabsPage_0_4.context,([] as any[]),compView_0);
    compView_0.create(this._TabsPage_0_4.context,this.projectableNodes,(null as any));
    this.init(([] as any[]).concat([this._el_0]),[this._el_0],([] as any[]),([] as any[]));
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.TabsPage) && (0 === requestNodeIndex))) { return this._TabsPage_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._TabsPage_0_4.detectChangesInternal(this,this._el_0,throwOnChange);
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_TabsPage_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<any> {
  if ((renderType_TabsPage_Host === (null as any))) { (renderType_TabsPage_Host = viewUtils.createRenderComponentType('',0,import13.ViewEncapsulation.None,([] as any[]),{})); }
  return new _View_TabsPage_Host0(viewUtils,parentInjector,declarationEl);
}
export const TabsPageNgFactory:import14.ComponentFactory<import0.TabsPage> = new import14.ComponentFactory<import0.TabsPage>('ng-component',viewFactory_TabsPage_Host0,import0.TabsPage);
const styles_TabsPage:any[] = ([] as any[]);
var renderType_TabsPage:import2.RenderComponentType = (null as any);
class _View_TabsPage0 extends import1.AppView<import0.TabsPage> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _Tabs_0_4:import15.Wrapper_Tabs;
  _text_1:any;
  _el_2:any;
  /*private*/ _appEl_2:import3.AppElement;
  _Tab_2_4:import16.Wrapper_Tab;
  _text_3:any;
  _el_4:any;
  /*private*/ _appEl_4:import3.AppElement;
  _Tab_4_4:import16.Wrapper_Tab;
  _text_5:any;
  _el_6:any;
  /*private*/ _appEl_6:import3.AppElement;
  _Tab_6_4:import16.Wrapper_Tab;
  _text_7:any;
  _el_8:any;
  /*private*/ _appEl_8:import3.AppElement;
  _Tab_8_4:import16.Wrapper_Tab;
  _text_9:any;
  _text_10:any;
  _map_0:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_15:any;
  /*private*/ _expr_16:any;
  _map_1:any;
  /*private*/ _expr_21:any;
  /*private*/ _expr_22:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_TabsPage0,renderType_TabsPage,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = this.renderer.createElement(parentRenderNode,'ion-tabs',(null as any));
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = import15.viewFactory_Tabs0(this.viewUtils,this.injector(0),this._appEl_0);
    this._Tabs_0_4 = new import15.Wrapper_Tabs(this.parentInjector.get(import8.NavController,(null as any)),this.parentInjector.get(import17.ViewController,(null as any)),this.parentInjector.get(import18.App),this.parentInjector.get(import19.Config),new import20.ElementRef(this._el_0),this.parentInjector.get(import21.Platform),this.renderer,this.parentInjector.get(import22.DeepLinker));
    this._appEl_0.initComponent(this._Tabs_0_4.context,([] as any[]),compView_0);
    this._text_1 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_2 = this.renderer.createElement((null as any),'ion-tab',(null as any));
    this.renderer.setElementAttribute(this._el_2,'role','tabpanel');
    this.renderer.setElementAttribute(this._el_2,'tabIcon','calendar');
    this.renderer.setElementAttribute(this._el_2,'tabTitle','TODAY');
    this._appEl_2 = new import3.AppElement(2,0,this,this._el_2);
    var compView_2:any = import16.viewFactory_Tab0(this.viewUtils,this.injector(2),this._appEl_2);
    this._Tab_2_4 = new import16.Wrapper_Tab(this._Tabs_0_4.context,this.parentInjector.get(import18.App),this.parentInjector.get(import19.Config),this.parentInjector.get(import23.Keyboard),new import20.ElementRef(this._el_2),this.parentInjector.get(import24.NgZone),this.renderer,this.parentInjector.get(import25.ComponentFactoryResolver),compView_2.ref,this.parentInjector.get(import26.GestureController),this.parentInjector.get(import27.TransitionController),this.parentInjector.get(import22.DeepLinker,(null as any)));
    this._appEl_2.initComponent(this._Tab_2_4.context,([] as any[]),compView_2);
    compView_2.create(this._Tab_2_4.context,([] as any[]),(null as any));
    this._text_3 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_4 = this.renderer.createElement((null as any),'ion-tab',(null as any));
    this.renderer.setElementAttribute(this._el_4,'role','tabpanel');
    this.renderer.setElementAttribute(this._el_4,'tabIcon','apps');
    this.renderer.setElementAttribute(this._el_4,'tabTitle','BROWSE');
    this._appEl_4 = new import3.AppElement(4,0,this,this._el_4);
    var compView_4:any = import16.viewFactory_Tab0(this.viewUtils,this.injector(4),this._appEl_4);
    this._Tab_4_4 = new import16.Wrapper_Tab(this._Tabs_0_4.context,this.parentInjector.get(import18.App),this.parentInjector.get(import19.Config),this.parentInjector.get(import23.Keyboard),new import20.ElementRef(this._el_4),this.parentInjector.get(import24.NgZone),this.renderer,this.parentInjector.get(import25.ComponentFactoryResolver),compView_4.ref,this.parentInjector.get(import26.GestureController),this.parentInjector.get(import27.TransitionController),this.parentInjector.get(import22.DeepLinker,(null as any)));
    this._appEl_4.initComponent(this._Tab_4_4.context,([] as any[]),compView_4);
    compView_4.create(this._Tab_4_4.context,([] as any[]),(null as any));
    this._text_5 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_6 = this.renderer.createElement((null as any),'ion-tab',(null as any));
    this.renderer.setElementAttribute(this._el_6,'role','tabpanel');
    this.renderer.setElementAttribute(this._el_6,'tabIcon','share-alt');
    this.renderer.setElementAttribute(this._el_6,'tabTitle','SHARE');
    this._appEl_6 = new import3.AppElement(6,0,this,this._el_6);
    var compView_6:any = import16.viewFactory_Tab0(this.viewUtils,this.injector(6),this._appEl_6);
    this._Tab_6_4 = new import16.Wrapper_Tab(this._Tabs_0_4.context,this.parentInjector.get(import18.App),this.parentInjector.get(import19.Config),this.parentInjector.get(import23.Keyboard),new import20.ElementRef(this._el_6),this.parentInjector.get(import24.NgZone),this.renderer,this.parentInjector.get(import25.ComponentFactoryResolver),compView_6.ref,this.parentInjector.get(import26.GestureController),this.parentInjector.get(import27.TransitionController),this.parentInjector.get(import22.DeepLinker,(null as any)));
    this._appEl_6.initComponent(this._Tab_6_4.context,([] as any[]),compView_6);
    compView_6.create(this._Tab_6_4.context,([] as any[]),(null as any));
    this._text_7 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_8 = this.renderer.createElement((null as any),'ion-tab',(null as any));
    this.renderer.setElementAttribute(this._el_8,'role','tabpanel');
    this.renderer.setElementAttribute(this._el_8,'tabIcon','contact');
    this.renderer.setElementAttribute(this._el_8,'tabTitle','PROFILE');
    this._appEl_8 = new import3.AppElement(8,0,this,this._el_8);
    var compView_8:any = import16.viewFactory_Tab0(this.viewUtils,this.injector(8),this._appEl_8);
    this._Tab_8_4 = new import16.Wrapper_Tab(this._Tabs_0_4.context,this.parentInjector.get(import18.App),this.parentInjector.get(import19.Config),this.parentInjector.get(import23.Keyboard),new import20.ElementRef(this._el_8),this.parentInjector.get(import24.NgZone),this.renderer,this.parentInjector.get(import25.ComponentFactoryResolver),compView_8.ref,this.parentInjector.get(import26.GestureController),this.parentInjector.get(import27.TransitionController),this.parentInjector.get(import22.DeepLinker,(null as any)));
    this._appEl_8.initComponent(this._Tab_8_4.context,([] as any[]),compView_8);
    compView_8.create(this._Tab_8_4.context,([] as any[]),(null as any));
    this._text_9 = this.renderer.createText((null as any),'\n',(null as any));
      compView_0.create(this._Tabs_0_4.context,[([] as any[]).concat([
        this._text_1,
        this._el_2,
        this._text_3,
        this._el_4,
        this._text_5,
        this._el_6,
        this._text_7,
        this._el_8,
        this._text_9
      ]
    )],(null as any));
    this._text_10 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._map_0 = import4.pureProxy1((p0:any):{[key: string]:any} => {
      return {data: p0};
    });
    this._expr_5 = import7.UNINITIALIZED;
    this._expr_6 = import7.UNINITIALIZED;
    this._expr_10 = import7.UNINITIALIZED;
    this._expr_11 = import7.UNINITIALIZED;
    var disposable_0:Function = this.renderer.listen(this._el_6,'ionSelect',this.eventHandler(this._handle_ionSelect_6_0.bind(this)));
    this._expr_15 = import7.UNINITIALIZED;
    this._expr_16 = import7.UNINITIALIZED;
    const subscription_0:any = this._Tab_6_4.context.ionSelect.subscribe(this.eventHandler(this._handle_ionSelect_6_0.bind(this)));
    this._map_1 = import4.pureProxy1((p0:any):{[key: string]:any} => {
      return {data: p0};
    });
    this._expr_21 = import7.UNINITIALIZED;
    this._expr_22 = import7.UNINITIALIZED;
    this.init(([] as any[]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._el_8,
      this._text_9,
      this._text_10
    ]
    ,[disposable_0],[subscription_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import28.Tab) && (2 === requestNodeIndex))) { return this._Tab_2_4.context; }
    if (((token === import28.Tab) && (4 === requestNodeIndex))) { return this._Tab_4_4.context; }
    if (((token === import28.Tab) && (6 === requestNodeIndex))) { return this._Tab_6_4.context; }
    if (((token === import28.Tab) && (8 === requestNodeIndex))) { return this._Tab_8_4.context; }
    if (((token === import29.Tabs) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 9)))) { return this._Tabs_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0:any = 1;
    this._Tabs_0_4.check_selectedIndex(currVal_0,throwOnChange,false);
    this._Tabs_0_4.detectChangesInternal(this,this._el_0,throwOnChange);
    const currVal_1:any = this.context.tab1Root;
    this._Tab_2_4.check_root(currVal_1,throwOnChange,false);
    const currVal_2:any = this._map_0(this.context.data);
    this._Tab_2_4.check_rootParams(currVal_2,throwOnChange,false);
    const currVal_3:any = 'TODAY';
    this._Tab_2_4.check_tabTitle(currVal_3,throwOnChange,false);
    const currVal_4:any = 'calendar';
    this._Tab_2_4.check_tabIcon(currVal_4,throwOnChange,false);
    this._Tab_2_4.detectChangesInternal(this,this._el_2,throwOnChange);
    const currVal_7:any = this.context.tab2Root;
    this._Tab_4_4.check_root(currVal_7,throwOnChange,false);
    const currVal_8:any = 'BROWSE';
    this._Tab_4_4.check_tabTitle(currVal_8,throwOnChange,false);
    const currVal_9:any = 'apps';
    this._Tab_4_4.check_tabIcon(currVal_9,throwOnChange,false);
    this._Tab_4_4.detectChangesInternal(this,this._el_4,throwOnChange);
    const currVal_13:any = 'SHARE';
    this._Tab_6_4.check_tabTitle(currVal_13,throwOnChange,false);
    const currVal_14:any = 'share-alt';
    this._Tab_6_4.check_tabIcon(currVal_14,throwOnChange,false);
    this._Tab_6_4.detectChangesInternal(this,this._el_6,throwOnChange);
    const currVal_17:any = this.context.tab4Root;
    this._Tab_8_4.check_root(currVal_17,throwOnChange,false);
    const currVal_18:any = this._map_1(this.context.data);
    this._Tab_8_4.check_rootParams(currVal_18,throwOnChange,false);
    const currVal_19:any = 'PROFILE';
    this._Tab_8_4.check_tabTitle(currVal_19,throwOnChange,false);
    const currVal_20:any = 'contact';
    this._Tab_8_4.check_tabIcon(currVal_20,throwOnChange,false);
    this._Tab_8_4.detectChangesInternal(this,this._el_8,throwOnChange);
    this.detectContentChildrenChanges(throwOnChange);
    const currVal_5:any = this._Tab_2_4.context._tabId;
    if (import4.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementAttribute(this._el_2,'id',((currVal_5 == (null as any))? (null as any): currVal_5.toString()));
      this._expr_5 = currVal_5;
    }
    const currVal_6:any = this._Tab_2_4.context._btnId;
    if (import4.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setElementAttribute(this._el_2,'aria-labelledby',((currVal_6 == (null as any))? (null as any): currVal_6.toString()));
      this._expr_6 = currVal_6;
    }
    const currVal_10:any = this._Tab_4_4.context._tabId;
    if (import4.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this.renderer.setElementAttribute(this._el_4,'id',((currVal_10 == (null as any))? (null as any): currVal_10.toString()));
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = this._Tab_4_4.context._btnId;
    if (import4.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementAttribute(this._el_4,'aria-labelledby',((currVal_11 == (null as any))? (null as any): currVal_11.toString()));
      this._expr_11 = currVal_11;
    }
    const currVal_15:any = this._Tab_6_4.context._tabId;
    if (import4.checkBinding(throwOnChange,this._expr_15,currVal_15)) {
      this.renderer.setElementAttribute(this._el_6,'id',((currVal_15 == (null as any))? (null as any): currVal_15.toString()));
      this._expr_15 = currVal_15;
    }
    const currVal_16:any = this._Tab_6_4.context._btnId;
    if (import4.checkBinding(throwOnChange,this._expr_16,currVal_16)) {
      this.renderer.setElementAttribute(this._el_6,'aria-labelledby',((currVal_16 == (null as any))? (null as any): currVal_16.toString()));
      this._expr_16 = currVal_16;
    }
    const currVal_21:any = this._Tab_8_4.context._tabId;
    if (import4.checkBinding(throwOnChange,this._expr_21,currVal_21)) {
      this.renderer.setElementAttribute(this._el_8,'id',((currVal_21 == (null as any))? (null as any): currVal_21.toString()));
      this._expr_21 = currVal_21;
    }
    const currVal_22:any = this._Tab_8_4.context._btnId;
    if (import4.checkBinding(throwOnChange,this._expr_22,currVal_22)) {
      this.renderer.setElementAttribute(this._el_8,'aria-labelledby',((currVal_22 == (null as any))? (null as any): currVal_22.toString()));
      this._expr_22 = currVal_22;
    }
    this.detectViewChildrenChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._Tabs_0_4.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._Tabs_0_4.context.ngOnDestroy();
  }
  private _handle_ionSelect_6_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.share()) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_TabsPage0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<import0.TabsPage> {
  if ((renderType_TabsPage === (null as any))) { (renderType_TabsPage = viewUtils.createRenderComponentType('',0,import13.ViewEncapsulation.None,styles_TabsPage,{})); }
  return new _View_TabsPage0(viewUtils,parentInjector,declarationEl);
}