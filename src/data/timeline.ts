import { Timelines } from "../type/Timelines";

export const timelineData: Timelines = {
  start: [
    {
      type: "dialog",
      text: [
        "どうして忘れていたんだろう。",
        "あれは間違いなく事実だ。",
        "確かに覚えている。",
        "感触、におい。忘れられない。",
        "あのときまでは、何も問題なかった。そう、何も問題なかった。",
        "でも一度思い出すとそのことしか考えられなくなった。",
        "奇妙だった。時間は伸び縮みしたし、常に画面越しに見ているような感じがしていた。",
        "あれは目の前だったんだ。世界は長方形でなくてオレンジのカーブミラーだということを忘れてはいけない。",
        "でもそんなことはどうだっていい。もうすぐわかる。あと16秒もすればわかる。完全に忘れるか、現実に戻してくれる。本当の目覚めだ。",
      ],
    },
    { type: "setBackground", x: 400, y: 300, key: "station" },
    { type: "playSound", key: "train" },
    { type: "dialog", text: ["何も思い残すことはない。"] },
    { type: "setBackground", x: 400, y: 300, key: "red" },
    { type: "fullImage" },
    { type: "timelineTransition", timelineID: "home01" },
  ],

  home01: [
    {
      type: "dialog",
      text: [
        "テレビを見ていた。ドアベルが鳴った。8時頃だ。宅配を頼んでいない。面倒な感じがした。",
      ],
    },
    { type: "timelineTransition", timelineID: "choice01" },
  ],

  choice01: [
    { type: "dialog", text: ["開ける？"] },
    {
      type: "choice",
      choices: [
        { text: "はい", timelineID: "choice01_a01" },
        { text: "いいえ", timelineID: "choice01_a02" },
      ],
    },
  ],
  choice01_a01: [
    { type: "setBackground", x: 400, y: 300, key: "street" },
    {
      type: "dialog",
      text: ["開けた。ドアの前にはスーツの中年の男が立っていた。"],
    },
    { type: "clearForeground" },
    { type: "sceneTransition", key: "ending" },
  ],
  choice01_a02: [
    {
      type: "dialog",
      text: [
        "しばらくドアベルが鳴らされた後、静かになった。その後、この出来事について思い出すことはなかった。",
      ],
    },
    { type: "sceneTransition", key: "ending" },
  ],
};
