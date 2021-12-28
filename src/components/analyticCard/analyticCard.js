import { Dropdown, } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import './analyticCard.scss';

export const AnalyticCard = (props) => {

    return (
        <div className="custom-cards" style={props.style} onClick={props.onClick}>
            <div className="custom-cards-middle" >
                <b className="custom-cards-middle-text" style={props.textColor}>
                    {props.bottomText}
                </b>
            </div>
        </div>
    )
}