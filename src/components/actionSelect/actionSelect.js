import {useNavigate} from 'react-router-dom';

import './actionSelect.scss';

const ActionSelect = () => {
    const navigate = useNavigate();

    return (
        <div className="actionselect" >
            <h2>Aman Medicare</h2>
            <div>
                <OptionButton text={"Facility"} />
                <OptionButton text={"Provider"} />
                <OptionButton onClick={()=> navigate('/pricing')} text={"Patient"} />
            </div>
        </div>
    )
}

export default ActionSelect



export const OptionButton = (props) => {
    return (
        <div className='optionButton' onClick={props.onClick}>
            {props.text}
        </div>
    )
}



export const SelectButton = (props) => {
    return (
        <div className='selectButton' onClick={props.onClick}>
            {props.text}
        </div>
    )
}