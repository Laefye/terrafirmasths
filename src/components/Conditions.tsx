import { Stack } from '@mui/material';
import image from '../assets/conditions.png';
import StepSprite from './StepSprite';

const sprite_width = 352;
const sprite_height = 120;

type Props = {
    conditions: number[];
};

function Conditions({ conditions }: Props) {
    const reversed = [...conditions].reverse();
    return <Stack
        direction="row"
        spacing="36px"
        sx={{
            backgroundImage: `url(${image})`,
            width: sprite_width,
            height: sprite_height,
            imageRendering: 'pixelated',
            paddingX: '32px',
            paddingTop: '36px',
        }}
    >
        {reversed.map((value, index) => (
            <StepSprite key={index} value={value} />
        ))}
    </Stack>;
}

export default Conditions;
