import React from 'react';
import { CommonProps, PolymorphicComponentProps } from './type';
export interface KeywordData {
    name: string;
    url?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
interface KeywordsProps<K extends KeywordData = KeywordData> extends CommonProps {
    keywords: K[];
    onKeyworkClick?: (tag: K, evt: React.MouseEvent<HTMLAnchorElement>) => void;
}
interface KeywordProps extends CommonProps {
    name: string;
    url?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
export declare function Keyword({ name, url, children, ...rest }: KeywordProps): JSX.Element;
export declare function KeywordList<A extends React.ElementType, K extends KeywordData = KeywordData>({ as, keywords, onKeyworkClick, children, ...rest }: PolymorphicComponentProps<A, KeywordsProps<K>>): JSX.Element;
export {};
