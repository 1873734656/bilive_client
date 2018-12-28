/*******************
 ****** index ******
 *******************/
/**
 * 应用设置
 *
 * @interface options
 */
interface options {
  [index: string]: any
  server: server
  config: config
  user: userCollection
  newUserData: userData
  info: optionsInfo
  apiIPs: string[]
  roomList: [number, number][]
}
interface server {
  [index: string]: number | string
  path: string
  hostname: string
  port: number
  protocol: string
}
interface config {
  [index: string]: number | string | number[]
  defaultUserID: number
  listenMethod: number
  serverURL: string
  listenNumber: number
  eventRooms: number[]
  rafflePause: number[]
  droprate: number
  raffleDelay: number
  adminServerChan: string
}
interface userCollection {
  [index: string]: userData
}
interface userData {
  [index: string]: string | boolean | number | number[]
  nickname: string
  userName: string
  passWord: string
  biliUID: number
  accessToken: string
  refreshToken: string
  cookie: string
  status: boolean
  getUserInfo: boolean
  doSign: boolean
  treasureBox: boolean
  silver2coin: boolean
  raffle: boolean
  appRaffle: boolean
  raffleLimit: boolean
  beatStorm: boolean
  ban: boolean
  banTime: number
  eventRoom: boolean
  sendGift: boolean
  sendGiftRoom: number
  autoSend: boolean
  signGroup: boolean
  main: boolean
  mainCoin: boolean
  mainCoinGroup: number[]
}
interface optionsInfo {
  [index: string]: configInfoData
  defaultUserID: configInfoData
  serverURL: configInfoData
  eventRooms: configInfoData
  rafflePause: configInfoData
  droprate: configInfoData
  raffleDelay: configInfoData
  adminServerChan: configInfoData
  nickname: configInfoData
  userName: configInfoData
  passWord: configInfoData
  biliUID: configInfoData
  accessToken: configInfoData
  refreshToken: configInfoData
  cookie: configInfoData
  status: configInfoData
  getUserInfo: configInfoData
  doSign: configInfoData
  treasureBox: configInfoData
  silver2coin: configInfoData
  raffle: configInfoData
  appRaffle: configInfoData
  raffleLimit: configInfoData
  beatStorm: configInfoData
  eventRoom: configInfoData
  sendGift: configInfoData
  sendGiftRoom: configInfoData
  autoSend: configInfoData
  signGroup: configInfoData
  main: configInfoData
  mainCoin: configInfoData
  mainCoinGroup: configInfoData
}
interface configInfoData {
  description: string
  tip: string
  type: string
  cognate?: string
}
interface AppClient {
  readonly actionKey: string
  readonly platform: string
  readonly appKey: string
  readonly build: string
  readonly device: string
  readonly mobiApp: string
  readonly TS: number
  readonly RND: number
  readonly DeviceID: string
  readonly baseQuery: string
  signQuery(params: string, ts?: boolean): string
  signQueryBase(params?: string): string
  readonly status: typeof status
  captcha: string
  userName: string
  passWord: string
  biliUID: number
  accessToken: string
  refreshToken: string
  cookieString: string
  headers: Headers
  init(): Promise<void>
  getCaptcha(): Promise<captchaResponse>
  login(): Promise<loginResponse>
  logout(): Promise<logoutResponse>
  refresh(): Promise<loginResponse>
}
interface Online extends AppClient {
  userData: userData
  readonly nickname: string
  jar: import('request').CookieJar
  captchaJPEG: string
  readonly tokenQuery: string
  Start(): Promise<'captcha' | 'stop' | void>
  Stop(): void
  getOnlineInfo(roomID?: number): Promise<'captcha' | 'stop' | void>
}
interface Daily extends Online {
  uid: string
  Start(): Promise<'captcha' | 'stop' | void>
  Stop(): void
  nextDay(): Promise<void>
  daily(): Promise<void>
  sign(): Promise<void>
  treasureBox(): Promise<void>
  eventRoom(): Promise<void>
  silver2coin(): Promise<void>
  sendGift(): Promise<void>
  autoSend(): Promise<void>
  signGroup(): Promise<void>
  getUserInfo(): Promise<void>
  bilibili(): Promise<void>
}
type User = Daily
/*******************
 **** dm_client ****
 *******************/
