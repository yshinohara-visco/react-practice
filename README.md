# react-practice

react-i18next における検証を行う

yarn add で i18next と react-i18-next の 2 つを追加する必要がある。

lng で指定する言語名は任意らしい(hoge が使えた)

i18n の初期化は専用の ts ファイルを作り、index.tsx で import する

参考 https://qiita.com/suzukalight/items/54860fdda35e6ce983d9

yarn add -D babel-plugin-i18next-extract @babel/cli で DevDependencies に抽出用ライブラリを追加

package.json に"babel"項目を追加、"scripts"に"i18next-extract"を追加
yarn i18next-extract で抽出の実行
警告が出たので yarn add -D @babel/plugin-proposal-private-property-in-object で追加

良く分からないが scripts の内容は "i18next-extract": "set NODE_ENV=development&& babel src --extensions \".js,.jsx,.ts,.tsx\"" だと一応機能した。が、ファイルの内容が端末に出力されるのが邪魔
