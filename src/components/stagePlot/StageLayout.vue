<template>
<div class="component" unselectable="on">
  <div ref="outerBox" class="outer-box">
    <div class="inner-box" :style="{
      width: `${innerBoxWidth}px`,
      maxHeight: `calc(${cellHeight + 1}px * ${rowCount})`,
      gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      gridTemplateColumns: `repeat(${colCount}, 1fr)`,
    }">
      <template v-for="yPos in rowCount">
        <template v-for="xPos in colCount" :key="`r${yPos-1}c${xPos-1}-cell`">

      <!-- Blank cells -->
          <div class="cell" :style="`margin: ${cellMargin}; grid-row: ${yPos} / ${yPos}; grid-column: ${xPos} / ${xPos}; height: ${cellHeight}px`"></div>

      <!-- Cells being filled beforehand -->
          <template v-if="Object.keys(filledCells[yPos-1][xPos-1]).length > 0 && filledCells[yPos-1][xPos-1].isTopLeft">
            <div
              :key="`r${yPos-1}c${xPos-1}-filled`"
              class="filled"
              :style="`margin: ${coloredMargin}; grid-row: ${yPos} / ${yPos + filledCells[yPos-1][xPos-1].position.ySpan}; grid-column: ${xPos} / ${xPos + filledCells[yPos-1][xPos-1].position.xSpan};`"
              v-html="filledCells[yPos-1][xPos-1].shortName"
            >
            </div>
          </template>

      <!-- Cells you are selecting now -->
          <template v-if="/^edit/.test(mode) && instModifiable.position.x === xPos-1 && instModifiable.position.y === yPos-1">
            <div
              :key="`r${yPos-1}c${xPos-1}-selected`"
              class="selected"
              :style="`margin: ${coloredMargin}; grid-row: ${yPos} / ${yPos + instModifiable.position.ySpan}; grid-column: ${xPos} / ${xPos + instModifiable.position.xSpan};`"
              v-html="instModifiable.shortName"
            >
            </div>
          </template>

        </template>
      </template>
    </div>
  </div>

  <div class="audience-plot" :style="{width: `${innerBoxWidth}px`}">客席側</div>

  <div v-if="/^edit/.test(mode)">
    <div class="button-field">
      <div class="button-up" @click="moveCursor(0,-1)">
        <svg viewBox="0 0 108 60" width="100%" height="100%">
          <polygon points="54,0,104,35,84,35,84,60,24,60,24,35,4,35" fill="white" stroke="#2C679D" stroke-width="8" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="button-left" @click="moveCursor(-1,0)">
        <svg viewBox="0 0 60 108" width="100%" height="100%">
          <polygon points="0,54,35,104,35,84,60,84,60,24,35,24,35,4" fill="white" stroke="#2C679D" stroke-width="8" stroke-linejoin="round"/> 
        </svg>
      </div>
      <div class="button-right" @click="moveCursor(1,0)">
        <svg viewBox="0 0 60 108" width="100%" height="100%">
          <polygon points="0,24,25,24,25,4,60,54,25,104,25,84,0,84" fill="white" stroke="#2C679D" stroke-width="8" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="button-down" @click="moveCursor(0,1)">
        <svg viewBox="0 0 108 60" width="100%" height="100%">
          <polygon points="24,0,84,0,84,25,104,25,54,60,4,25,24,25" fill="white" stroke="#2C679D" stroke-width="8" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="_button-container">
      <button class="_button-s" :class="{'_invalid-button': isOverlapping}" :disabled="isOverlapping" @click="emit()">決定</button>
    </div>
    
  </div>
</div>
</template>

<script>
import Instrument from '@/class/Instrument.js'
import cloneDeep from 'lodash/cloneDeep'
import UAparser from 'ua-parser-js'

