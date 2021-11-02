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
      ],
    },
    { type: "dialog", text: ["あんなことを。", "aaaa", "bbbb"] },
    {
      type: "dialog",
      text: [
        "事実だとすれば、俺は一体なんなんだ。考えても、次の瞬間覚えてないんじゃ、俺じゃない誰かだ。",
      ],
    },
    {
      type: "dialog",
      text: [
        "奇妙なことはあった。時間の流れが変だったし、レンズ越しに見ているような、そういう感覚があった。",
      ],
    },
    {
      type: "dialog",
      text: [
        "でも、本当に事実なんだろうか？誰かがそう思わそうとしてるだけなんじゃないのか？",
      ],
    },
    {
      type: "dialog",
      text: [
        "まあ、どうでもいい。あと45秒もすればわかることだ。肉体に劇的な変化が起きて、あらゆる眠った精神を引き起こすだろう。本当の目覚めだ。",
      ],
    },
    { type: "setBackground", x: 400, y: 300, key: "station" },
    { type: "playSound", key: "train" },
    { type: "dialog", text: ["そうと信じたい。"] },
    { type: "setBackground", x: 400, y: 300, key: "red" },
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
