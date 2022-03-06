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
      {text: "XLR"},
      {text: "フォン"},
      {text: "RCA（ピン）"},
      {text: "ステレオミニプラグ"}
    ],
    terminalMini:[
      {text: "XLR"},
      {text: "フォン"},
      {text: "RCA（ピン）"},
    ],
    channel:[
      {text: "モノ"},
      {text: "ステレオ"},
      {text: "3ch"},
      {text: "4ch"},
      {text: "5ch"},
      {text: "6ch"},
      {text: "7ch"},
      {text: "8ch"},
    ],
    twoChannel:[
      {text: "モノ"},
      {text: "ステレオ"},
    ],
    line:[
      {text: "有線"},
      {text: "ワイヤレス2.4GHz"},
      {text: "ワイヤレスB帯"},
      {text: "ワイヤレスWS帯"},
    ],
    site:[
      {text: "右側"},
      {text: "左側"},
    ],
    instrument:[
      {value: "Vo", plot: "Vocal", text: "ボーカル", xSpan: 3, ySpan: 3},
      {value: "Cho", plot: "Cho", text: "コーラス", xSpan: 3, ySpan: 3},
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
      {value: "etc", plot: "", text: "その他", xSpan: 3, ySpan: 3},
    ],
    typeOfVocal:[
      {text: "ボーカル"},
      {text: "コーラス"},
      {text: "MC"},
    ],
    amp:[
      {id: "rent", text: "レンタル", xSpan: 2, ySpan: 2},
      {id: "rentCombo", text: "コンボレンタル", xSpan: 2, ySpan: 2},
      {id: "head", text: "ヘッド持ち込み・キャビレンタル", xSpan: 2, ySpan: 2},
      {id: "cab", text: "ヘッドレンタル・キャビ持ち込み", xSpan: 2, ySpan: 2},
      {id: "head&cab", text: "ヘッド&キャビ持ち込み", xSpan: 2, ySpan: 2},
      {id: "combo", text: "コンボアンプ持ち込み", xSpan: 2, ySpan: 2}
    ],
    sync:[
      {text: "PC"},
      {text: "MTR"},
      {text: "その他"},
    ],

  },
  getters:{
    prefecture: state => state.prefecture,
    tune: state => state.tune,
    typeOfSource: state => state.typeOfSource,
    terminal: state => state.terminal,
    terminalMini: state => state.terminalMini,
    channel: state => state.channel,
    twoChannel: state => state.twoChannel,
    line: state => state.line,
    site: state => state.site,
    instrument:state => state.instrument,
    typeOfVocal:state => state.typeOfVocal,
    amp:state => state.amp,
    sync:state => state.sync,

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

    // 楽器の名称を呼び出す用
    getInstrumentValue: (state) => (type) =>{
      let name = ""
      state.instrument.forEach((object)=>{
        if(object.text === type){
          name = object.value
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