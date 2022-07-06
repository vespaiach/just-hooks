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

export function Keyword({ name, url, children, ...rest }: KeywordProps) {
    if (url) {
        return (
            <a itemProp="url" {...rest}>
                <span itemProp="name">{name}</span>
                {children}
            </a>
        );
    }
    return (
        <React.Fragment>
            <span itemProp="name" {...rest}>
                {name}
            </span>
            {children}
        </React.Fragment>
    );
}

export function KeywordList<A extends React.ElementType, K extends KeywordData = KeywordData>({
    as,
    keywords,
    onKeyworkClick,
    children,
    ...rest
}: PolymorphicComponentProps<A, KeywordsProps<K>>) {
    const Component = as || 'div';
    return (
        <Component itemScope itemProp="keywords" itemType="https://schema.org/DefinedTerm" {...rest}>
            {keywords.map((k, i) => (
                <Keyword
                    key={`${k.name}${i}`}
                    name={k.name}
                    className={k.className}
                    style={k.style}
                    url={k.url}
                    onClick={(e) => void onKeyworkClick?.(k, e)}>
                    {k.children}
                </Keyword>
            ))}
            {children}
        </Component>
    );
}
