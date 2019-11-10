これから [React](https://reactjs.org) を学ぶ人向けです。
React は使ったことがあるが [Hooks](https://reactjs.org/docs/hooks-intro.html) で書いたことはない人にも役立つかと思います。

言語は [TypeScript](https://www.typescriptlang.org) で、ある程度文法を知っている前提ですが、難しい記法は避けつつ要所には説明を加えます。

# 実装するサンプル

CodePen 上にあります。

<p class="codepen" data-height="360" data-theme-id="default" data-default-tab="js,result" data-user="kazuma1989" data-slug-hash="RwwJXbp" style="height: 360px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Hello React">
  <span>See the Pen <a href="https://codepen.io/kazuma1989/pen/RwwJXbp">
  Hello React</a> by kazuma1989 (<a href="https://codepen.io/kazuma1989">@kazuma1989</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

ブラウザー上で書き換えて、試すことができます。
セットアップが省けておすすめです。

ローカルで試したい場合は https://github.com/kazuma1989/handson-react-redux/tree/master/hello-react を参照してください。
[Node.js](https://nodejs.org/en/) と [Yarn](https://yarnpkg.com/ja/) のインストールが必要です。

# 実装ステップ

1. JSX を知る
2. State を参照する
3. State を変化させる
4. 複数の State を変化させる
5. 配列を参照する
6. 配列の中身を変化させる
7. API を呼ぶ
8. 表示のタイミングで処理を起動する
9. `ReactDOM.render()` は何をしているのか

## 1. JSX を知る

最もシンプルな React の **コンポーネント** は次のようになっています:

```tsx
function AppStatic() {
  return (
    <div>
      <h1>Hello world!</h1>

      <p>{new Date().toString()}</p>
    </div>
  )
}
```

HTML のように見える `<div>...</div>` の部分が **JSX** です。
JSX は JSX.Element 型の値を生成します。
コンポーネントとは、JSX.Element 型の値を返すただの関数なのです。

JSX に文字列を混ぜたい場合は、`Hello world!` の部分のように、そのまま文字列を書くだけです。
文字列以外を混ぜたい場合は `{` と `}` で囲みます。
`{}` 内は JavaScript や TypeScript の地の文と同じように扱われるので、`new Date().toString()` のような処理を書くことができています。

JSX は JSX.Element 型の値を生成するので、その値は変数に代入することができます。
つまり、次のように書けます:

```diff
 function AppStatic() {
+  const today = <p>{new Date().toString()}</p>

   return (
     <div>
       <h1>Hello world!</h1>

-      <p>{new Date().toString()}</p>
+      {today}
     </div>
   )
 }
```

_! TypeScript 文法について_
`const x = ...` は `var` や `let` と同じ、変数定義の書き方です。
値の再代入ができないので、変数というよりは定数ですが。
`var` は普通使わず、`let` よりも `const` を使う方がよいとされています。

また、JSX.Element 型の値を返す関数を作ればそれはコンポーネントなので、自作コンポーネントを定義するのも簡単です:

```diff
 function AppStatic() {
   const today = <p>{new Date().toString()}</p>

   return (
     <div>
-      <h1>Hello world!</h1>
+      <Hello />

       {today}
     </div>
   )
 }
+
+function Hello() {
+  return <h1>Hello world!</h1>
+}
```

コンポーネントにバリエーションを持たせるため、外から値を渡すこともできます。
外から渡す値のことを **プロパティ** と言います:

```diff
 function AppStatic() {
   const today = <p>{new Date().toString()}</p>

   return (
     <div>
-      <Hello />
+      <Hello name="my world" />

       {today}
     </div>
   )
 }

-function Hello() {
-  return <h1>Hello world!</h1>
+function Hello(props) {
+  return <h1>Hello {props.name}!</h1>
 }
```

プロパティはコンポーネントの第一引数に、オブジェクト（連想配列）の形で渡されます。

TypeScript なので、プロパティの型はきちんと宣言するのがよいプラクティスです:

```diff
-function Hello(props) {
+function Hello(props: { name: string }) {
   return <h1>Hello {props.name}!</h1>
 }
```

これで、`<Hello neme="world" />` のような書き間違えや、`<Hello name={0} />` のような想定外の型の値を渡してしまうこと、また `<Hello />` のように値を渡さない（undefined にしてしまう）といったことを、実行時ではなくコンパイル時に防げます。
（CodePen 上ではチェックは働きません）

Destructuring assignment という記法で書いてみます:

```diff
 function Hello(props: { name: string }) {
-  return <h1>Hello {props.name}!</h1>
+  const { name } = props
+
+  return <h1>Hello {name}!</h1>
 }
```

これは `const name = props.name` としているのと同じことです。
`name` を二回書かなくてよく、簡単ですね。

Destructuring assignment は引数の位置でも可能なので、次のようにも書けます:

```diff
-function Hello(props: { name: string }) {
-  const { name } = props
-
+function Hello({ name }: { name: string }) {
   return <h1>Hello {name}!</h1>
 }
```

_!!_ JSX は、そのままではブラウザー上では動きません。
`<div>...</div>` を `React.createElement('div', ...)` のように変換してやる必要があります。

## 2. Input 要素を使う

[Angular](https://angular.io) や [Vue.js](https://vuejs.org) との違いを体験してみます。

```tsx
function AppInputStatic() {
  const name = 'world'

  return (
    <div>
      <h1>Hello {name}!</h1>

      <input value={name} />
    </div>
  )
}
```

この input 要素の値は、テキストボックスにいくら入力しても変更できません。
2 way binding の仕組みで `name` の値を自動的に変えてくれた Angular や Vue.js とは対照的です。

React では、「渡された側」のコンポーネントがプロパティ（input にとっての value）の値を変えることはできません。
必ず「渡す側」が変えてやる必要があります。
このルールは、input のような組み込みのコンポーネントでも、自作のコンポーネントでも同じです。

テキストボックスの中身を変えるには、次のステップのように、state を使う必要があります。

## 3. State を使う

先ほどの AppInputStatic を次のように書き換えます（まだテキストボックスの中身は変えられません）:

```diff
-function AppInputStatic() {
-  const name = 'world'
+function AppInput() {
+  const state = useState('')
+  const name = state[0]

   return (
     <div>
       <h1>Hello {name}!</h1>

       <input value={name} />
     </div>
   )
 }
```

`useState()` という関数が現れました。
このような、名前が use から始まる `useXxx()` のような関数を **hooks** と言います。

`useState()` は重要な組み込み hooks のひとつで、コンポーネントに **state**、つまり「内部状態」を持たせることができます。
むしろ、コンポーネントに内部状態を持たせるには state を使うしかありません。

`useState()` の戻り値は、配列として返されます。
（厳密にはタプルというのですが、結局配列のように使えるのでとくに言及しません）
要素数は 2 で、1 つめは state の値、2 つめは state の値を変更するための関数です。
テキストボックスの入力に応じて値を変化させるには、次のように書きます:

```diff
 function AppInput() {
   const state = useState('')
   const name = state[0]
+  const setName = state[1]

   return (
     <div>
       <h1>Hello {name}!</h1>

-      <input value={name} />
+      <input value={name} onChange={function(e) { setName(e.target.value) }} />
     </div>
   )
 }
```

`onChange` に渡した関数は、テキストボックスに 1 文字入力される度に呼ばれます。
`setName()` もその度に呼ばれ、リアルタイムに `name` の値が変化します。

`useState()` の戻り値を destructuring assignment で受け取り、`onChange` に渡す関数をアロー関数で書くと、次のようになります:

```diff
 function AppInput() {
-  const state = useState('')
-  const name = state[0]
-  const setName = state[1]
+  const [name, setName] = useState('')

   return (
     <div>
       <h1>Hello {name}!</h1>

-      <input value={name} onChange={function(e) { setName(e.target.value) }} />
+      <input value={name} onChange={e => setName(e.target.value)} />
     </div>
   )
 }
```

## 4. 複数の State を変化させる

## 5. 配列を参照する

## 6. 配列の中身を変化させる

## 7. API を呼ぶ

## 8. 表示のタイミングで処理を起動する

## 9. `ReactDOM.render()` は何をしているのか

最初のうちは _おまじない_ なんだと、スキップしても大丈夫です。
気になる人向け。

---

React による Web アプリの実行起点（エントリーポイント）は次のような構成になっています。
ユーザーにアプリの入り口として index.html を案内する場合:

###### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- meta 要素省略 -->

    <!-- entry.js を読み込み、body が描画された後に実行する (defer) -->
    <script defer src="entry.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

###### entry.js

```js
// import 文で必要なライブラリーを読み込む
import React from 'react'
import ReactDOM from 'react-dom'

// 自作の App コンポーネントの定義を読み込む
import App from './App'

// App を index.html 内の <div id="root"></div> へ描画する
ReactDOM.render(<App />, document.getElementById('root'))
```

React のコンポーネントは、DOM（HTML 要素のツリー）のようでありながら、DOM と組み合わせなくてもよいという、抽象的な存在です。
そのため、App コンポーネントは ReactDOM なしで定義し、実行するタイミングで一度だけ `ReactDOM.render()` によって HTML へ描画します。

# 過去の記事

この記事は、次の記事の 2019 年版です。

- [React を、サンプルを実装しながら理解する](https://qiita.com/kazuma1989/items/410a1c20f4128eb30327)
