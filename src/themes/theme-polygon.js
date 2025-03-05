export default [
  {
    name: "--",
    startAngle: 45,
    fontSize: 78,
    textColor: "white",
    vertical: false,
    togetherStyle: "empty",
    shape: "polygon",
    data: ["小吉", "大凶", "大吉", "最大吉", "中吉", "最大凶", "小凶", "中凶"]
  },
  {
    name: "--",
    startAngle: 0,
    fontSize: 78,
    textColor: "white",
    vertical: false,
    togetherStyle: "empty",
    shape: "polygon",
    data: ["伏位", "五鬼", "天医", "生气", "延年", "绝命", "祸害", "六杀"]
  },
  {
    name: ["后先天八卦", "先天八卦", "龙上八煞"],
    startAngle: 0,
    fontSize: 18,
    textColor: ["white", "red", "white"],
    vertical: false,
    togetherStyle: "equally",
    shape: "polygon",
    data: [
      ["坎", "☰", "辰"],
      ["艮", "☲", "寅"],
      ["震", "☱", "申"],
      ["巽", "☴", "酉"],
      ["离", "☵", "亥"],
      ["坤", "☶", "卯"],
      ["兑", "☳", "巳"],
      ["乾", "☷", "午"],
    ],
  },
  {
    name: "方位",
    startAngle: 0,
    fontSize: 32,
    textColor: "#ffff00",
    vertical: false,
    togetherStyle: "empty",
    data: ["北", "东北", "东", "东南", "南", "西南", "西", "西北"]
  },
  {
    name: "九星",
    startAngle: 0,
    textColor: "white",
    shape: "circle",
    data: ["贪", "巨", "禄", "文", "武", "廉", "破", "辅", "弼"]
  }
]