export default {
  props: {
    mode: {
      type: String,
      required: true,
      validator: val => /^edit(Inst|Amp)$|^display$/.test(val),
      default: 'select'
    },
    band: {
      type: Object,
      required: true
    },
    instrument: {
      type: Object,
      required: false,
      default: new Instrument()
      // validator: (obj) => obj instanceof Instrument
    },
  },
  data() {
    return {
      browserLC: new UAparser().getBrowser().name.toLowerCase(),
      isMounted: false,
      instModifiable: null,
      clientWidth: null,
      rowCount: 9,
      colCount: 15,
      filledCells: [],
      isOverlapping: true,
    }
  },
  created() {
    /** 条件によらない初期化処理 */
    for(let r = 0; r < this.rowCount; r++ ) {
      this.filledCells.push([])
      for(let c = 0; c < this.colCount; c++) {
        this.filledCells[r].push({})
      }
    }

    /** 楽器リストの初期化 */
    let instList = cloneDeep(this.band.lists)

    // this.$props.instrumentで渡された楽器は、一旦instListから削除しておく。
    instList = instList.filter(part => part.id !== this.instrument?.id)

    // 楽器リストの各楽器に省略名を追加
    instList.forEach(part => {
      const shortName = this.$store.getters['select/getInstrumentValue'](part.type)
      part.shortName = shortName        
      if(part.isAmp) {
        part.amp.shortName = `${shortName}.<br>Amp`

        //アンプは位置情報を持っているので、楽器の一つとしてinstListに登録
        instList.push(part.amp)
      }
    })

    //propsのthis.instrumentは読み取り専用なので、書き込み可能なinstModifiableへcloneする
    this.instModifiable = cloneDeep(this.instrument)

    /** 変更対象の楽器に省略名を追加 */
    const shortName = this.$store.getters['select/getInstrumentValue'](this.instModifiable.type)
    this.instModifiable.shortName = shortName
    if(this.instModifiable.isAmp) {
      this.instModifiable.amp.shortName = `${shortName}.<br>Amp`
    }

    /** ポジションの表示のため、必要に応じたinstModifiableの入れ替えとinstListへの追加を行う */
    if(this.mode === "display") {
      instList.push(this.instModifiable)
      if(this.instModifiable.isAmp) {
        //アンプは位置情報を持っているので、楽器の一つとしてinstListに登録
        instList.push(this.instModifiable.amp)
      }
    } else if(this.mode === "editAmp") {
      //アンプを編集する場合は、instModifiableをリストに追加した上で、instModifiableをinstModifiable.ampで置換する
      instList.push(this.instModifiable)
      this.instModifiable = cloneDeep(this.instModifiable.amp)
    } else if(this.mode === "editInst" && this.instModifiable.isAmp){
      //アンプは位置情報を持っているので、楽器の一つとしてinstListに登録
      instList.push(this.instModifiable.amp)
    }

    //Modeがedit.*の場合には更に、positionの初期化
    if(this.mode.startsWith('edit')) {
      this.instModifiable.position.x = 0
      this.instModifiable.position.y = 0
      const spanData = this.$store.getters['select/getSpanData']
      spanData.some(entry => {
        if(entry.text === this.instModifiable.type) {
          this.instModifiable.position.xSpan = entry?.xSpan ?? 1
          this.instModifiable.position.ySpan = entry?.ySpan ?? 1
          return true
        }
      })
    }

    // console.log(`DEBUG: StageLayout.vue/created() - instModifiable -> ${JSON.stringify(this.instModifiable)}`);
    // console.log(`DEBUG: StageLayout.vue/created() - instList -> ${JSON.stringify(instList.map(inst => ({shortName: inst.shortName, position: inst.position})))}`);

    /** instListから読んだposition情報を元にfilledCellsを組み立てる */
    instList.forEach(part => {

      const position = part?.position
      const x = position?.x
      const y = position?.y
      const xSpan = position?.xSpan ?? 1
      const ySpan = position?.ySpan ?? 1

      if( x  == null || y == null) return

      for(let row = 0; row < ySpan; row++) {
        for(let col = 0; col < xSpan; col++) {
          //楽器の表示領域の左上にあたるcellをisTopLeftフラグで管理
          let isTopLeft = row === 0 && col === 0
          this.filledCells[y + row][x + col] = {
            isTopLeft,
            ...part
          }
        }
      }
    })

  },
  mounted() {
    //windowのresizeイベントはmount後に行う
    window.addEventListener('resize', this.responsive)
    this.responsive()

    //初期状態(x===0,y===0)での保存を可能にするためのhack
    this.moveCursor(0, 0)

    this.isMounted = true
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.responsive)
  },
  computed: {
    innerBoxWidth() {
      if(! this.clientWidth) return null
      // console.log(Math.floor(this.$refs?.outerBox?.clientWidth / this.colCount) * this.colCount);
      return Math.floor(this.$refs?.outerBox?.clientWidth / this.colCount) * this.colCount
    },
    cellHeight() {
      const adjuster = this.browserLC.includes("safari") ? -2
                      : this.browserLC.includes("chrom") ? 0
                      : 0
      return (this.innerBoxWidth / this.colCount) + adjuster
    },
    cellMargin() {
      return this.browserLC.includes("safari") ? "-2px 0px 0px -2px"
            : this.browserLC.includes("chrom") ? "-1px 0px 0px -1px"
            : "-1px 0px 0px -1px"
    },
    coloredMargin() {
      return this.browserLC === "safari" ? "0px 0px 0px -2px"
            : this.browserLC === "mobile safari" ? "-1px 0px 0px -3px"
            : this.browserLC.includes("chrom") ? "0px 0px 0px -1px"
            : "0px 0px 0px -1px"
    }
  },
  methods: {
    responsive() {
      if ( this.$refs?.outerBox?.clientWidth ) {
        this.clientWidth = this.$refs.outerBox.clientWidth
      }
    },
    moveCursor(xDiff, yDiff) {
      const position = this.instModifiable.position
      const xLeft = position.x + xDiff
      const yTop = position.y + yDiff
      const xRight = xLeft + position.xSpan - 1
      const yBottom = yTop + position.ySpan - 1
      // 楽器の領域が範囲外になった場合は何もしない
      if(xLeft < 0 || xRight >= this.colCount || yTop < 0 || yBottom >= this.rowCount) {
        return
      }

      //次の操作に向けてcursorの設定
      this.instModifiable.position.x = xLeft
      this.instModifiable.position.y = yTop

      /** 重なり判定のループ */
      this.isOverlapping = false
      outerLoop: for(let r = yTop; r <= yBottom; r++) {
        for(let c = xLeft; c <= xRight; c++) {
          if(Object.keys(this.filledCells[r][c]).length > 0) {
            this.isOverlapping = true;
            break outerLoop;
          }
        }
      }
    },
    emit() {
      if(this.instModifiable?.shortName)
        delete this.instModifiable.shortName
      if(this.instModifiable?.amp?.shortName)
        delete this.instModifiable.amp.shortName

      if(this.mode === 'editAmp') {
        const instWithAmp = cloneDeep(this.instrument)
        instWithAmp.amp = this.instModifiable
        this.$emit('instChanged', instWithAmp)
      } else {
        this.$emit('instChanged', this.instModifiable)
      }
    }
  },
}
</script>


