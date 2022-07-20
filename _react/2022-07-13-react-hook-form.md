---
layout: post
---

_해당 내용은 react에 대한 기본적인 지식이 필요합니다._ [react-hook-form](https://react-hook-form.com 'link. react-hook-form')

---

# 개요

안녕하세요. 오늘은 react 패키지 react-hook-form을 포스팅하겠습니다.

해당 패키지를 사용하면서 여러 장단점이 존재하였는데요.

이이 대한 내용들을 공유해 보도록 하겠습니다.

해당 패키지를 사용할지 고민중이시라면 이 글을 한 번 읽어보셔도 좋을 것 같습니다.

---

# 패키지 기본 개념

이 패키지는 form의 랜더링 최적화를 도와주는 패키지입니다.

랜더링 최적화라고 말하면 어떤 의미있지 잘 이해하기 어려울 수 있으므로 예시를 통해서 설명하겠습니다.

아래와 같은 코드가 있다고 가정하겠습니다.

해당 코드는 로그인 화면이고, ID,PW를 입력해야하는 화면입니다.

ID를 변경하면 상태가 변경되고, App 컴포넌트는 전체적으로 랜더링이 다시 이루어집니다.

**(값이 변경되지 않은 PW도 랜더링이 이루어진다.)**

```react
import { useState } from 'react';

export default function App() {
  const [val, setVal] = useState();

  const handleChangeId = (e) => {
    setVal(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor='id'>ID: </label>
        <input id='id' onChange={handleChangeId} value={val} />
      </div>
      <div>
        <label htmlFor='pw'>PW: </label>
        <input id='pw' />
      </div>
    </div>
  );
}
```

![useState_render](/assets/images/react/useState_render.gif){:height="40%" width="100%"}

상태 변경에 따라서 각 설정(ID, PW)이 랜더링 됩니다.

각 설정 컴포넌트가 크지 않을 경우에는 App 컴포넌트 전체가 랜더링 되어도 큰 문제가 되지 않습니다.

하지만 설정이 많아 지고 각 설정에 대한 컴포넌트가 무거워진 경우라고 생각해 봅겠습니다.

```react
import { useState } from 'react';

export default function App() {
  const [val, setVal] = useState();

  const handleChangeId = (e) => {
    setVal(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor='id'>ID: </label>
        <input id='id' onChange={handleChangeId} value={val} />
      </div>
      <div>
        <label htmlFor='pw'>PW: </label>
        <input id='pw' />
      </div> X 100개
      <HeavyComponent /> X 100개
    </div>
  );
}
```

ID에 타이핑을 하나만 하더라도 많은 설정과 HeavyComponent가 랜더링 되면서 랜더링에 엄청난 시간이 소요 될 수 있습니다.

여기서 react-hook-form 패지키를 사용하게 되면 어떤 효과를 가져 올 수 있을까요?

아래 패키지를 반영한 코드를 보면서 확인해 보겠습니다.

```react
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit } = useForm({
    id: null,
    pw: null,
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor='id'>ID: </label>
          <input id='id' {...register('id')} />
        </div>
        <div>
          <label htmlFor='pw'>PW: </label>
          <input id='pw' {...register('pw')} />
        </div>
        <input type='submit' />
      </div>
    </form>
  );
}
```

![react-hook-form_render](/assets/images/react/react-hook-form_render.gif){:height="40%" width="100%"}

위 코드를 동작시키면 id를 수정하더라도 App 컴포넌트는 새롭게 랜더링 되지 않는 것을 확인할 수 있습니다.

react-hook-form은 설정 값들에 register를 추가하고 register가 참조하는 값에 대하여 상태를 react-hook-form에서 관리합니다.

해당 값은 값이 변경하더라도 해당 컴포넌트(App)를 랜더링 하지 않습니다.

당연히 App 컴포넌트를 새롭게 랜더링하지 않으니까 많은 설정들이 있어도 랜더링 속도가 느려지지 않겠죠?

그렇다면 id가 중복될 경우, 에러 메시지를 표시해야 한다고 가정해 보겠습니다.

일반적인 경우 ID의 상태 값을 변경하면 App 컴포넌트가 랜더링되고 val에 존재하는 값과 중복되는 값들을 비교하여 일치할 경우, 에러 메시지를 표시하면 됩니다.

여기서는 어떻게 처리해야 할까요?

대부분의 Form 관리 패키지들은 이런 상황에 대한 처리가 아주 잘 되어있습니다.

코드를 보겠습니다.

```react
import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const duplicatedId = ['d1', 'd2'];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: null,
      pw: null,
    },
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);

  const validateId = (value) => {
    if (duplicatedId.includes(value)) {
      return '중복!!';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor='id'>ID: </label>
          <input id='id' {...register('id', { validate: validateId })} />
          {errors?.id?.type === 'validate' && <p> {errors?.id?.message}</p>}
        </div>
        <div>
          <label htmlFor='pw'>PW: </label>
          <input id='pw' {...register('pw')} />
        </div>
        <input type='submit' />
      </div>
    </form>
  );
}
```

![react-hook-form_validation_render](/assets/images/react/react-hook-form_validation_render.gif){:height="40%" width="100%"}

위 코드의 동작시나리오는 정리해 보겠습니다.

1.  사용자는 id를 입력합니다.
2.  register에 등록된 validateId 함수를 통해서 id가 중복되었는지 검토합니다.
3.  중복될 경우, errors 변수에 에러 메시지가 포함되며 App 컴포넌트는 errors 상태가 변경되었기 때문에 App 컴포넌트를 새롭게 랜더링하여 에러를 표출하도록 합니다.

**이와 같은 동작에서 에러가 발생할 경우를 제외하고 App 컴포넌트의 설정들을 변경하더라도 화면이 랜더링 되지 않으니, 컴포넌트의 랜더링을 최적화 시킬 수 있게 됩니다.**

# 조금 더 최적화 하기.

해당 내용만 반영하더라도, 충분히 컴포넌트의 랜더링을 최적화 시킬 수 있습니다.

하지만 에러가 발생할 때마다, App 컴포넌트 전체가 새롭게 랜더링 되기 때문에, 그 순간에는 속도가 느려지는 현상이 발생하게 됩니다.

조금 더 최적화를 해보겠습니다.

```react
import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';

export const IdController = (props) => {
  const { control, register } = props;
  const duplicatedId = ['d1', 'd2'];
  const validateId = (value) => {
    if (duplicatedId.includes(value)) {
      return '중복!!';
    }
  };
  return (
    <Controller
      name='id'
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        return (
          <Fragment>
            <label htmlFor='id'>ID: </label>
            <input id='id' {...register('id', { validate: validateId })} />
            {error && <p> {error.message}</p>}
          </Fragment>
        );
      }}
    />
  );
};

export default function App() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      id: null,
      pw: null,
    },
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <IdController control={control} register={register} />
        </div>
        <div>
          <label htmlFor='pw'>PW: </label>
          <input id='pw' {...register('pw')} />
        </div>
        <input type='submit' />
      </div>
    </form>
  );
}
```

![react-hook-form_controller_render](/assets/images/react/react-hook-form_controller_render.gif){:height="40%" width="100%"}

위 코드로 인하여 어떤게 바뀌었을까요?

일단 변경사항부터 살펴보겠습니다.

1. react-hook-form에서 새로운 컴포넌트 Controller를 불러와 새로운 컴포넌트를 만들었습니다.
2. ID에 해당하는 라벨과 입력 텍스트 내용들을 해당 컴포넌트로 래핑하였습니다.
3. useForm에서 참조하는 errors 변수를 주석처리 하였습니다.

그러면 이젠 id값을 변경할 때, 어떤 동작이 이루어지는지 시나리오를 보겠습니다.

1. ID 값을 변경할 경우, register에 등록된 'id'에 값을 확인하고 Controller 속성의 name과 매칭되는 컨트롤러를 랜더링합니다.
2. 해당 Controller는 값이 변경될 때마다 랜더링 되지만, 다른 설정 컴포넌트(PW)는 랜더링 되지 않습니다.
   - errors 변수를 주석처리하고, 위 처럼 코드를 수정하면서 App 컴포넌트가 랜더링이 이루어지지 않는다.

이전 코드에서는 에러가 발생하면 App 자체 컴포넌트가 랜더링 되었습니다. 하지만 이번 코드에서는 Controller에 해당하는 부분만 데이터가 변경될 때마다 새롭게 랜더링 되고, 에러가 발생하더라도 에러가 발생한 컨트롤러만 변경될뿐, 다른 컴포넌트는 변경되지 않습니다.

이 내용에 대하여 이런 의문을 가질 수 있습니다. > "해당 컨트롤러 부분에 대하여 설정이 변경될 때마다 랜더링 되기 때문에 랜더링 최적화가 더 안좋아진 것 아닌가요?"

ID 값이 변경될 때마다 컨트롤러 컴포넌트가 지속적으로 랜더링 되지만, App의 다른 설정들은 랜더링하지 않기 때문에 설정값이 많더라도 id만 랜더링되어 속도가 개선됩니다.

최소한의 컴포넌트만 랜더링 하는 것이죠.

# 추가적으로 유용한 내용

추가적으로 패키지에서 제공하는 다른 기능은 어떤 것이 있을까요?

1. 다양한 API
   - <https://react-hook-form.com/api>
2. React Native 지원
3. 테이블의 각 셀에 대한 랜더링 최적화 ( 배열 )
   - 해당 내용은 <https://react-hook-form.com/api/usefieldarray>에서 확인하실 수 있습니다.
4. 여러 Validation 라이브러리 사용 가능
   - > We also support schema-based form validation with Yup, Zod , Superstruct & Joi
   - 해당 라이브러리를 통해 통합된 Validation을 적용 시킬 수 있습니다
     - _현재 사내에서도 yup를 이용하여 validation을 적용하고 있습니다._

# 정리

_이제 정리 해보겠습니다._

1. 처음 useState만을 이용하여 폼의 상태를 변경하면 App 컴포넌트 전체가 랜더링 되었다.
2. react-hook-form을 사용하면서 App 컴포넌트를 매번 랜더링하지 않았고, submit 동작 혹은 에러 발생과 같은 특정 동작에서만 App 컴포넌트가 랜더링 되었다.
3. 추가적인 커스텀 작업을 통해서 개별 설정 값만 랜더링되도록 수정할 수 있었고, App 전체에 대한 랜더링은 전혀 이루어지지 않도록 수정하였다.

## 실제 사용 후기

현재 사내의 GUI에서 한 페이지에 약 60개 정도의 설정이 있습니다. 각 설정을 처리하는 컴포넌트가 무거워지고 각 설정이 변경될 때마다 설정화면 전체를 새롭게 랜더링하게 되면 설정 변경마다 랜더링 속도가 현저하게 느려집니다. 이와 같은 상황에서 해당 패키지를 적용했을 때, 각 설정 부분만 랜더링 되면서, 분명한 속도 개선을 확인할 수 있었습니다.

## 장점과 단점

### 장점

1. form 랜더링 속도 개선
2. Validation 유용
3. 다양한 API 지원

### 단점

1. React에 대한 충분한 지식이 없을 경우, 코드가 복잡해지면 동작 흐름 이해하기 어려울 수 있습니다.
2. 나름 안정적인 패키지이지만 업데이트시 패키지의 문제가 생기는 경우가 종종 있습니다.
   - 실제 개발과정에서 문제를 찾을 수 없는 에러가 존재했었는데 패키지를 최신 버전으로 업데이트 하면서 에러가 해결된 경우가 있었습니다.
