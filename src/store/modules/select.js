export default{
  namespaced: true,
  state:{
    prefecture: [
      { id: 1, text: "北海道"},
      { id: 2, text: "青森県"},
      { id: 3, text: "岩手県"},
      { id: 4, text: "宮城県"},
      { id: 5, text: "秋田県"},
      { id: 6, text: "山形県"},
      { id: 7, text: "福島県"},
      { id: 8, text: "茨城県"},
      { id: 9, text: "栃木県"},
      { id: 10, text: "群馬県"},
      { id: 11, text: "埼玉県"},
      { id: 12, text: "千葉県"},
      { id: 13, text: "東京都"},
      { id: 14, text: "神奈川県"},
      { id: 15, text: "新潟県"},
      { id: 16, text: "富山県"},
      { id: 17, text: "石川県"},
      { id: 18, text: "福井県"},
      { id: 19, text: "山梨県"},
      { id: 20, text: "長野県"},
      { id: 21, text: "岐阜県"},
      { id: 22, text: "静岡県"},
      { id: 23, text: "愛知県"},
      { id: 24, text: "三重県"},
      { id: 25, text: "滋賀県"},
      { id: 26, text: "京都府"},
      { id: 27, text: "大阪府"},
      { id: 28, text: "兵庫県"},
      { id: 29, text: "奈良県"},
      { id: 30, text: "和歌山県"},
      { id: 31, text: "鳥取県"},
      { id: 32, text: "島根県"},
      { id: 33, text: "岡山県"},
      { id: 34, text: "広島県"},
      { id: 35, text: "山口県"},
      { id: 36, text: "徳島県"},
      { id: 37, text: "香川県"},
      { id: 38, text: "愛媛県"},
      { id: 39, text: "高知県"},
      { id: 40, text: "福岡県"},
      { id: 41, text: "佐賀県"},
      { id: 42, text: "長崎県"},
      { id: 43, text: "熊本県"},
      { id: 44, text: "大分県"},
      { id: 45, text: "宮崎県"},
      { id: 46, text: "鹿児島県"},
      { id: 47, text: "沖縄県"}
    ],
    tune:[
      {text: "UP"},
      {text: "MID"},
      {text: "SLOW"}
    ],
    typeOfSource:[
      {text: "CD"},
      {text: "PC"},
      {text: "その他"}
    ],
    terminal:[
      {text: "XLR", plot: "XLR"},
      {text: "フォン", plot: "フォン"},
      {text: "RCA（ピン）", plot: "RCA"},
      {text: "ステレオミニプラグ", plot: "ステレオミニプラグ"}
    ],
    terminalMini:[
      {text: "XLR"},
      {text: "フォン"},
      {text: "RCA（ピン）"},
    ],
    terminalMicro:[
      {text: "XLR"},
      {text: "フォン"},
    ],
    channel:[
      {text: "モノ", plot: "MONO"},
      {text: "ステレオ", plot: "STEREO"},
      {text: "3ch", plot: "3ch"},
      {text: "4ch", plot: "4ch"},
      {text: "5ch", plot: "5ch"},
      {text: "6ch", plot: "6ch"},
      {text: "7ch", plot: "7ch"},
      {text: "8ch", plot: "8ch"},
    ],
    channelForSync:[
      {text: "1ch", plot: "1ch"},
      {text: "2ch（モノ）", plot: "ﾓﾉ2ch"},
      {text: "2ch（ステレオ）", plot: "LR2ch"},
      {text: "3ch", plot: "3ch"},
      {text: "4ch", plot: "4ch"},
      {text: "5ch", plot: "5ch"},
      {text: "6ch", plot: "6ch"},
      {text: "7ch", plot: "7ch"},
      {text: "8ch", plot: "8ch"},
    ],
    twoChannel:[
      {text: "モノ"},
      {text: "ステレオ"},
    ],
    line:[
      {text: "有線", plot: "有線"},
      {text: "ワイヤレス2.4GHz", plot: "W/L 2.4GHz"},
      {text: "ワイヤレスB帯", plot: "W/L B帯"},
      {text: "ワイヤレスWS帯", plot: "W/L WS帯"},
    ],
    lineW:[
      {text: "ワイヤレス2.4GHz", plot: "W/L 2.4GHz"},
      {text: "ワイヤレスB帯", plot: "W/L B帯"},
      {text: "ワイヤレスWS帯", plot: "W/L WS帯"},
    ],
    site:[
      {text: "右側"},
      {text: "左側"},
    ],
    instrument:[
      {value: "Vo", plot: "Vocal", text: "ボーカル", xSpan: 3, ySpan: 3},
      {value: "Cho", plot: "Chorus", text: "コーラス", xSpan: 3, ySpan: 3},
      {value: "MC", plot: "MC", text: "MC", xSpan: 3, ySpan: 3},
      {value: "Gt", plot: "Guitar", text: "ギター", xSpan: 3, ySpan: 3},
      {value: "Ba", plot: "Bass", text: "ベース", xSpan: 3, ySpan: 3},
      {value: "Dr", plot: "Drums", text: "ドラム", xSpan: 5, ySpan: 4},
      {value: "AG", plot: "AG", text: "アコースティックギター", xSpan: 3, ySpan: 3},
      {value: "Key", plot: "Keyboard", text: "キーボード", xSpan: 3, ySpan: 3},
      {value: "Per", plot: "Per", text: "パーカッション", xSpan: 3, ySpan: 3},
      {value: "Sax", plot: "Sax", text: "サックス", xSpan: 3, ySpan: 3},
      {value: "Tp", plot: "Trumpet", text: "トランペット", xSpan: 3, ySpan: 3},
      {value: "Tb", plot: "Trombone", text: "トロンボーン", xSpan: 3, ySpan: 3},
      {value: "Vl", plot: "Violin", text: "バイオリン", xSpan: 3, ySpan: 3},
      {value: "DJ", plot: "DJ", text: "DJ", xSpan: 3, ySpan: 3},
      {value: "etc", plot: "etc", text: "その他", xSpan: 3, ySpan: 3},
    ],
    typeOfVocal:[
      {text: "ボーカル"},
      {text: "コーラス"},
      {text: "MC"},
    ],
    amp:[
      {id: "rent", text: "レンタル", plotRent: "Amp Head&Cabi", plotBring: "", xSpan: 2, ySpan: 2},
      {id: "rentCombo", text: "コンボレンタル", plotRent: "Amp Combo", plotBring: "", xSpan: 2, ySpan: 2},
      {id: "head", text: "ヘッド持ち込み・キャビレンタル", plotRent: "Amp Cabi", plotBring: "[Amp Head]",  xSpan: 2, ySpan: 2},
      {id: "cab", text: "ヘッドレンタル・キャビ持ち込み", plotRent: "Amp Head", plotBring: "[Amp Cabi]",  xSpan: 2, ySpan: 2},
      {id: "head&cab", text: "ヘッド&キャビ持ち込み", plotRent: "", plotBring: "[Amp Head&Cabi]",  xSpan: 2, ySpan: 2},
      {id: "combo", text: "コンボアンプ持ち込み", plotRent: "", plotBring: "[Amp Combo]",  xSpan: 2, ySpan: 2}
    ],
    sync:[
      {text: "PC"},
      {text: "MTR"},
      {text: "その他"},
    ],
    acousticGuitar:[
      {text: "ライン", plot: "Line"},
      {text: "マイク", plot: "Mic"},
      {text: "ライン&マイク", plot: "Line&Mic"}
    ],
    ampForKeyboard:[
      {text: "レンタル"},
      {text: "持ち込み"},
    ],
    // 下記はそのままドラムのdbに持たせる
    drum:[
      {id: "bass", text: "バスドラム", plot:"Kick", use: false},
      {id: "snare", text: "スネア", plot:"Snare", use: false},
      {id: "hiHat", text: "ハイハット", plot:"HiHat", use: false},
      {id: "floorTom", text: "フロアタム", plot:"Floor Tom", use: false},
      {id: "tom13", text: "タム13\"", plot:"Rack Tom 13\"", use: false},
      {id: "tom12", text: "タム12\"", plot:"Rack Tom 12\"", use: false},
      {id: "rideCymbal", text: "ライドシンバル", plot:"Ride", use: false},
      {id: "crash18", text: "クラッシュ18\"", plot:"Crash 18\"", use: false},
      {id: "crash16", text: "クラッシュ16\"", plot:"Crash 16\"", use: false},
      {id: "kickPedal", text: "キックペダル", plot:"Kick Pedal", use: false},
    ],
    // 下記はそのままパーカッションのdbに持たせる
    percussion:[
      {id: "cajon", text: "カホン", plot:"Cajon", use: false},
      {id: "djembe", text: "ジャンベ", plot:"Djembe", use: false},
      {id: "conga", text: "コンガ", plot:"Conga", use: false},
      {id: "cowbell", text: "カウベル", plot:"Cowbell", use: false},
      {id: "splash", text: "スプラッシュ", plot:"Splash", use: false},
      {id: "windChime", text: "ウインドチャイム", plot:"Wind Chime", use: false},
    ],

  },
  getters:{
    prefecture: state => state.prefecture,
    tune: state => state.tune,
    typeOfSource: state => state.typeOfSource,
    terminal: state => state.terminal,
    terminalMini: state => state.terminalMini,
    channel: state => state.channel,
    channelForSync: state => state.channelForSync,
    twoChannel: state => state.twoChannel,
    line: state => state.line,
    lineW: state => state.lineW,
    site: state => state.site,
    instrument:state => state.instrument,
    typeOfVocal:state => state.typeOfVocal,
    amp:state => state.amp,
    sync:state => state.sync,
    acousticGuitar:state => state.acousticGuitar,
    ampForKeyboard:state => state.ampForKeyboard,
    terminalMicro:state => state.terminalMicro,
    drum:state => state.drum,
    percussion:state => state.percussion,

    // selectの文章を呼び出す用
    getText: () => (stateName, id) =>{
      let text = ""
      eval("state." +stateName).forEach((object)=>{
        if(object.id === id){
          text = object.text
        }
      })
      return text
    } ,

    // 楽器のvalueを呼び出す用
    getInstrumentValue: (state) => (type) =>{
      let name = ""
      state.instrument.forEach((object)=>{
        if(object.text === type){
          name = object.value
        }
      })
      return name
    },

    // 楽器のplotを呼び出す用
    getInstrumentPlot: (state) => (type) =>{
      let name = ""
      state.instrument.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },

    // ラインのplotを呼び出す用
    getLinePlot: (state) => (type) =>{
      let name = ""
      state.line.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },

    // チャンネルのplotを呼び出す用
    getChannelPlot: (state) => (type) =>{
      let name = ""
      state.channel.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },
    // 同期用チャンネルのplotを呼び出す用
    getChannelForSyncPlot: (state) => (type) =>{
      let name = ""
      state.channelForSync.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },
    // 端子のplotを呼び出す用
    getTerminalPlot: (state) => (type) =>{
      let name = ""
      state.terminal.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },
    // アコギのplotを呼び出す用
    getAcousticGuitarPlot: (state) => (type) =>{
      let name = ""
      state.acousticGuitar.forEach((object)=>{
        if(object.text === type){
          name = object.plot
        }
      })
      return name
    },
    // レンタルアンプのplotを呼び出す用
    getAmpPlotRent: (state) => (type) =>{
      let name = ""
      state.amp.forEach((object)=>{
        if(object.id === type){
          name = object.plotRent
        }
      })
      return name
    },
    // 持ち込みアンプのplotを呼び出す用
    getAmpPlotBring: (state) => (type) =>{
      let name = ""
      state.amp.forEach((object)=>{
        if(object.id === type){
          name = object.plotBring
        }
      })
      return name
    },

    // 楽器の名称を呼び出す用
    getAmpText: (state) => (type) =>{
      let name = ""
      state.amp.forEach((object)=>{
        if(object.id === type){
          name = object.text
        }
      })
      return name
    },

    // Span情報をまとめて返却する
    getSpanData: (state) => {
      return new Array().concat(
        state.instrument.map(entry => 
          ({
            text: entry.text,
            xSpan: entry.xSpan,
            ySpan: entry.ySpan
          })
        ),
        state.amp.map(entry => 
          ({
            text: entry.id,
            xSpan: entry.xSpan,
            ySpan: entry.ySpan
          })
        )
      )
    }
  },
  mutations:{

  },
  actions:{

  },
}