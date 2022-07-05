import React from 'react';

// Source: https://github.com/emotion-js/emotion
type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface BoxOwnProps<E extends React.ElementType = React.ElementType> {
    as?: E;
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<PropsOf<E>, keyof BoxOwnProps>;

export type PolymorphicComponentProps<E extends React.ElementType, P> = P & BoxProps<E>;

export interface CommonProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
