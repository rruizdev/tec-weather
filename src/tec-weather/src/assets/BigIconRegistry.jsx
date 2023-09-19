import { BrightnessHigh, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, Clouds, CloudSnow, CloudSun, Moon } from "react-bootstrap-icons";

const weatherIcons = {
    '01d': <BrightnessHigh size={72} />,
    '02d': <CloudSun size={72} />,
    '03d': <Cloud size={72} />,
    '04d': <Clouds size={72} />,
    '09d': <CloudDrizzle size={72} />,
    '10d': <CloudRain size={72} />,
    '11d': <CloudLightning size={72} />,
    '13d': <CloudSnow size={72} />,
    '50d': <CloudFog size={72} />,
    '01n': <Moon size={72} />,
    '02n': <CloudMoon size={72} />,
    '03n': <Cloud size={72} />,
    '04n': <Clouds size={72} />,
    '09n': <CloudDrizzle size={72} />,
    '10n': <CloudRain size={72} />,
    '11n': <CloudLightning size={72} />,
    '13n': <CloudSnow size={72} />,
    '50n': <CloudFog size={72} />
}

export default function BigIconRegistry(data) {
    return (
        <>
            <div className='p-2'>
                {data.icon?.length ? weatherIcons[data.icon] : data.children}
            </div>
            <div className='p-2'>
                <p className='description'>{data.title}</p>
                <p>{data.subtitle}</p>
            </div>
        </>
    );
}