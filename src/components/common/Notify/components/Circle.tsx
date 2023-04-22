import * as React from 'react';

export interface ICircleProps {
    progress: number;
    animate?: boolean;
    animationDuration?: string;
    showPercentage?: boolean;
    showPercentageSymbol?: boolean;
    progressColor?: string;
    bgColor?: string;
    textColor?: string;
    size?: string;
    lineWidth?: string;
    percentSpacing?: number;
    textStyle?: React.CSSProperties;
    roundedStroke?: boolean;
    responsive?: boolean;
    onAnimationEnd?(): void;
    textClass?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const Circle = ({
    progress = 0,
    animate = true,
    animationDuration = '1s',
    showPercentage = false,
    showPercentageSymbol = false,
    progressColor = 'rgb(76, 154, 255)',
    bgColor = '#ecedf0',
    textColor = '#6b778c',
    size = '100',
    lineWidth = '25',
    percentSpacing = 10,
    responsive,
    roundedStroke,
    textStyle = { font: 'bold 4rem Helvetica, Arial, sans-serif' },
    textClass,
    onAnimationEnd,
    className,
    style,
}: ICircleProps) => {

    const getText = () => {
        if (!showPercentage) return;
        return (
            <text className={textClass} style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
                {progress}{showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
            </text>
        );
    };

    const radius = 175;
    const diameter = Math.round(Math.PI * radius * 2);
    const getOffset = (val = 0) => Math.round((100 - Math.min(val, 100)) / 100 * diameter);

    const text = getText();
    const strokeDashoffset = getOffset(progress);
    const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined;
    const strokeLinecap = roundedStroke ? 'round' : 'butt';
    const svgSize = responsive ? '100%' : size;

    return (
        <svg className={className} style={style} width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
            <circle stroke={bgColor} cx="175" cy="175" r="175" strokeWidth={lineWidth} fill="none" />
            <circle stroke={progressColor} transform="rotate(-90 175 175)" cx="175" cy="175" r="175" strokeDasharray="1100" strokeWidth={lineWidth} strokeDashoffset="1100" strokeLinecap={strokeLinecap} fill="none" style={{ strokeDashoffset, transition }} onTransitionEnd={onAnimationEnd} />
            {text}
        </svg>
    );

};

export default Circle;
