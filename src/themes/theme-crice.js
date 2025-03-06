export default {
  info:{
    id: 1,
    name: "theme-crice",
    preview: "theme-crice.png",
  },
  rotate: 0,
  compassSize: {
    width: 800,
    height: 800,
  },
  layerFilt:[
  ],
  latticeFill: [],
  scaclStyle:{
    minLineHeight: 10,
    midLineHeight: 25,
    maxLineHeight: 25,
  },
  line: {
    borderColor: "#AAAAAA",
    scaleColor: "#AAAAAA",
    scaleHighlightColor: "#AAAAAA",
  },
  isShowTianxinCross: false,

  data: [
    {
      name: "圆规尺刻度",
      startAngle: 0,
      textColor: "white",
      vertical: false,
      togetherStyle: "empty",
      data: [
        "0",
        "30",
        "60",
        "90",
        "120",
        "150",
        "180",
        "210",
        "240",
        "270",
        "300",
        "330",
      ],
    },
    {
      name: "方位",
      startAngle: 0,
      fontSize: 32,
      textColor: "#ffff00",
      vertical: false,
      togetherStyle: "empty",
      data: ["北", "东北", "东", "东南", "南", "西南", "西", "西北"],
    },
    {
      name: "刻度标记",
      startAngle: 0,
      fontSize: 18,
      textColor: "#cccccc",
      vertical: true,
      togetherStyle: "empty",
      data: [],
    },
  ],
};
