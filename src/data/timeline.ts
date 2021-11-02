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
        "夜仕事を終えて本を読んでいると、ドアベルが鳴った。",
        "来客などない時間帯なので、出るか出ないか逡巡する。",
      ],
    },
    { type: "timelineTransition", timelineID: "choice01" },
  ],

  choice01: [
    { type: "dialog", text: ["開ける？"] },
    {
      type: "choice",
      choices: [
        { text: "はい", timelineID: "home02" },
        { text: "いいえ", timelineID: "choice01_a02" },
      ],
    },
  ],
  choice01_a02: [
    {
      type: "dialog",
      text: [
        "テレビの音量を少し下げて、そのまま無視した。",
        "居留守だと明らかだからか、しばらくドアベルが鳴らされた後、静かになった。",
        "その後来客が誰だったのかはわからず、来たことを思い出すことすらなかった。",
      ],
    },
    { type: "sceneTransition", key: "ending" },
  ],

  home02: [
    {
      type: "dialog",
      text: [
        "開けた。",
        "見覚えのない両方スーツの中年の男と若い男が立っていた。",
        "面倒そうな感じがして、少し後悔した。",
      ],
    },
    { type: "sceneTransition", key: "ending" },
  ],
};