declare enum dmErrorStatus {
  'client' = 0,
  'danmaku' = 1,
  'timeout' = 2
}
interface DMclientOptions {
  roomID?: number
  userID?: number
  protocol?: DMclientProtocol
}
type DMclientProtocol = 'socket' | 'flash' | 'ws' | 'wss'
type DMerror = DMclientError | DMdanmakuError
interface DMclientError {
  status: dmErrorStatus.client | dmErrorStatus.timeout
  error: Error
}
interface DMdanmakuError {
  status: dmErrorStatus.danmaku
  error: TypeError
  data: Buffer
}
/*******************
 *** app_client ****
 *******************/
declare enum appStatus {
  'success' = 0,
  'captcha' = 1,
  'error' = 2,
  'httpError' = 3
}
/**
 * 公钥返回
 *
 * @interface getKeyResponse
 */
interface getKeyResponse {
  ts: number
  code: number
  data: getKeyResponseData
}
interface getKeyResponseData {
  hash: string
  key: string
}
/**
 * 验证返回
 *
 * @interface authResponse
 */
interface authResponse {
  ts: number
  code: number
  data: authResponseData
}
interface authResponseData {
  status: number
  token_info: authResponseTokeninfo
  cookie_info: authResponseCookieinfo
  sso: string[]
}
interface authResponseCookieinfo {
  cookies: authResponseCookieinfoCooky[]
  domains: string[]
}
interface authResponseCookieinfoCooky {
  name: string
  value: string
  http_only: number
  expires: number
}
interface authResponseTokeninfo {
  mid: number
  access_token: string
  refresh_token: string
  expires_in: number
}
/**
 * 注销返回
 *
 * @interface revokeResponse
 */
interface revokeResponse {
  message: string
  ts: number
  code: number
}
/**
 * 登录返回信息
 */
type loginResponse = loginResponseSuccess | loginResponseCaptcha | loginResponseError | loginResponseHttp
interface loginResponseSuccess {
  status: appStatus.success
  data: authResponse
}
interface loginResponseCaptcha {
  status: appStatus.captcha
  data: authResponse
}
interface loginResponseError {
  status: appStatus.error
  data: authResponse
}
interface loginResponseHttp {
  status: appStatus.httpError
  data: XHRresponse<getKeyResponse> | XHRresponse<authResponse> | undefined
}
/**
 * 登出返回信息
 */
type logoutResponse = revokeResponseSuccess | revokeResponseError | revokeResponseHttp
interface revokeResponseSuccess {
  status: appStatus.success
  data: revokeResponse
}
interface revokeResponseError {
  status: appStatus.error
  data: revokeResponse
}
interface revokeResponseHttp {
  status: appStatus.httpError
  data: XHRresponse<revokeResponse> | undefined
}
/**
 * 验证码返回信息
 */
type captchaResponse = captchaResponseSuccess | captchaResponseError
interface captchaResponseSuccess {
  status: appStatus.success
  data: Buffer
}
interface captchaResponseError {
  status: appStatus.error
  data: XHRresponse<Buffer> | undefined
}
/*******************
 ****** tools ******
 *******************/
/**
 * XHR返回
 *
 * @interface response
 * @template T
 */
interface XHRresponse<T> {
  response: {
    statusCode: number
  }
  body: T
}
/**
 * Server酱
 *
 * @interface serverChan
 */
interface serverChan {
  errno: number
  errmsg: string
  dataset: string
}
/*******************
 ** bilive_client **
 *******************/
/**
 * 消息格式
 *
 * @interface raffleMessage
 */
interface raffleMessage {
  cmd: 'smallTV' | 'raffle'
  roomID: number
  id: number
  type: string
  title: string
  time: number
  max_time: number
  time_wait: number
}
/**
 * 消息格式
 *
 * @interface lotteryMessage
 */
