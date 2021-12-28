import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './buttonComponent.scss';

export const ButtonComponent = (props) => {
    let styles = {
        color: "#ffffff",
        fontWeight: "800",
        background: "#276AFF",
        border: "none",
        paddingTop: "12px",
        paddingBottom: "12px",
        width: "300px",
        borderRadius: "6px"
    }
    return (
        <>
            <button className="button_component" style={props.style ? props.style : styles} onClick={props.onClick}>
                {props.text}
            </button>
        </>
    )
}


export const GoBackComponent = (props) => {
    let styles = {
    }
    return (
        <div className="go_back_button" onClick={props.onClick}>
            <span><ArrowLeftOutlined style={props.style ? props.style : styles} /></span>
            <span style={props.style}>{props.text}</span>
        </div>
    )
}


export const ActionButtonComponent = (props) => {
    let styles = {
    }
    return (
        <div className="action_button" onClick={props.onClick}>
            <button style={{ color: props.color, backgroundColor: props.bgColor, width: props.width }}>
                {props.text}
            </button>
        </div>
    )
}


export const GoBackButtonComponent = (props) => {
    let styles = {
        textAlign: "center"
    }
    return (

        <div className="go_back_button_component" onClick={props.onClick}>
            <span><ArrowLeftOutlined style={props.style ? props.style : styles} /></span>
            <span style={props.style}>{props.text}</span>
        </div>
    )
}

