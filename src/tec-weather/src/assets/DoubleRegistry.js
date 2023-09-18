import './Common.scss';

export default function DoubleRegistry(data) {
    return (
        <div className='p-2'>
            <div className='icon head'>
                {data.children}
            </div>
            <div className='numbers'>
                <p className='featured'>
                    <span>{data.values[0]}</span>
                    <span className='label'>{data.labels[0]}</span>
                </p>
                <p className='common'>
                    <span>{data.values[1]}</span>
                    <span className='label'>{data.labels[1]}</span>
                </p>
            </div>
        </div>
    );
}