interface lotteryMessage {
  cmd: 'lottery'
  roomID: number
  id: number
  type: string
  title: string
  time: number
}
/**
 * 消息格式
 *
 * @interface beatStormMessage
 */
interface beatStormMessage {
  cmd: 'beatStorm'
  roomID: number
  id: number
  type: string
  title: string
  time: number
}
/**
 * 消息格式
 *
 * @interface systemMessage
 */
interface systemMessage {
  cmd: 'sysmsg'
  msg: string
}
type message = raffleMessage | lotteryMessage | beatStormMessage | systemMessage
/*******************
 **** listener *****
 *******************/
/**
 * 获取直播列表
 *
 * @interface getAllList
 */
interface getAllList {
  code: number
  msg: string
  message: string
  data: getAllListData
}
interface getAllListData {
  interval: number
  module_list: getAllListDataList[]
}
type getAllListDataList = getAllListDataModules | getAllListDataRooms
interface getAllListDataModules {
  module_info: getAllListDataModuleInfo
  list: getAllListDataModuleList[]
}
interface getAllListDataRooms {
  module_info: getAllListDataRoomInfo
  list: getAllListDataRoomList[]
}
interface getAllListDataBaseInfo {
  id: number
  type: number
  pic: string
  title: string
  link: string
}
interface getAllListDataModuleInfo extends getAllListDataBaseInfo {
  count?: number
}
interface getAllListDataRoomInfo extends getAllListDataBaseInfo {
  type: 6 | 9
}
interface getAllListDataModuleList {
  id: number
  pic: string
  link: string
  title: string
}
interface getAllListDataRoomList {
  roomid: number
  title: string
  uname: string
  online: number
  cover: string
  link: string
  face: string
  area_v2_parent_id: number
  area_v2_parent_name: string
  area_v2_id: number
  area_v2_name: string
  play_url: string
  current_quality: number
  accept_quality: number[]
  broadcast_type: number
  pendent_ld: string
  pendent_ru: string
  rec_type: number
  pk_id: number
}
/**
 * 搜索总督房间
 *
 * @interface searchID
 */
interface searchID {
  code: number
  msg: string
  result: searchIDres
}
interface searchIDres {
  live_user: User_res[]
}
interface User_res {
  roomid: number
  uid: number
}
 /**
  * 抽奖raffle检查
  *
  * @interface raffleCheck
  */
 interface raffleCheck {
   code: number
   msg: string
   message: string
   data: raffleCheckData
 }
 interface raffleCheckData {
   last_raffle_id: number
   last_raffle_type: string
   asset_animation_pic: string
   asset_tips_pic: string
   list: raffleCheckDataList[]
 }
 interface raffleCheckDataList {
   raffleId: number
   title: string
   type: string
   from: string
   from_user: raffleCheckDataListFromuser
   time_wait: number
   time: number
   max_time: number
   status: number
   asset_animation_pic: string
   asset_tips_pic: string
 }
 interface raffleCheckDataListFromuser {
   uname: string
   face: string
 }
/**
 * 抽奖lottery检查
 *
 * @interface lotteryCheck
 * 快速抽奖检查
 *
 * @interface lightenCheck
 */
interface lotteryCheck {
  code: number
  msg: string
  message: string
  data: lotteryCheckData
}
interface lotteryCheckData {
  guard: lotteryCheckDataGuard[]
  storm: lotteryCheckDataStorm[]
}
interface lotteryCheckDataGuard {
  id: number
  sender: lotteryCheckDataSender
  keyword: string
  time: number
  status: number
  mobile_display_mode: number
  mobile_static_asset: string
  mobile_animation_asset: string
}
interface lotteryCheckDataStorm {
  id: number
  sender: lotteryCheckDataSender
  keyword: string
  time: number
  status: number
  mobile_display_mode: number
  mobile_static_asset: string
  mobile_animation_asset: string
  extra: lotteryCheckDataStormExtra
}
interface lotteryCheckDataStormExtra {
  num: number
  content: string
}
interface lotteryCheckDataSender {
  uid: number
  uname: string
  face: string
}
/*******************
 ***** raffle ******
 *******************/
