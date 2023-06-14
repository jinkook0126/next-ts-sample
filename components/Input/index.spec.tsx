import {render, screen, RenderResult, fireEvent} from '@testing-library/react'
import { Input } from './index'

describe('Input', ()=> {
    let renderResult : RenderResult;

    beforeEach(()=>{
        renderResult = render(<Input id='username' label="Username" />)
    })
    afterEach(()=>{
        renderResult.unmount();
    })

    it('처음 Input은 비어있어야 합니다.',()=>{
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement
        // const inputNode = screen.getByLabelText('test') as HTMLInputElement

        expect(inputNode).toHaveValue('')
    })

    it('문자 입력이 잘 보이는지?', () => {
        const inputText = 'Test Input Text';
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        fireEvent.change(inputNode, {target: {value: inputText}});
        expect(inputNode).toHaveValue(inputText)
    })

    it('버튼 클릭 시 Input이 모두 지워지는지?', ()=> {
        const inputText = 'Test Input Text';
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement;
        fireEvent.change(inputNode, {target: {value: inputText}});

        const buttonNode = screen.getByRole('button', {
            name:'Reset'
        }) as HTMLButtonElement
        fireEvent.click(buttonNode)

        expect(inputNode).toHaveValue('')
    })
    
})