---
layout: post
---

# 개요

css word-break 스타일 이해하기.

# 설명

매번 word-break의 각 옵션이 어떤 역할을 하는지 헷갈리는 경우가 종종 있다.

이번에 블로그에 작성하면서 다신 잊어버리지 않겠다!

# what's word-break? (word-break란?)

word-break는 HTML 태그 내부 텍스트에서 텍스트가 너무 길어진 경우, 어떻게 라인 분기점을 설정할 것인지 지정하는 설정이다.

## word-break 간단 예시

기본 div 태그 내부에 텍스트를 다양하게 넣어보자. 언제는 다음 라인으로 텍스트가 넘어가지만 특정한 경우에는 텍스트가 영역을 벗어나도 다음 라인으로 텍스트가 넘어가지 않는다.

- 참고: word-break의 기본값은 **normal** (Ex. word-break: normal)

```html
<div style="width: 300px; background-color: antiquewhite">
  안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
  안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
  hellowhellowhellowhellowhellowhellowhellowhellowhellowhellowhellowhellow
  hellow hellow hellow hellow hellow hellow hellow hellow hellow hellow
</div>
```

![css_word-break_sample](/assets/images/javascript/css_word-break_sample.png)

## 사전 지식: CJK

CJK: 중국, 일본, 한국의 영문 첫 글자를 따서 부르는 말.

div 내부 텍스트가 CJK인지 아닌지에 따라 다르게 동작할 수 있으니 알아두고 시작하자.

## 옵션

#### normal: 공백, 개행이 존재할 시, 단어 단위로 라인을 구분합니다. (CJK는 음절 단위)

- 'apple banana'라는 텍스트가 반복절으로 존재하는 div 태그 내부에서 해당 단어 중, bana'n'a에서 div 내부 영역을 'n'에서 벗어난다면 단어 단위로 구분되어 'banana'를 다음 라인에 표시되도록 합니다.
  - 아래 이미지 처럼 apple 다음에 공백이 생기고, banana를 다음 라인에 표시했네요.
  - 만약 applebananaapplebananaapplebanana 처럼 단어에 공백이 없다면 해당 단어를 단어 단위로 구분할 수 없어서 영역을 벗어날 수 있습니다.
- 하지만 CJK의 경우는 음절 단위로 구분하기 때문에 '사과 바나나' 단어 중, 바나'나'에서 영역을 벗어난다면 '나'를 다음 라인에 표시합니다.
  - 바나나 단어를 전부 다음 라인에 표시하는 것이 아닌, 마지막 '나'만 다음 라인에 표시되었습니다.

```html
<div style="width: 300px; background-color: antiquewhite">
  apple banana apple banana apple banana apple banana apple banana 사과 바나나
  사과 바나나 사과 바나나 사과 바나나 사과 바나나 사과 바나나 사과 바나나
</div>
```

![css_word-break_normal](/assets/images/javascript/css_word-break_normal.png)

#### break-all: 모든 단어를 음절 단위로 구분하여 다음 라인에 표시.

- 모든 단어를 음절로 구분하기 때문에 위 영문 이미지에서 분리 기준이었던 bana'n'a도 bana까지는 위에 표시되고 na만 다음 라인에 추가되겠네요.

```html
<div
  style="
        word-break: break-all;
        width: 300px;
        background-color: antiquewhite;
      "
>
  apple banana apple banana apple banana apple banana apple banana 사과 바나나
  사과 바나나 사과 바나나 사과 바나나 사과 바나나 사과 바나나 사과 바나나
</div>
```

![css_word-break_break-all](/assets/images/javascript/css_word-break_break-all.png)

#### break-all: CJK 언어에서 라인 분기가 생기지 않습니다. (Non-CJK 문자는 normal과 동일하게 동작하낟.)

- CJK 언어에서 음절 단위 구분 기능이 없어지네요.
  - 아예 구분 기능이 없어지는 것은 아니고, 공백, 개행에 대한 라인 분기는 존재하며, 음절 단위 라인 분기만 제거됩니다.
- Non-CJK에서는 normal 옵션과 동일합니다.

```html
<div style="word-break: keep-all; width: 300px; background-color: antiquewhite">
  apple banana apple banana apple banana apple banana apple banana
  applebananaapplebananaapplebananaapplebananaapplebanana 사과 바나나 사과
  바나나 사과 바나나 사과 바나나 바나나 사과 바나나 사과 바나나 사과 바나나
  바나나사과바나나사과바나나사과바나나바나나사과바나나사과바나나사과바나나
</div>
```

![css_word-break_keep-all](/assets/images/javascript/css_word-break_keep-all.png)

#### auto-phrase, break-word

auto-phrase는 실험적 옵션이고, break-word 권고되지 않는 옵션으로 현재 시점에서 다루긴 어려울 것 같습니다.

# 결론

가끔 div 영역에 영문을 삽입할 경우, 영문이 해당 영역을 벗어나는 현상이 발생합니다.

개행 및 공백 단위로 문자가 잘 정리되어있다면 문제되지 않겠으나, 사용자로부터 입력 가능한 텍스트인 경우에는 어떤 문자가 들어갈지 알 수 없으니 이런 경우에는 'break-all'옵션을 사용하여 음절 단위로 구분하여 영역을 벗어나지 않도록 처리가 필요하였습니다.
(Ex. 사용자가 UI를 통해서 화면을 커스텀할 수 있는 템플릿을 제공할 때)

이런 경우, 옵션을 잘 사용하여 처리하시면 좋을 것 같습니다.
