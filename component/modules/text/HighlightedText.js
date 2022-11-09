import styled from 'styled-components';

const Mark = styled.mark`
    background: var(--mainColorOpacity100);
    font-weight: 600;
    text-decoration: underline;
    color:inherit;
`;

export default function HighlightedText({ text, query, highlightColor }) {
    if (query !== '' && text.includes(query)) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <Mark
                            key={index}
                            style={{
                                background: highlightColor ? highlightColor : ''
                            }}
                        >{part}</Mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }

    return text;
};