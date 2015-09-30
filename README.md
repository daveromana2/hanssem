# hanssem

### hanssem
- hanssem main 페이지 벤치마킹
	- 기존 HTML 코드와 다르게 본인의 생각을 바탕으로 벤치마킹
	- 웹 접근성을 고려한 페이지 구현

-


### 난관
- 탭메뉴를 이용하여 페이지 이용 시 메뉴에서 focus 가 존재하지 않을 경우 모든 하위메뉴 접히는 기능 구현
	해결: 	마지막 a태그에서 focus가 사라질 경우 모든 하위메뉴 접히도록 구현 하였음에도 오류 발생.
		따라서, 메뉴 다음으로 focus가 이동하는 family site 항목으로 focus 이동 시 모든 하위메뉴가 접히도록 구현

- 슬라이드 갤러리 구현 시 이전 버튼 클릭시 빈 화면이 나타난 후 원하는 이미지가 보여짐.
	해결:	맨 처음 페이지가 로딩 됬을 때 마지막 이미지를 가장 처음에 prepend 시켜 이전 버튼을 클릭하여도 이미지가 잘 		보이도록 구현

-

### 버전관리
- skip navigation 구현
- 슬라이드 갤러리 중 정지버튼이 없는 부분에 정지, 재생 버튼 추가