/**
 * 模拟进入房间，规避封禁
 *
 * @interface entryCheck
 */
interface entryCheck {
  code: number
  msg: string
  message: string
  data: entrydata
}
interface entrydata {
  encrypted: boolean
  hidden_till: number
  is_hidden: boolean
  is_locked: boolean
  is_portrait: boolean
  live_status: number
  lock_till: number
  need_p2p: number
  pwd_verified: boolean
  room_id: number
  short_id: number
  uid: number
}
/**
 * 模拟进入房间，规避封禁
 *
 * @interface entry_action
 */
interface entry_action {
  code: number
  msg: string
  message: string
}
/**
 * 参与抽奖信息
 *
 * @interface raffleJoin
 */
interface raffleJoin {
  code: number
  msg: string
  message: string
  data: raffleJoinData
}
interface raffleJoinData {
  face?: string
  from: string
  type: 'small_tv' | string
  roomid?: string
  raffleId: number | string
  time: number
  status: number
}
/**
 * 抽奖结果信息
 *
 * @interface raffleReward
 */
interface raffleReward {
  code: number
  msg: string
  message: string
  data: raffleRewardData
}
interface raffleRewardData {
  gift_id: number
  gift_name: string
  gift_num: number
  gift_from: string
  gift_type: number
  gift_content: string
  status?: number
}
type raffleAward = raffleReward
/**
 * 抽奖lottery
 *
 * @interface lotteryReward
 */
interface lotteryReward {
  code: number
  msg: string
  message: string
  data: lotteryRewardData
}
interface lotteryRewardData {
  id: number
  type: string
  award_type: number
  time: number
  message: string
  from: string
  award_list: lotteryRewardDataAwardlist[]
}
interface lotteryRewardDataAwardlist {
  name: string
  img: string
  type: number
  content: string
}
/**
 * 节奏跟风返回值
 *
 * @interface joinStorm
 */
interface joinStorm {
  code: number
  message: string
  msg: string
  data: joinStormData
}
interface joinStormData {
  gift_id: number
  title: string
  content: string
  mobile_content: string
  gift_img: string
  gift_num: number
  gift_name: string
}
/*******************
 ***** online ******
 *******************/
/**
 * 在线心跳返回
 *
 * @interface userOnlineHeart
 */
interface userOnlineHeart {
  code: number
  msg: string
}
/*******************
 ***** daily *******
 *******************/
/**
 * 签到信息
 *
 * @interface signInfo
 */
interface signInfo {
  code: number
  msg: string
  data: signInfoData
}
interface signInfoData {
  text: string
  status: number
  allDays: string
  curMonth: string
  newTask: number
  hadSignDays: number
  remindDays: number
}
/**
 * 在线心跳返回
 *
 * @interface userOnlineHeart
 */
interface userOnlineHeart {
  code: number
  msg: string
}
/**
 * 在线领瓜子宝箱
 *
 * @interface currentTask
 */
interface currentTask {
  code: number
  msg: string
  data: currentTaskData
}
interface currentTaskData {
  minute: number
  silver: number
  time_start: number
  time_end: number
}
/**
 * 领瓜子答案提交返回
 *
 * @interface award
 */
interface award {
  code: number
  msg: string
  data: awardData
}
interface awardData {
  silver: number
  awardSilver: number
  isEnd: number
}
/**
 * 房间信息app
 *
 * @interface roomInfo
 */
interface roomInfo {
  code: number
  data: roomInfoData
}
interface roomInfoData {
  room_id: number
  mid: number
  event_corner: roomInfoDataEvent[]
}
interface roomInfoDataEvent {
  event_type: string
  event_img: string
}
/**
 * 房间信息
 *
 * @interface roomInit
 */
