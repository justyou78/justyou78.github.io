---
layout: post
---

_해당 내용은 react에 대한 기본적인 지식이 필요합니다._ [react-hook-form](https://react-hook-form.com 'link. react-hook-form')

---

# 개요

안녕하세요 오늘은 javascript에서 두 배열을 비교하는 방식에 대하여 포스팅하겠습니다.

두 배열을 비교하는 로직은 프로젝트 개발 과정에서 많이 사용하게 됩니다.

예를들어서 ID가 [1,2,3,4]가 존재하고, 유저가 [1,2]번의 ID를 삭제하려고 할 때,

[1,2,3,4] - [1,2] = [3,4]가 이루어질 것이고, 해당 내용은 배열의 차집합을 통해서 문제를 해결할 수 있습니다.

이처럼 개발 과정에서 두 배열을 비교하는 방식들을 살펴보고 해당 내용을 기술해보겠습니다.

# 두 배열 비교

[1,2,3,4], [1,2,5,6] 두 배열이 있을 때, 해당 배열을 합집합하는 과정을 살펴보겠습니다.

## 합집합

합집합을 구현하기 위해서는 스프레드 연산자와 Set 오브젝트를 이용하면 보다 편리하게 구현할 수 있습니다.

**중복된 값이 여러번 포함되면 안됩니다!**

바로 코드를 보겠습니다.

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];

const unionArr = [...arr1, ...arr2];

console.log([...new Set(unionArr)]);
// [1, 2, 3, 4, 5, 6]
```

1. 두 배열을 스프레드 연산자로 합칩니다.
2. Set 오브젝트는 교윳값으로 해당 내용을 저장하고 ([1, 2, 3, 4, 5, 6])
3. 해당 내용을 다시 배열로 변환하여 로그를 출력하였습니다.

**로직으로만 보면 2줄로 문제를 해결했네요.**

## 교집합

교집합은 필터를 이용해서 한 배열에서 다른 배열의 값과 일치하는 값만 뽑아내어 처리할 수 있습니다.

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];

const intersectArr = arr1.filter((val) => arr2.includes(val));

console.log([...new Set(intersectArr)]);
/// [1, 2]
```

1. 하나의 배열에서 값을 뽑아 다른 배열에 포함되는지 확인합니다.
2. 다른 배열에 포함되면, 해당 값은 intersectArr에 추가 됩니다.
3. 중복된 값이 있을 경우를 대비하여 Set 오브젝트로 고윳값만 뽑아냅니다.

## 차집합

이어서 차집합도 보겠습니다. 차집합은 둘 배열중에 누구의 차집합 값을 확인하고 싶을지 먼저 정해야합니다.

저는 [1, 2, 3, 4] 배열의 차집합을 구해보겠습니다.

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];

const differenceArr = arr1.filter((val) => !arr2.includes(val));

console.log([...new Set(differenceArr)]);
/// [3, 4]
```

1. arr1에서 값을 뽑아 arr2에 해당 값이 포함되는지 확인합니다.
2. 포함되지 않는 값만 differenceArr에 추가합니다.
3. 중복된 값이 있을 경우를 대비하여 Set 오브젝트로 고윳값만 뽑아냅니다.

## 대칭차집합

대칭차집합을 구해볼까요? 수학시간에 한 번쯤 배웠던 기억이 있으실 겁니다.

**합집합 - 교집합 = 대칭차집합**이다! 기억나시나요?

혹은 **두 집합의 차집합의 합**으로도 표현할 수 있습니다.

위에서 두 코드 모두 구현해 봅시다.

### 합집합 - 교집합 = 대칭차집합

```javascript
const arr1 = [1, 1, 2, 3, 4, 4];
const arr2 = [1, 1, 2, 5, 6, 6];

const unionArr = [...arr1, ...arr2];

const intersectArr = arr1.filter((val) => arr2.includes(val));

const symmetricDifferenceArr = unionArr.filter(
  (val) => !intersectArr.includes(val)
);

console.log([...new Set(symmetricDifferenceArr)]);
// [3, 4, 5, 6]
```

1. 힙잡합([1,2,3,4,5,6])에서 교집합([1,2])을 제외한 나머지를 구한다.
2. 중복된 값이 있을 경우를 대비하여 Set 오브젝트로 고윳값만 뽑아냅니다.

### 두 집합의 차집합의 합

```javascript
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 2, 5, 6];

const symmetricDifferenceArr = [
  ...arr1.filter((val) => !arr2.includes(val)),
  ...arr2.filter((val) => !arr1.includes(val)),
];

console.log([...new Set(symmetricDifferenceArr)]);
// [3, 4, 5, 6]
```

1. arr1의 차집합과 arr2의 차집합을 합한다!
2. 중복된 값이 있을 경우를 대비하여 Set 오브젝트로 고윳값만 뽑아냅니다.

# 정리

배열의 비교는 자주 사용되지만 이따금씩 머리가 굳어져서 헷갈리는 경우가 많습니다.

정리해놓고 나중에 필요할 때, 확인하면 좋을 것 같네요.

해당 글이 도움이 되었으면 좋겠습니다.
