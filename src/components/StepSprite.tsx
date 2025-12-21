import image from '../assets/step.png';

const sprite_width = 72;
const sprite_height = 72;

const row = 2;
const col = 4;

type Props = {
    value: number;
};

const coordinates = (value: number) => {
    switch (value) {
        case -3: return { x: 0, y: 0 };
        case -6: return { x: 1, y: 0 };
        case 2: return { x: 2, y: 0 };
        case 7: return { x: 3, y: 0 };
        case -9: return { x: 0, y: 1 };
        case -15: return { x: 1, y: 1 };
        case 13: return { x: 2, y: 1 };
        case 16: return { x: 3, y: 1 };
    }
    return { x: 0, y: 0 };
}

function StepSprite({ value }: Props) {
    const coordinate = coordinates(value);
    return <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: `${sprite_width * col}px ${sprite_height * row}px`,
        backgroundPosition: `${-coordinate.x * sprite_width}px ${-coordinate.y * sprite_height}px`,
        imageRendering: 'pixelated',
        width: sprite_width,
        height: sprite_height
    }}/>;
}

export default StepSprite;