interface roomInit {
  code: number
  msg: string
  message: string
  data: roomInitData
}
interface roomInitData {
  encrypted: boolean
  hidden_till: number
  is_hidden: boolean
  is_locked: boolean
  lock_till: number
  need_p2p: number
  pwd_verified: boolean
  room_id: number
  short_id: number
  uid: number
}
/**
 * 分享房间返回
 *
 * @interface shareCallback
 */
interface shareCallback {
  code: number
  msg: string
  message: string
}
/**
 * 每日包裹
 *
 * @interface getBagGift
 */
interface getBagGift {
  code: number
}
/**
 * 包裹信息
 *
 * @interface bagInfo
 */
interface bagInfo {
  code: number
  msg: string
  message: string
  data: bagInfoData[]
}
interface bagInfoData {
  id: number
  uid: number
  gift_id: number
  gift_num: number
  expireat: number
  gift_type: number
  gift_name: string
  gift_price: string
  img: string
  count_set: string
  combo_num: number
  super_num: number
}
/**
 * 赠送包裹礼物
 *
 * @interface sendBag
 */
interface sendBag {
  code: number
  msg: string
  message: string
  data: sendBagData
}
interface sendBagData {
  tid: string
  uid: number
  uname: string
  ruid: number
  rcost: number
  gift_id: number
  gift_type: number
  gift_name: string
  gift_num: number
  gift_action: string
  gift_price: number
  coin_type: string
  total_coin: number
  metadata: string
  rnd: string
}
/**
 * 佩戴勋章信息
 *
 * @interface wearInfo
 */
interface wearInfo {
  code: number
  msg: string
  message: string
  data: wearData
}
interface wearData {
  id: number
  uid: number
  target_id: number
  medal_id: number
  score: number
  level: number
  medal_name: string
  intimacy: number
  next_intimacy: number
  day_limit: number
  roominfo: wearRoomInfo
  today_feed: string
}
interface wearRoomInfo {
  room_id: number
  uid: number
}
/**
 * 佩戴勋章房间排名
 *
 * @interface RoomRank
 */
interface RoomRank {
  code: number
  data: RoomRankData
  message: string
  msg: string
}
interface RoomRankData {
  coin: number
  list: RoomRankDataList[]
  rank: number
  uname: string
  unlogin: number
}
interface RoomRankDataList {
  uid: number
  uname: string
  coin: number
  guard_level: number
  isSelf: number
  rank: number
  score: number
  face: string
}
/**
 * 上船信息
 *
 * @interface guardInfo
 */
interface guardInfos {
  data: guardInfo[]
}
interface guardInfo {
  GovernorName: string
  Guard: string
  GuardId: number
  MasterName: string
  OriginRoomId: number
  ShortRoomId: number
  Status: string
  Time: string
}
/**
 * 上船房间检查
 *
 * @interface guardRoom
 */
interface guardRoom {
  code: number
  msg: string
  message: string
  data: guardRoomData[]
}
interface guardRoomData {
  id: number
  keyword: string
  mobile_animation_asset: string
  mobile_display_mode: number
  mobile_static_asset: string
  privilege_type: number
  sender: guardRoomDataSender
  status: number
  time: number
}
interface guardRoomDataSender {
  face: string
  uid: number
  uname: string
}
interface guardJoin {
  code: number
  msg: string
  message: string
  data: guardJoinData
}
interface guardJoinData {
  award_id: string
  award_list: guardJoinDataAwardList[]
  award_type: number
  from: string
  id: number
  message: string
  privilege_type: number
  time: number
  type: string
}
interface guardJoinDataAwardList {
  content: string
  img: string
  name: string
  type: number
}
/**
 * 应援团
 *
 * @interface linkGroup
 */
interface linkGroup {
  code: number
  msg: string
  message: string
  data: linkGroupData
}
interface linkGroupData {
  list: linkGroupInfo[]
}
interface linkGroupInfo {
  group_id: number
  owner_uid: number
  owner_name: string
  group_type: number
  group_level: number
  group_cover: string
  group_name: string
  group_notice: string
  group_status: number
}
/**
 * 应援团签到返回
 *
 * @interface signGroup
 */
