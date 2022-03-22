<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>

      <div v-if="instrument.type === 'その他'" class="_container">
        <label for="name" class="_label">楽器名</label>
        <input type="text" v-model="instrument.etc" @blur="v$.instrument.etc.$touch()" placeholder="10文字以内で入力" :class="{'_input-error': v$.instrument.etc.$error}" class="_input-text">
        <p v-if="v$.instrument.etc.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <label for="name" class="_label">メンバー名</label><Helper :helperObject="helper.member"></Helper>
        <input type="text" v-model="instrument.member" @blur="v$.instrument.member.$touch()" placeholder="10文字以内で入力" :class="{'_input-error': v$.instrument.member.$error}" class="_input-text">
        <p v-if="v$.instrument.member.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <label class="_label">パート配置図</label><Helper :helperObject="helper.position"></Helper>
        <StageLayout v-if="isCreated" mode="display" :band="band" :instrument="instrument" class="_marginS"></StageLayout>
        <div @click="editPosition(false)" class="_link-mini-white">
          <img src="@/assets/images/icon-pin-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">パート配置を設定</p>
        </div>
      </div>

      <div v-if="tag !== 'VOCAL'" class="_container">
        <p class="_label">ボーカル・コーラス・/MC</p><Helper :helperObject="helper.vocal"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isVocal}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isVocal}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isVocal" @click="_clearObject(instrument.vocal), _clearObject(instrument.mic), offMic()" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isVocal" class="_multi-box" :class="{'_multi-box-end': instrument.type === 'ドラム'}">
          <div class="_multi-inner" :class="{'_multi-inner-end': instrument.type === 'ドラム'}">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.vocal.part" @blur="v$.instrument.vocal.part.$touch()" required :class="{'_input-select-exist': instrument.vocal.part !== null}" class="_multi-select" >
              <option :value="null" disabled >パートを選択</option>
              <option v-for="select in $store.getters['select/typeOfVocal']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >パートの種類：{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isVocal && instrument.type !== 'ドラム' && instrument.vocal.part === 'コーラス'" class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.vocal.monitor" :class="{'_input-select-exist': instrument.vocal.monitor !== null}" class="_multi-select" >
              <option :value="null" disabled >モニターの数を選択</option>
              <option v-for="select in 2" :key="select" :value="select" :style="{'color': '#131313'}" >モニターの数：{{select}}</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="instrument.isVocal" class="_container">
        <p class="_label">マイク</p><Helper :helperObject="helper.mic"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isBroughtMic}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isBroughtMic}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.isBroughtMic" @click="_clearObject(instrument.mic)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isBroughtMic"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.mic.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.mic.type" @blur="v$.instrument.mic.type.$touch()" required :class="{'_input-select-exist': instrument.mic.type !== null}" class="_multi-select" >
              <option :value="null" disabled >持ち込み機材を選択</option>
              <option v-for="select in $store.getters['select/line']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isBroughtMic" class="_multi-box" :class="{'_multi-box-error': v$.instrument.mic.brand.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="instrument.mic.brand" @blur="v$.instrument.mic.brand.$touch()" placeholder="メーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.isBroughtMic" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.mic.model.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.mic.model" @blur="v$.instrument.mic.model.$touch()" placeholder="型番を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.instrument.mic.brand.$error || v$.instrument.mic.model.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div v-if="instrument.isAmp" class="_container">
        <p class="_label">アンプ</p><Helper :helperObject="helper.amp"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': instrument.amp.type === null || instrument.amp.type === 'rent' || instrument.amp.type === 'rentCombo'}">
          <div class="_multi-inner" :class="{'_multi-inner-end': instrument.amp.type === null || instrument.amp.type === 'rent' || instrument.amp.type === 'rentCombo'}">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.amp.type" @blur="v$.instrument.amp.type.$touch()" required :class="{'_input-select-exist': instrument.amp.type !== null}" class="_multi-select" >
              <option :value="null" disabled >レンタル・持ち込み機材を選択</option>
              <option v-for="select in $store.getters['select/amp']" :key="select.id" :value="select.id" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.amp.type === 'head' || instrument.amp.type === 'head&cab'"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.amp.brandOfHead.$error, '_multi-box-end': instrument.amp.type === 'head'}">
          <div class="_multi-inner" :class="{'_multi-inner-end': instrument.amp.type === 'head'}">
            <input type="text" v-model="instrument.amp.brandOfHead" @blur="v$.instrument.amp.brandOfHead.$touch()" placeholder="ヘッドメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.amp.type === 'cab' || instrument.amp.type === 'head&cab'" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.amp.brandOfCab.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.amp.brandOfCab" @blur="v$.instrument.amp.brandOfCab.$touch()" placeholder="キャビメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.amp.type === 'combo'" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.amp.brandOfCombo.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.amp.brandOfCombo" @blur="v$.instrument.amp.brandOfCombo.$touch()" placeholder="コンボメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div class="_marginS">
          <p v-if="v$.instrument.amp.brandOfHead.$error || v$.instrument.amp.brandOfCab.$error || v$.instrument.amp.brandOfCombo.$error" class="_input-error-message">10文字以内で入力してください。</p>
        </div>
        <div @click="editPosition(true)" class="_link-mini-white _marginS">
          <img src="@/assets/images/icon-pin-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">アンプ配置を設定</p>
        </div>
        <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
      </div>

      <!-- アコギ専用 -->
      <div v-if="instrument.type === 'アコースティックギター'" class="_container">
        <p class="_label">アコギ出力</p><Helper :helperObject="helper.acousticGuitar"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isLineOutForAcousticGuitar}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isLineOutForAcousticGuitar}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isLineOutForAcousticGuitar" @click="_clearObject(instrument.acousticGuitar), _clearObject(instrument.acousticGuitar), offDi()" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isLineOutForAcousticGuitar" class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.acousticGuitar.type" @blur="v$.instrument.vocal.part.$touch()" required :class="{'_input-select-exist': instrument.acousticGuitar.type !== null}" class="_multi-select" >
              <option :value="null" disabled >出力の種類を選択</option>
              <option v-for="select in $store.getters['select/acousticGuitar']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >出力：{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isLineOutForAcousticGuitar" class="_multi-box _multi-box-end">
          <div class="_flex-multi-inner _multi-inner-end">
            <textarea v-model="instrument.acousticGuitar.text" @blur="v$.instrument.acousticGuitar.text.$touch()" placeholder="備考を50文字以内で入力 任意" :class="{'_input-error': v$.instrument.acousticGuitar.text.$error}" class="_multi-input-textarea"></textarea>
          </div>
        </div>
      </div>

      <div v-if="instrument.type === 'ベース' || instrument.isLineOutForAcousticGuitar" class="_container">
        <p class="_label">DI</p><Helper :helperObject="helper.di"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.idBroughtDi}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.idBroughtDi}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.idBroughtDi" @click="_clearObject(instrument.di)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.idBroughtDi" class="_multi-box" :class="{'_multi-box-error': v$.instrument.di.brand.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="instrument.di.brand" @blur="v$.instrument.di.brand.$touch()" placeholder="メーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.idBroughtDi" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.di.model.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.di.model" @blur="v$.instrument.di.model.$touch()" placeholder="型番を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.instrument.di.brand.$error || v$.instrument.di.model.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <!-- ドラム専用 -->
      <div v-if="instrument.type === 'ドラム'" class="_container">
        <p class="_label">ドラム会場レンタル</p><Helper :helperObject="helper.drum"></Helper>
        <div v-for="(item, index) in instrument.drum.rent" :key="item.id">
          <div class="_multi-box" :class="{'_multi-box-start': index === 0,'_multi-box-end': instrument.drum.rent.length === index + 1}">
            <div class="_multi-inner" :class="{'_multi-inner-end': instrument.drum.rent.length === index + 1}">
              <p class="_multi-text">{{item.text}}</p>
              <Toggle v-model="item.use" class="_multi-toggle" />
            </div>
          </div>
        </div>
      </div>
      <!-- ドラム専用 -->
      <div v-if="instrument.type === 'ドラム'" class="_container">
        <label for="textForLighting" class="_label">持ち込みドラム機材</label><Helper :helperObject="helper.bringDrum"></Helper>
        <textarea v-model="instrument.drum.bring" @blur="v$.instrument.drum.bring.$touch()" placeholder="持ち込みドラム機材があれば全て入力" :class="{'_input-error': v$.instrument.drum.bring.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.instrument.drum.bring.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>
      <!-- ドラム専用 -->
      <div v-if="instrument.type === 'ドラム'" class="_container">
        <p class="_label">ラックタム</p><Helper :helperObject="helper.tom"></Helper>
        <div class="_multi-box" :class="{'_multi-box-error': v$.instrument.drum.tom.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.drum.tom" @blur="v$.instrument.drum.tom.$touch()" required :class="{'_input-select-exist': instrument.drum.tom !== null}" class="_multi-select" >
              <option :value="null" disabled >ラックタムの数を選択</option>
              <option v-for="select in 4" :key="select" :value="select" :style="{'color': '#131313'}" >{{select}}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ドラム専用同期 -->
      <div v-if="instrument.type === 'ドラム'" class="_container">
        <p class="_label">同期</p><Helper :helperObject="helper.sync"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isSyncForDrum}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isSyncForDrum}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isSyncForDrum" @click="_clearObject(instrument.syncForDrum)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.type" @blur="v$.instrument.syncForDrum.type.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/sync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.channel.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.channel" @blur="v$.instrument.syncForDrum.channel.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/channelForSync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.terminal.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.terminal" @blur="v$.instrument.syncForDrum.terminal.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminalMini']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.syncForDrum.site.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.site" @blur="v$.instrument.syncForDrum.site.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.site !== null}" class="_multi-select" >
              <option :value="null" disabled >位置を選択</option>
              <option v-for="select in $store.getters['select/site']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- キーボード専用 -->
      <div v-if="instrument.type === 'キーボード'" class="_container">
        <p class="_label">キーボード（レンタル）</p><Helper :helperObject="helper.rentKeyboard"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isRentedKeyboard}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isRentedKeyboard}">
            <p class="_multi-text">レンタル有り</p>
            <Toggle v-model="instrument.isRentedKeyboard" @click="_clearObject(instrument.rentKeyboard)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isRentedKeyboard" class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.rentKeyboard.number" @blur="v$.instrument.rentKeyboard.number.$touch()" required :class="{'_input-select-exist': instrument.rentKeyboard.number !== null}" class="_multi-select" >
              <option :value="null" disabled >レンタル台数を選択</option>
              <option v-for="select in 10" :key="select" :value="select" :style="{'color': '#131313'}" >レンタル台数：{{select}}台</option>
            </select>
          </div>
        </div>
      </div>

      <!-- キーボード専用 -->
      <div v-if="instrument.type === 'キーボード'" class="_container">
        <p class="_label">キーボード（持ち込み）</p><Helper :helperObject="helper.bringKeyboard"></Helper>
        <div @click="addKeyboard()" class="_link-mini-white _marginSS">
          <img src="@/assets/images/icon-keyboard-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">持ち込みキーボードを追加</p>
        </div>

        <div v-for="keyboard, index in instrument.bringKeyboardLists" :key="keyboard">
          <div class="keyboard-container">
            <div class="_multi-box _multi-box-start">
              <div class="_multi-inner">
                <input type="text" v-model="keyboard.name" maxlength="10" placeholder="機材名を10字以内で入力" class="_multi-input-text">
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
                <select v-model="keyboard.channel" required :class="{'_input-select-exist': keyboard.channel !== null}" class="_multi-select" >
                  <option :value="null" disabled >チャンネル数を選択</option>
                  <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >チャンネル数：{{select.text}}</option>
                </select>
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
                <select v-model="keyboard.terminal" required :class="{'_input-select-exist': keyboard.terminal !== null}" class="_multi-select" >
                  <option :value="null" disabled >アウト端子を選択</option>
                  <option v-for="select in $store.getters['select/terminal']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
                </select>
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <p class="_multi-text">DI持ち込み有り</p>
                <Toggle v-model="keyboard.isDi" class="_multi-toggle" />
              </div>
            </div>
            <div class="_multi-box _multi-box-end">
              <div class="_multi-inner _multi-inner-end">
                <p @click="deleteKeyboard(index)" class="_multi-text delete-text">削除</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- キーボード専用 -->
      <div v-if="instrument.type === 'キーボード'" class="_container">
        <p class="_label">アンプ</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isAmpForKeyboard}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isAmpForKeyboard}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isAmpForKeyboard" @click="_clearObject(instrument.ampForKeyboard)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isAmpForKeyboard" class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.ampForKeyboard.type" @blur="v$.instrument.ampForKeyboard.type.$touch()" required :class="{'_input-select-exist': instrument.ampForKeyboard.type !== null}" class="_multi-select" >
              <option :value="null" disabled >レンタルの有無を選択</option>
              <option v-for="select in $store.getters['select/ampForKeyboard']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- パーカッション専用 -->
      <div v-if="instrument.type === 'パーカッション'" class="_container">
        <p class="_label">持ち込みパーカッション</p>
        <div v-for="(item, index) in instrument.percussion.bring" :key="item.id">
          <div class="_multi-box" :class="{'_multi-box-start': index === 0}">
            <div class="_multi-inner">
              <p class="_multi-text">{{item.text}}</p>
              <Toggle v-model="item.use" class="_multi-toggle" />
            </div>
          </div>
        </div>
        <div class="_multi-box _multi-box-end">
          <div class="_flex-multi-inner _multi-inner-end">
            <textarea v-model="instrument.percussion.other" @blur="v$.instrument.percussion.other.$touch()" placeholder="その他の使用楽器を50文字以内で入力 任意" :class="{'_input-error': v$.instrument.percussion.other.$error}" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <p v-if="v$.instrument.percussion.other.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>

      <div v-if="tag === 'BRASS' || instrument.type === 'バイオリン' || instrument.type === 'その他'" class="_container">
        <p class="_label">楽器用マイク</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isBroughtMicForInstrument}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isBroughtMicForInstrument}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.isBroughtMicForInstrument" @click="_clearObject(instrument.micForInstrument)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isBroughtMicForInstrument"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.micForInstrument.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.micForInstrument.type" @blur="v$.instrument.micForInstrument.type.$touch()" required :class="{'_input-select-exist': instrument.micForInstrument.type !== null}" class="_multi-select" >
              <option :value="null" disabled >持ち込み機材を選択</option>
              <option v-for="select in $store.getters['select/line']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isBroughtMicForInstrument" class="_multi-box" :class="{'_multi-box-error': v$.instrument.micForInstrument.brand.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="instrument.micForInstrument.brand" @blur="v$.instrument.micForInstrument.brand.$touch()" placeholder="メーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.isBroughtMicForInstrument" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.micForInstrument.model.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.micForInstrument.model" @blur="v$.instrument.micForInstrument.model.$touch()" placeholder="型番を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.instrument.micForInstrument.brand.$error || v$.instrument.micForInstrument.model.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div v-if="instrument.type === 'DJ' || instrument.type === 'その他'" class="_container">
        <p class="_label">PAへのラインアウト</p><Helper :helperObject="helper.line"></Helper>
        <div @click="addLineOut()" class="_link-mini-white _marginSS">
          <img src="@/assets/images/icon-keyboard-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">持ち込み機材を追加</p>
        </div>

        <div v-for="item, index in instrument.lineOutLists" :key="item">
          <div class="keyboard-container">
            <div class="_multi-box _multi-box-start">
              <div class="_multi-inner">
                <input type="text" v-model="item.name" maxlength="10" placeholder="機材名を10字以内で入力" class="_multi-input-text">
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
                <select v-model="item.channel" required :class="{'_input-select-exist': item.channel !== null}" class="_multi-select" >
                  <option :value="null" disabled >チャンネル数を選択</option>
                  <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >チャンネル数：{{select.text}}</option>
                </select>
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
                <select v-model="item.terminal" required :class="{'_input-select-exist': item.terminal !== null}" class="_multi-select" >
                  <option :value="null" disabled >アウト端子を選択</option>
                  <option v-for="select in $store.getters['select/terminal']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
                </select>
              </div>
            </div>
            <div class="_multi-box">
              <div class="_multi-inner">
                <p class="_multi-text">DI持ち込み有り</p>
                <Toggle v-model="item.isDi" class="_multi-toggle" />
              </div>
            </div>
            <div class="_multi-box _multi-box-end">
              <div class="_multi-inner _multi-inner-end">
                <p @click="deleteLineOut(index)" class="_multi-text delete-text">削除</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- バイオリン専用 -->
      <div v-if="instrument.type === 'バイオリン'" class="_container">
        <p class="_label">PAへのラインアウト</p><Helper :helperObject="helper.lineForViolin"></Helper>
        <div class="_multi-box _multi-box-start">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.lineOutForViolin.terminal" @blur="v$.instrument.lineOutForViolin.terminal.$touch()" required :class="{'_input-select-exist': instrument.lineOutForViolin.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminalMicro']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <p class="_multi-text">DIの持ち込み有り</p>
            <Toggle v-model="instrument.lineOutForViolin.isDi" class="_multi-toggle" />
          </div>
        </div>
      </div>

      <div v-if="tag !== 'BRASS' && instrument.type !== 'バイオリン' && instrument.type !== 'ドラム'" class="_container">
        <p class="_label">同期</p><Helper :helperObject="helper.sync"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isSync}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isSync}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isSync" @click="_clearObject(instrument.sync)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isSync"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.sync.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.type" @blur="v$.instrument.sync.type.$touch()" required :class="{'_input-select-exist': instrument.sync.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/sync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSync" class="_multi-box" :class="{'_multi-box-error': v$.instrument.sync.channel.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.channel" @blur="v$.instrument.sync.channel.$touch()" required :class="{'_input-select-exist': instrument.sync.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/channelForSync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSync" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.sync.terminal.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.terminal" @blur="v$.instrument.sync.terminal.$touch()" required :class="{'_input-select-exist': instrument.sync.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminalMini']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="_container">
        <p class="_label">イヤモニ</p><Helper :helperObject="helper.monitor"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isBroughtMonitor}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isBroughtMonitor}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.isBroughtMonitor" @click="_clearObject(instrument.monitor)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isBroughtMonitor"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.monitor.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.monitor.type" @blur="v$.instrument.monitor.type.$touch()" required :class="{'_input-select-exist': instrument.monitor.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/line']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isBroughtMonitor" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.monitor.channel.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.monitor.channel" @blur="v$.instrument.monitor.channel.$touch()" required :class="{'_input-select-exist': instrument.monitor.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="tag !== 'BRASS'" class="_container">
        <p class="_label">足元電源（100V）</p><Helper :helperObject="helper.power"></Helper>
        <div class="_box">
          <div class="_text-inner">
            <p class="_text">必要</p>
            <Toggle v-model="instrument.isPower" class="_multi-toggle"></Toggle>
          </div>
        </div>
      </div>

      <div v-if="this.mode === 'create'" class="_button-container">
        <button  :disabled="v$.instrument.$invalid || inactiveButton" @click="createInstrument()" :class="{'_invalid-button': v$.instrument.$invalid}" class="_button-s">登録</button>
      </div>
      <div v-if="this.mode === 'edit'" class="_button-container">
        <button  :disabled="v$.instrument.$invalid || inactiveButton" @click="editInstrument()" :class="{'_invalid-button': v$.instrument.$invalid}" class="_button-s _marginM">編集</button>
        <button  :disabled="inactiveButton" @click="deleteInstrument()"  class="_button-red">削除</button>
      </div>
    </div>
    <Footer></Footer>
    <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
import StageLayout from '@/components/stagePlot/StageLayout.vue'

import Band from '@/class/Band.js'
import Instrument from '@/class/Instrument.js'

import db from '@/firebase/modules/db.js'
import Toggle from '@vueform/toggle'
import useVuelidate from '@vuelidate/core'
import { required, requiredIf, maxLength, helpers} from '@vuelidate/validators'
const contains = (param) => helpers.withParams(
  { type: 'isChecked', value: param},
  (value) => {
    if(param){
      return helpers.req(value)
    }else{
      return true
    }
  }
)
  

export default {
  name: 'CreateInstrument',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer,
    Toggle,
    Alert,
    StageLayout
  },
  mixins:[
    Mixin
  ],
  setup(){
    return { v$: useVuelidate()}
  },
  data(){
    return{
      isCreated: false,
      pageType: "stagePlot",
      pageTitle: "",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      mode: "create", //"create", "edit"
      errorMessage: "",
      isAlertShown: false,
      alertMessage: "",

      band: new Band(),
      instrument: new Instrument(),
      listIndex: null, //編集時に使う楽器リストのインデックス番号
      tag: null, //楽器の大グループ "VOCAL", "BRASS"

      maxItem: 2, //ラインアウト、持ち込みキーボードの限界数

      helper:{
        member:{
          title:"メンバー名",
          text:"メンバー名（ステージネーム）を入力して下さい。"
        },
        position:{
          title:"パート配置図",
          text:"ステージ上でのパート（メンバー）の位置を指定して下さい。"
        },
        vocal:{
          title:"ボーカル・コーラス・MC（MC中の喋り）",
          text:"メンバーがボーカル・コーラス・MC（MC中の喋り等）を担当する場合は選択して下さい。"
        },
        mic:{
          title:"マイク",
          text:"ボーカル・コーラス用のマイクが持込みであれば詳細を選択・記入して下さい。"
        },
        amp:{
          title:"アンプ",
          text:"アンプの持込み有無、詳細を入力して下さい。\n\n例）Marshall\n\nまた、ステージ上での位置を指定して下さい。"
        },
        di:{
          title:"DI",
          text:"ベースのライン出力にて、DIの持込みがある場合は詳細を入力して下さい。"
        },
        drum:{
          title:"ドラム会場レンタル",
          text:"会場でレンタル希望の機材を全て選択して下さい。"
        },
        bringDrum:{
          title:"持ち込みドラム機材",
          text:"持込み機材を全て入力して下さい。\n改行無しで入力して下さい。※英語表記でも可\n\n例）スネア、キックペダル、チャイナ\n例）Snare、KickPedal、China"
        },
        tom:{
          title:"ラックタムの数",
          text:"ラックタムの数を選択して下さい。\n\n例）Tom12\"のみの場合→１\n例）Tom13\"とTom12\"の場合→２\n例）Tom13\"とTom12\"と持込みTom10\"がある場合→３"
        },
        acousticGuitar:{
          title:"アコギ出力",
          text:"アコースティックギターの出力を選択して下さい。\nまたDIの持込みや、ほか特殊な事がある場合は備考欄へご記入下さい。"
        },
        isRentedKeyboard:{
          title:"キーボード（レンタル）",
          text:"キーボードをレンタル希望の場合は選択して下さい。\n※キーボードレンタルに関しましては予め会場にご確認下さい。"
        },
        bringKeyboard:{
          title:"キーボード（持ち込み）",
          text:"キーボードの持ち込みがある場合は、【持ち込みキーボードを追加】よりキーボードの詳細を入力・選択して下さい。\n複数台の持ち込みであれば、更に【持ち込みキーボードを追加】を繰り返し、持ち込みキーボードの台数分すべて設定して下さい。"
        },
        sync:{
          title:"同期",
          text:"同期がある場合はアウト端子・チャンネル数を選択して下さい。\n※現在編集中のメンバーが同期を操作する場合に選択\n\nドラムが同期類を扱う場合のみ位置を選択して下さい。\n下手（ステージに向かって左）or 上手（ステージに向かって右）"
        },
        line:{
          title:"PAへのラインアウト",
          text:"PAへのライン出力が必要な持ち込み機材（PAD他、電子楽器やDJ機材等）がある場合は【持ち込み機材を追加】から機材名・チャンネル数・アウト端子・DI\n持ち込み有無を選択して下さい。\n複数台あれば、更に【持ち込み機材を追加】を繰り返し、ライン出力が必要な持ち込み機材の台数分すべて設定して下さい。"
        },
        lineForViolin:{
          title:"PAへのラインアウト",
          text:"PAへのライン出力の端子を選択して下さい。\nまた、DIの持ち込みがあれば持込み有りにチェックを入れてください。"
        },
        monitor:{
          title:"イヤモニ",
          text:"イヤモニの持込みがある場合は詳細を選択して下さい。"
        },
        power:{
          title:"足元電源",
          text:"エフェクターや楽器等で足元に電源が必要な場合は選択して下さい。"
        },

      },

    }
  },
  async created(){
    console.log(`yes, created.`);
    await db.getBand(this.$route.params.id)
    .then((doc)=>{
      this.band = doc.data()
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    let updatedInst = this.$store.getters["data/instrument"]

    if(this.$route.params.instrumentId){
      this.mode = "edit"
      this.listIndex = this.band.lists.findIndex((part)=> part.id === this.$route.params.instrumentId)

      if(updatedInst != null) {
        this.instrument = updatedInst
        this.band.lists[this.listIndex] = this.instrument
        this.$store.commit("data/setInstrument", null)
      } else {
        this.instrument = this.band.lists[this.listIndex]
      }
    }else{
      // 新規パート作成
      if(updatedInst != null) {
        //楽器初回保存前に位置決めから帰ってきた時
        this.instrument = updatedInst
        this.$store.commit("data/setInstrument", null)
      } else {
        this.instrument.type = this.$route.query.instrument
        if(this.instrument.type === "ドラム"){
          this.instrument.drum.rent = this.$store.getters['select/drum']
        }
        if(this.instrument.type === "パーカッション"){
          this.instrument.percussion.bring = this.$store.getters['select/percussion']
        }
      }
    }

    this.pageTitle = this.instrument.type

    if(this.instrument.type === "ボーカル" || this.instrument.type === "コーラス" || this.instrument.type === "MC"){
      this.tag = "VOCAL"
      this.instrument.isVocal = true
      if(this.instrument.type === "ボーカル"){
        this.instrument.vocal.part = "ボーカル"
      }else if(this.instrument.type === "コーラス"){
        this.instrument.vocal.part = "コーラス"
      }
      else if(this.instrument.type === "MC"){
        this.instrument.vocal.part = "MC"
      }
    }

    if(this.instrument.type === "ギター" || this.instrument.type === "ベース"){
      this.instrument.isAmp = true
    }

    if(this.instrument.type === "サックス" || this.instrument.type === "トランペット" || this.instrument.type === "トロンボーン"){
      this.tag = "BRASS"
    }
    
    this.isCreated = true

  },
  mounted(){
    
  },
  methods:{

    createInstrument(){
      this.inactiveButton = true
      this.instrument.id = this._generateId("inst")
      this.band.lists.push({...this.instrument})
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    editInstrument(){
      this.inactiveButton = true
      this.band.lists[this.listIndex] = this.instrument
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteInstrument(){
      this.inactiveButton = true
      this.band.lists.splice(this.listIndex, 1)
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },

    offMic(){
     this.instrument.isBroughtMic = false
    },
    offDi(){
      this.instrument.idBroughtDi = false
    },
    addKeyboard(){
      if(this.instrument.bringKeyboardLists.length < this.maxItem){
        const keyboard = {name: null, channel: null, terminal: null, isDi: false}
        this.instrument.bringKeyboardLists.push(keyboard)
      }else{
        this.alertMessage = "キーボード追加の上限に達しています。"
        this._stop(true)
        this.isAlertShown = true
      }
    },
    deleteKeyboard(index){
      this.instrument.bringKeyboardLists.splice(index, 1)
    },
    addLineOut(){
      if(this.instrument.lineOutLists.length < this.maxItem){
        const item = {name: null, channel: null, terminal: null, isDi: false}
        this.instrument.lineOutLists.push(item)
      }else{
        this.alertMessage = "機材追加の上限に達しています。"
        this._stop(true)
        this.isAlertShown = true
      }

    },
    deleteLineOut(index){
      this.instrument.lineOutLists.splice(index, 1)
    },

    editPosition(isAmp){
      if(isAmp && this.instrument.amp.type == null) {
        this._stop(true)
        this.alertMessage = "アンプの種別を選択して下さい。"
        this.isAlertShown = true
        return
      }
      this.$store.commit('data/setInstrument', this.instrument)
      this.$router.push({name:'EditPosition', params:{ isAmp } })
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
      this.alertMessage = null
    }
  },
	
  validations(){
    return{
      instrument:{
        etc:{
          isChecked: contains(this.instrument.type === 'その他'),
          maxLength: maxLength(10)
        },
        member:{
          required,
          maxLength: maxLength(10)
        },
        vocal:{
          part:{
            isChecked: contains(this.instrument.isVocal)
          },
        },
        mic:{
          type:{
            isChecked: contains(this.instrument.isBroughtMic)
          },
          brand:{
            isChecked: contains(this.instrument.isBroughtMic),
            maxLength: maxLength(10)
          },
          model:{
            isChecked: contains(this.instrument.isBroughtMic),
            maxLength: maxLength(10)
          }
        },
        amp:{
          type:{
            isChecked: contains(this.instrument.isAmp)
          },
          position: {
            x:{ requiredIf: requiredIf(this.instrument.isAmp)  },
            y:{ requiredIf: requiredIf(this.instrument.isAmp)  },
          },
          brandOfHead:{
            maxLength: maxLength(10)
          },
          brandOfCab:{
            maxLength: maxLength(10)
          },
          brandOfCombo:{
            maxLength: maxLength(10)
          },
        },
        di:{
          brand:{
            isChecked: contains(this.instrument.idBroughtDi),
            maxLength: maxLength(10)
          },
          model:{
            isChecked: contains(this.instrument.idBroughtDi),
            maxLength: maxLength(10)
          }
        },
        drum:{
          bring:{
            maxLength: maxLength(50)
          },
          tom:{
            isChecked: contains(this.instrument.type === 'ドラム'),
          }
        },
        acousticGuitar:{
          type:{
            isChecked: contains(this.instrument.isLineOutForAcousticGuitar),
          },
          text:{
            maxLength: maxLength(50)
          },
        },
        rentKeyboard:{
          number:{
            isChecked: contains(this.instrument.isRentedKeyboard),
          },
        },
        ampForKeyboard:{
          type:{
            isChecked: contains(this.instrument.isAmpForKeyboard),
          }
        },
        percussion:{
          other:{
            maxLength: maxLength(50)
          }
        },
        micForInstrument:{
          type:{
            isChecked: contains(this.instrument.isBroughtMicForInstrument)
          },
          brand:{
            isChecked: contains(this.instrument.isBroughtMicForInstrument),
            maxLength: maxLength(10)
          },
          model:{
            isChecked: contains(this.instrument.isBroughtMicForInstrument),
            maxLength: maxLength(10)
          }
        },
        lineOutForViolin:{
          terminal:{
            isChecked: contains(this.instrument.type === 'バイオリン'),
          }
        },

        sync:{
          type:{
            isChecked: contains(this.instrument.isSync)
          },
          channel:{
            isChecked: contains(this.instrument.isSync),
          },
          terminal:{
            isChecked: contains(this.instrument.isSync),
          },
        },
        syncForDrum:{
          type:{
            isChecked: contains(this.instrument.isSyncForDrum)
          },
          channel:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
          terminal:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
          site:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
        },
        monitor:{
          type:{
            isChecked: contains(this.instrument.isBroughtMonitor)
          },
          channel:{
            isChecked: contains(this.instrument.isBroughtMonitor),
          },
        },
        // text:{
        //   maxLength: maxLength(50)
        // },
        position: {
          x:{ required },
          y:{ required },
        },

      }
    }
  },
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.keyboard-container{
  margin-top: 10px;
}
.delete-text{
  color: var(--red);
  text-align: center;
}
</style>