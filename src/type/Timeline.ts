import { Choice } from './Choice';

type DialogEvent = {
  type: 'dialog',
  text: string,
  actorName?: string
};

// 背景設定
type SetBackGroundEvent = {
  type: 'setBackground',
  x: number,
  y: number,
  key: string
};

// 前景追加イベント
type AddForegroundEvent = {
  type: 'addForeground',
  x: number,
  y: number,
  key: string
};

// 前景クリアイベント
type ClearForegroundEvent = {
  type: 'clearForeground'
};

// タイムライン遷移イベント
type TimelineTransitionEvent = {
  type: 'timelineTransition',
  timelineID: string
};

// シーン遷移イベント
type SceneTransitionEvent = {
  type: 'sceneTransition',
  key: string,
  data?: object
};

// 選択肢イベント
type ChoiceEvent = {
  type: 'choice',
  choices: Choice[]
};

// Timelineはイベントの配列
export type Timeline = (DialogEvent|SetBackGroundEvent|AddForegroundEvent|ClearForegroundEvent|TimelineTransitionEvent|SceneTransitionEvent|ChoiceEvent)[];