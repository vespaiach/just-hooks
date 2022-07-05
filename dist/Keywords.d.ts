/// <reference types="react" />
interface Keyword {
    name: string;
}
interface KeywordsProps<T extends Keyword> {
    className?: string;
    keywords: T[];
}
export default function TagList<K extends Keyword>({ keywords, className, }: KeywordsProps<K>): JSX.Element;
export {};
