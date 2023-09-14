import './Shared.scss';

export default function SingleRegistry(data) {
    return (
        <div className='p-2'>
            <div className='icon'>
                {data.children}
            </div>
            <div className='numbers'>
                <p className='common'>
                    <span>{data.value}</span>
                    <span className='label'>{data.label}</span>
                </p>
            </div>
        </div>
    );
}