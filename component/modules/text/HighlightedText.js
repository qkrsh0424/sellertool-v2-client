import styled from 'styled-components';

const Mark = styled.mark`
    background: var(--mainColorOpacity100);
`;

export default function HighlightedText({ text, query }) {
    if (query !== '' && text.includes(query)) {
        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <Mark key={index}>{part}</Mark>
                    ) : (
                        part
                    ),
                )}
            </>
        );
    }

    return text;
};