interface signGroup {
  code: number
  msg: string
  message: string
  data: signGroupData
}
interface signGroupData {
  add_num: number
  status: number
}
/**
 * 银瓜子兑换硬币返回
 *
 * @interface silver2coin
 */
interface silver2coin {
  code: number
  msg: string
  message: string
  data: silver2coinData
}
interface silver2coinData {
  silver: string
  gold: string
  tid: string
  coin: number
}
/**
 * 硬币兑换银瓜子返回
 *
 * @interface coin2silver
 */
interface coin_status {
  code: number
  msg: string
  message: string
  data: coin_statusData;
}
interface coin_statusData {
  coin_2_silver_left: number
  vip: number
}
interface coin2silver {
  code: number
  msg: string
  message: string
  data: coin2silverData;
}
interface coin2silverData {
  silver: number
}
/**
 * 每日任务
 *
 * @interface taskInfo
 */
interface taskInfo {
  code: number
  msg: string
  data: taskInfoData
}
interface taskInfoData {
  [index: string]: taskInfoDoublewatchinfo
}
interface taskInfoDoublewatchinfo {
  task_id: string | undefined
}
/**
 * 兑换扭蛋币
 *
 * @interface capsule
 */
interface capsule {
  code: number
  msg: string
  data: capsuleData | any[]
}
interface capsuleData {
  capsule: SEND_GIFT_data_capsule
}
/**
 * 个人信息
 *
 * @interface userInfo
 */
interface userInfo {
  code: string
  msg: string
  data: userInfoData
}
interface userInfoData {
  uname: string
  silver: number
  gold: number
  user_level: number
  user_intimacy: number
  user_next_intimacy: number
  user_level_rank: number
  billCoin: number
}
/**
 * 勋章信息
 *
 * @interface medalInfo
 */
interface medalInfo {
  code: number
  msg: string
  data: medalInfoData
}
interface medalInfoData {
  medalCount: number
  count: number
  fansMedalList: medalInfoDataInfo[]
}
interface medalInfoDataInfo {
  status: number
  level: number
  intimacy: number
  next_intimacy: number
  medal_name: string
  rank: number
  target_id: number
  uid: number
}
/**
 * 主站关注
 *
 * @interface attentions
 */
interface attentions {
  code: number
  data: attentionsData
  message: string
  ttl: number
}
interface attentionsData {
  list: attentionsDataList[]
  reversion: number
  total: number
}
interface attentionsDataList {
  mid: number
  mtime: number
  uname: string
}
/**
 * 主站视频
 *
 * @interface getSummitVideo
 */
interface getSummitVideo {
  status: boolean
  data: getSummitVideoData
}
interface getSummitVideoData {
  count: number
  pages: number
  vlist: getSummitVideoDataList[]
}
interface getSummitVideoDataList {
  aid: number
  created: number
  mid: number
  title: string
}
/**
 * 主站cid
 *
 * @interface getCid
 */
interface getCid {
  data: cid[]
}
interface cid {
  cid: number
}
/**
 * 主站分享返回
 *
 * @interface shareAV
 */
interface shareAV {
  code: number
}
/**
 * 主站心跳
 *
 * @interface avHeart
 */
interface avHeart {
  code: number
}
/**
 * 主站心跳
 *
 * @interface avHeart
 */
interface avHeart {
  code: number
}
/**
 * 主站信息
 *
 * @interface mainUserInfo
 */
interface mainUserInfo {
  code: number
  data: mainUserInfoData
}
interface mainUserInfoData {
  coins: number
}
/**
 * 主站任务
 *
 * @interface mainReward
 */
interface mainReward {
  code: number
  data: mainRewardData
}
interface mainRewardData {
  coins_av: number
}
/**
 * 投币回调
 *
 * @interface coinAdd
 */
interface coinAdd {
  code: number
}
