import {render, screen, RenderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput } from './index'

describe('DelayInput',()=>{
    let renderResult : RenderResult;
    let handleChange: jest.Mock

    beforeEach(()=>{
        jest.useFakeTimers();
        handleChange = jest.fn();
        renderResult = render(<DelayInput onChange={handleChange} />)
    })

    afterEach(()=>{
        renderResult.unmount()
        jest.useFakeTimers();
    })

    it('처음 span 은 비어있는지?',()=>{
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
        expect(spanNode).toHaveTextContent('입력한 텍스트:')
    })

    it('입렵중... 잘 보이는지?',()=>{
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement
        fireEvent.change(inputNode, {target:{value:inputText}})
        expect(spanNode).toHaveTextContent('입력중...')
    })

    it("1초 뒤에 표시 되는지?",()=> {
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement
        fireEvent.change(inputNode, {target:{value:inputText}})
        act(()=>{
            jest.runAllTimers();
        })
        expect(spanNode).toHaveTextContent(`입력한 텍스트: ${inputText}`)
    })

    it('입력하고 1초뒤에 onChnage 호출되는지?',()=>{
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement
        fireEvent.change(inputNode, {target:{value:inputText}})
        act(()=>{
            jest.runAllTimers();
        })
        expect(handleChange).toHaveBeenCalled()
    })
})