declare module 'feng-shui-compass' {
  import { Component } from 'vue'

  // 罗盘配置接口
  export interface CompassConfig {
    rotate: number
    compassSize: {
      width: number
      height: number
    }
    latticeFill: [number, number, string][]
    scaclStyle: {
      minLineHeight: number
      midLineHeight: number 
      maxLineHeight: number
    }
    line: {
      borderColor: string
      scaleColor: string
      scaleHighlightColor: string
    }
    isShowTianxinCross: boolean
    showScale: boolean
    autoFontSize: boolean
    data: LayerConfig[]
  }

  // 层配置接口
  export interface LayerConfig {
    name: string | string[]
    startAngle: number
    fontSize?: number
    textColor: string | string[]
    vertical: boolean
    togetherStyle: 'empty' | 'equally'
    shape?: 'circle' | 'polygon'
    data: string[] | string[][]
  }

  // 主题接口
  export interface Themes {
    compassTheme: CompassConfig
    [key: string]: CompassConfig
  }

  // 点击事件返回数据接口
  export interface LatticeClickEvent {
    layerIndex: number
    latticeIndex: number
    data: string | string[]
  }

  // 组件属性接口
  export interface FengShuiCompassProps {
    config: CompassConfig
  }

  // 导出组件
  export const FengShuiCompassSvg: Component<FengShuiCompassProps>
  
  // 导出主题
  export const themes: Themes
}