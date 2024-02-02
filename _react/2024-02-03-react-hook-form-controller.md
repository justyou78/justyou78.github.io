---
layout: post
---

react-hook-form Controller 컴포넌트 사용 사례

---

# 기본 동작

- react-hook-form은 form 내부 각 element 요소의 랜더링 최적화를 가능하게 해주는 lib 입니다.

  - (기본 개념은 [react-hook-form 개념](https://justyou78.github.io/react/2022-07-13-react-hook-form.html)을 참고해주세요.)

- form 내부에 만약 input element가 존재하고 사용자가 input에 값을 타이핑 할때, 해당 컴포넌트만 랜더링 하도록 하기 위해서는 register를 input 내부에 추가하는 코드를 작성하게 됩니다.
  ```javascript
  <input {...register('test')} />
  ```

# input element에 접근이 불가능한 경우.

- 만약 우리가 input 태그를 직접 사용하지 않고, 특정 UI Framework를 사용한다고 가정해 보겠습니다.

  - (해당 글에서는 Fluent UI를 사용한다고 가정.)

- 그렇다면 우리는 잘 만들어진 UI Framework의 input 컴포넌트를 사용하게 되고 코드는 다음과 같이 작성될 수 있습니다.
  ```javascript
  <TextField />
  ```
- TextField 컴포넌트는 내부에 input element를 포함한 컴포넌트로 우리는 register를 Textfield 내부 input에 추가할 수 없는 상황에 맞닥드리게 됩니다.

- 이 방법을 해결하기 위한 컴포넌트가 바로 Controller 컴포넌트 입니다.

# Controller Component

- Controller Component를 사용하면 우리는 wrapper component의 랜더링 최적화를 수행할 수 있습니다.

- 아래와 같이 Controller -> render 부분에 wrapper component를 추가합니다.

  ```jsx
  function App() {
    const { handleSubmit, control, register } = useForm({
      defaultValues: {
        test: '',
        test2: '',
      },
      mode: 'onChange',
    });

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name='test'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField onChange={onChange} />
          )}
        />

        <input name='test2' {...register('test2')} />
      </form>
    );
  }
  ```

- 이제 TextField에 입력값을 변경해도 App 컴포넌트 전체가 랜더링 되지 않고 Controller 영역만 랜더링 되는 것을 확인할 수 있습니다. (test2 input은 랜더링 되지 않는다.)

# 다른 요소도 함께 랜더링

- 현재 TextField의 입력값을 변경하더라도 test2는 랜더링 되지 않습니다. (react-hook-form 랜더링 최적화로 인하여)

- 만약 test2 컴포넌트도 랜더링이 필요한 상황이라면 즉, test 입력값이 test2와 의존성이 존재하여 test2도 랜더링이 필요한 상태.

- 이런 경우에도 Controller를 사용할 수 있습니다. test2 요소를 test Controller 내부에 추가하여 TextField가 변경되면 Controller의 render 영역이 랜더링 되면서 test2도 함께 랜더링을 수행할 수 있습니다.

  ```jsx
  function App() {
    const { handleSubmit, control, register } = useForm({
      defaultValues: {
        test: '',
        test2: '',
      },
      mode: 'onChange',
    });

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name='test'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextField onChange={onChange} />
            <input name='test2' {...register('test2')} />
          )}
        />
      </form>
    );
  }
  ```

# 정리

- Controller는 input과 같은 element에 직접 register를 등록할 수 없는 조건(wrapper component를 사용)에서 사용될 수 있습니다.
- 또한 독립적으로 랜더링 되는 react-hook-form 환경에서 다른 요소의 랜더링이 함께 수행되어야 할 때도 응용할 수 있습니다.
