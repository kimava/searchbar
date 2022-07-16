# Search Bar with Auto-complete Feature
사용자가 검색어를 입력했을 때 데이터에 검색어와 일치하는 단어가 있을 경우, 아래에 검색 제시어가 노출됩니다.

<br/>

# Purpose
사전 과제 제출을 위해 구현하였습니다.

<br/>

# Installation
```
npm install
npm start
```
```localhost:3000``` 접속

<br/>

# Feature
- 검색어 입력 시, 검색어와 일치하는 단어가 있으면 아래 검색창에 제시어가 노출 됩니다. (예: '마' 입력 → '마스크' 제시)
- 사용자가 검색창에 검색어 입력 후 엔터/ 아래 제시된 제시어 키보드(⬆️, ⬇️)로 선택 후 엔터/ 제시어 클릭 시 외부 구글 검색창으로 이동합니다.
- 검색창 ❌ 버튼 클릭 시 검색창이 초기화 됩니다.
<br/>

# Stack
- React (CRA)
- Styled-components

<br/>

# Folder Structure
```
📦src
 ┣ 📂components
 ┃ ┗ 📂searchBar
 ┃ ┃ ┣ 📂test
 ┃ ┃ ┗ 📜searchBar.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useDebounce.jsx
 ┣ 📂network
 ┃ ┗ 📜dataClient.js
 ┣ 📂pages
 ┃ ┗ 📜search.jsx
 ┣ 📂presenter
 ┃ ┣ 📂test
 ┃ ┗ 📜searchPresenter.js
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜setupTests.js
 ```

# Usage
#### src/network/dataClient
|함수|역할|
|---|-------|
|```fetchItems```|data.json에서 파일 읽어오기|



#### src/presenter/searchPresenter

```
class SearchPresenter {
  constructor(data, maxResult) {
    this.data = data;
    this.maxResult = maxResult;
  }

  suggestQuery(query)
  navigateSuggestion(key, index, list, callback, onSelect)
```  
|필드|역할|
|---|-------|
|```data```|외부에서 주입 받은 데이터 배열|
|```maxResult```|사용자에게 보여 줄 최대 제시어의 개수|

|함수|역할|
|---|-------|
|```suggestQuery```|사용자의 검색어 포함(일치)하는 name 배열을 반환 <br/>(maxResult 개수 반영)|
|```navigateSuggestion```|검색창 keyboard event handle|


#### 키보드 이벤트 핸들링
1. input focus 시 시작 index -1로 초기화
2. 검색제시어 배열이 있을 경우, 사용자가 ⬇️ 누르면 index + 1 => 실제 배열 인덱스(0부터 시작) 같도록 함
3. 검색제시어 배열이 있을 경우, 사용자가 ⬆️ 누르면 index - 1 
4. 사용자가 index = -1, 인풋(검색창)에서 엔터, 혹은 검색제시어 배열 내에서 엔터 누르면 해당 인덱스 콜백 함수에 전달


#### src/pages/search
|함수|역할|
|---|-------|
|```handleChange```|인풋값 → state 할당|
|```handleKeyDown```|인풋 키보드 이벤트 발생 시 navigateSuggestion 호출|
|```link```|외부 검색 링크 주소 반환|

#### suggestQuery 호출
- debounce hook을 이용해 query에 debounce 적용 후 suggestQuery에 전달

#### src/searchBar/searchBar
|함수|역할|
|---|-------|
|```openLink```|```Enter``` 키로 검색 시 외부 링크로 연결|
|```clearQuery```|검색어 ```Enter```, ```Click``` 시 인풋값 초기화|
<br/>

# Trouble Shooting

### 1. data.json 불러오기 실패
#### 문제
- DB에서 데이터 받아오는 경우 mock 위해 fetch 사용했을 때 데이터 불러오기 실패

#### 해결
- fetch에 url 들어가야 하므로 mock 할 때 public 폴더 기준으로 경로 지정해야 하는 것 학습

<br/>

### 2. 문자열 입력할 때마다 ```suggestQuery``` 발생
#### 문제
- 너무 잦은 query로 인한 API 및 resource 낭비
- debounce 학습 후 lodash debounce 이용했으나 동작하지 않음

#### 해결
- debounce 동작 원리 재학습 후 dependency 삭제하고 custom hook으로 만들어 적용

<br/>

### 3. 키보드 이벤트를 처리하는 handleKeyDown 테스트 코드
#### 문제
- jest, testing library 이용한 테스트 코드 구현이 어려움

#### 해결
- 해당 로직을 searchPresenter로 옮겨 testable한 코드로 구현
