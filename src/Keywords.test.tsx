import React from 'react';
import { CommonProps, PolymorphicComponentProps } from './type';

export interface KeywordData {
    name: string;
    url?: string;
    extra?: React.ReactNode;
}

interface KeywordsProps<K extends KeywordData = KeywordData> extends CommonProps {
    keywords: K[];
    onKeyworkClick?: React.MouseEventHandler<HTMLAnchorElement>;
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
        <>
            <span itemProp="name" {...rest}>
                {name}
            </span>
            {children}
        </>
    );
}

export default function KeywordList<A extends React.ElementType, K extends KeywordData = KeywordData>({
    as,
    keywords,
    onKeyworkClick,
    children,
    ...rest
}: PolymorphicComponentProps<A, KeywordsProps<K>>) {
    const Component = as || 'div';
    return (
        <Component itemScope itemProp="keywords" itemType="https://schema.org/DefinedTerm" {...rest}>
            {keywords.map((k, i) => {
                if (k.url) {
                    return (
                        <a
                            key={`${k.name}${i}`}
                            itemProp="url"
                            title={k.name}
                            href={k.url}
                            onClick={onKeyworkClick}
                        >
                            <span itemProp="name">{k.name}</span>
                            {k.extra}
                        </a>
                    );
                } else {
                    return (
                        <React.Fragment key={`${k.name}${i}`}>
                            <span itemProp="name">{k.name}</span>
                            {k.extra}
                        </React.Fragment>
                    );
                }
            })}
            {children}
        </Component>
    );
}
