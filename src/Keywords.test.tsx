import React from 'react';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import { create, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';
import { unmountComponentAtNode } from 'react-dom';
import KeywordList, { Keyword } from './Keywords';

let container: HTMLDivElement | null = null;
beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    if (container) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

test('Keyword component snapshot', () => {
    const component = create(
        <Keyword name="react" url="https://reactjs.org/" className="keyword" style={{ fontWeight: 'bold' }}>
            <span>(111)</span>
        </Keyword>,
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

test('Keyword List component snapshot', () => {
    const keywords = [
        { name: 'react', url: 'https://reactjs.org/', extra: <span>111</span> },
        { name: 'vue', url: 'https://vuejs.org/', extra: <span>111</span> },
    ];
    const component = create(
        <KeywordList className="keyword-list" style={{ fontWeight: 'bold' }} keywords={keywords} as="p">
            <span>(111 items)</span>
        </KeywordList>,
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

function toJson(component: ReactTestRenderer) {
    const result = component.toJSON();
    expect(result).toBeDefined();
    return result as ReactTestRendererJSON;
}
