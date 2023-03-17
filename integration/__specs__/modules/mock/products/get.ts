import { MockObject } from '@Mocks/mockObject';

export class GetCartProductsMock extends MockObject {
    public constructor() {
        super();
        this.path = {
            url: '*/products',
            method: 'get',
        };
    }

    public getFixture(): Record<string, unknown>[] {
        return [
            {
                id: 1,
                name: 'tomato',
                price: 30,
                quantity: 4,
            },
            {
                id: 2,
                name: 'pottato',
                price: 42,
                quantity: 5,
            },
            {
                id: 3,
                name: 'apple',
                price: 20,
                quantity: 2,
            },
        ];
    }
}