<style scoped>
.component {
  align-items: center;
  display: flex;
  flex-direction: column;
  touch-action: manipulation; /** ダブルタップによるズームを阻害する */
}

.outer-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.inner-box {
  display: grid;
  column-gap: 0;
  row-gap: 0;
}
.inner-box > div {
  text-align: center;
  overflow-y: hidden;
}

.cell {
  margin: -2px 0 0 -2px;
  border: 1px solid rgb(212, 212, 212);
  background-color: var(--white);
}

.filled, .selected {
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  color: var(--white);
}
.filled {
  background-color: var(--blue-hi);
  z-index: 1;
}
.selected {
  background-color: var(--blue) !important;
  z-index: 2;
}

.audience-plot {
  width: 100%;
  border: 1px solid var(--placeholder);
  color: var(--placeholder);
  background-color: var(--white);
  text-align: center;
}


.button-field {
  margin-top: 10px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 16vw);
  grid-template-rows: repeat(8, 5vw);
  user-select: none;
  -webkit-user-select: none;
}
.button-field > * {
  border: 0px;
  background-color: transparent;
  font-size: 4vw;
  display: flex;
  justify-content: center;
  position: relative;
  width: 16vw;
  height: 16vw;
  align-items: center;
  /* filter: drop-shadow(3px 3px 5px #bbb); */
}


.button-up {
  grid-row: 1 / 4;
  grid-column: 2 / 2;
}
.button-left {
  grid-row: 3 / 6;
  grid-column: 1 / 1;
}
.button-right {
  grid-row: 3 / 6;
  grid-column: 3 / 3;
}
.button-down {
  grid-row: 5 / 8;
  grid-column: 2 / 2;
}

</style>